import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Plus, Minus, ArrowLeft, Sparkles, Share2 } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import { IceCreamSize } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { AddToCartButton } from '../components/AddToCartButton';
import { WishlistHeartButton } from '../components/WishlistHeartButton';
import { ShareScoopModal } from '../components/ShareScoopModal';

export const FlavorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCartWishlist();

  // Animation 2: Scroll reveal observer
  useScrollReveal();

  const flavor = FLAVORS.find((f) => f.id === id);

  type Serving = 'cup' | 'cone' | 'tub';
  const [serving, setServing] = useState<Serving>('cone');
  const [selectedSize, setSelectedSize] = useState<IceCreamSize>('Cone');
  const [quantity, setQuantity] = useState<number>(1);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  if (!flavor) {
    return <Navigate to="/flavors" replace />;
  }

  // Active serving image with fallback to cone image if missing
  const currentImage = flavor.images?.[serving] || flavor.images?.cone || flavor.image;

  // Price calculations based on size in INR
  const getUnitPrice = (size: IceCreamSize): number => {
    switch (size) {
      case 'Cup':
        return flavor.basePrice;
      case 'Cone':
        return flavor.basePrice + 30;
      case 'Tub':
        return flavor.basePrice * 2 + 50;
    }
  };

  const currentUnitPrice = getUnitPrice(selectedSize);
  const totalPrice = currentUnitPrice * quantity;
  const isVanilla = flavor.id === 'vanilla-dream';

  // "You may also like" flavors
  const otherFlavors = FLAVORS.filter((f) => f.id !== flavor.id).slice(0, 3);

  const sizes: { size: IceCreamSize; label: string; desc: string; price: number }[] = [
    { size: 'Cup', label: 'Paper Cup', desc: '2 generous scoops', price: getUnitPrice('Cup') },
    { size: 'Cone', label: 'Waffle Cone', desc: 'Freshly rolled cone', price: getUnitPrice('Cone') },
    { size: 'Tub', label: 'Family Tub', desc: 'Pint / 4 scoops', price: getUnitPrice('Tub') },
  ];

  const handleAddToCart = () => {
    addToCart(flavor, selectedSize, quantity, currentUnitPrice);
  };

  return (
    <div className="w-full py-8 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
      {/* Back button */}
      <div>
        <Link
          to="/flavors"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#7A2500] hover:underline bg-white px-4 py-2 rounded-full border border-[#F8D0C8] shadow-xs pill-interactive"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Flavors</span>
        </Link>
      </div>

      {/* Main PDP Grid */}
      <div className="bg-[#FFF5E4] rounded-3xl p-6 sm:p-10 border-2 border-white shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Big Product Image with Serving Crossfade & Fallback */}
        <div className="lg:col-span-6 space-y-4">
          <div
            className="rounded-3xl p-4 sm:p-6 shadow-inner relative overflow-hidden"
            style={{ backgroundColor: flavor.color }}
          >
            <div className="bg-white/20 p-2 rounded-2xl overflow-hidden">
              <img
                key={serving}
                src={currentImage}
                alt={`${flavor.name} (${serving})`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback: if an image is missing or fails to load, show the cone image
                  const fallbackCone = flavor.images?.cone || flavor.image;
                  if (e.currentTarget.src !== fallbackCone) {
                    e.currentTarget.src = fallbackCone;
                  }
                }}
                className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg border-2 border-white/60 img-hover-lift animate-crossfade"
              />
            </div>

            {/* Animation 4a: Wishlist Heart Pop (scale 1 -> 1.3 -> 1, 0.3s) */}
            <WishlistHeartButton
              flavorId={flavor.id}
              className="absolute top-8 right-8 w-12 h-12 bg-white shadow-lg hover:bg-[#FFF5E4]"
              size={24}
            />

            {/* Signature badge if applicable */}
            {flavor.signature && (
              <div className="absolute bottom-8 left-8 bg-white text-[#7A2500] text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF9F24]" />
                <span>Signature Recipe</span>
              </div>
            )}
          </div>

          {/* Quick Dietary / Nutrition strip */}
          <div className="bg-white rounded-2xl p-4 border border-[#F8D0C8] shadow-xs">
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#F8D0C8]/60">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A2500]">
                Nutrition Highlights
              </span>
              <span className="text-[11px] font-semibold text-[#7A2500]/70">
                Per {flavor.nutrition.servingSize}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[11px] text-[#7A2500]/70 font-semibold block uppercase">Calories</span>
                <span className="text-base font-extrabold text-[#7A2500]">{flavor.nutrition.calories}</span>
              </div>
              <div className="border-x border-[#F8D0C8]">
                <span className="text-[11px] text-[#7A2500]/70 font-semibold block uppercase">Total Fat</span>
                <span className="text-base font-extrabold text-[#7A2500]">{flavor.nutrition.fat}</span>
              </div>
              <div>
                <span className="text-[11px] text-[#7A2500]/70 font-semibold block uppercase">Sugar</span>
                <span className="text-base font-extrabold text-[#7A2500]">{flavor.nutrition.sugar}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Flavor Info, Size selector, Quantity, Buy Module */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-white text-[#7A2500] px-3 py-1 rounded-full border border-[#F8D0C8]">
                {flavor.category}
              </span>
              <span className="text-xs font-bold text-[#7A2500]/70">
                Freshly Hand-Churned
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-script text-[#7A2500] leading-tight">
              {flavor.name}
            </h1>
            <p className="text-base font-semibold text-[#7A2500]/80">
              {flavor.tagline}
            </p>
          </div>

          <p className="text-sm sm:text-base font-medium text-[#7A2500]/90 leading-relaxed bg-white/60 p-4 rounded-2xl border border-[#F8D0C8]">
            {flavor.fullDescription}
          </p>

          {/* Size Selector (Animation 3c: Lift 3px on hover, active scale 0.97) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#7A2500]">
                Choose Your Serving:
              </label>
              <span className="text-xs font-semibold text-[#7A2500]/70">
                Selected: {selectedSize}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {sizes.map((item) => {
                const isSelected = selectedSize === item.size;
                return (
                  <button
                    key={item.size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(item.size);
                      setServing(item.size.toLowerCase() as Serving);
                    }}
                    className={`pill-interactive p-3 rounded-2xl border-2 text-left cursor-pointer ${
                      isSelected
                        ? 'bg-[#7A2500] text-white border-[#7A2500] shadow-sm'
                        : 'bg-white text-[#7A2500] border-[#F8D0C8] hover:bg-[#FFF5E4]'
                    }`}
                  >
                    <div className="text-sm font-bold">{item.label}</div>
                    <div className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : 'text-[#7A2500]/70'}`}>
                      {item.desc}
                    </div>
                    <div className={`text-sm font-extrabold mt-2 ${isSelected ? 'text-[#FFC93C]' : 'text-[#7A2500]'}`}>
                      ₹{item.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity & Add to Cart Controls */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* Stepper with pill-interactive */}
              <div className="flex items-center justify-between bg-white border-2 border-[#7A2500] rounded-full px-4 py-2 w-full sm:w-36 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-1 text-[#7A2500] hover:bg-[#FFF5E4] rounded-full cursor-pointer disabled:opacity-40 pill-interactive"
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-bold text-base text-[#7A2500]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-1 text-[#7A2500] hover:bg-[#FFF5E4] rounded-full cursor-pointer pill-interactive"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Animation 4b: Add to Cart button with 1.2s "Added ✓" feedback */}
              <AddToCartButton
                onAdd={handleAddToCart}
                variant="brown"
                className="text-base py-3.5 px-6 flex-1 shadow-md"
                label="Add to Cart"
                priceLabel={`₹${totalPrice}`}
              />

              {/* Feature 3: Share My Scoop button next to Add to Cart */}
              <button
                type="button"
                onClick={() => setIsShareModalOpen(true)}
                className="bg-white text-[#7A2500] hover:bg-[#FFF5E4] border-2 border-[#7A2500] text-sm font-bold py-3.5 px-5 rounded-full shadow-xs cursor-pointer pill-interactive flex items-center justify-center gap-2 shrink-0 transition-colors"
                title="Create 9:16 Instagram Story Card"
                aria-label="Share My Scoop Card"
              >
                <Share2 className="w-4 h-4 text-[#FF6F86]" />
                <span className="whitespace-nowrap">Share My Scoop</span>
              </button>
            </div>
          </div>

          {/* Ingredients */}
          <div className="pt-4 border-t border-[#F8D0C8] space-y-2">
            <h3 className="text-base font-bold text-[#7A2500]">
              Ingredients
            </h3>
            <p className="text-sm font-normal text-[#7A2500]/90 leading-relaxed">
              {flavor.ingredientsText}
            </p>
            <p className="text-sm font-bold text-[#7A2500]">
              {flavor.containsText}
            </p>
          </div>

        </div>

      </div>

      {/* DEDICATED NUTRITIONAL INFORMATION SECTION (Scroll Reveal + Card Hover Lift) */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-[#F8D0C8] shadow-sm space-y-8 reveal-init delay-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F8D0C8] pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF6F86] bg-[#FFF5E4] px-3 py-1 rounded-full border border-[#F8D0C8]">
              Transparency in Every Scoop
            </span>
            <h2 className="text-3xl sm:text-4xl font-script text-[#7A2500]">
              Nutritional Information
            </h2>
            <p className="text-sm font-medium text-[#7A2500]/80">
              Handcrafted with grass-fed dairy cream, pure organic cane sugar, and real natural fruits.
            </p>
          </div>

          <div className="bg-[#FFF5E4] px-4 py-2.5 rounded-2xl border border-[#F8D0C8] text-right shrink-0">
            <span className="text-xs font-bold text-[#7A2500]/70 block uppercase">Serving Size</span>
            <span className="text-sm font-extrabold text-[#7A2500]">{flavor.nutrition.servingSize}</span>
          </div>
        </div>

        {/* 3 Primary Required Cards: Calories, Fat, Sugar + Secondary macros */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          
          {/* 1. Calories */}
          <div className="bg-[#FFF5E4] rounded-2xl p-4 text-center border-2 border-[#7A2500] shadow-xs space-y-1 card-hover-lift">
            <span className="text-xs font-bold uppercase text-[#7A2500]/80 tracking-wider block">
              Calories
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#7A2500] block font-mono">
              {flavor.nutrition.calories.replace(' kcal', '')}
            </span>
            <span className="text-[11px] font-semibold text-[#7A2500]/70 block">
              kcal / serving
            </span>
          </div>

          {/* 2. Total Fat */}
          <div className="bg-[#FFF5E4] rounded-2xl p-4 text-center border-2 border-[#FF9F24] shadow-xs space-y-1 card-hover-lift">
            <span className="text-xs font-bold uppercase text-[#7A2500]/80 tracking-wider block">
              Total Fat
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#FF9F24] block font-mono">
              {flavor.nutrition.fat}
            </span>
            <span className="text-[11px] font-semibold text-[#7A2500]/70 block">
              Sat Fat: {flavor.nutrition.saturatedFat}
            </span>
          </div>

          {/* 3. Sugar Content */}
          <div className="bg-[#FFF5E4] rounded-2xl p-4 text-center border-2 border-[#FF6F86] shadow-xs space-y-1 card-hover-lift">
            <span className="text-xs font-bold uppercase text-[#7A2500]/80 tracking-wider block">
              Total Sugar
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#FF6F86] block font-mono">
              {flavor.nutrition.sugar}
            </span>
            <span className="text-[11px] font-semibold text-[#7A2500]/70 block">
              Pure cane sugar
            </span>
          </div>

          {/* 4. Total Carbs */}
          <div className="bg-[#FFF5E4] rounded-2xl p-4 text-center border border-[#F8D0C8] shadow-xs space-y-1 card-hover-lift">
            <span className="text-xs font-bold uppercase text-[#7A2500]/80 tracking-wider block">
              Total Carbs
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#7A2500] block font-mono">
              {flavor.nutrition.carbs}
            </span>
            <span className="text-[11px] font-semibold text-[#7A2500]/70 block">
              Dietary energy
            </span>
          </div>

          {/* 5. Protein */}
          <div className="bg-[#FFF5E4] rounded-2xl p-4 text-center border border-[#F8D0C8] shadow-xs space-y-1 card-hover-lift">
            <span className="text-xs font-bold uppercase text-[#7A2500]/80 tracking-wider block">
              Protein
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#A8C145] block font-mono">
              {flavor.nutrition.protein}
            </span>
            <span className="text-[11px] font-semibold text-[#7A2500]/70 block">
              Fresh dairy milk
            </span>
          </div>

          {/* 6. Sodium */}
          <div className="bg-[#FFF5E4] rounded-2xl p-4 text-center border border-[#F8D0C8] shadow-xs space-y-1 card-hover-lift">
            <span className="text-xs font-bold uppercase text-[#7A2500]/80 tracking-wider block">
              Sodium
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#7A2500] block font-mono">
              {flavor.nutrition.sodium}
            </span>
            <span className="text-[11px] font-semibold text-[#7A2500]/70 block">
              Sea salt crystals
            </span>
          </div>

        </div>

        {/* Nutritional Quality & Integrity Callout */}
        <div className="bg-[#FFF5E4] rounded-2xl p-5 border border-[#F8D0C8] flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-[#7A2500]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A8C145]"></span>
            <span>0g Artificial Trans Fats</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6F86]"></span>
            <span>Zero High Fructose Corn Syrup</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF9F24]"></span>
            <span>Unbleached Cane Sugar &amp; Real Fruit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7A2500]"></span>
            <span>100% rBST-Free Grass-Fed Dairy</span>
          </div>
        </div>
      </section>

      {/* "YOU MAY ALSO LIKE" SECTION (Staggered scroll reveal + Card hover lift) */}
      <section className="space-y-6 pt-6">
        <div className="text-center space-y-2 reveal-init delay-0">
          <h2 className="text-3xl sm:text-4xl font-script text-[#7A2500]">
            You May Also Like
          </h2>
          <p className="text-sm font-medium text-[#7A2500]/80">
            Pair your scoop with another handcrafted favorite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {otherFlavors.map((item, idx) => {
            const isVanillaItem = item.id === 'vanilla-dream';

            return (
              <div
                key={item.id}
                className={`rounded-3xl p-5 shadow-sm border-2 border-white flex flex-col justify-between card-hover-lift reveal-init delay-${(idx + 1) * 100}`}
                style={{ backgroundColor: item.color }}
              >
                <div>
                  <Link to={`/flavors/${item.id}`} className="block">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-[4/3] object-cover rounded-2xl mb-4 border border-white/40 shadow-xs img-hover-lift"
                    />
                  </Link>
                  <h4
                    className={`text-xl font-script block ${
                      isVanillaItem ? 'text-[#7A2500]' : 'text-white text-shadow-contrast'
                    }`}
                  >
                    {item.name}
                  </h4>
                  <p
                    className={`text-xs mt-1 line-clamp-2 ${
                      isVanillaItem ? 'text-[#7A2500]/80' : 'text-white/90 text-shadow-subtle'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-white/30 flex items-center justify-between">
                  <span
                    className={`text-sm font-bold ${
                      isVanillaItem ? 'text-[#7A2500]' : 'text-white text-shadow-subtle'
                    }`}
                  >
                    ₹{item.basePrice}
                  </span>
                  <Link
                    to={`/flavors/${item.id}`}
                    className={`pill-interactive text-xs font-bold px-3 py-1.5 rounded-full ${
                      isVanillaItem
                        ? 'bg-[#7A2500] text-white hover:bg-[#5d1c00]'
                        : 'bg-white text-[#7A2500] hover:bg-[#FFF5E4]'
                    }`}
                  >
                    Taste it &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature 3: Share My Scoop Modal */}
      <ShareScoopModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        flavor={flavor}
        serving={serving}
        price={currentUnitPrice}
        imageUrl={currentImage}
      />
    </div>
  );
};
