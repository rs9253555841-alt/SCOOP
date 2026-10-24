import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, RefreshCw, HelpCircle, Bot, User, Check, Copy, ArrowRight, CornerDownLeft } from 'lucide-react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  suggestedFollowUps?: string[];
}

const STARTER_PROMPTS = [
  'Which flavors are 100% gluten-free?',
  'Is the Mango Sunshine completely vegan?',
  'Which ice creams contain egg yolks?',
  'How do you keep ice cream frozen during delivery?',
  'Do you use artificial dyes or preservatives?',
  'How do the Scoop loyalty stamps work?'
];

export const FaqAiAgentCard: React.FC<{
  embedded?: boolean;
  onClose?: () => void;
}> = ({ embedded = true, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: "👋 Hi there! I'm **Scoop AI**, your artisanal ice cream concierge. Ask me anything about our farm-fresh dairy, tree nuts, gluten-free cups, vegan sorbets, waffle cones, or insulated dry ice delivery!",
      timestamp: 'Just now',
      suggestedFollowUps: [
        'Which flavors are gluten-free?',
        'Is Mango Sunshine vegan?',
        'How does dry ice delivery work?'
      ]
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (questionToSend?: string) => {
    const q = (questionToSend || inputQuestion).trim();
    if (!q || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      // Prepare history for multi-turn conversational context
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome-msg')
        .map((m) => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/faq-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: q,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      const modelMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: 'model',
        text: data.answer || "I'm here to help with any ice cream ingredients, allergens, or delivery details!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: data.suggestedFollowUps || []
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (err: any) {
      console.warn('FAQ Agent API call fallback:', err);
      // Helpful fallback in case of local network issue
      const fallbackReply = getLocalFallbackAnswer(q);
      const modelMessage: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: 'model',
        text: fallbackReply.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedFollowUps: fallbackReply.followUps
      };
      setMessages((prev) => [...prev, modelMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const resetChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: "👋 Chat reset! Ask me anything about our flavors, allergens, French custard bases, waffle cones, or delivery.",
        timestamp: 'Just now',
        suggestedFollowUps: [
          'Which flavors are gluten-free?',
          'Do you have nut-free flavors?',
          'What is in the waffle cone?'
        ]
      }
    ]);
  };

  return (
    <div className={`bg-[#FFF5E4] rounded-3xl border-2 border-white shadow-lg overflow-hidden flex flex-col ${
      embedded ? 'max-w-4xl mx-auto my-6' : 'w-full h-full'
    }`}>
      {/* Agent Header */}
      <div className="bg-white/90 backdrop-blur-xs p-4 sm:p-5 border-b border-[#F8D0C8] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-[#7A2500] text-white flex items-center justify-center shadow-md">
              <Bot className="w-6 h-6 text-[#FFD56B]" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-[#7A2500]">
                Scoop AI &bull; FAQ Agent
              </h3>
              <span className="text-[10px] font-bold bg-[#FF6F86]/15 text-[#FF6F86] px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Live Agent
              </span>
            </div>
            <p className="text-xs text-[#7A2500]/70">
              Instant answers on ingredients, allergens, waffle cones & delivery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetChat}
            title="Reset Chat"
            className="p-2 rounded-full text-[#7A2500]/70 hover:text-[#7A2500] hover:bg-[#FFF5E4] transition-colors cursor-pointer text-xs flex items-center gap-1 font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-bold text-[#7A2500] bg-[#FFF5E4] hover:bg-[#FFE9E5] px-3 py-1.5 rounded-full border border-[#F8D0C8] cursor-pointer"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {/* Suggested Starter Chips */}
      {messages.length <= 2 && (
        <div className="px-4 sm:px-6 pt-4 pb-2 bg-white/40 border-b border-[#F8D0C8]/40 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 text-xs text-[#7A2500]/70 font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6F86]" />
            <span>Popular customer questions:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="text-xs font-medium bg-white hover:bg-[#7A2500] hover:text-white text-[#7A2500] px-3.5 py-1.5 rounded-full border border-[#F8D0C8] shadow-2xs whitespace-nowrap transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className={`p-4 sm:p-6 overflow-y-auto space-y-4 ${
        embedded ? 'max-h-[440px] min-h-[300px]' : 'flex-1 min-h-[340px]'
      }`}>
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#7A2500] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <Bot className="w-4 h-4 text-[#FFD56B]" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] space-y-2 ${isUser ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-xs relative group ${
                    isUser
                      ? 'bg-[#7A2500] text-white rounded-tr-xs'
                      : 'bg-white text-[#7A2500] border border-[#F8D0C8] rounded-tl-xs'
                  }`}
                >
                  <FormattedMessageContent text={msg.text} />

                  {/* Message timestamp and copy button */}
                  <div className={`flex items-center justify-between gap-2 mt-2 pt-1 border-t text-[10px] ${
                    isUser ? 'border-white/20 text-white/70' : 'border-[#F8D0C8]/60 text-[#7A2500]/60'
                  }`}>
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        type="button"
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-[#7A2500] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Follow up suggestions */}
                {!isUser && msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedFollowUps.map((fu, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSend(fu)}
                        disabled={isLoading}
                        className="text-[11px] font-semibold bg-white/90 hover:bg-[#FF6F86] hover:text-white text-[#7A2500] px-2.5 py-1 rounded-full border border-[#F8D0C8] shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <span>{fu}</span>
                        <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-[#FF6F86] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading / Churning Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start animate-fadeIn">
            <div className="w-8 h-8 rounded-full bg-[#7A2500] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
              <Bot className="w-4 h-4 text-[#FFD56B]" />
            </div>
            <div className="bg-white rounded-3xl rounded-tl-xs p-4 border border-[#F8D0C8] shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#7A2500]">
                <div className="w-4 h-4 border-2 border-[#FF6F86] border-t-transparent rounded-full animate-spin" />
                <span>Scoop AI is preparing your answer...</span>
              </div>
              <p className="text-[11px] text-[#7A2500]/60 italic">
                Checking dairy farm recipes, waffle cone bakery & kitchen allergen specs
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-[#F8D0C8]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Ask about ingredients, allergies, waffle cones, dry ice..."
            disabled={isLoading}
            className="flex-1 bg-[#FFF5E4] rounded-full px-4 py-2.5 text-xs sm:text-sm text-[#7A2500] placeholder:text-[#7A2500]/50 border border-[#F8D0C8] focus:outline-none focus:ring-2 focus:ring-[#7A2500] pr-10"
          />

          <button
            type="submit"
            disabled={!inputQuestion.trim() || isLoading}
            className="btn-pill-brown text-xs sm:text-sm py-2.5 px-5 font-bold shadow-xs cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-[#7A2500]/60 mt-1.5 px-2">
          <span>Powered by Gemini AI &bull; Grounded in Scoop Parlor Kitchen Specs</span>
          <span className="hidden sm:inline">Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Formats markdown-style bolding and bullet lists cleanly
 */
const FormattedMessageContent: React.FC<{ text: string }> = ({ text }) => {
  const paragraphs = text.split('\n\n');

  return (
    <div className="space-y-2">
      {paragraphs.map((p, pIdx) => {
        const lines = p.split('\n');
        const isBulletList = lines.every((line) => line.trim().startsWith('-') || line.trim().startsWith('•') || /^\d+\./.test(line.trim()));

        if (isBulletList && lines.length > 1) {
          return (
            <ul key={pIdx} className="space-y-1 my-1.5 pl-2">
              {lines.map((line, lIdx) => {
                const cleanLine = line.replace(/^[-•\d.]\s*/, '');
                return (
                  <li key={lIdx} className="flex items-start gap-1.5 text-inherit">
                    <span className="text-[#FF6F86] font-bold text-xs shrink-0">&bull;</span>
                    <span>{parseBold(cleanLine)}</span>
                  </li>
                );
              })}
            </ul>
          );
        }

        return (
          <p key={pIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {parseBold(line)}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};

function parseBold(str: string): React.ReactNode[] {
  const parts = str.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-bold underline decoration-[#FF6F86]/30 decoration-2">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function getLocalFallbackAnswer(question: string): { text: string; followUps: string[] } {
  const q = question.toLowerCase();

  if (q.includes('gluten') || q.includes('celiac') || q.includes('cone')) {
    return {
      text: "All Scoop ice cream flavors in **Paper Cups and Pint Tubs are 100% Gluten-Free**! However, our freshly hand-rolled **waffle cones contain wheat flour** and therefore contain gluten. If you have celiac disease, please choose our cup or tub serving.",
      followUps: ['Are cones nut-free?', 'Is Mango Sunshine gluten-free?', 'How is ice cream packaged?']
    };
  }

  if (q.includes('vegan') || q.includes('dairy-free') || q.includes('lactose') || q.includes('mango')) {
    return {
      text: "**Mango Sunshine** is our signature 100% dairy-free vegan sorbet! Crafted with sun-ripened Alphonso mangoes, mountain spring water, and cane sugar with zero dairy, zero eggs, and zero gluten.",
      followUps: ['Which flavors contain nuts?', 'Are cups gluten-free?', 'How fast is delivery?']
    };
  }

  if (q.includes('nut') || q.includes('peanut') || q.includes('pistachio') || q.includes('allergy')) {
    return {
      text: "**Pistachio Delight** is made with real slow-roasted Sicilian Bronte pistachios. All other flavors do not include nuts in their churn. We have a **zero-peanut policy** across our entire facility. For severe allergies, our team will retrieve a clean scoop directly from an unopened tub in our flash freezer.",
      followUps: ['Are waffle cones gluten-free?', 'Do you have vegan options?', 'Can I request a clean scoop?']
    };
  }

  if (q.includes('egg') || q.includes('custard')) {
    return {
      text: "Our **Madagascar Vanilla Dream** and **Salted Caramel Indulgence** are crafted using traditional French custard bases enriched with egg yolks. **Strawberry Bliss, Mango Sunshine, Pistachio Delight, and Chocolate Fudge Craving are 100% eggless**.",
      followUps: ['Is Vanilla Dream gluten-free?', 'Which flavors are vegan?', 'How does delivery work?']
    };
  }

  return {
    text: "At Scoop, every batch is handcrafted in small artisanal churns using **100% pasture-raised grass-fed milk**, whole ripe fruits, and unrefined cane sugar with **zero synthetic dyes, artificial flavors, or palm oil**. Orders are packed in insulated dry ice thermal boxes and arrive in 35-45 minutes!",
    followUps: ['Which flavors are gluten-free?', 'Is Mango Sunshine vegan?', 'How do Scoop stamps work?']
  };
}
