import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const RightCornerScrollBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Track window scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max(currentScroll / scrollHeight, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Scroll smoothly to bottom
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  };

  // Handle clicking or dragging on the mini scroll bar track
  const handleTrackInteraction = (clientY: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetY = clientY - rect.top;
    const fraction = Math.min(Math.max(offsetY / rect.height, 0), 1);
    
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: fraction * scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    handleTrackInteraction(e.clientY);

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (isDraggingRef.current) {
        handleTrackInteraction(moveEvent.clientY);
      }
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const percentage = Math.round(scrollProgress * 100);

  return (
    <aside
      className="fixed right-2.5 sm:right-4 bottom-5 z-40 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Page scroll navigation bar"
    >
      <div className="bg-[#FFF5E4]/95 border border-[#7A2500]/20 rounded-full shadow-md p-0.5 flex flex-col items-center gap-0.5 backdrop-blur-xs">
        
        {/* TOP BUTTON */}
        <button
          onClick={scrollToTop}
          title="Scroll to Top"
          aria-label="Scroll to top of page"
          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] cursor-pointer transition-colors ${
            scrollProgress < 0.05
              ? 'bg-[#7A2500]/10 text-[#7A2500]/30 cursor-default'
              : 'bg-[#7A2500] text-white hover:bg-[#FF6F86]'
          }`}
        >
          <ArrowUp className="w-2.5 h-2.5" />
        </button>

        {/* VERTICAL SCROLL BAR TRACK */}
        <div
          ref={trackRef}
          onMouseDown={handleMouseDown}
          title={`Scroll: ${percentage}%`}
          className="relative w-1 h-8 bg-[#7A2500]/15 hover:bg-[#7A2500]/25 rounded-full cursor-pointer overflow-hidden flex justify-center"
        >
          {/* Scroll Progress fill */}
          <div
            className="absolute top-0 w-full bg-[#FF6F86]/60 rounded-full"
            style={{ height: `${percentage}%` }}
          />

          {/* Draggable Scrollbar Thumb */}
          <div
            className="absolute w-1 h-2 bg-[#7A2500] hover:bg-[#FF6F86] rounded-full shadow-xs cursor-grab active:cursor-grabbing"
            style={{
              top: `calc(${scrollProgress * 100}% - ${scrollProgress * 8}px)`,
              transform: 'translateX(0)'
            }}
          />
        </div>

        {/* BOTTOM BUTTON */}
        <button
          onClick={scrollToBottom}
          title="Scroll to Bottom"
          aria-label="Scroll to bottom of page"
          className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] cursor-pointer transition-colors ${
            scrollProgress > 0.95
              ? 'bg-[#7A2500]/10 text-[#7A2500]/30 cursor-default'
              : 'bg-[#7A2500] text-white hover:bg-[#FF6F86]'
          }`}
        >
          <ArrowDown className="w-2.5 h-2.5" />
        </button>

        {/* SCROLL PERCENTAGE BADGE */}
        <div
          className={`text-[7px] font-mono font-semibold text-[#7A2500] bg-white/90 px-0.5 py-0 rounded-full border border-[#7A2500]/15 transition-opacity ${
            isHovered ? 'opacity-100' : 'opacity-70'
          }`}
        >
          {percentage}%
        </div>
      </div>
    </aside>
  );
};
