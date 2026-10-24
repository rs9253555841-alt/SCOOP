import React from 'react';

interface WavyDividerProps {
  fillColor: string;
  className?: string;
  height?: number;
  flip?: boolean;
}

export const WavyDivider: React.FC<WavyDividerProps> = ({
  fillColor,
  className = '',
  height = 48,
  flip = false
}) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none select-none block ${className}`}
      style={{
        lineHeight: 0,
        transform: flip ? 'rotate(180deg)' : undefined
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full block"
        style={{ height: `${height}px`, minHeight: `${height}px` }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,32 C240,96 480,0 720,48 C960,96 1200,16 1440,56 L1440,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
