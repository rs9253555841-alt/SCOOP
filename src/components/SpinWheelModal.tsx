import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight, Check, Copy } from 'lucide-react';
import { FLAVORS } from '../data/flavors';
import { Flavor } from '../types';
import { useCartWishlist } from '../context/CartWishlistContext';

interface SpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SpinResult {
  flavorId: string;
  code: string;
  date: string;
}

const WHEEL_SEGMENTS = [
  { flavorIndex: 0, label: 'Strawberry', color: '#FF6F86', textColor: '#FFFFFF', emoji: '🍓' },
  { flavorIndex: 1, label: 'Pistachio', color: '#8EA832', textColor: '#FFFFFF', emoji: '🌱' },
  { flavorIndex: 2, label: 'Caramel', color: '#E68A35', textColor: '#FFFFFF', emoji: '🍯' },
  { flavorIndex: 3, label: 'Mango', color: '#FFB800', textColor: '#7A2500', emoji: '🥭' },
  { flavorIndex: 4, label: 'Choco Fudge', color: '#6B2000', textColor: '#FFFFFF', emoji: '🍫' },
  { flavorIndex: 5, label: 'Vanilla', color: '#F3DCB8', textColor: '#7A2500', emoji: '🍦' },
];

const DISCOUNT_CODES = ['SCOOP10', 'SCOOP5', 'FREETOP'];

export const SpinWheelModal: React.FC<SpinWheelModalProps> = ({ isOpen, onClose }) => {
  const { applyDiscountCode } = useCartWishlist();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasSpun, setHasSpun] = useState(false);
  const [savedResult, setSavedResult] = useState<SpinResult | null>(null);
  const [activeWonFlavor, setActiveWonFlavor] = useState<Flavor | null>(null);
  const [activeCode, setActiveCode] = useState<string>('SCOOP10');
  const [codeCopied, setCodeCopied] = useState(false);
  const [codeApplied, setCodeApplied] = useState(false);

  // Check session storage on mount / open
  useEffect(() => {
    if (isOpen) {
      try {
        const stored = sessionStorage.getItem('scoop_spin_used');
        const storedData = sessionStorage.getItem('scoop_spin_result');
        if (stored === 'true' && storedData) {
          const parsed: SpinResult = JSON.parse(storedData);
          setHasSpun(true);
          setSavedResult(parsed);
          const f = FLAVORS.find((fl) => fl.id === parsed.flavorId) || FLAVORS[0];
          setActiveWonFlavor(f);
          setActiveCode(parsed.code);
        }
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setCodeApplied(false);
    setCodeCopied(false);

    // Pick random segment (0 to 5)
    const targetIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const chosenFlavor = FLAVORS[targetIndex];
    // Pick random discount code
    const chosenCode = DISCOUNT_CODES[Math.floor(Math.random() * DISCOUNT_CODES.length)];

    // Target rotation:
    // Segment targetIndex center is at (targetIndex * 60) deg from 12 o'clock
    // To align it with top pointer (12 o'clock), rotate clockwise by:
    // 5 full turns (1800 deg) + (360 - targetIndex * 60)
    const extraSpins = 1800; // 5 full revolutions
    const alignment = (360 - targetIndex * 60) % 360;
    const finalDegree = extraSpins + alignment;

    setRotation(finalDegree);

    // After 3.1s transition, reveal result
    setTimeout(() => {
      setIsSpinning(false);
      setHasSpun(true);
      setActiveWonFlavor(chosenFlavor);
      setActiveCode(chosenCode);

      const resultPayload: SpinResult = {
        flavorId: chosenFlavor.id,
        code: chosenCode,
        date: new Date().toISOString(),
      };
      setSavedResult(resultPayload);
      try {
        sessionStorage.setItem('scoop_spin_used', 'true');
        sessionStorage.setItem('scoop_spin_result', JSON.stringify(resultPayload));
      } catch {
        // ignore
      }
    }, 3100);
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleApplyCode = (code: string) => {
    applyDiscountCode(code);
    setCodeApplied(true);
    setTimeout(() => setCodeApplied(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-crossfade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Spin the Scoop Wheel"
    >
      <div
        className="bg-[#FFF5E4] rounded-3xl p-6 sm:p-8 max-w-lg w-full border-2 border-white shadow-2xl relative overflow-hidden text-[#7A2500]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white text-[#7A2500] hover:bg-[#F8D0C8] border border-[#F8D0C8] cursor-pointer pill-interactive z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6F86]/15 text-[#FF6F86] text-xs font-bold uppercase tracking-wider border border-[#FF6F86]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Daily Fortune Wheel</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-script text-[#7A2500]">
            Spin &amp; Win a Scoop Treat!
          </h2>
          <p className="text-xs sm:text-sm font-medium text-[#7A2500]/80 max-w-xs mx-auto">
            Can&rsquo;t decide what to taste? Give the artisanal wheel a spin for your surprise flavor and demo promo code!
          </p>
        </div>

        {/* Wheel Container */}
        <div className="relative flex flex-col items-center justify-center my-4">
          
          {/* Top Indicator Pointer (12 o'clock) */}
          <div className="absolute top-[-8px] z-20 flex flex-col items-center pointer-events-none drop-shadow-md">
            <div className="w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-t-[20px] border-t-[#7A2500]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6F86] -mt-1.5 border border-white"></div>
          </div>

          {/* Rotating SVG Wheel */}
          <div className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] rounded-full p-2 bg-white shadow-[0_8px_30px_rgba(122,37,0,0.18)] border-4 border-[#FFF5E4]">
            <svg
              viewBox="0 0 300 300"
              className="w-full h-full rounded-full"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning
                  ? 'transform 3.1s cubic-bezier(0.15, 0.9, 0.25, 1)'
                  : 'none',
              }}
            >
              {/* Decorative outer circle */}
              <circle cx="150" cy="150" r="148" fill="#FFF5E4" stroke="#7A2500" strokeWidth="2" />

              {/* 6 Segments */}
              {WHEEL_SEGMENTS.map((seg, idx) => {
                // Each segment spans from (idx * 60 - 30) deg to (idx * 60 + 30) deg
                const startAngle = (idx * 60 - 30) * (Math.PI / 180);
                const endAngle = (idx * 60 + 30) * (Math.PI / 180);
                const r = 142;
                const x1 = 150 + r * Math.sin(startAngle);
                const y1 = 150 - r * Math.cos(startAngle);
                const x2 = 150 + r * Math.sin(endAngle);
                const y2 = 150 - r * Math.cos(endAngle);

                const pathData = `M 150 150 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

                return (
                  <g key={seg.label}>
                    <path
                      d={pathData}
                      fill={seg.color}
                      stroke="#FFFFFF"
                      strokeWidth="2.5"
                    />
                    {/* Radially aligned text label */}
                    <g transform={`rotate(${idx * 60}, 150, 150)`}>
                      <text
                        x="150"
                        y="52"
                        fill={seg.textColor}
                        fontSize="12"
                        fontWeight="700"
                        fontFamily="'Poppins', sans-serif"
                        textAnchor="middle"
                        style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.35))' }}
                      >
                        {seg.emoji} {seg.label}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* Gold border pins on the rim */}
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const angle = deg * (Math.PI / 180);
                const cx = 150 + 144 * Math.sin(angle);
                const cy = 150 - 144 * Math.cos(angle);
                return (
                  <circle
                    key={deg}
                    cx={cx}
                    cy={cy}
                    r="3"
                    fill="#FFC93C"
                    stroke="#7A2500"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Center Hub */}
              <circle cx="150" cy="150" r="28" fill="#FFF5E4" stroke="#7A2500" strokeWidth="3" />
              <circle cx="150" cy="150" r="22" fill="#7A2500" />
              <text
                x="150"
                y="155"
                fill="#FFF5E4"
                fontSize="12"
                fontWeight="bold"
                fontFamily="'Pacifico', cursive"
                textAnchor="middle"
              >
                Scoop
              </text>
            </svg>
          </div>
        </div>

        {/* Action / Result Section */}
        <div className="mt-4 space-y-3">
          {hasSpun && activeWonFlavor ? (
            /* Result Card */
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#F8D0C8] shadow-sm space-y-4 animate-crossfade">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#FF6F86]">
                <Sparkles className="w-4 h-4" />
                <span>Today&rsquo;s Fortune Scoop</span>
              </div>

              {/* Flavor info row */}
              <div className="flex items-center gap-4">
                <img
                  src={activeWonFlavor.images?.cone || activeWonFlavor.image}
                  alt={activeWonFlavor.name}
                  referrerPolicy="no-referrer"
                  className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#F8D0C8] shrink-0 shadow-xs"
                />
                <div className="space-y-1 flex-1">
                  <h3 className="text-xl sm:text-2xl font-script text-[#7A2500] leading-tight">
                    {activeWonFlavor.name}
                  </h3>
                  <p className="text-xs text-[#7A2500]/80 line-clamp-2">
                    {activeWonFlavor.tagline}
                  </p>
                  <Link
                    to={`/flavors/${activeWonFlavor.id}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FF6F86] hover:underline pt-1"
                  >
                    <span>View Flavor</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Promo code badge & actions */}
              <div className="bg-[#FFF5E4] rounded-xl p-3 border border-[#F8D0C8] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2500]/70 block">
                    Exclusive Promo Code
                  </span>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <span className="font-mono text-lg font-black text-[#7A2500] tracking-wider">
                      {activeCode}
                    </span>
                    <span className="text-xs bg-[#FF6F86] text-white font-bold px-2 py-0.5 rounded-full">
                      {activeCode === 'SCOOP10'
                        ? '10% OFF'
                        : activeCode === 'SCOOP5'
                        ? '5% OFF'
                        : 'FREE TOPPING'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleCopyCode(activeCode)}
                    className="p-2 bg-white text-[#7A2500] hover:bg-[#F8D0C8] rounded-xl border border-[#F8D0C8] text-xs font-bold cursor-pointer pill-interactive flex items-center gap-1.5 shrink-0"
                    title="Copy promo code"
                  >
                    {codeCopied ? <Check className="w-4 h-4 text-[#A8C145]" /> : <Copy className="w-4 h-4" />}
                    <span>{codeCopied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApplyCode(activeCode)}
                    className="flex-1 sm:flex-initial btn-pill-brown text-xs py-2 px-3.5 font-bold cursor-pointer shadow-xs"
                  >
                    {codeApplied ? 'Applied ✓' : 'Apply to Cart'}
                  </button>
                </div>
              </div>

              {/* 1 Spin per session note */}
              <p className="text-center text-xs font-semibold text-[#7A2500]/70 italic pt-1">
                Come back tomorrow! 1 spin per session limit reached.
              </p>
            </div>
          ) : (
            /* Spin CTA Button */
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning || hasSpun}
                className="btn-pill-brown text-base py-3.5 px-8 w-full font-bold shadow-md cursor-pointer disabled:opacity-50 pill-interactive flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#FFC93C]" />
                <span>{isSpinning ? 'Churning Fortune...' : 'Spin the Wheel!'}</span>
              </button>
              <p className="text-[11px] text-[#7A2500]/60 font-medium">
                1 free spin per customer session &bull; Win up to 10% off
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
