import React from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { FLAVORS } from '../data/flavors';
import { AddToCartButton } from './AddToCartButton';

export const WishlistModal: React.FC = () => {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useCartWishlist();

  if (!isWishlistOpen) return null;

  const wishlistFlavors = FLAVORS.filter((f) => wishlist.includes(f.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-[#FFF5E4] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border-2 border-[#7A2500]">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex items-center justify-between border-b border-[#F8D0C8]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#FF6F86]" fill="#FF6F86" />
            <h2 className="text-xl font-bold font-script text-[#7A2500]">Your Wishlist</h2>
            <span className="text-xs bg-[#F8D0C8] text-[#7A2500] font-bold px-2 py-0.5 rounded-full">
              {wishlistFlavors.length}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            className="p-1 rounded-full text-[#7A2500] hover:bg-[#FFF5E4] cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
          {wishlistFlavors.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-inner">
                <Heart className="w-8 h-8 text-[#FF6F86]" />
              </div>
              <p className="text-base font-semibold text-[#7A2500]">Your wishlist is currently empty!</p>
              <p className="text-xs text-[#7A2500]/70 max-w-xs mx-auto">
                Explore our mouthwatering flavors and tap the heart icon on any flavor to save it here.
              </p>
              <Link
                to="/flavors"
                onClick={() => setIsWishlistOpen(false)}
                className="btn-pill-brown text-xs py-2 px-5 inline-flex items-center gap-2 mt-2"
              >
                <span>Explore Flavors</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlistFlavors.map((flavor) => (
                <div
                  key={flavor.id}
                  className="bg-white rounded-2xl p-3 flex items-center gap-4 shadow-sm border border-[#F8D0C8]"
                >
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border border-[#F8D0C8]"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/flavors/${flavor.id}`}
                      onClick={() => setIsWishlistOpen(false)}
                      className="text-base font-bold text-[#7A2500] hover:underline truncate block"
                    >
                      {flavor.name}
                    </Link>
                    <p className="text-xs text-[#7A2500]/70 truncate">{flavor.tagline}</p>
                    <p className="text-sm font-bold text-[#7A2500] mt-0.5">
                      ₹{flavor.basePrice}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <AddToCartButton
                      onAdd={() => {
                        addToCart(flavor, 'Cone', 1, flavor.basePrice + 30);
                      }}
                      variant="brown"
                      className="text-xs py-1.5 px-3"
                      label="Add"
                    />
                    <button
                      type="button"
                      onClick={() => toggleWishlist(flavor.id)}
                      className="text-[11px] text-[#FF6F86] hover:underline text-center cursor-pointer font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white px-6 py-3 border-t border-[#F8D0C8] flex items-center justify-between">
          <Link
            to="/flavors"
            onClick={() => setIsWishlistOpen(false)}
            className="text-xs font-bold text-[#7A2500] hover:underline"
          >
            Browse all flavors &rarr;
          </Link>
          <button
            type="button"
            onClick={() => setIsWishlistOpen(false)}
            className="px-4 py-1.5 bg-[#FFF5E4] text-[#7A2500] text-xs font-bold rounded-full hover:bg-[#F8D0C8] cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
