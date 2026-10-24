import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

interface WishlistHeartButtonProps {
  flavorId: string;
  className?: string;
  size?: number;
}

/**
 * WishlistHeartButton
 * Implements requirement: Quick pop (scale 1 -> 1.3 -> 1, 0.3s) and fills with color on click.
 */
export const WishlistHeartButton: React.FC<WishlistHeartButtonProps> = ({
  flavorId,
  className = '',
  size = 20
}) => {
  const { isInWishlist, toggleWishlist } = useCartWishlist();
  const [isPopping, setIsPopping] = useState(false);
  const active = isInWishlist(flavorId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleWishlist(flavorId);
    
    // Trigger quick pop animation for 0.3s
    setIsPopping(true);
    setTimeout(() => {
      setIsPopping(false);
    }, 300);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`relative rounded-full flex items-center justify-center cursor-pointer pill-interactive ${
        isPopping ? 'animate-heart-pop' : ''
      } ${className}`}
      aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
      title={active ? 'Saved to Wishlist' : 'Save to Wishlist'}
    >
      <Heart
        style={{ width: `${size}px`, height: `${size}px` }}
        fill={active ? '#FF6F86' : 'none'}
        color={active ? '#FF6F86' : '#7A2500'}
        className="transition-colors duration-200"
      />
    </button>
  );
};
