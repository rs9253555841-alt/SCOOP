import React from 'react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { Sparkles, Check, Heart, ShoppingBag, AlertCircle, X } from 'lucide-react';
import { ToastItem } from '../types';

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useCartWishlist();

  if (!toasts || toasts.length === 0) return null;

  const renderIcon = (toast: ToastItem) => {
    const msg = toast.message.toLowerCase();
    if (toast.type === 'error' || msg.includes('invalid')) {
      return <AlertCircle className="w-3.5 h-3.5 text-[#FF6F86]" />;
    }
    if (msg.includes('wishlist')) {
      return <Heart className="w-3.5 h-3.5 text-[#FF6F86]" fill={msg.includes('added') ? '#FF6F86' : 'none'} />;
    }
    if (msg.includes('cart') || msg.includes('order')) {
      return <ShoppingBag className="w-3.5 h-3.5 text-[#FF6F86]" />;
    }
    if (msg.includes('applied') || msg.includes('success')) {
      return <Check className="w-3.5 h-3.5 text-[#FF6F86]" strokeWidth={2.5} />;
    }
    return <Sparkles className="w-3.5 h-3.5 text-[#FF6F86]" />;
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed z-50 pointer-events-none transition-all duration-300
                 bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-auto max-w-[92vw]
                 sm:bottom-auto sm:top-6 sm:right-6 sm:left-auto sm:translate-x-0 sm:items-end"
    >
      {toasts.map((toast) => {
        const isExiting = !!toast.exiting;

        return (
          <div
            key={toast.id}
            onClick={() => removeToast(toast.id)}
            className={`pointer-events-auto flex items-center gap-2.5 bg-[#FFF5E4] text-[#7A2500] 
                        border border-[#F8D0C8] px-4 py-2.5 rounded-full shadow-lg cursor-pointer 
                        select-none transition-all duration-300 hover:border-[#FF6F86]
                        ${
                          isExiting
                            ? 'opacity-0 scale-95 translate-y-2 sm:translate-x-3 pointer-events-none'
                            : 'animate-toast-mobile sm:animate-toast-desktop opacity-100 scale-100'
                        }`}
            role="status"
          >
            {/* Pink Accent Icon in circular soft container */}
            <span className="w-5 h-5 rounded-full bg-[#FFE9E5] flex items-center justify-center shrink-0 border border-[#FFCDC2]">
              {renderIcon(toast)}
            </span>

            {/* Brown Text Message */}
            <span className="text-xs sm:text-sm font-semibold text-[#7A2500] whitespace-nowrap max-w-[260px] sm:max-w-[340px] truncate">
              {toast.message}
            </span>

            {/* Quick close hint */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
              className="text-[#7A2500]/40 hover:text-[#7A2500] ml-1 p-0.5 rounded-full"
              aria-label="Dismiss notification"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
