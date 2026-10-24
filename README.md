# Scoop — Artisanal Ice Cream

> *Every Scoop, a Little Joy.* Handcrafted artisanal ice creams made with fresh, locally-sourced ingredients in small batches.

---

## 🍨 About The Project

**Scoop** is a modern, high-fidelity web application for an artisanal ice cream boutique. Designed with vibrant, pastel aesthetics, fluid motion, and responsive interactivity, Scoop delivers a premium ordering and discovery experience across all devices.

### ✨ Key Features

- **Artisanal Flavor Catalog**: Explore signature flavors (Strawberry Bliss, Pistachio Delight, Caramel Indulgence, Mango Sunshine, Choco Fudge, Vanilla Dream) with serving format selectors (Crisp Waffle Cone, Eco-Cup, Family Tub).
- **Interactive Experience**:
  - **Spin to Win Wheel**: Interactive prize wheel offering instant discount codes and rewards.
  - **Scoop Loyalty Stamp Card**: Digital rewards card allowing customers to collect stamps with orders to earn a free scoop.
  - **Wishlist & Cart**: Persistent cart and wishlist with toast notifications and rapid drawer toggles.
  - **Nutritional & Allergen Transparency**: Complete ingredient, calorie, and allergy breakdowns for each recipe.
- **AI-Powered Customer Assistant**:
  - Server-side Gemini AI FAQ agent built with `@google/genai`.
  - Answers real-time questions about ingredients, lactose-free and vegan options, store hours, custom catering, and delivery areas.
- **Store & Order Management**:
  - Store locator with operational hours and live pickup estimates.
  - Order checkout flow with Indian Rupee (₹ INR) pricing and order confirmation.
  - Admin management dashboard for viewing orders and flavor catalog state.
- **Account & Persistence**:
  - Supabase integration for authentication and order persistence.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **Styling & Motion**: [Tailwind CSS v4](https://tailwindcss.com/), [Motion (Framer Motion)](https://motion.dev/), [Lucide React](https://lucide.dev/)
- **Backend & Proxy**: [Express](https://expressjs.com/), [tsx](https://github.com/privatenumber/tsx)
- **AI & Integrations**: [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini FAQ Agent), [@supabase/supabase-js](https://supabase.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/scoop.git
   cd scoop
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy the example environment file and fill in your keys:
   ```bash
   cp .env.example .env
   ```
   Required variables:
   - `GEMINI_API_KEY`: API key from Google AI Studio for the FAQ assistant.
   - `VITE_SUPABASE_URL`: Your Supabase project URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous public key.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000`.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
├── .env.example          # Sample environment configuration
├── .gitignore            # Git exclusion rules
├── index.html            # HTML entry point
├── metadata.json         # AI Studio applet metadata
├── package.json          # Node dependencies and scripts
├── server.ts             # Express server with Gemini FAQ agent endpoint
├── supabase-schema.sql   # SQL schema for Supabase tables and policies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration with Tailwind CSS plugin
└── src/
    ├── assets/           # Curated flavor image assets & vector illustrations
    ├── components/       # Reusable UI components (Navbar, Modals, Wheels, AI FAQ)
    ├── context/          # React Contexts (Cart, Wishlist, Auth)
    ├── data/             # Flavor data store, store locations, and FAQs
    ├── hooks/            # Custom hooks (scroll reveal, interactions)
    ├── lib/              # Client libraries (Supabase client)
    ├── pages/            # Page views (Home, Flavors, Detail, About, Order, Admin)
    └── types/            # TypeScript data models and interfaces
```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
