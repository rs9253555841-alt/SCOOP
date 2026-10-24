import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Menu, X, User as UserIcon, LogOut } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cartCount, wishlistCount, setIsWishlistOpen, stamps } = useCartWishlist();
  const { user, isLoggedIn, logout, setIsProfileModalOpen, setIsOrdersModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [cartPopping, setCartPopping] = useState(false);
  const [wishlistPopping, setWishlistPopping] = useState(false);

  // Animation 4: Trigger quick pop on cart badge when count changes
  useEffect(() => {
    if (cartCount > 0) {
      setCartPopping(true);
      const timer = setTimeout(() => setCartPopping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  // Trigger pop on wishlist badge when count changes
  useEffect(() => {
    if (wishlistCount > 0) {
      setWishlistPopping(true);
      const timer = setTimeout(() => setWishlistPopping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [wishlistCount]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/flavors', label: 'Flavors' },
    { to: '/order', label: 'Order' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 max-w-6xl mx-auto w-full">
      {/* Floating White Pill Navbar */}
      <div className="bg-white rounded-full shadow-[0_4px_20px_rgba(122,37,0,0.12)] border border-[#FFF5E4] px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-2xl sm:text-3xl font-script text-[#7A2500] select-none hover:opacity-90 pill-interactive"
        >
          <span>Scoop</span>
          <span className="w-2 h-2 rounded-full bg-[#FF6F86] inline-block mb-1"></span>
        </Link>

        {/* Center Desktop Navigation Pill Links: lift 3px on hover, scale 0.97 on press */}
        <nav className="hidden md:flex items-center gap-1 bg-[#FFF5E4] p-1 rounded-full border border-[#F8D0C8]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `pill-interactive px-4 py-1.5 rounded-full text-sm font-semibold inline-block ${
                  isActive
                    ? 'bg-[#7A2500] text-white shadow-sm'
                    : 'text-[#7A2500] hover:bg-white hover:text-[#7A2500]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions: Stamp Card, Wishlist Heart & Cart */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Feature 2: Small stamp icon in navbar showing count */}
          <Link
            to="/order#stamp-card"
            className="relative p-2 rounded-full text-[#7A2500] hover:bg-[#FFF5E4] flex items-center justify-center cursor-pointer pill-interactive"
            aria-label="View Scoop Stamp Card"
            title={`Scoop Stamp Card: ${stamps}/5 stamps collected`}
          >
            <span className="text-base select-none leading-none">🍦</span>
            <span
              className="absolute -top-1 -right-1 bg-[#FF6F86] text-white text-[9px] font-bold px-1 min-w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs"
            >
              {stamps}
            </span>
          </Link>

          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2 rounded-full text-[#7A2500] hover:bg-[#FFF5E4] cursor-pointer pill-interactive"
            aria-label="View Wishlist"
            title="Your Wishlist"
          >
            <Heart
              className={`w-5 h-5 text-[#7A2500] ${wishlistPopping ? 'animate-heart-pop' : ''}`}
              fill={wishlistCount > 0 ? '#FF6F86' : 'none'}
              color={wishlistCount > 0 ? '#FF6F86' : '#7A2500'}
            />
            {wishlistCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 bg-[#FF6F86] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
                  wishlistPopping ? 'animate-badge-pop' : ''
                }`}
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Bag with badge pop animation */}
          <Link
            to="/order"
            className="relative p-2 rounded-full text-[#7A2500] hover:bg-[#FFF5E4] flex items-center justify-center cursor-pointer pill-interactive"
            aria-label="View Order Cart"
            title="Cart"
          >
            <ShoppingBag className="w-5 h-5 text-[#7A2500]" />
            {cartCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 bg-[#7A2500] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${
                  cartPopping ? 'animate-badge-pop' : ''
                }`}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Auth Item */}
          {isLoggedIn && user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="w-8 h-8 rounded-full bg-[#FF6F86] text-white text-xs font-bold flex items-center justify-center border-2 border-white shadow-xs cursor-pointer hover:opacity-90 pill-interactive"
                aria-label="User account menu"
                title={`Account: ${user.name}`}
              >
                {user.name.charAt(0).toUpperCase()}
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#FFF5E4] rounded-2xl border-2 border-white shadow-xl py-2 z-50 text-[#7A2500]">
                  <div className="px-3.5 py-2 border-b border-[#F8D0C8]">
                    <p className="text-xs font-bold truncate text-[#7A2500]">{user.name}</p>
                    <p className="text-[10px] text-[#7A2500]/70 truncate">{user.email}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-bold hover:bg-white flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#FF6F86]" />
                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setIsOrdersModalOpen(true);
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-bold hover:bg-white flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#FF6F86]" />
                    <span>My Orders</span>
                  </button>

                  <div className="border-t border-[#F8D0C8] my-1"></div>

                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                      navigate('/login');
                    }}
                    className="w-full text-left px-3.5 py-2 text-xs font-bold text-[#D9381E] hover:bg-[#FFE9E5] flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-[#D9381E]" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="relative px-3 py-1.5 rounded-full text-[#7A2500] hover:bg-[#FFF5E4] flex items-center gap-1.5 cursor-pointer pill-interactive font-bold text-xs border border-[#F8D0C8]"
              title="Sign In / Register"
            >
              <UserIcon className="w-4 h-4 text-[#7A2500]" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#7A2500] hover:bg-[#FFF5E4] pill-interactive"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white rounded-3xl p-4 shadow-lg border border-[#FFF5E4] flex flex-col gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `pill-interactive px-4 py-2 rounded-full text-sm font-semibold text-center ${
                  isActive
                    ? 'bg-[#7A2500] text-white'
                    : 'text-[#7A2500] hover:bg-[#FFF5E4]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile Auth Section */}
          <div className="pt-2 border-t border-[#F8D0C8] mt-1 space-y-2">
            {isLoggedIn && user ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-1 bg-[#FFF5E4] rounded-2xl">
                  <div className="w-7 h-7 rounded-full bg-[#FF6F86] text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-[#7A2500] truncate">{user.name}</p>
                    <p className="text-[10px] text-[#7A2500]/70 truncate">{user.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsProfileModalOpen(true);
                    }}
                    className="py-2 px-3 rounded-full bg-[#FFF5E4] text-[#7A2500] text-xs font-bold text-center border border-[#F8D0C8]"
                  >
                    My Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsOrdersModalOpen(true);
                    }}
                    className="py-2 px-3 rounded-full bg-[#FFF5E4] text-[#7A2500] text-xs font-bold text-center border border-[#F8D0C8]"
                  >
                    My Orders
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full py-2 px-3 rounded-full bg-[#FFE9E5] text-[#D9381E] text-xs font-bold text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 px-4 rounded-full bg-[#7A2500] text-white text-xs font-bold text-center block"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
