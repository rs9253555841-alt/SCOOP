import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Clock, Award } from 'lucide-react';
import {
  HERO_CONE_PNG,
  HERO_TOPPING_1_PNG,
  HERO_TOPPING_2_PNG,
  HERO_TOPPING_3_PNG,
  HERO_TOPPING_4_PNG,
  FLAVORS,
  REVIEWS
} from '../data/flavors';
import { HeroDripDivider } from '../components/HeroDripDivider';
import { WavyDivider } from '../components/WavyDivider';

export const HomePage: React.FC = () => {
  const signatureFlavors = FLAVORS.filter((f) => f.signature);

  return (
    <div className="w-full">
      {/* =========================================================================
          HERO SECTION (Matching reference image composition with Scoop branding)
          ========================================================================= */}
      <section
        className="relative w-full overflow-hidden text-white -mt-20 pt-24 min-h-[680px] lg:min-h-screen flex flex-col justify-between"
        style={{
          background: 'radial-gradient(circle at 50% 45%, #921736 0%, #6E0E25 50%, #460616 100%)'
        }}
      >
        {/* Subtle vertical architectural panel guides from reference */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '160px 100%'
          }}
          aria-hidden="true"
        />

        {/* -------------------------------------------------------------------------
            FLOATING RASPBERRIES (Edge-cropped with optical depth of field blur)
            ------------------------------------------------------------------------- */}
        {/* Raspberry 1: Top-Left (Large, blurred 3px for depth, edge cropped) */}
        <div
          className="absolute -top-6 -left-12 sm:-left-14 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none z-10 topping-float-1"
          style={{ filter: 'blur(3.5px)' }}
          aria-hidden="true"
        >
          <img
            src={HERO_TOPPING_1_PNG}
            alt="Floating fresh raspberry (top left)"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Raspberry 2: Mid-Left (Sharp, placed near left border) */}
        <div
          className="absolute top-[48%] -left-6 sm:-left-8 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none z-10 topping-float-2 hidden md:block"
          aria-hidden="true"
        >
          <img
            src={HERO_TOPPING_2_PNG}
            alt="Floating fresh raspberry (mid left)"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Raspberry 3: Bottom-Left (Soft blur near drips) */}
        <div
          className="absolute bottom-28 -left-8 w-24 h-24 sm:w-32 sm:h-32 pointer-events-none z-10 topping-float-3"
          style={{ filter: 'blur(2px)' }}
          aria-hidden="true"
        >
          <img
            src={HERO_TOPPING_1_PNG}
            alt="Floating fresh raspberry (bottom left)"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Raspberry 4: Top-Right (Sharp, edge cropped) */}
        <div
          className="absolute -top-6 -right-10 sm:-right-12 w-28 h-28 sm:w-36 sm:h-36 pointer-events-none z-10 topping-float-4"
          aria-hidden="true"
        >
          <img
            src={HERO_TOPPING_3_PNG}
            alt="Floating fresh raspberry (top right)"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Raspberry 5: Bottom-Right (Large, blurred 3.5px for depth) */}
        <div
          className="absolute top-[55%] -right-12 sm:-right-16 w-36 h-36 sm:w-52 sm:h-52 pointer-events-none z-10 topping-float-1 hidden md:block"
          style={{ filter: 'blur(3.5px)' }}
          aria-hidden="true"
        >
          <img
            src={HERO_TOPPING_4_PNG}
            alt="Floating fresh raspberry (bottom right)"
            className="w-full h-full object-contain"
          />
        </div>

        {/* -------------------------------------------------------------------------
            MAIN HERO COMPOSITION
            ------------------------------------------------------------------------- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-0 flex-1 flex flex-col items-center justify-center">
          
          {/* HEADING (Behind the Cone) */}
          <div className="w-full text-center select-none relative z-10 hero-fade-up">
            {/* Script kicker: "Welcome to Scoop" */}
            <p className="font-script text-2xl sm:text-4xl text-[#FFF5E4] tracking-wide mb-0 sm:mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              Welcome to Scoop
            </p>

            {/* Giant Brush Title: "SCOOP" */}
            <h1
              className="font-marker uppercase text-white tracking-tight leading-[0.85] m-0 drop-shadow-[0_12px_32px_rgba(0,0,0,0.55)]"
              style={{ fontSize: 'clamp(110px, 20vw, 270px)' }}
            >
              SCOOP
            </h1>
          </div>

          {/* -------------------------------------------------------------------------
              FIVE COLORFUL ICE CREAM CONES BOUQUET (Centered, In Front)
              ------------------------------------------------------------------------- */}
          <div className="relative z-20 w-full flex justify-center -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40 pointer-events-auto">
            <div className="relative w-[290px] sm:w-[380px] md:w-[460px] lg:w-[520px] max-w-[88vw]">
              <img
                src={HERO_CONE_PNG}
                alt="Five Colorful Artisanal Scoop Ice Cream Cones"
                className="w-full h-auto object-contain select-none"
                style={{
                  filter: 'drop-shadow(0 25px 35px rgba(25, 5, 0, 0.75))',
                  maxHeight: 'min(68vh, 620px)'
                }}
              />
            </div>
          </div>

          {/* -------------------------------------------------------------------------
              HERO ACTION BUTTONS (Centered below cone for both desktop and mobile)
              ------------------------------------------------------------------------- */}
          <div className="text-center mt-3 sm:mt-5 pb-6 z-20">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/flavors"
                className="bg-[#FFD56B] text-[#5E0E20] font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-2.5 sm:py-3 rounded-full shadow-lg hover:bg-white transition-colors"
              >
                <span>Explore Menu</span>
              </Link>
              <Link
                to="/order"
                className="bg-[#00D2B4] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-2.5 sm:py-3 rounded-full shadow-lg hover:bg-[#00baa0] transition-colors"
              >
                <span>Order Now</span>
              </Link>
            </div>
          </div>

        </div>

        {/* -------------------------------------------------------------------------
            DRIP DIVIDER (Bottom edge in #6E0E25 melting down into the next section)
            ------------------------------------------------------------------------- */}
        <div className="w-full relative z-30">
          <HeroDripDivider color="#6E0E25" />
        </div>
      </section>

      {/* 3 SIGNATURE FLAVOR SECTIONS (Alternating image left/right/left) */}
      <section className="w-full">
        {signatureFlavors.map((flavor, index) => {
          const isImageLeft = index % 2 === 0; // index 0 (Strawberry): Left, index 1 (Pistachio): Right, index 2 (Caramel): Left

          return (
            <div key={flavor.id} className="w-full">
              {/* Full-width flavor-coded color block */}
              <div
                className="py-16 sm:py-20 px-6 sm:px-12 w-full text-white"
                style={{ backgroundColor: flavor.color }}
              >
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                  
                  {/* Image Column */}
                  <div
                    className={`md:col-span-5 flex justify-center ${
                      isImageLeft ? 'md:order-1' : 'md:order-2'
                    }`}
                  >
                    <div className="relative group max-w-sm w-full">
                      <div className="bg-white/20 p-2 rounded-3xl backdrop-blur-xs">
                        <img
                          src={flavor.image}
                          alt={flavor.name}
                          referrerPolicy="no-referrer"
                          className="w-full aspect-[4/3] object-cover rounded-2xl shadow-xl border-2 border-white/50"
                        />
                      </div>
                      <div className="absolute top-4 right-4 bg-white text-[#7A2500] text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                        ₹{flavor.basePrice}
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={`md:col-span-7 space-y-5 text-center md:text-left ${
                      isImageLeft ? 'md:order-2' : 'md:order-1'
                    }`}
                  >
                    <span className="inline-block bg-white/25 text-white text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                      Signature Flavor #{index + 1}
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-script text-white text-shadow-contrast leading-tight">
                      {flavor.name}
                    </h2>

                    <p className="text-base sm:text-lg font-medium text-white/95 text-shadow-subtle max-w-xl leading-relaxed">
                      {flavor.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4">
                      {/* Button is white pill with bold brown text */}
                      <Link
                        to={`/flavors/${flavor.id}`}
                        className="btn-pill-white text-base py-3 px-7 font-bold shadow-md inline-flex items-center gap-2"
                      >
                        <span>Taste It</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

              {/* Ending with a static SVG wavy divider in the darker shade */}
              <WavyDivider fillColor={flavor.waveColor} height={46} />
            </div>
          );
        })}
      </section>

      {/* "WHY SCOOP?" SECTION */}
      <section className="py-20 px-6 sm:px-10 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7A2500]/70">
            Our Standard of Quality
          </span>
          <h2 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
            Why Scoop?
          </h2>
          <p className="text-base font-medium text-[#7A2500]/80 max-w-xl mx-auto">
            We believe true delight comes from real craftsmanship, wholesome simplicity, and zero compromises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Fresh ingredients */}
          <div className="bg-[#FFF5E4] rounded-3xl p-8 border-2 border-white shadow-md text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF6F86] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-script text-[#7A2500]">
              Fresh Ingredients
            </h3>
            <p className="text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              We partner directly with regional dairy pastures and organic fruit orchards. 100% grass-fed double cream, real Madagascar vanilla beans, and sun-ripened berries.
            </p>
          </div>

          {/* Card 2: Made in small batches */}
          <div className="bg-[#FFF5E4] rounded-3xl p-8 border-2 border-white shadow-md text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#A8C145] text-white flex items-center justify-center shadow-md">
              <Clock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-script text-[#7A2500]">
              Made in Small Batches
            </h3>
            <p className="text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              Slow-churned daily in 15-gallon micro-batches. Low overrun means less air and maximum velvety richness that melts luxuriously on your tongue.
            </p>
          </div>

          {/* Card 3: Loved by everyone */}
          <div className="bg-[#FFF5E4] rounded-3xl p-8 border-2 border-white shadow-md text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#FF9F24] text-white flex items-center justify-center shadow-md">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold font-script text-[#7A2500]">
              Loved by Everyone
            </h3>
            <p className="text-sm font-medium text-[#7A2500]/80 leading-relaxed">
              From toddlers tasting their first cone to dessert aficionados craving roasted pistachio notes, our scoops create timeless memories with every spoonful.
            </p>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS SECTION */}
      <section className="py-16 px-6 sm:px-10 bg-[#FFF5E4] border-y-2 border-white">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1 text-[#FF9F24]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FF9F24]" />
              ))}
            </div>
            <h2 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
              Sweet Words from Scoop Lovers
            </h2>
            <p className="text-base font-medium text-[#7A2500]/80 max-w-lg mx-auto">
              Real stories from our parlor regulars and weekend home-delivery fans.
            </p>
          </div>

          {/* 3 Static Review Cards with star ratings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#F8D0C8] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FF9F24] text-[#FF9F24]" />
                      ))}
                    </div>
                    <span className="text-xs bg-[#FFF5E4] text-[#7A2500] font-bold px-2.5 py-0.5 rounded-full">
                      {rev.flavor}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#7A2500]/90 leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-[#F8D0C8]">
                  <div className="w-9 h-9 rounded-full bg-[#7A2500] text-white flex items-center justify-center font-bold text-xs">
                    {rev.avatarText}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#7A2500]">{rev.name}</h4>
                    <p className="text-xs text-[#7A2500]/70">{rev.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHORT QUOTE SECTION & ORDER NOW CTA */}
      <section className="py-20 px-6 sm:px-10 max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <span className="text-4xl">🍦</span>
          <blockquote className="text-3xl sm:text-4xl md:text-5xl font-script text-[#7A2500] leading-tight">
            &ldquo;From creamy scoops to crunchy swirls, every bite of Scoop is crafted to turn simple moments into sweet memories &ndash; taste the joy, share the love.&rdquo;
          </blockquote>
          <p className="text-base sm:text-lg font-medium text-[#7A2500]/80 max-w-lg mx-auto">
            Delivering artisanal chilled tubs and fresh waffle packs straight to your doorstep in 45 minutes or less.
          </p>
        </div>

        <div>
          <Link
            to="/order"
            className="btn-pill-brown text-lg py-4 px-10 font-bold inline-flex items-center gap-3 shadow-lg"
          >
            <span>Order Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
