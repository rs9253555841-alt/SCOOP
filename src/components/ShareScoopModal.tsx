import React, { useRef, useState } from 'react';
import { X, Download, Share2, Check, Sparkles, Heart } from 'lucide-react';
import { toPng } from 'html-to-image';
import { Flavor, ServingType } from '../types';

interface ShareScoopModalProps {
  isOpen: boolean;
  onClose: () => void;
  flavor: Flavor;
  serving: ServingType;
  price: number;
  imageUrl: string;
}

const SERVING_LABELS: Record<ServingType, string> = {
  cup: 'Paper Cup',
  cone: 'Waffle Cone',
  tub: 'Family Tub',
};

export const ShareScoopModal: React.FC<ShareScoopModalProps> = ({
  isOpen,
  onClose,
  flavor,
  serving,
  price,
  imageUrl,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  if (!isOpen) return null;

  const servingLabel = SERVING_LABELS[serving] || 'Waffle Cone';

  // 1. Download image using html-to-image
  const handleDownloadImage = async () => {
    if (!cardRef.current || isGenerating) return;

    try {
      setIsGenerating(true);
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2.5, // Crisp resolution for Instagram Stories
      });

      const downloadLink = document.createElement('a');
      downloadLink.download = `scoop-${flavor.id}-${serving}-story.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (err) {
      console.error('Failed to export story card:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // 2. Share using Web Share API or copy-link fallback
  const handleShare = async () => {
    const shareData = {
      title: `Scoop - ${flavor.name} (${servingLabel})`,
      text: `I just picked my Scoop: ${flavor.name} in a ${servingLabel}! 🍦✨ Churned fresh in small batches.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch {
        // User cancelled share dialog
      }
    } else {
      // Fallback: Copy link
      try {
        await navigator.clipboard.writeText(window.location.href);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
      } catch {
        // Fallback
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-crossfade overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Share My Scoop Card"
    >
      <div
        className="bg-[#FFF5E4] rounded-3xl p-5 sm:p-7 max-w-md w-full border-2 border-white shadow-2xl relative my-auto text-[#7A2500]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white text-[#7A2500] hover:bg-[#F8D0C8] border border-[#F8D0C8] cursor-pointer pill-interactive z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FF6F86]/15 text-[#FF6F86] text-xs font-bold uppercase tracking-wider border border-[#FF6F86]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Story Share Card</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-script text-[#7A2500]">
            Share My Scoop
          </h2>
          <p className="text-xs text-[#7A2500]/80">
            9:16 Instagram-story card formatted for your social feed
          </p>
        </div>

        {/* 9:16 Story Card Preview Container */}
        <div className="flex justify-center my-3">
          <div
            ref={cardRef}
            className="w-[280px] sm:w-[295px] aspect-[9/16] rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden shadow-xl border-4 border-white select-none text-[#7A2500]"
            style={{
              backgroundColor: flavor.color || '#F8D0C8',
              backgroundImage: `radial-gradient(circle at top right, rgba(255,255,255,0.45), transparent 70%), radial-gradient(circle at bottom left, rgba(255,255,255,0.3), transparent 70%)`,
            }}
          >
            {/* Background Decorative Rings */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border-8 border-white/20 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border-8 border-white/20 pointer-events-none" />

            {/* Top Brand & Tagline Bar */}
            <div className="relative z-10 flex items-center justify-between border-b border-white/40 pb-3">
              <div className="flex items-center gap-1 text-2xl font-script text-[#7A2500]">
                <span>Scoop</span>
                <span className="w-2 h-2 rounded-full bg-[#FF6F86] inline-block mb-1"></span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/80 backdrop-blur-xs text-[#7A2500] px-2.5 py-1 rounded-full border border-white/60">
                Artisanal Batch
              </span>
            </div>

            {/* Center: Selected Serving Image & Tagline */}
            <div className="relative z-10 flex flex-col items-center my-auto py-2">
              {/* Product Serving Image */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-lg border-3 border-white bg-white/90 mb-3 shrink-0">
                <img
                  src={imageUrl}
                  alt={`${flavor.name} ${servingLabel}`}
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tagline */}
              <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-xs px-3.5 py-1 rounded-full border border-white text-xs font-bold text-[#7A2500] shadow-xs">
                <Heart className="w-3 h-3 text-[#FF6F86] fill-[#FF6F86]" />
                <span>&ldquo;I just picked my Scoop!&rdquo;</span>
              </div>
            </div>

            {/* Bottom Card Footer Details */}
            <div className="relative z-10 bg-white/95 backdrop-blur-xs rounded-2xl p-3.5 border border-white shadow-sm space-y-1.5 text-center">
              <h3 className="text-xl sm:text-2xl font-script text-[#7A2500] leading-tight">
                {flavor.name}
              </h3>

              <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#7A2500]">
                <span className="bg-[#FFF5E4] px-2.5 py-0.5 rounded-full border border-[#F8D0C8]">
                  {servingLabel}
                </span>
                <span className="font-extrabold text-[#FF6F86] text-sm">
                  ₹{price}
                </span>
              </div>

              <div className="text-[10px] text-[#7A2500]/70 font-medium pt-1 border-t border-[#F8D0C8]/60">
                Every Scoop, a Little Joy &bull; scoopicecream.shop
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons: Download Image & Share */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="flex-1 btn-pill-brown text-sm py-3 px-4 font-bold shadow-sm cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{isGenerating ? 'Rendering Story...' : 'Download Image'}</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex-1 bg-white text-[#7A2500] hover:bg-[#FFF5E4] border-2 border-[#7A2500] py-3 px-4 rounded-full text-sm font-bold shadow-sm cursor-pointer pill-interactive flex items-center justify-center gap-2"
          >
            {isCopied || shareSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#A8C145]" />
                <span>{isCopied ? 'Link Copied!' : 'Shared!'}</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-[#FF6F86]" />
                <span>Share Story</span>
              </>
            )}
          </button>
        </div>

        <p className="text-center text-[11px] text-[#7A2500]/60 font-medium mt-3">
          Ready to save or post straight to Instagram, WhatsApp, or Facebook Stories.
        </p>
      </div>
    </div>
  );
};
