import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import { FlavorCategory } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { AddToCartButton } from '../components/AddToCartButton';
import { WishlistHeartButton } from '../components/WishlistHeartButton';
import { SpinWheelModal } from '../components/SpinWheelModal';

export const FlavorsPage: React.FC = () => {
  const { addToCart } = useCartWishlist();
  const [selectedCategory, setSelectedCategory] = useState<FlavorCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);

  // Animation 2: Scroll reveal observer for flavor cards
  useScrollReveal();

  const categories: FlavorCategory[] = ['All', 'Fruity', 'Nutty', 'Creamy'];

  // Instant filtering with no animation delay
  const filteredFlavors = useMemo(() => {
    return FLAVORS.filter((flavor) => {
      const matchesCategory =
        selectedCategory === 'All' || flavor.category === selectedCategory;
      const matchesQuery =
        flavor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flavor.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flavor.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="w-full py-10 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Header Banner */}
      <div className="text-center space-y-4 mb-10 reveal-init delay-0">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7A2500]/70 bg-white px-3.5 py-1 rounded-full border border-[#F8D0C8]">
          Artisanal Menu
        </span>
        <h1 className="text-5xl sm:text-6xl font-script text-[#7A2500]">
          Our Handcrafted Flavors
        </h1>
        <p className="text-base sm:text-lg font-medium text-[#7A2500]/80 max-w-xl mx-auto">
          Six signature recipes churned slowly with fresh dairy cream, genuine whole fruits, and roasted nuts.
        </p>

        {/* Feature 1: "Can't decide? Spin the Wheel" Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={() => setIsSpinModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FFF5E4] hover:bg-white text-[#7A2500] border-2 border-[#7A2500] px-5 py-2.5 rounded-full text-sm font-bold shadow-xs cursor-pointer pill-interactive transition-all"
            aria-label="Open Spin the Wheel Modal"
          >
            <span className="text-base">🎡</span>
            <span>Can&rsquo;t decide? Spin the Wheel</span>
            <Sparkles className="w-4 h-4 text-[#FF6F86]" />
          </button>
        </div>
      </div>

      {/* Filter Bar & Search Box */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#F8D0C8] mb-12 flex flex-col md:flex-row items-center justify-between gap-4 reveal-init delay-100">
        
        {/* Category Filter Pills (Animation 3c: Lift 3px on hover, active scale 0.97) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`pill-interactive px-5 py-2 rounded-full text-sm font-bold cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#7A2500] text-white shadow-sm'
                  : 'bg-[#FFF5E4] text-[#7A2500] hover:bg-[#F8D0C8]'
              }`}
            >
              {cat === 'All' ? 'All Flavors' : cat}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/60" />
          <input
            type="text"
            placeholder="Search vanilla, mango, nut..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FFF5E4] border border-[#F8D0C8] rounded-full text-sm font-medium text-[#7A2500] placeholder-[#7A2500]/50 focus:outline-none focus:ring-2 focus:ring-[#7A2500]"
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
      </div>

      {/* Grid of all 6 Flavors */}
      {filteredFlavors.length === 0 ? (
        <div className="bg-[#FFF5E4] rounded-3xl p-12 text-center border-2 border-white max-w-lg mx-auto space-y-4">
          <span className="text-4xl">🍨</span>
          <h3 className="text-2xl font-bold font-script text-[#7A2500]">
            No flavors matched your search
          </h3>
          <p className="text-sm font-medium text-[#7A2500]/80">
            Try a different search term or select &ldquo;All Flavors&rdquo; to browse our full collection.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn-pill-brown text-sm py-2 px-6 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFlavors.map((flavor, index) => {
            const isVanilla = flavor.id === 'vanilla-dream';
            const staggerDelay = (index % 3) * 100;

            return (
              <div
                key={flavor.id}
                className={`rounded-3xl p-6 shadow-md border-2 border-white flex flex-col justify-between card-hover-lift reveal-init delay-${staggerDelay}`}
                style={{ backgroundColor: flavor.color }}
              >
                {/* Top card info */}
                <div>
                  {/* Image container & Wishlist heart button */}
                  <div className="relative rounded-2xl overflow-hidden bg-white/20 p-2 mb-5">
                    <Link to={`/flavors/${flavor.id}`} className="block">
                      <img
                        src={flavor.image}
                        alt={flavor.name}
                        referrerPolicy="no-referrer"
                        className="w-full aspect-[4/3] object-cover rounded-xl img-hover-lift"
                      />
                    </Link>

                    {/* Animation 4a: Wishlist Heart Pop (scale 1 -> 1.3 -> 1, 0.3s) */}
                    <WishlistHeartButton
                      flavorId={flavor.id}
                      className="absolute top-4 right-4 w-10 h-10 bg-white shadow-md hover:bg-[#FFF5E4]"
                      size={20}
                    />

                    {/* Category pill */}
                    <div className="absolute bottom-4 left-4 bg-white/90 text-[#7A2500] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {flavor.category}
                    </div>
                  </div>

                  {/* Flavor Name & Tagline */}
                  <div className="space-y-2 mb-4">
                    <Link
                      to={`/flavors/${flavor.id}`}
                      className={`text-2xl sm:text-3xl font-script block hover:underline leading-snug ${
                        isVanilla ? 'text-[#7A2500]' : 'text-white text-shadow-contrast'
                      }`}
                    >
                      {flavor.name}
                    </Link>
                    <p
                      className={`text-sm font-medium leading-relaxed ${
                        isVanilla ? 'text-[#7A2500]/80' : 'text-white/90 text-shadow-subtle'
                      }`}
                    >
                      {flavor.description}
                    </p>
                  </div>
                </div>

                {/* Bottom price and actions */}
                <div className="pt-4 border-t border-white/30 flex items-center justify-between gap-3">
                  <div>
                    <span
                      className={`text-xs block font-semibold ${
                        isVanilla ? 'text-[#7A2500]/70' : 'text-white/80'
                      }`}
                    >
                      Single Scoop
                    </span>
                    <span
                      className={`text-2xl font-extrabold ${
                        isVanilla ? 'text-[#7A2500]' : 'text-white text-shadow-subtle'
                      }`}
                    >
                      ₹{flavor.basePrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/flavors/${flavor.id}`}
                      className={`pill-interactive text-xs font-bold px-3 py-2 rounded-full border cursor-pointer ${
                        isVanilla
                          ? 'border-[#7A2500] text-[#7A2500] hover:bg-[#7A2500] hover:text-white'
                          : 'border-white text-white hover:bg-white hover:text-[#7A2500]'
                      }`}
                    >
                      Details
                    </Link>

                    {/* Animation 4b: Add to Cart button with 1.2s "Added ✓" feedback */}
                    <AddToCartButton
                      onAdd={() => addToCart(flavor, 'Cone', 1, flavor.basePrice + 30)}
                      variant={isVanilla ? 'brown' : 'white'}
                      className="text-xs font-bold py-2 px-4 shadow-sm"
                      label="Add to Cart"
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Info Strip */}
      <div className="mt-16 bg-[#FFF5E4] rounded-3xl p-6 sm:p-8 border-2 border-white flex flex-col sm:flex-row items-center justify-between gap-6 reveal-init delay-100 card-hover-lift">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-xl font-bold font-script text-[#7A2500]">
            Can&rsquo;t pick just one?
          </h4>
          <p className="text-sm font-medium text-[#7A2500]/80">
            Build a custom sampler tub or multi-cone party box delivered fresh with dry ice packs.
          </p>
        </div>
        <Link
          to="/order"
          className="btn-pill-brown text-sm py-3 px-6 flex items-center gap-2 shrink-0 font-bold"
        >
          <span>Order Party Box</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Feature 1 Modal */}
      <SpinWheelModal
        isOpen={isSpinModalOpen}
        onClose={() => setIsSpinModalOpen(false)}
      />
    </div>
  );
};
