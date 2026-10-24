import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Search,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Milk,
  Wheat,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Info,
  Bot
} from 'lucide-react';
import { FaqAiAgentCard } from './FaqAiAgentCard';

export interface AllergenFaq {
  id: string;
  category: 'all' | 'nuts' | 'dairy' | 'gluten' | 'eggs' | 'natural';
  categoryLabel: string;
  question: string;
  badge: string;
  badgeType: 'warning' | 'safe' | 'info';
  answer: string;
  allergenSummary: {
    contains?: string[];
    freeFrom?: string[];
  };
}

const FAQ_ITEMS: AllergenFaq[] = [
  {
    id: 'faq-dairy-sourcing',
    category: 'dairy',
    categoryLabel: 'Dairy & Milk',
    badge: '100% Grass-Fed Dairy',
    badgeType: 'safe',
    question: 'What kind of milk and dairy do you use in your ice cream base?',
    answer:
      'We churn exclusively with 100% fresh, pasteurized whole milk and rich double cream sourced from pasture-raised family dairy farms. Our cream base is slow-aged for 18 hours to develop natural sweetness and micro-crystal density. We never use reconstituted milk powder, condensed syrups, synthetic thickeners, or vegetable palm oil fats.',
    allergenSummary: {
      contains: ['Milk', 'Cream'],
      freeFrom: ['Palm Oil', 'Milk Powder', 'Synthetic Gums']
    }
  },
  {
    id: 'faq-nuts-cross-contact',
    category: 'nuts',
    categoryLabel: 'Nuts & Cross-Contact',
    badge: 'Allergen Advisory',
    badgeType: 'warning',
    question: 'Which flavors contain nuts, and how do you prevent cross-contamination?',
    answer:
      'Our Pistachio Delight is made with freshly ground, slow-roasted Sicilian Bronte pistachios. All other core flavors (Strawberry Bliss, Vanilla Dream, Mango Sunshine, Caramel Indulgence, Chocolate Fudge Craving) do not use nut ingredients in their churn recipes. However, all our flavors are handcrafted in a single boutique kitchen that handles tree nuts (pistachios, almonds, hazelnuts). Between every batch run, our freezers and scooping tools undergo rigorous hot-water sanitization cycles, but microscopic airborne or contact traces may be present. If you have a severe or anaphylactic nut allergy, please speak with our team directly before ordering.',
    allergenSummary: {
      contains: ['Tree Nuts (Pistachio in Pistachio Delight)'],
      freeFrom: ['Peanuts (zero peanuts stored or processed in kitchen)']
    }
  },
  {
    id: 'faq-gluten-cones',
    category: 'gluten',
    categoryLabel: 'Gluten & Waffle Cones',
    badge: 'Gluten-Free in Cups & Tubs',
    badgeType: 'safe',
    question: 'Are your ice creams gluten-free? What about the waffle cones?',
    answer:
      'All four of our core ice cream flavors (Strawberry Bliss, Vanilla Dream, Mango Sunshine, and Caramel Indulgence) are 100% gluten-free when served in our compostable paper cups or family pint tubs! Our hand-rolled waffle cones, however, are baked fresh daily using traditional wheat flour and contain gluten. For customers with celiac disease or gluten sensitivity, we always recommend ordering in a Paper Cup or Tub, and our parlor scoopers are happy to use a sanitized scoop straight from a fresh tub upon request.',
    allergenSummary: {
      contains: ['Wheat / Gluten (Waffle Cones only)'],
      freeFrom: ['Gluten (in all Cup & Tub servings)']
    }
  },
  {
    id: 'faq-eggs-custard',
    category: 'eggs',
    categoryLabel: 'Eggs & Custard',
    badge: 'Traditional Custard Churns',
    badgeType: 'info',
    question: 'Do any of your ice cream flavors contain eggs?',
    answer:
      'Most of our fruit and cream flavors are Philadelphia-style (eggless). However, our Madagascar Vanilla Dream and French Caramel Indulgence are prepared with a traditional cooked French custard base enriched with pasteurized egg yolks, which provides their signature velvety richness and amber silkiness. Strawberry Bliss, Mango Sunshine, and Pistachio Delight are completely egg-free.',
    allergenSummary: {
      contains: ['Egg Yolks (Vanilla Dream & Caramel Indulgence only)'],
      freeFrom: ['Eggs in Strawberry Bliss, Mango Sunshine & Pistachio Delight']
    }
  },
  {
    id: 'faq-natural-dyes',
    category: 'natural',
    categoryLabel: 'Dyes & Preservatives',
    badge: 'Zero Synthetic Chemicals',
    badgeType: 'safe',
    question: 'Do you use artificial food dyes, synthetic flavors, or preservatives?',
    answer:
      'Never. We hold a strict zero-chemical-additive promise. Every color and aroma in our parlor comes directly from real, whole ingredients: fresh strawberry pulp and natural juice for pink hues, roasted pistachios for subtle sage green, ripe Alphonso mangoes for vivid yellow, and single-origin Dutch cocoa for deep chocolate. We strictly prohibit Red 40, Yellow 5, Blue 1, titanium dioxide, artificial vanillin, and chemical shelf stabilizers.',
    allergenSummary: {
      contains: ['100% Real Fruits, Spices & Roasted Nuts'],
      freeFrom: ['Artificial Dyes', 'Chemical Preservatives', 'Synthetic Aromas']
    }
  },
  {
    id: 'faq-vegan-sorbet',
    category: 'dairy',
    categoryLabel: 'Vegan & Plant-Based',
    badge: '100% Dairy-Free & Vegan',
    badgeType: 'safe',
    question: 'Do you offer vegan, lactose-free, or plant-based choices?',
    answer:
      'Yes! Our Mango Sunshine is a luscious, silky fruit sorbet crafted from sun-ripened Alphonso mango purée, mountain spring water, and organic unrefined cane sugar. It contains zero dairy, zero eggs, and zero animal derivatives. We churn our sorbets in dedicated fruit-only cycles to ensure pure, refreshing plant-based indulgence.',
    allergenSummary: {
      contains: ['Alphonso Mango Purée', 'Cane Sugar', 'Spring Water'],
      freeFrom: ['Dairy', 'Lactose', 'Eggs', 'Gluten', 'Animal Gelatin']
    }
  },
  {
    id: 'faq-sweeteners',
    category: 'natural',
    categoryLabel: 'Sweeteners',
    badge: 'Unrefined Cane Sugar Only',
    badgeType: 'safe',
    question: 'What sweeteners do you use in Scoop ice creams?',
    answer:
      'We sweeten our churns exclusively with raw, unrefined cane sugar and the natural sugars present in whole ripe fruits. We cook our caramel with pure butter and simmered cane sugar. We never use high-fructose corn syrup (HFCS), dextrose syrups, or artificial non-nutritive sweeteners such as aspartame, sucralose, or sugar alcohols (erythritol, maltitol).',
    allergenSummary: {
      contains: ['Raw Unrefined Cane Sugar', 'Natural Fruit Fructose'],
      freeFrom: ['High Fructose Corn Syrup', 'Aspartame', 'Sucralose', 'Sugar Alcohols']
    }
  },
  {
    id: 'faq-special-scoop-request',
    category: 'all',
    categoryLabel: 'Special Allergy Care',
    badge: 'Parlor Care Protocol',
    badgeType: 'info',
    question: 'Can I request a clean scoop from a fresh tub if I have an allergy?',
    answer:
      'Yes, absolutely! We take allergy safety with the utmost seriousness. When ordering in our parlors or adding a note on your delivery order, simply notify us of your allergy. Our team will wash and sanitize their hands, retrieve a freshly sterilized scooper, and dip from an unopened tub directly from our sub-zero flash freezer to minimize any kitchen airborne contact.',
    allergenSummary: {
      freeFrom: ['Cross-Contact with other parlor scoops upon request']
    }
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Queries' },
  { id: 'nuts', label: 'Nuts & Cross-Contact' },
  { id: 'dairy', label: 'Dairy & Milk' },
  { id: 'gluten', label: 'Gluten & Cones' },
  { id: 'eggs', label: 'Eggs & Custard' },
  { id: 'natural', label: 'Dyes & Sweeteners' }
];

export const AboutFaqSection: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'agent' | 'browse'>('agent');
  // First item open by default for immediate clarity
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    'faq-dairy-sourcing': true
  });
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    FAQ_ITEMS.forEach((item) => {
      allOpen[item.id] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesText =
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        item.badge.toLowerCase().includes(q) ||
        item.allergenSummary.contains?.some((c) => c.toLowerCase().includes(q)) ||
        item.allergenSummary.freeFrom?.some((f) => f.toLowerCase().includes(q));

      return matchesCategory && matchesText;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="space-y-8 reveal-init delay-100" id="faq-allergens">
      {/* Section Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7A2500]/70 bg-white px-3.5 py-1 rounded-full border border-[#F8D0C8] shadow-xs inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF6F86]" />
          <span>Ingredients & Allergen Care</span>
        </span>
        <h2 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base font-medium text-[#7A2500]/80 leading-relaxed">
          We believe in total transparency. Here are honest answers regarding our farm dairy, nuts, gluten, eggs, sweeteners, and kitchen allergy protocols.
        </p>
      </div>

      {/* Allergen Quick Reference Cards Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto">
        <div className="bg-white p-3.5 rounded-2xl border border-[#F8D0C8] shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#7A2500] font-bold text-xs uppercase tracking-wider">
            <Milk className="w-3.5 h-3.5 text-[#FF6F86]" />
            <span>Dairy</span>
          </div>
          <p className="text-[11px] text-[#7A2500]/75 font-medium leading-tight">
            100% grass-fed milk. Sorbet is 100% dairy-free.
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#F8D0C8] shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#7A2500] font-bold text-xs uppercase tracking-wider">
            <Wheat className="w-3.5 h-3.5 text-[#A8C145]" />
            <span>Gluten</span>
          </div>
          <p className="text-[11px] text-[#7A2500]/75 font-medium leading-tight">
            Gluten-free in cups & tubs. Wheat in waffle cones only.
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#F8D0C8] shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#7A2500] font-bold text-xs uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FF9F24]" />
            <span>Tree Nuts</span>
          </div>
          <p className="text-[11px] text-[#7A2500]/75 font-medium leading-tight">
            Pistachios in kitchen; zero peanuts used.
          </p>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-[#F8D0C8] shadow-xs text-center space-y-1">
          <div className="flex items-center justify-center gap-1 text-[#7A2500] font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6F86]" />
            <span>Zero Dyes</span>
          </div>
          <p className="text-[11px] text-[#7A2500]/75 font-medium leading-tight">
            100% colored by real fruits & cocoa. No synthetics.
          </p>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex justify-center max-w-md mx-auto pt-2">
        <div className="bg-white/90 p-1.5 rounded-full border border-[#F8D0C8] shadow-sm flex items-center gap-1 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveMode('agent')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'agent'
                ? 'bg-[#7A2500] text-white shadow-md'
                : 'text-[#7A2500]/80 hover:text-[#7A2500] hover:bg-[#FFF5E4]'
            }`}
          >
            <Bot className="w-4 h-4 text-[#FFD56B]" />
            <span>Ask Scoop AI Agent</span>
            <span className="text-[10px] font-extrabold bg-[#FF6F86] text-white px-2 py-0.5 rounded-full shadow-2xs">
              LIVE
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode('browse')}
            className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeMode === 'browse'
                ? 'bg-[#7A2500] text-white shadow-md'
                : 'text-[#7A2500]/80 hover:text-[#7A2500] hover:bg-[#FFF5E4]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Browse All FAQs ({FAQ_ITEMS.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE SCOOP AI AGENT */}
      {activeMode === 'agent' && (
        <div className="space-y-4">
          <FaqAiAgentCard embedded={true} />
          <div className="text-center">
            <button
              type="button"
              onClick={() => setActiveMode('browse')}
              className="text-xs font-semibold text-[#7A2500]/70 hover:text-[#7A2500] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Prefer browsing standard questions directory? Click here to view all ({FAQ_ITEMS.length}) FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: BROWSE ALL FAQS DIRECTORY */}
      {activeMode === 'browse' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Quick CTA to AI Agent */}
          <div className="bg-[#FFF5E4] rounded-2xl p-3.5 border border-[#F8D0C8] max-w-4xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF6F86] shrink-0" />
              <span className="font-semibold text-[#7A2500]">
                Have a unique dietary or flavor question not listed below?
              </span>
            </div>
            <button
              type="button"
              onClick={() => setActiveMode('agent')}
              className="btn-pill-brown text-xs py-1.5 px-3.5 font-bold cursor-pointer shrink-0 flex items-center gap-1"
            >
              <Bot className="w-3.5 h-3.5 text-[#FFD56B]" />
              <span>Ask AI Agent</span>
            </button>
          </div>

          {/* Search & Category Filter Controls */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar & Expand/Collapse All */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#7A2500]/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search allergens (e.g. gluten, nuts, egg, dairy, sugar)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#F8D0C8] text-xs sm:text-sm text-[#7A2500] placeholder:text-[#7A2500]/45 focus:outline-none focus:ring-2 focus:ring-[#FF6F86]/40 shadow-xs transition-shadow"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#7A2500]/60 hover:text-[#7A2500]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  onClick={expandAll}
                  className="text-xs font-bold text-[#7A2500]/70 hover:text-[#7A2500] px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#F8D0C8] transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={collapseAll}
                  className="text-xs font-bold text-[#7A2500]/70 hover:text-[#7A2500] px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-[#F8D0C8] transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#7A2500] text-white shadow-xs'
                        : 'bg-white text-[#7A2500]/80 hover:bg-[#FFF5E4] border border-[#F8D0C8]'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion List Container */}
          <div className="max-w-4xl mx-auto space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 border border-[#F8D0C8] text-center space-y-3">
                <HelpCircle className="w-10 h-10 text-[#FF6F86] mx-auto opacity-70" />
                <p className="text-base font-bold text-[#7A2500]">
                  No questions found matching &quot;{searchQuery}&quot;
                </p>
                <p className="text-xs text-[#7A2500]/70">
                  Try searching for &quot;gluten&quot;, &quot;nuts&quot;, &quot;egg&quot;, or ask our AI Agent directly!
                </p>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('all');
                    }}
                    className="text-xs font-bold text-[#7A2500] bg-white border border-[#F8D0C8] px-4 py-2 rounded-full hover:bg-[#FFF5E4] transition-colors cursor-pointer"
                  >
                    Reset Filters
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode('agent')}
                    className="text-xs font-bold text-white bg-[#7A2500] px-4 py-2 rounded-full hover:bg-[#5d1c00] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Bot className="w-3.5 h-3.5 text-[#FFD56B]" />
                    <span>Ask Scoop AI Agent</span>
                  </button>
                </div>
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = !!openItems[faq.id];

                return (
                  <div
                    key={faq.id}
                    className="bg-white rounded-2xl sm:rounded-3xl border border-[#F8D0C8] shadow-xs overflow-hidden transition-all duration-200 hover:border-[#FF6F86]/50"
                  >
                    {/* Accordion Trigger Button */}
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full text-left p-5 sm:p-6 flex items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#FFFDF9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F86]"
                    >
                      <div className="space-y-1.5 flex-1 pr-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2500]/60">
                            {faq.categoryLabel}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              faq.badgeType === 'warning'
                                ? 'bg-[#FFE9E5] text-[#D9381E] border border-[#FFCDC2]'
                                : faq.badgeType === 'safe'
                                ? 'bg-[#EBF7EE] text-[#1B793A] border border-[#C6EBD0]'
                                : 'bg-[#FFF5E4] text-[#7A2500] border border-[#F8D0C8]'
                            }`}
                          >
                            {faq.badge}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#7A2500] leading-snug">
                          {faq.question}
                        </h3>
                      </div>

                      {/* Animated Chevron Button Indicator */}
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#7A2500] text-white border-[#7A2500] rotate-180 shadow-xs'
                            : 'bg-[#FFF5E4] text-[#7A2500] border-[#F8D0C8]'
                        }`}
                      >
                        <ChevronDown className="w-5 h-5 transition-transform" />
                      </div>
                    </button>

                    {/* Animated Accordion Expansion Body */}
                    <div
                      id={`faq-answer-${faq.id}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 pb-6 pt-1 sm:px-6 border-t border-[#F8D0C8]/60 space-y-4 bg-[#FFFDF9]/60">
                          <p className="text-xs sm:text-sm font-medium text-[#7A2500]/90 leading-relaxed">
                            {faq.answer}
                          </p>

                          {/* Allergen Tag Breakdown */}
                          <div className="flex flex-wrap gap-2 pt-1 border-t border-[#F8D0C8]/40">
                            {faq.allergenSummary.contains && faq.allergenSummary.contains.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[11px] font-bold text-[#D9381E] uppercase tracking-wider flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3" /> Contains:
                                </span>
                                {faq.allergenSummary.contains.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[11px] font-medium bg-[#FFE9E5] text-[#9A220F] px-2.5 py-0.5 rounded-full border border-[#FFCDC2]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}

                            {faq.allergenSummary.freeFrom && faq.allergenSummary.freeFrom.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 ml-0 sm:ml-2">
                                <span className="text-[11px] font-bold text-[#1B793A] uppercase tracking-wider flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Free From:
                                </span>
                                {faq.allergenSummary.freeFrom.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[11px] font-medium bg-[#EBF7EE] text-[#13612C] px-2.5 py-0.5 rounded-full border border-[#C6EBD0]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Parlor Allergen Care Banner */}
      <div className="bg-[#FFF5E4] rounded-3xl p-6 sm:p-8 border-2 border-white shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF6F86] uppercase tracking-wider">
            <Info className="w-4 h-4" />
            <span>Have a Specific Allergen Concern?</span>
          </div>
          <h4 className="text-xl font-bold font-script text-[#7A2500]">
            Speak Directly with Our Parlor Team
          </h4>
          <p className="text-xs sm:text-sm font-medium text-[#7A2500]/80 max-w-lg leading-relaxed">
            Our staff maintains complete ingredient sheets and is trained to use fresh scoops and sanitized bowls for any severe dietary requirement.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/flavors"
            className="text-xs font-bold text-white bg-[#7A2500] hover:bg-[#5d1c00] px-5 py-2.5 rounded-full shadow-xs flex items-center gap-1.5 transition-colors"
          >
            <span>Browse Ingredients</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
