import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';

interface AddToCartButtonProps {
  onAdd: () => void;
  className?: string;
  variant?: 'white' | 'brown';
  label?: string;
  priceLabel?: string;
}

/**
 * AddToCartButton
 * Handles the required interactive feedback:
 * Changes label to "Added ✓" for 1.2 seconds upon click, then reverts back.
 */
export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  onAdd,
  className = '',
  variant = 'white',
  label = 'Add to Cart',
  priceLabel
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAdd();
    setIsAdded(true);

    // Revert back after exactly 1.2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  };

  const baseStyle =
    variant === 'brown'
      ? 'btn-pill-brown'
      : 'btn-pill-white';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${baseStyle} ${className}`}
      disabled={isAdded}
      aria-live="polite"
    >
      {isAdded ? (
        <span className="flex items-center gap-1.5 text-[#A8C145] font-extrabold">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>Added ✓</span>
        </span>
      ) : (
        <span className="flex items-center gap-1.5">
          <ShoppingBag className="w-4 h-4" />
          <span>{label}</span>
          {priceLabel && <span>&bull; {priceLabel}</span>}
        </span>
      )}
    </button>
  );
};
