import React from 'react';

export default function TalentLogo({ size = 'default', showText = true, className = '' }) {
  const isLarge = size === 'large';
  const isSmall = size === 'small';

  const width = isLarge ? 54 : isSmall ? 32 : 42;
  const height = isLarge ? 60 : isSmall ? 36 : 46;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* 3D Stacked Layers matching Mr. Samuel's brand image */}
      <svg
        width={width}
        height={height}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        {/* Layer 1 - Gold (Top) */}
        <path
          d="M 12 18 L 88 12 L 88 24 L 12 30 Z"
          fill="#E5A812"
        />
        <path
          d="M 12 18 L 48 24 L 88 12 L 52 7 Z"
          fill="#F6BE22"
          opacity="0.9"
        />

        {/* Layer 2 - Lime Green */}
        <path
          d="M 12 34 L 88 28 L 88 40 L 12 46 Z"
          fill="#8DB828"
        />
        <path
          d="M 12 34 L 48 40 L 88 28 L 52 23 Z"
          fill="#A4D235"
          opacity="0.9"
        />

        {/* Layer 3 - Forest Green */}
        <path
          d="M 12 50 L 88 44 L 88 54 L 12 60 Z"
          fill="#1E5E3A"
        />
        <path
          d="M 12 50 L 48 55 L 88 44 L 52 39 Z"
          fill="#2A7D4E"
          opacity="0.9"
        />

        {/* Layer 4 - Crimson Red */}
        <path
          d="M 12 65 L 88 60 L 88 69 L 12 74 Z"
          fill="#C92A2A"
        />

        {/* Layer 5 - Dark Burgundy */}
        <path
          d="M 12 78 L 88 74 L 88 82 L 12 86 Z"
          fill="#581827"
        />

        {/* Layer 6 - Deep Navy Blue (Bottom) */}
        <path
          d="M 12 90 L 88 87 L 88 94 L 12 97 Z"
          fill="#0E3D6E"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center tracking-tight">
            <span className="text-2xl font-black text-slate-900 tracking-wider">TALENT</span>
            <span className="ml-1 w-2 h-2 rounded-full bg-[#E5A812]" />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#0E3D6E] -mt-1">
            Student Work Platform
          </span>
        </div>
      )}
    </div>
  );
}
