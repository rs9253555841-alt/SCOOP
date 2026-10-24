import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Phone, Eye, EyeOff, ArrowRight, Sparkles, Loader2, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCartWishlist } from '../context/CartWishlistContext';
import { HERO_CONE_PNG } from '../data/flavors';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signUp, continueAsGuest, isLoggedIn } = useAuth();
  const { showToast } = useCartWishlist();

  // If redirected from another page, return there after login; otherwise go to Home
  const from = (location.state as any)?.from?.pathname || '/';

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const validatePhone = (phone: string) => {
    const clean = phone.replace(/[\s-]/g, '');
    return /^[0-9]{10}$/.test(clean);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (authError) {
      setAuthError(null);
    }
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    if (formData.email && validateEmail(formData.email)) {
      showToast(`Password reset link sent to ${formData.email}! (Demo)`, 'info');
    } else {
      showToast('Enter your registered email above to receive a reset link.', 'info');
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    // Short loading state ~1s as requested
    setTimeout(() => {
      const res = login(formData.email, formData.password);
      setIsLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setAuthError(res.error || 'Invalid email or password');
      }
    }, 1000);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your full name.';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your mobile phone number.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!formData.password) {
      newErrors.password = 'Please create a password.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setAuthError(null);

    setTimeout(() => {
      const res = signUp({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      setIsLoading(false);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setAuthError(res.error || 'Could not create account');
      }
    }, 1000);
  };

  const handleGuestContinue = () => {
    continueAsGuest();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-[#F8D0C8] flex items-center justify-center p-4 sm:p-8">
      
      {/* Background Decorative Ambient Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#FF6F86]/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFD56B]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-[#FFF5E4] rounded-3xl sm:rounded-[36px] border-4 border-white shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        
        {/* Left Side (Desktop Only Split Screen): Artisanal Ice Cream Visual Showcase */}
        <div
          className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 text-white overflow-hidden"
          style={{
            background: 'radial-gradient(circle at 50% 40%, #921736 0%, #6E0E25 50%, #460616 100%)'
          }}
        >
          {/* Subtle panel grid texture */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '80px 100%'
            }}
          />

          {/* Top Brand Tag */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-script text-3xl text-white">Scoop</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD56B]"></span>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs">
              Artisanal Creamery
            </span>
          </div>

          {/* Center Floating Cone Image */}
          <div className="relative z-10 my-auto py-6 flex flex-col items-center text-center">
            <div className="w-[240px] max-w-full drop-shadow-[0_25px_35px_rgba(0,0,0,0.65)] hover:scale-105 transition-transform duration-500">
              <img
                src={HERO_CONE_PNG}
                alt="Scoop Artisanal Ice Cream Bouquet"
                className="w-full h-auto object-contain select-none pointer-events-none"
              />
            </div>
            <p className="font-script text-2xl text-[#FFF5E4] mt-4 text-shadow-subtle">
              Every Scoop, a Little Joy.
            </p>
            <p className="text-xs text-white/80 max-w-xs mt-1 font-medium">
              Hand-churned with farm-fresh double cream, real sun-ripened fruit, and slow-roasted nuts.
            </p>
          </div>

          {/* Bottom Perks Banner */}
          <div className="relative z-10 pt-4 border-t border-white/20 text-xs font-semibold text-[#FFF5E4]/90 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD56B]" />
              <span>Earn 5-Stamp Free Scoops</span>
            </span>
            <span className="text-white/60">&bull;</span>
            <span>Fast Thermal Delivery</span>
          </div>
        </div>

        {/* Right Side: Form Card (Single column on mobile, right side on desktop) */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
          
          <div className="space-y-6 max-w-md mx-auto w-full">
            
            {/* Header with Scoop Logo (on mobile includes small cone badge) */}
            <div className="text-center space-y-2">
              {/* Mobile mini cone indicator */}
              <div className="lg:hidden flex justify-center mb-2">
                <div className="w-16 h-16 rounded-full bg-[#6E0E25] p-2 flex items-center justify-center border-2 border-white shadow-md">
                  <img
                    src={HERO_CONE_PNG}
                    alt="Scoop"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="inline-flex items-center justify-center gap-2">
                <span className="font-script text-4xl sm:text-5xl text-[#7A2500]">
                  Scoop
                </span>
                <span className="w-3 h-3 rounded-full bg-[#FF6F86]"></span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#7A2500]/80">
                Sign in for a sweeter experience
              </p>
            </div>

            {/* Login / Sign Up Toggle Tabs */}
            <div className="bg-white p-1 rounded-full border border-[#F8D0C8] grid grid-cols-2 shadow-xs">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setAuthError(null);
                  setErrors({});
                }}
                className={`py-2 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-[#7A2500] text-white shadow-xs'
                    : 'text-[#7A2500]/70 hover:text-[#7A2500]'
                }`}
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setAuthError(null);
                  setErrors({});
                }}
                className={`py-2 px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#7A2500] text-white shadow-xs'
                    : 'text-[#7A2500]/70 hover:text-[#7A2500]'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* General Auth Error Banner */}
            {authError && (
              <div className="bg-[#FFE9E5] border border-[#FFCDC2] text-[#D9381E] text-xs font-bold rounded-2xl p-3 text-center">
                {authError}
              </div>
            )}

            {/* LOGIN FORM */}
            {mode === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="name@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border transition-shadow ${
                        errors.email
                          ? 'border-[#FF6F86] focus:ring-[#FF6F86]'
                          : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#D9381E] mt-1 font-semibold">{errors.email}</p>
                  )}
                </div>

                {/* Password with eye toggle & forgot password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase text-[#7A2500]">
                      Password *
                    </label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs font-bold text-[#FF6F86] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border transition-shadow ${
                        errors.password
                          ? 'border-[#FF6F86] focus:ring-[#FF6F86]'
                          : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A2500]/50 hover:text-[#7A2500]"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-[#D9381E] mt-1 font-semibold">{errors.password}</p>
                  )}
                </div>

                {/* Demo Helper Hint */}
                <div className="bg-white/70 p-2.5 rounded-xl border border-[#F8D0C8] text-[11px] text-[#7A2500]/80">
                  <span className="font-bold text-[#7A2500]">Demo Account:</span>{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        email: 'meera@scoop.com',
                        password: 'password123'
                      });
                      setErrors({});
                      setAuthError(null);
                    }}
                    className="text-[#FF6F86] underline font-bold hover:text-[#7A2500]"
                  >
                    Click to fill meera@scoop.com
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-pill-brown w-full py-3.5 px-6 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* SIGN UP FORM */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUpSubmit} className="space-y-3.5" noValidate>
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="e.g. Priya Sharma"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border transition-shadow ${
                        errors.name
                          ? 'border-[#FF6F86] focus:ring-[#FF6F86]'
                          : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-[#D9381E] mt-1 font-semibold">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="priya@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border transition-shadow ${
                        errors.email
                          ? 'border-[#FF6F86] focus:ring-[#FF6F86]'
                          : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-[#D9381E] mt-1 font-semibold">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                    Mobile Phone (10 digits) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="9876543210"
                      className={`w-full pl-10 pr-4 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border transition-shadow ${
                        errors.phone
                          ? 'border-[#FF6F86] focus:ring-[#FF6F86]'
                          : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-[#D9381E] mt-1 font-semibold">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                    Password (min 6 chars) *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border transition-shadow ${
                        errors.password
                          ? 'border-[#FF6F86] focus:ring-[#FF6F86]'
                          : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A2500]/50 hover:text-[#7A2500]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-[#D9381E] mt-1 font-semibold">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold uppercase text-[#7A2500] mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A2500]/50" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-2.5 bg-white rounded-xl text-sm font-medium text-[#7A2500] focus:outline-none focus:ring-2 border transition-shadow ${
                        errors.confirmPassword
                          ? 'border-[#FF6F86] focus:ring-[#FF6F86]'
                          : 'border-[#F8D0C8] focus:ring-[#7A2500]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A2500]/50 hover:text-[#7A2500]"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-[#D9381E] mt-1 font-semibold">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-pill-brown w-full py-3.5 px-6 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md disabled:opacity-70 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#F8D0C8]"></div>
              <span className="flex-shrink mx-3 text-xs font-bold uppercase text-[#7A2500]/50 tracking-wider">
                or
              </span>
              <div className="flex-grow border-t border-[#F8D0C8]"></div>
            </div>

            {/* CONTINUE AS GUEST BUTTON */}
            <div>
              <button
                type="button"
                onClick={handleGuestContinue}
                className="w-full py-3 rounded-full border-2 border-[#7A2500] text-[#7A2500] hover:bg-[#7A2500] hover:text-white font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Continue as Guest</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Demo Note */}
          <div className="mt-6 pt-4 border-t border-[#F8D0C8]/60 text-center">
            <p className="text-[11px] font-semibold text-[#7A2500]/70 flex items-center justify-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#FF6F86] shrink-0" />
              <span>Demo login, please don&rsquo;t use real passwords.</span>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
