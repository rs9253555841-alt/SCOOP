import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Leaf, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { AboutFaqSection } from '../components/AboutFaqSection';

export const AboutPage: React.FC = () => {
  // Animation 2: Scroll reveal observer for about cards
  useScrollReveal();

  return (
    <div className="w-full py-10 px-4 sm:px-8 max-w-6xl mx-auto space-y-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto reveal-init delay-0">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7A2500]/70 bg-white px-3.5 py-1 rounded-full border border-[#F8D0C8]">
          The Scoop Story
        </span>
        <h1 className="text-5xl sm:text-6xl font-script text-[#7A2500] leading-tight">
          Every Scoop, a Little Joy
        </h1>
        <p className="text-base sm:text-lg font-medium text-[#7A2500]/80 leading-relaxed">
          We started Scoop with a simple conviction: ice cream should taste like pure, honest happiness &ndash; churned with fresh double cream, real ripe fruit, and slow-roasted nuts.
        </p>
      </div>

      {/* Brand Story Section */}
      <div className="bg-[#FFF5E4] rounded-3xl p-8 sm:p-12 border-2 border-white shadow-md reveal-init delay-100">
        
        {/* Story Text */}
        <div className="max-w-4xl mx-auto space-y-5 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6F86]">
            Our Humble Beginnings
          </span>
          <h2 className="text-3xl sm:text-4xl font-script text-[#7A2500]">
            From a Backyard Churn to Your Neighborhood Parlor
          </h2>
          <p className="text-sm sm:text-base font-medium text-[#7A2500]/90 leading-relaxed">
            In 2021, our founders grew tired of industrial pints pumped full of 50% whipped air, artificial vanillin, and chemical gums. We bought an antique counter-top batch freezer, partnered with a generational dairy farm just thirty miles outside town, and began churning real ice cream for friends and neighbors.
          </p>
          <p className="text-sm sm:text-base font-medium text-[#7A2500]/90 leading-relaxed">
            The secret was remarkably simple: don&rsquo;t take shortcuts. We let our vanilla beans steep for 24 hours. We crack fresh Bronte pistachios by hand. We cook our butter caramel in copper kettles until it turns deep mahogany gold.
          </p>
          <div className="pt-2">
            <div className="inline-block bg-white text-[#7A2500] text-xs font-bold px-4 py-2 rounded-full border border-[#F8D0C8] shadow-xs">
              🥛 100% Grass-Fed Dairy &bull; No Synthetic Preservatives &bull; Low Overrun
            </div>
          </div>
        </div>

      </div>

      {/* 3 Values Cards (Animation 2 & 3b: Staggered scroll reveals + card hover lift) */}
      <section className="space-y-8">
        <div className="text-center space-y-2 reveal-init delay-0">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A2500]/70">
            What We Stand For
          </span>
          <h2 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Pure Ingredients */}
          <div className="bg-white rounded-3xl p-8 border border-[#F8D0C8] shadow-sm text-center space-y-4 card-hover-lift reveal-init delay-100">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF6F86] text-white flex items-center justify-center shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-script text-[#7A2500]">
              Pure Ingredients
            </h3>
            <p className="text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              We never use artificial food dyes, high fructose syrups, or emulsifier powders. Every berry, cocoa bean, and nut is sourced from growers who take pride in their soil.
            </p>
          </div>

          {/* Card 2: Small Batch Love */}
          <div className="bg-white rounded-3xl p-8 border border-[#F8D0C8] shadow-sm text-center space-y-4 card-hover-lift reveal-init delay-200">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#A8C145] text-white flex items-center justify-center shadow-md">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-script text-[#7A2500]">
              Small Batch Love
            </h3>
            <p className="text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              We churn in modest 15-gallon drums. This guarantees uniform texture, rich density, and the unmistakable melt-in-mouth silkiness that mass machinery cannot replicate.
            </p>
          </div>

          {/* Card 3: Sustainable Joy */}
          <div className="bg-white rounded-3xl p-8 border border-[#F8D0C8] shadow-sm text-center space-y-4 card-hover-lift reveal-init delay-300">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF9F24] text-white flex items-center justify-center shadow-md">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-script text-[#7A2500]">
              Sustainable Joy
            </h3>
            <p className="text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              Our tubs, cups, and delivery cartons are 100% compostable and plastic-free. We donate our nutrient-rich whey to local botanical compost programs to close the cycle.
            </p>
          </div>

        </div>
      </section>

      {/* "HOW WE MAKE IT" 3-STEP SECTION (Staggered scroll reveal + card hover lift) */}
      <section className="bg-[#FFF5E4] rounded-3xl p-8 sm:p-12 border-2 border-white shadow-md space-y-10 reveal-init delay-100">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7A2500]/70 bg-white px-3.5 py-1 rounded-full border border-[#F8D0C8]">
            Craftsmanship
          </span>
          <h2 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
            How We Make It
          </h2>
          <p className="text-sm sm:text-base font-medium text-[#7A2500]/80 max-w-xl mx-auto">
            Three disciplined steps behind every unforgettable scoop.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-[#F8D0C8] shadow-xs space-y-3 card-hover-lift reveal-init delay-100">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-[#7A2500] text-white flex items-center justify-center text-sm font-bold">
                1
              </span>
              <span className="text-xs font-bold text-[#FF6F86] uppercase">Sourcing</span>
            </div>
            <h3 className="text-xl font-bold font-script text-[#7A2500]">
              1. Farm Milk & Real Fruits
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              We gather morning fresh milk from local dairy pastures, scrape whole Bourbon vanilla pods, crush roasted Bronte pistachios, and mash seasonal sun-ripened berries.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-[#F8D0C8] shadow-xs space-y-3 card-hover-lift reveal-init delay-200">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-[#7A2500] text-white flex items-center justify-center text-sm font-bold">
                2
              </span>
              <span className="text-xs font-bold text-[#A8C145] uppercase">Slow Churn</span>
            </div>
            <h3 className="text-xl font-bold font-script text-[#7A2500]">
              2. Micro-Batch Churning
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              Our cream bases age for 18 hours before entering the slow churn. Churning with low air overrun creates dense, rich velvet texture that never tastes icy or watery.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-[#F8D0C8] shadow-xs space-y-3 card-hover-lift reveal-init delay-300">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-full bg-[#7A2500] text-white flex items-center justify-center text-sm font-bold">
                3
              </span>
              <span className="text-xs font-bold text-[#FF9F24] uppercase">Fresh Pack</span>
            </div>
            <h3 className="text-xl font-bold font-script text-[#7A2500]">
              3. Hand Pack & Flash Freeze
            </h3>
            <p className="text-xs sm:text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              Every cone, cup, and pint tub is hand-packed by our team and flash-frozen at -28°C to lock in microscopic ice crystal perfection and deliver straight to you.
            </p>
          </div>

        </div>
      </section>

      {/* NEW FREQUENTLY ASKED QUESTIONS (Ingredients & Allergens Accordion) */}
      <AboutFaqSection />

      {/* Call to Action */}
      <div className="text-center space-y-4 pt-4 reveal-init delay-100">
        <h3 className="text-3xl font-script text-[#7A2500]">
          Ready to Taste the Difference?
        </h3>
        <p className="text-sm font-medium text-[#7A2500]/80 max-w-md mx-auto">
          Explore our signature menu or order a family sampler box for your next gathering.
        </p>
        <div className="pt-2">
          <Link
            to="/flavors"
            className="btn-pill-brown text-base py-3.5 px-8 inline-flex items-center gap-2 font-bold shadow-md"
          >
            <span>Explore Our Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
