import React, { useState } from 'react';
import { Bot, Sparkles, X, MessageSquare } from 'lucide-react';
import { FaqAiAgentCard } from './FaqAiAgentCard';

export const FaqAiAgentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating FAQ Agent Trigger Button */}
      <div className="fixed left-4 bottom-5 z-40 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-[#7A2500] hover:bg-[#5E1C00] text-white p-2.5 sm:px-4 sm:py-2.5 rounded-full shadow-xl border-2 border-white flex items-center gap-2 group transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label="Open Scoop AI FAQ Agent"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#FFD56B]" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6F86] rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF6F86] rounded-full" />
          </div>
          <span className="hidden sm:inline font-bold text-xs">
            Ask Scoop AI
          </span>
          <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
            <Sparkles className="w-2.5 h-2.5 text-[#FFD56B]" />
            FAQ Agent
          </span>
        </button>
      </div>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute -top-10 right-0 sm:-right-10 text-white hover:text-[#FF6F86] transition-colors p-1 rounded-full cursor-pointer"
              aria-label="Close FAQ Agent modal"
            >
              <X className="w-7 h-7" />
            </button>
            <FaqAiAgentCard embedded={false} onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};
