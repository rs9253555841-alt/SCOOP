import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

// Initialize Google GenAI client (server-side only)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

const SCOOP_FAQ_SYSTEM_INSTRUCTION = `You are "Scoop AI", the warm, charming, and highly knowledgeable master ice cream concierge for Scoop Artisanal Ice Cream parlor.
Your goal is to answer customer questions about our ice creams, ingredients, allergens, waffle cones, dietary restrictions, deliveries, packaging, and orders with total honesty and delightful enthusiasm.

Key Scoop Brand & FAQ Knowledge:
1. FLAVORS & INGREDIENTS:
   - Strawberry Bliss: 100% pasture-raised grass-fed dairy (whole milk & double cream), fresh real strawberry purée and natural juice, raw cane sugar. Eggless, gluten-free in cups/tubs.
   - Madagascar Vanilla Dream: Pasture-raised dairy, real Bourbon vanilla beans, egg yolk French custard base. Gluten-free in cups/tubs. Contains egg yolks.
   - Mango Sunshine: 100% DAIRY-FREE VEGAN SORBET! Made from sun-ripened Alphonso mango purée, mountain spring water, and cane sugar. 0 dairy, 0 egg, 0 gluten, 0 nuts.
   - Pistachio Delight: Slow-roasted Sicilian Bronte pistachios, fresh dairy cream, raw sugar. Eggless, gluten-free in cups/tubs. Contains tree nuts. (Zero peanuts anywhere in kitchen).
   - Salted Caramel Indulgence: House-cooked caramel with pure butter and simmered cane sugar, sea salt, egg yolk French custard base. Gluten-free in cups/tubs. Contains eggs and dairy.
   - Chocolate Fudge Craving: Single-origin Dutch cocoa, dark chocolate fudge ribbon, grass-fed cream. Eggless, gluten-free in cups/tubs.

2. ALLERGENS & DIETARY:
   - Gluten: All ice cream flavors in Cups and Tubs are 100% GLUTEN-FREE. Our freshly hand-rolled waffle cones contain wheat flour and therefore contain gluten.
   - Dairy & Vegan: Mango Sunshine sorbet is 100% dairy-free, vegan, and lactose-free. All other flavors contain grass-fed dairy milk and cream.
   - Eggs: Vanilla Dream and Caramel Indulgence contain egg yolks (traditional French custard style). Strawberry Bliss, Mango Sunshine, Pistachio Delight, and Chocolate Fudge are 100% eggless.
   - Nuts: Pistachio Delight contains tree nuts. Zero peanuts are stored or handled in our facility.
   - Artificial Additives: ZERO synthetic dyes (no Red 40, Yellow 5, Blue 1). ZERO chemical preservatives, zero high-fructose corn syrup, zero artificial sweeteners, zero palm oil.
   - Severe Allergies: Customers can request a sanitized scoop directly from a fresh, unopened tub from our sub-zero flash freezer to prevent airborne or scooper cross-contact.

3. PACKAGING & DELIVERY:
   - Cold Chain: Ice cream is packed in insulated thermal containers with food-grade dry ice slabs. Stays rock-solid frozen for up to 2 hours.
   - Speed: Average delivery time is 35 to 45 minutes.
   - Shipping fee: Free delivery on orders above ₹399/₹499. Otherwise a nominal ₹49 insulated delivery fee applies.
   - Payment: UPI (Google Pay, PhonePe, Paytm) and Cash on Delivery (COD).

4. LOYALTY & REWARDS:
   - Scoop Stamp Card: Earn 1 stamp per completed order. Reach 5 stamps to receive a FREE artisanal scoop on your next order!

RESPONSE GUIDELINES:
- Keep answers friendly, helpful, informative, and appetizing.
- Use clear bullet points when summarizing allergen tags or flavor options.
- If an answer depends on serving method (cup/tub vs cone), always clarify that cups and tubs are gluten-free, while cones contain wheat flour.
- At the end of your response, provide 2 or 3 short relevant follow-up questions the customer might want to ask next.`;

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API Endpoint for FAQ Agent
app.post('/api/faq-agent', async (req, res) => {
  console.log('>>> [Server] /api/faq-agent called:', req.body?.question);
  try {
    const { question, history } = req.body || {};

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const trimmedQuestion = question.trim();

    // Construct conversation contents with history if provided
    const contents: any[] = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history.slice(-6)) {
        if (turn.role === 'user' || turn.role === 'model') {
          contents.push({
            role: turn.role,
            parts: [{ text: turn.text }]
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [
        {
          text: `Customer Question: "${trimmedQuestion}"\n\nPlease answer accurately based on the Scoop Ice Cream parlor guidelines. Provide clear, helpful details and suggest 2-3 quick follow-up questions.`
        }
      ]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: SCOOP_FAQ_SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95
      }
    });

    const replyText = response.text || "I'm delighted to help! Could you please specify your question about our ice creams or ingredients?";

    // Extract suggested follow-ups if formatted at the end
    const followUps: string[] = [];
    const lines = replyText.split('\n');
    let inFollowUp = false;
    for (const line of lines) {
      const trimmed = line.trim();
      const lower = trimmed.toLowerCase();
      if (
        lower.includes('follow-up') ||
        lower.includes('you might also wonder') ||
        lower.includes('things you might want to ask') ||
        lower.includes('related questions') ||
        lower.includes('would you like to know')
      ) {
        inFollowUp = true;
        continue;
      }
      if (inFollowUp && (trimmed.startsWith('-') || trimmed.startsWith('•') || trimmed.startsWith('*') || /^\d+\./.test(trimmed))) {
        const clean = trimmed.replace(/^[-•*\d.]+\s*/, '').replace(/[*_"]/g, '').replace(/\?+$/, '').trim();
        if (clean && clean.length > 5 && clean.length < 100) {
          followUps.push(clean + '?');
        }
      }
    }

    if (followUps.length === 0) {
      followUps.push(
        'Which flavors are gluten-free?',
        'How does dry ice delivery work?',
        'How do Scoop stamps work?'
      );
    }

    return res.json({
      answer: replyText,
      suggestedFollowUps: followUps.slice(0, 3)
    });
  } catch (error: any) {
    console.error('Error in FAQ agent generation:', error);
    return res.status(500).json({
      error: 'Unable to contact Scoop AI agent right now',
      message: error?.message || 'Server error'
    });
  }
});

// Setup Vite dev server middlewares or static production serving
async function setupServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🍦 Scoop server running at http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

setupServer().catch((err) => {
  console.error('Failed to start Scoop server:', err);
  process.exit(1);
});
