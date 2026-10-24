import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, IceCreamSize, Flavor, ToastItem, PlacedOrderDetails } from '../types';
import { FLAVORS } from '../data/flavors';

interface CartWishlistContextType {
  cart: CartItem[];
  wishlist: string[]; // flavor IDs
  addToCart: (flavor: Flavor, size: IceCreamSize, quantity: number, pricePerUnit: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  toggleWishlist: (flavorId: string) => void;
  isInWishlist: (flavorId: string) => boolean;
  cartCount: number;
  wishlistCount: number;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  discountCode: string | null;
  applyDiscountCode: (code: string) => { success: boolean; message: string };
  removeDiscountCode: () => void;
  stamps: number;
  addStamp: () => void;
  redeemStamps: () => void;
  total: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toasts: ToastItem[];
  toastMessage: string | null;
  showToast: (msg: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  lastOrder: PlacedOrderDetails | null;
  setLastOrder: (order: PlacedOrderDetails | null) => void;
}

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'scoop_cart_items_v2';
const WISHLIST_STORAGE_KEY = 'scoop_wishlist_items_v2';
const STAMPS_STORAGE_KEY = 'scoop_stamp_card_count_v1';
const DISCOUNT_STORAGE_KEY = 'scoop_discount_code_v1';

export const CartWishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback if localStorage is unavailable
    }
    // Default initial sample item in INR
    return [
      {
        id: 'strawberry-bliss-Cone',
        flavorId: 'strawberry-bliss',
        name: 'Strawberry Bliss',
        size: 'Cone',
        price: 179,
        quantity: 1,
        image: '/src/assets/images/strawberry_bliss_cone_1792213349235.jpg',
        color: '#FF6F86'
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    return ['pistachio-delight', 'caramel-indulgence'];
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const LAST_ORDER_KEY = 'scoop_last_placed_order_v1';

  const [lastOrder, setLastOrderState] = useState<PlacedOrderDetails | null>(() => {
    try {
      const stored = sessionStorage.getItem(LAST_ORDER_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const setLastOrder = (order: PlacedOrderDetails | null) => {
    setLastOrderState(order);
    try {
      if (order) {
        sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      } else {
        sessionStorage.removeItem(LAST_ORDER_KEY);
      }
    } catch {
      // ignore
    }
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  // Reusable showToast function: slides in, stays ~2.5s, then fades out, max 3 visible at once
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => {
      const next = [...prev, { id, message, type }];
      return next.slice(-3); // Keep maximum 3 visible at once
    });

    // Stay ~2.5s, then begin fade out
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
      );
      // Remove completely from DOM after fade out transition (300ms)
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 300);
    }, 2500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (flavor: Flavor, size: IceCreamSize, quantity: number, pricePerUnit: number) => {
    const itemKey = `${flavor.id}-${size}`;
    const servingKey = size.toLowerCase() as 'cup' | 'cone' | 'tub';
    const itemImage = flavor.images?.[servingKey] || flavor.images?.cone || flavor.image;
    const servingDisplay = size === 'Cone' ? 'Waffle Cone' : size === 'Cup' ? 'Paper Cup' : 'Family Tub';

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            flavorId: flavor.id,
            name: flavor.name,
            size,
            price: pricePerUnit,
            quantity,
            image: itemImage,
            color: flavor.color
          }
        ];
      }
    });

    // Exact requested format: "Strawberry Bliss (Waffle Cone) added to cart"
    showToast(`${flavor.name} (${servingDisplay}) added to cart`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    const item = cart.find((i) => i.id === cartItemId);
    const itemName = item ? item.name : 'Item';
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    showToast(`${itemName} removed from cart`, 'info');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    const item = cart.find((i) => i.id === cartItemId);
    const itemName = item ? item.name : 'Item';
    setCart((prev) =>
      prev
        .map((i) => {
          if (i.id === cartItemId) {
            const newQty = i.quantity + delta;
            if (newQty > 0) {
              showToast(`${itemName} quantity updated (${newQty})`, 'info');
              return { ...i, quantity: newQty };
            } else {
              showToast(`${itemName} removed from cart`, 'info');
              return null;
            }
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (flavorId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(flavorId);
      const flavorObj = FLAVORS.find((f) => f.id === flavorId);
      const name = flavorObj ? flavorObj.name : 'Flavor';
      if (exists) {
        showToast(`${name} removed from wishlist`, 'info');
        return prev.filter((id) => id !== flavorId);
      } else {
        showToast(`${name} added to wishlist`, 'success');
        return [...prev, flavorId];
      }
    });
  };

  // Stamp card state (0 to 5), defaults to 2 as per example
  const [stamps, setStamps] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(STAMPS_STORAGE_KEY);
      if (stored !== null) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val >= 0 && val <= 5) return val;
      }
    } catch {
      // ignore
    }
    return 2; // Default starting count to demonstrate "2/5 stamps, 3 more for a free scoop!"
  });

  // Discount code state
  const [discountCode, setDiscountCode] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(DISCOUNT_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  // Sync stamps to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STAMPS_STORAGE_KEY, stamps.toString());
    } catch {
      // ignore
    }
  }, [stamps]);

  // Sync discount to sessionStorage
  useEffect(() => {
    try {
      if (discountCode) {
        sessionStorage.setItem(DISCOUNT_STORAGE_KEY, discountCode);
      } else {
        sessionStorage.removeItem(DISCOUNT_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [discountCode]);

  const addStamp = () => {
    setStamps((prev) => {
      const next = Math.min(5, prev + 1);
      if (next === 5) {
        showToast('🎉 Sweet celebration! You earned your 5th stamp and unlocked a FREE Scoop!');
      } else {
        showToast(`🍦 Stamp added! (${next}/5 stamps collected)`);
      }
      return next;
    });
  };

  const redeemStamps = () => {
    setStamps(0);
    showToast('🎉 Free Scoop reward redeemed! Card reset for your next rewards.');
  };

  const applyDiscountCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'SCOOP10') {
      setDiscountCode('SCOOP10');
      showToast('Discount code SCOOP10 applied! (10% OFF)', 'success');
      return { success: true, message: '10% discount applied!' };
    } else if (clean === 'SCOOP5') {
      setDiscountCode('SCOOP5');
      showToast('Discount code SCOOP5 applied! (5% OFF)', 'success');
      return { success: true, message: '5% discount applied!' };
    } else if (clean === 'FREETOP') {
      setDiscountCode('FREETOP');
      showToast('Discount code FREETOP applied! (₹49 OFF)', 'success');
      return { success: true, message: '₹49 discount applied!' };
    } else {
      showToast('Invalid discount code. Try SCOOP10, SCOOP5, or FREETOP', 'error');
      return { success: false, message: 'Invalid code. Try SCOOP10, SCOOP5, or FREETOP.' };
    }
  };

  const removeDiscountCode = () => {
    setDiscountCode(null);
    showToast('Discount code removed', 'info');
  };

  const isInWishlist = (flavorId: string) => wishlist.includes(flavorId);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Calculate discount amount based on code
  let discountAmount = 0;
  if (discountCode === 'SCOOP10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (discountCode === 'SCOOP5') {
    discountAmount = Math.round(subtotal * 0.05);
  } else if (discountCode === 'FREETOP') {
    discountAmount = Math.min(subtotal, 49);
  }

  // Free delivery over ₹499, otherwise ₹49
  const deliveryFee = cart.length === 0 ? 0 : subtotal >= 499 ? 0 : 49;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  const toastMessage = toasts[toasts.length - 1]?.message || null;

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        wishlistCount,
        subtotal,
        deliveryFee,
        discountAmount,
        discountCode,
        applyDiscountCode,
        removeDiscountCode,
        stamps,
        addStamp,
        redeemStamps,
        total,
        isWishlistOpen,
        setIsWishlistOpen,
        toasts,
        toastMessage,
        showToast,
        removeToast,
        lastOrder,
        setLastOrder
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
