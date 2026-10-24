export type FlavorCategory = 'All' | 'Fruity' | 'Nutty' | 'Creamy';

export type IceCreamSize = 'Cup' | 'Cone' | 'Tub';

export interface NutritionalInfo {
  servingSize: string;
  calories: string;
  fat: string;
  saturatedFat: string;
  sugar: string;
  carbs: string;
  protein: string;
  sodium: string;
}

export type ServingType = 'cup' | 'cone' | 'tub';

export interface FlavorImages {
  cup: string;
  cone: string;
  tub: string;
}

export interface Flavor {
  id: string;
  name: string;
  tagline: string;
  category: 'Fruity' | 'Nutty' | 'Creamy';
  color: string;
  waveColor: string;
  textColor: string;
  signature: boolean;
  image: string;
  images?: FlavorImages;
  description: string;
  fullDescription: string;
  ingredients: string[];
  ingredientsText?: string;
  containsText?: string;
  basePrice: number;
  nutrition: NutritionalInfo;
}

export interface CartItem {
  id: string;
  flavorId: string;
  name: string;
  size: IceCreamSize;
  price: number;
  quantity: number;
  image: string;
  color: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  flavor: string;
  rating: number;
  comment: string;
  avatarText: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  phone: string;
  featured: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  exiting?: boolean;
}

export interface PlacedOrderDetails {
  orderNumber: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  pincode: string;
  paymentMethod: 'COD' | 'UPI' | 'Card';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  discountCode: string | null;
  total: number;
  date: string;
  estimatedDeliveryTime: string;
}
