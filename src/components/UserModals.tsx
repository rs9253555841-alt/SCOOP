import React, { useState } from 'react';
import { X, User as UserIcon, Phone, Mail, ShoppingBag, Calendar, CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const UserModals: React.FC = () => {
  const {
    user,
    isProfileModalOpen,
    setIsProfileModalOpen,
    isOrdersModalOpen,
    setIsOrdersModalOpen,
    updateProfile,
    getUserOrders
  } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const orders = getUserOrders();

  // Keep form updated when user changes
  React.useEffect(() => {
    if (user) {
      setName(user.name);
      setPhone(user.phone);
    }
  }, [user]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    updateProfile({ name, phone });
    setIsProfileModalOpen(false);
  };

  return (
    <>
      {/* =========================================================================
          MY PROFILE MODAL
          ========================================================================= */}
      {isProfileModalOpen && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFF5E4] rounded-3xl border-2 border-white shadow-2xl max-w-md w-full p-6 sm:p-8 space-y-6 relative">
            <button
              type="button"
              onClick={() => setIsProfileModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#7A2500] hover:bg-[#FFE9E5] transition-colors cursor-pointer"
              aria-label="Close Profile Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-[#F8D0C8] pb-4">
              <div className="w-14 h-14 rounded-full bg-[#FF6F86] text-white text-2xl font-bold flex items-center justify-center shadow-md">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-xl font-bold font-script text-[#7A2500]">
                  My Profile
                </h3>
                <p className="text-xs text-[#7A2500]/70 font-semibold">
                  Member since {user.createdAt}
                </p>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] border border-[#F8D0C8] focus:outline-none focus:ring-2 focus:ring-[#7A2500]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                  Email Address (Login ID)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 bg-white/60 rounded-xl text-sm font-medium text-[#7A2500]/60 border border-[#F8D0C8] cursor-not-allowed"
                  />
                </div>
                <p className="text-[10px] text-[#7A2500]/60 mt-0.5">
                  Email cannot be edited in demo mode.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                  Mobile Phone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                  <input
                    type="tel"
                    value={phone}
                    maxLength={10}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] border border-[#F8D0C8] focus:outline-none focus:ring-2 focus:ring-[#7A2500]"
                    required
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-[#7A2500] text-[#7A2500] font-bold text-xs hover:bg-[#FFFDF9] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 btn-pill-brown py-2.5 font-bold text-xs shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MY ORDERS MODAL
          ========================================================================= */}
      {isOrdersModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-[#FFF5E4] rounded-3xl border-2 border-white shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative max-h-[88vh] flex flex-col">
            <button
              type="button"
              onClick={() => setIsOrdersModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white text-[#7A2500] hover:bg-[#FFE9E5] transition-colors cursor-pointer"
              aria-label="Close Orders Modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#F8D0C8] pb-4 shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#FF6F86] text-white flex items-center justify-center shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-script text-[#7A2500]">
                  My Orders
                </h3>
                <p className="text-xs text-[#7A2500]/70 font-semibold">
                  {user ? `Orders for ${user.name}` : 'Your recent Scoop orders'}
                </p>
              </div>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1 flex-1">
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border border-[#F8D0C8] space-y-3">
                  <Package className="w-10 h-10 text-[#FF6F86] mx-auto opacity-70" />
                  <h4 className="text-lg font-bold font-script text-[#7A2500]">
                    No Orders Yet
                  </h4>
                  <p className="text-xs text-[#7A2500]/70 max-w-xs mx-auto">
                    You haven&rsquo;t placed any ice cream orders yet. Treat yourself to our freshly churned scoops!
                  </p>
                  <Link
                    to="/flavors"
                    onClick={() => setIsOrdersModalOpen(false)}
                    className="inline-flex items-center gap-1.5 btn-pill-brown text-xs py-2 px-5 font-bold shadow-xs mt-2"
                  >
                    <span>Browse Flavors</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                orders.map((ord) => (
                  <div
                    key={ord.orderNumber}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F8D0C8] shadow-xs space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F8D0C8]/60 pb-2.5">
                      <div>
                        <span className="font-mono font-bold text-sm text-[#FF6F86]">
                          {ord.orderNumber}
                        </span>
                        <div className="text-[11px] text-[#7A2500]/60 flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3 h-3" />
                          <span>{ord.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#7A2500]">
                          ₹{ord.total}
                        </span>
                        <div className="text-[10px] font-bold text-[#1B793A] bg-[#EBF7EE] px-2 py-0.5 rounded-full border border-[#C6EBD0] mt-0.5">
                          {ord.status || 'Confirmed'}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#7A2500]">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <span>
                            <span className="font-bold">{item.quantity}x</span> {item.name}{' '}
                            <span className="text-[11px] text-[#7A2500]/70">({item.size})</span>
                          </span>
                          <span className="font-semibold">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#F8D0C8]/50 text-[11px] text-[#7A2500]/80">
                      <span className="font-bold">Delivery to:</span> {ord.address}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
