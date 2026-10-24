import React from 'react';
import { Gift, Sparkles, Check, RotateCcw } from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext';

interface ScoopStampCardProps {
  className?: string;
  showSimulateButton?: boolean;
}

export const ScoopStampCard: React.FC<ScoopStampCardProps> = ({
  className = '',
  showSimulateButton = true,
}) => {
  const { stamps, addStamp, redeemStamps } = useCartWishlist();

  const isFull = stamps >= 5;
  const remaining = Math.max(0, 5 - stamps);

  return (
    <div
      id="stamp-card"
      className={`bg-white rounded-3xl p-6 sm:p-7 border border-[#F8D0C8] shadow-sm space-y-5 ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#F8D0C8] pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#FFF5E4] border border-[#F8D0C8] flex items-center justify-center text-lg">
            🍦
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-script text-[#7A2500]">
              Scoop Stamp Card
            </h2>
            <p className="text-xs font-semibold text-[#7A2500]/70">
              Collect 5 stamps on completed orders to earn 1 free scoop!
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto bg-[#FFF5E4] px-3 py-1 rounded-full border border-[#F8D0C8] text-xs font-bold text-[#7A2500]">
          <Gift className="w-3.5 h-3.5 text-[#FF6F86]" />
          <span>Reward: 1 Free Scoop</span>
        </div>
      </div>

      {/* 5 Stamps Row */}
      <div className="bg-[#FFF5E4] rounded-2xl p-4 sm:p-6 border border-[#F8D0C8]">
        <div className="grid grid-cols-5 gap-2 sm:gap-4 max-w-md mx-auto">
          {[0, 1, 2, 3, 4].map((index) => {
            const isFilled = index < stamps;
            const stampNumber = index + 1;
            const isRewardStamp = index === 4;

            return (
              <div
                key={index}
                className="flex flex-col items-center gap-1.5"
                title={`Stamp ${stampNumber} of 5`}
              >
                <div
                  className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isFilled
                      ? 'bg-[#FF6F86] text-white shadow-md border-2 border-white animate-stamp-pop'
                      : 'bg-white/80 border-2 border-dashed border-[#F8D0C8] text-[#7A2500]/30 hover:border-[#7A2500]/30'
                  }`}
                >
                  {/* Stamp Graphic */}
                  {isFilled ? (
                    <div className="flex flex-col items-center">
                      <span className="text-xl sm:text-2xl select-none">🍨</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center opacity-40">
                      <span className="text-lg sm:text-xl select-none">🍦</span>
                    </div>
                  )}

                  {/* Stamp number / status badge */}
                  <span
                    className={`absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center border border-white shadow-xs ${
                      isFilled
                        ? 'bg-[#7A2500] text-white'
                        : isRewardStamp
                        ? 'bg-[#FFC93C] text-[#7A2500]'
                        : 'bg-white text-[#7A2500]/60'
                    }`}
                  >
                    {isFilled ? <Check className="w-3 h-3 text-white" /> : stampNumber}
                  </span>
                </div>

                <span
                  className={`text-[11px] font-bold ${
                    isFilled ? 'text-[#7A2500]' : 'text-[#7A2500]/50'
                  }`}
                >
                  {isRewardStamp ? 'Free Scoop!' : `Stamp ${stampNumber}`}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Text as explicitly requested: "2/5 stamps, 3 more for a free scoop!" */}
      <div className="text-center space-y-1">
        <p className="text-sm font-bold text-[#7A2500]">
          {isFull
            ? '5/5 stamps collected! You have unlocked your Free Scoop reward!'
            : `${stamps}/5 stamps, ${remaining} more for a free scoop!`}
        </p>

        {/* Mini progress bar */}
        <div className="w-full max-w-xs mx-auto bg-[#FFF5E4] h-2 rounded-full overflow-hidden border border-[#F8D0C8]">
          <div
            className="bg-[#FF6F86] h-full transition-all duration-500 rounded-full"
            style={{ width: `${(stamps / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Full State Banner & Redeem Button */}
      {isFull ? (
        <div className="bg-gradient-to-r from-[#FF6F86] to-[#F25A74] rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md animate-crossfade">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-white text-[#FF6F86] flex items-center justify-center text-xl shrink-0 shadow-xs">
              🎉
            </div>
            <div>
              <h3 className="font-bold text-base leading-snug">
                Free Scoop Unlocked!
              </h3>
              <p className="text-xs text-white/90">
                Congratulations! Show this card in-store or redeem online for your complimentary scoop.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={redeemStamps}
            className="bg-white text-[#7A2500] hover:bg-[#FFF5E4] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm cursor-pointer pill-interactive shrink-0"
          >
            Redeem &amp; Reset Card
          </button>
        </div>
      ) : (
        showSimulateButton && (
          <div className="flex items-center justify-between pt-1 text-xs text-[#7A2500]/70 border-t border-[#F8D0C8]/50">
            <span>Stamps are automatically added when you place an order.</span>
            <button
              type="button"
              onClick={addStamp}
              disabled={isFull}
              className="text-[#FF6F86] hover:underline font-bold cursor-pointer inline-flex items-center gap-1 disabled:opacity-40"
              title="Demo button to test stamp pop animation"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test +1 Stamp</span>
            </button>
          </div>
        )
      )}
    </div>
  );
};
