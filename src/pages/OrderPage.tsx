import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, CheckCircle2, ShieldCheck, MapPin, Phone, User, Tag, Check, Mail, Database, Cloud } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';
import { CartItem } from '../types';
import { ScoopStampCard } from '../components/ScoopStampCard';
import { saveOrderToSupabase, SupabaseSaveResult, SUPABASE_PROJECT_ID } from '../lib/supabase';

interface PlacedOrderDetails {
  orderNumber: string;
  name: string;
  phone: string;
  email?: string;
  userId?: string;
  address: string;
  paymentMethod: 'UPI' | 'COD';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  discountCode: string | null;
  total: number;
  date: string;
}

export const OrderPage: React.FC = () => {
  const { user } = useAuth();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    discountAmount,
    discountCode,
    applyDiscountCode,
    removeDiscountCode,
    addStamp
  } = useCartWishlist();

  // Promo code input state
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  // Form states with auto-fill from logged-in user
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: '',
    pincode: '',
    paymentMethod: 'UPI' as 'UPI' | 'COD'
  });

  // Auto-fill whenever user logs in or updates profile
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name,
        phone: prev.phone || user.phone,
        email: prev.email || user.email
      }));
    }
  }, [user]);

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [placedOrder, setPlacedOrder] = useState<PlacedOrderDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseResult, setSupabaseResult] = useState<SupabaseSaveResult | null>(null);

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your mobile phone number.';
    } else if (!/^[0-9]{10}$/.test(cleanPhone)) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.address.trim()) {
      errors.address = 'Please provide your full delivery address.';
    } else if (formData.address.trim().length < 8) {
      errors.address = 'Please specify building, street, and apartment number.';
    }

    if (!formData.pincode.trim()) {
      errors.pincode = 'Please enter a 6-digit PIN code.';
    } else if (!/^[0-9]{6}$/.test(formData.pincode.trim())) {
      errors.pincode = 'PIN code must be exactly 6 digits.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0 || isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Generate random order number e.g. #SCP-74921
    const orderNum = `#SCP-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderDate =
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
      ' at ' +
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const confirmedOrder: PlacedOrderDetails = {
      orderNumber: orderNum,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || user?.email || '',
      userId: user?.id || 'guest',
      address: `${formData.address}, PIN: ${formData.pincode}`,
      paymentMethod: formData.paymentMethod,
      items: [...cart],
      subtotal,
      deliveryFee,
      discountAmount,
      discountCode,
      total,
      date: orderDate
    };

    // Save to Supabase backend table
    let sbRes: SupabaseSaveResult;
    try {
      sbRes = await saveOrderToSupabase({
        orderNumber: orderNum,
        name: formData.name,
        phone: formData.phone,
        email: formData.email || user?.email || '',
        userId: user?.id || 'guest',
        address: `${formData.address}, PIN: ${formData.pincode}`,
        pincode: formData.pincode,
        paymentMethod: formData.paymentMethod,
        items: [...cart],
        subtotal,
        deliveryFee,
        discountAmount,
        discountCode,
        total,
        date: orderDate
      });
      setSupabaseResult(sbRes);
    } catch (err: any) {
      console.error('Supabase save error:', err);
      sbRes = {
        success: false,
        orderNumber: orderNum,
        error: err?.message || 'Error connecting to Supabase'
      };
      setSupabaseResult(sbRes);
    }

    // Save to admin orders queue and local storage
    try {
      const existing = localStorage.getItem('scoop_placed_orders');
      const ordersList = existing ? JSON.parse(existing) : [];
      ordersList.unshift({
        ...confirmedOrder,
        status: 'Pending',
        supabaseSynced: sbRes.success
      });
      localStorage.setItem('scoop_placed_orders', JSON.stringify(ordersList));
    } catch {
      // ignore
    }

    setIsSubmitting(false);
    setPlacedOrder(confirmedOrder);
    clearCart();
    addStamp(); // Adds 1 stamp on completed order
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // If order was placed, show confirmation screen
  if (placedOrder) {
    return (
      <div className="w-full py-12 px-4 sm:px-8 max-w-3xl mx-auto space-y-8">
        <div className="bg-[#FFF5E4] rounded-3xl p-8 sm:p-12 border-2 border-white shadow-xl text-center space-y-6">
          
          <div className="w-20 h-20 mx-auto rounded-full bg-[#A8C145] text-white flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7A2500]/70 bg-white px-3.5 py-1 rounded-full border border-[#F8D0C8]">
              Order Confirmed
            </span>
            <h1 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
              Your Order is Placed!
            </h1>
            <p className="text-base font-semibold text-[#7A2500]">
              Order ID: <span className="text-[#FF6F86] font-mono text-lg font-bold">{placedOrder.orderNumber}</span>
            </p>
          </div>

          <p className="text-sm sm:text-base font-medium text-[#7A2500]/85 max-w-md mx-auto">
            Thank you, <span className="font-bold text-[#7A2500]">{placedOrder.name}</span>! Our artisan churners are packing your scoops in insulated dry ice thermal boxes. Estimated arrival: <span className="font-bold text-[#7A2500]">35 &ndash; 45 minutes</span>.
          </p>

          {/* Order Details Receipt Card */}
          <div className="bg-white rounded-2xl p-6 text-left border border-[#F8D0C8] shadow-xs space-y-4 max-w-lg mx-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#7A2500] border-b border-[#F8D0C8] pb-2">
              Receipt Summary
            </h3>

            <div className="space-y-2 text-sm text-[#7A2500]">
              {placedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">{item.quantity}x</span> {item.name}{' '}
                    <span className="text-xs text-[#7A2500]/70">({item.size})</span>
                  </div>
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#F8D0C8] text-sm space-y-1">
              <div className="flex justify-between text-[#7A2500]/80">
                <span>Subtotal:</span>
                <span>₹{placedOrder.subtotal}</span>
              </div>
              {placedOrder.discountAmount > 0 && (
                <div className="flex justify-between text-[#A8C145] font-semibold">
                  <span>Discount ({placedOrder.discountCode}):</span>
                  <span>-₹{placedOrder.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#7A2500]/80">
                <span>Insulated Delivery:</span>
                <span>{placedOrder.deliveryFee === 0 ? 'FREE' : `₹${placedOrder.deliveryFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#7A2500] pt-1 border-t border-dashed border-[#F8D0C8]">
                <span>Total Paid / Due:</span>
                <span>₹{placedOrder.total}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F8D0C8] text-xs text-[#7A2500]/80 space-y-1">
              <p><span className="font-bold">Delivery to:</span> {placedOrder.address}</p>
              <p><span className="font-bold">Phone:</span> {placedOrder.phone}</p>
              <p><span className="font-bold">Payment Method:</span> {placedOrder.paymentMethod === 'UPI' ? 'UPI / Online' : 'Cash on Delivery (COD)'}</p>
            </div>
          </div>

          {/* Supabase Backend Sync Status Card */}
          <div className="bg-white rounded-2xl p-4 text-left border border-[#F8D0C8] shadow-xs max-w-lg mx-auto flex items-start gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              supabaseResult?.success
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#7A2500]">Supabase Backend Sync</span>
                {supabaseResult?.success ? (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    <Check className="w-3 h-3 text-emerald-600" />
                    Saved to Supabase Table
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Project: {SUPABASE_PROJECT_ID}
                  </span>
                )}
              </div>
              <p className="text-[#7A2500]/75 leading-relaxed">
                {supabaseResult?.success
                  ? `Order details have been successfully written to your Supabase project (${SUPABASE_PROJECT_ID}) in the "orders" table.`
                  : `Order saved to store queue and connected to Supabase (${SUPABASE_PROJECT_ID}). ${
                      supabaseResult?.isTableMissing
                        ? 'Tip: Create the "orders" table in your Supabase SQL editor using the provided schema.'
                        : ''
                    }`}
              </p>
            </div>
          </div>

          {/* Loyalty Stamp Reward Progress */}
          <div className="max-w-lg mx-auto text-left">
            <ScoopStampCard showSimulateButton={false} />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/flavors"
              onClick={() => setPlacedOrder(null)}
              className="btn-pill-brown text-sm py-3 px-8 font-bold"
            >
              Order More Scoops
            </Link>
            <Link
              to="/"
              onClick={() => setPlacedOrder(null)}
              className="btn-pill-white text-sm py-3 px-8 font-bold border border-[#7A2500]/20"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="w-full py-12 px-4 sm:px-8 max-w-2xl mx-auto space-y-8">
        <div className="bg-[#FFF5E4] rounded-3xl p-10 sm:p-14 border-2 border-white shadow-md space-y-5 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-white flex items-center justify-center shadow-inner">
            <ShoppingBag className="w-10 h-10 text-[#FF6F86]" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
            Your Cart is Empty
          </h1>
          <p className="text-base font-medium text-[#7A2500]/80 max-w-md mx-auto">
            You don&rsquo;t have any ice cream scoops in your bowl yet! Treat yourself to our signature strawberry, pistachio, or salted caramel creations.
          </p>
          <div className="pt-2">
            <Link
              to="/flavors"
              className="btn-pill-brown text-base py-3.5 px-8 inline-flex items-center gap-2 font-bold shadow-md"
            >
              <span>Browse All Flavors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scoop Stamp Card section */}
        <ScoopStampCard />
      </div>
    );
  }

  return (
    <div className="w-full py-10 px-4 sm:px-8 max-w-6xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#7A2500]/70 bg-white px-3.5 py-1 rounded-full border border-[#F8D0C8]">
          Checkout & Delivery
        </span>
        <h1 className="text-4xl sm:text-5xl font-script text-[#7A2500]">
          Your Ice Cream Cart
        </h1>
        <p className="text-sm sm:text-base font-medium text-[#7A2500]/80">
          Packed fresh in insulated chilled tubs and delivered fast to your door.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F8D0C8] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F8D0C8] pb-3">
              <h2 className="text-lg font-bold font-script text-[#7A2500]">
                Selected Scoops ({cart.length})
              </h2>
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-[#FF6F86] hover:underline cursor-pointer"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#FFF5E4] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#F8D0C8]"
                >
                  {/* Image & details */}
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-xl object-cover border border-[#F8D0C8] shrink-0"
                    />
                    <div>
                      <Link
                        to={`/flavors/${item.flavorId}`}
                        className="text-base font-bold text-[#7A2500] hover:underline block"
                      >
                        {item.name}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs bg-white text-[#7A2500] font-semibold px-2.5 py-0.5 rounded-full border border-[#F8D0C8]">
                          {item.size}
                        </span>
                        <span className="text-xs font-bold text-[#7A2500]/80">
                          ₹{item.price} each
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price & Remove */}
                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F8D0C8]/60">
                    <div className="flex items-center bg-white border border-[#7A2500]/40 rounded-full px-3 py-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-[#7A2500] hover:bg-[#FFF5E4] rounded-full cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="mx-3 text-sm font-bold text-[#7A2500]">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-[#7A2500] hover:bg-[#FFF5E4] rounded-full cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <span className="text-base font-extrabold text-[#7A2500]">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#FF6F86] hover:bg-white rounded-full cursor-pointer"
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <Link
                to="/flavors"
                className="text-xs font-bold text-[#7A2500] hover:underline"
              >
                + Add more flavors from our menu
              </Link>
            </div>
          </div>

          {/* Delivery Promise Card */}
          <div className="bg-[#FFF5E4] rounded-2xl p-4 border border-white flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#A8C145] shrink-0" />
            <p className="text-xs font-semibold text-[#7A2500]/80">
              <span className="font-bold text-[#7A2500]">Thermal Pack Guarantee:</span> Delivered with dry ice in food-grade insulated cases to stay perfectly solid for up to 3 hours.
            </p>
          </div>

          {/* Feature 2: Scoop Stamp Card Section */}
          <ScoopStampCard />
        </div>

        {/* Right Column: Checkout Form & Totals */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#F8D0C8] space-y-6">
            
            <h2 className="text-xl font-bold font-script text-[#7A2500] border-b border-[#F8D0C8] pb-3">
              Delivery Details
            </h2>

            <form onSubmit={handleSubmitOrder} className="space-y-4" noValidate>
              
              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                  <input
                    type="text"
                    placeholder="e.g. Meera Kapoor"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (formErrors.name) setFormErrors({ ...formErrors, name: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 bg-[#FFF5E4] rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border ${
                      formErrors.name ? 'border-[#FF6F86] focus:ring-[#FF6F86]' : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                    }`}
                  />
                </div>
                {formErrors.name && (
                  <p className="text-xs text-[#FF6F86] mt-1 font-semibold">{formErrors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                  Mobile Number (10 digits) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                  <input
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 bg-[#FFF5E4] rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border ${
                      formErrors.phone ? 'border-[#FF6F86] focus:ring-[#FF6F86]' : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                    }`}
                  />
                </div>
                {formErrors.phone && (
                  <p className="text-xs text-[#FF6F86] mt-1 font-semibold">{formErrors.phone}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                  Delivery Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#7A2500]/50" />
                  <textarea
                    rows={2}
                    placeholder="Flat / House No., Building Name, Street"
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({ ...formData, address: e.target.value });
                      if (formErrors.address) setFormErrors({ ...formErrors, address: '' });
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 bg-[#FFF5E4] rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border ${
                      formErrors.address ? 'border-[#FF6F86] focus:ring-[#FF6F86]' : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                    }`}
                  />
                </div>
                {formErrors.address && (
                  <p className="text-xs text-[#FF6F86] mt-1 font-semibold">{formErrors.address}</p>
                )}
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                  PIN Code (6 digits) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 400050"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={(e) => {
                    setFormData({ ...formData, pincode: e.target.value });
                    if (formErrors.pincode) setFormErrors({ ...formErrors, pincode: '' });
                  }}
                  className={`w-full px-4 py-2 bg-[#FFF5E4] rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border ${
                    formErrors.pincode ? 'border-[#FF6F86] focus:ring-[#FF6F86]' : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                  }`}
                />
                {formErrors.pincode && (
                  <p className="text-xs text-[#FF6F86] mt-1 font-semibold">{formErrors.pincode}</p>
                )}
              </div>

              {/* Payment Option */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold uppercase text-[#7A2500]">
                  Payment Method *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`p-3 rounded-2xl border-2 flex items-center gap-2 cursor-pointer ${
                      formData.paymentMethod === 'UPI'
                        ? 'border-[#7A2500] bg-[#FFF5E4] font-bold text-[#7A2500]'
                        : 'border-[#F8D0C8] bg-white font-medium text-[#7A2500]/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={formData.paymentMethod === 'UPI'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'UPI' })}
                      className="accent-[#7A2500]"
                    />
                    <span className="text-xs">UPI / GPay / PhonePe</span>
                  </label>

                  <label
                    className={`p-3 rounded-2xl border-2 flex items-center gap-2 cursor-pointer ${
                      formData.paymentMethod === 'COD'
                        ? 'border-[#7A2500] bg-[#FFF5E4] font-bold text-[#7A2500]'
                        : 'border-[#F8D0C8] bg-white font-medium text-[#7A2500]/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={formData.paymentMethod === 'COD'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
                      className="accent-[#7A2500]"
                    />
                    <span className="text-xs">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Promo / Discount Code Input Section */}
              <div className="pt-3 border-t border-[#F8D0C8]">
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#FF6F86]" />
                  <span>Promo / Discount Code</span>
                </label>
                {discountCode ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#FFF5E4] rounded-xl border border-[#A8C145]">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[#7A2500] bg-white px-2 py-0.5 rounded-md border border-[#F8D0C8]">
                        {discountCode}
                      </span>
                      <span className="text-xs text-[#A8C145] font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        <span>Applied &bull; -₹{discountAmount}</span>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={removeDiscountCode}
                      className="text-xs text-[#FF6F86] hover:underline font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. SCOOP10 / SCOOP5 / FREETOP"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value.toUpperCase());
                        if (promoError) setPromoError(null);
                      }}
                      className="flex-1 px-3 py-2 bg-[#FFF5E4] rounded-xl text-xs font-mono font-bold text-[#7A2500] uppercase placeholder:font-sans placeholder:normal-case placeholder:text-[#7A2500]/50 border border-[#F8D0C8] focus:outline-none focus:ring-2 focus:ring-[#7A2500]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!promoInput.trim()) return;
                        const res = applyDiscountCode(promoInput);
                        if (!res.success) {
                          setPromoError(res.message);
                        } else {
                          setPromoInput('');
                          setPromoError(null);
                        }
                      }}
                      className="btn-pill-brown text-xs py-2 px-4 font-bold shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="text-xs text-[#FF6F86] mt-1 font-semibold">{promoError}</p>
                )}
              </div>

              {/* Price Calculation breakdown */}
              <div className="pt-3 border-t border-[#F8D0C8] space-y-2 text-sm text-[#7A2500]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#A8C145] font-semibold">
                    <span>Discount ({discountCode})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span>Insulated Delivery</span>
                  <span className="font-semibold">
                    {deliveryFee === 0 ? (
                      <span className="text-[#A8C145] font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {subtotal < 499 && (
                  <p className="text-[11px] text-[#7A2500]/70">
                    Add ₹{499 - subtotal} more for FREE shipping!
                  </p>
                )}
                <div className="flex justify-between text-lg font-extrabold text-[#7A2500] pt-2 border-t border-[#F8D0C8]">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-pill-brown text-base py-3.5 px-6 w-full flex items-center justify-center gap-2 font-bold shadow-md cursor-pointer mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving to Supabase & Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order &bull; ₹{total}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
};
