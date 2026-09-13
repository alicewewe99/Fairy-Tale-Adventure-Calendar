import React from 'react';

interface AlicePandaMascotProps {
  className?: string;
  size?: number;
}

export const AlicePandaMascot: React.FC<AlicePandaMascotProps> = ({
  className = '',
  size = 64,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        <radialGradient id="mascotAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf4ff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fdf4ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="mAliceBlue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="mChipmunkBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
        <linearGradient id="mRoseRibbon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>

      {/* Fairytale Aura Glow */}
      <ellipse cx="80" cy="60" rx="74" ry="54" fill="url(#mascotAura)" />

      {/* ================= CHIPMUNK (花栗鼠) ================= */}
      <g id="chipmunk-avatar">
        {/* Tail */}
        <path d="M 16 75 C 6 60, 4 45, 14 36 C 24 28, 30 42, 24 55 Z" fill="url(#mChipmunkBody)" />
        <path d="M 15 70 C 9 58, 8 46, 16 40" stroke="#451a03" strokeWidth="2" strokeLinecap="round" />

        {/* Ears */}
        <ellipse cx="32" cy="36" rx="6" ry="8" fill="#b45309" transform="rotate(-15 32 36)" />
        <ellipse cx="32" cy="36" rx="3.5" ry="5" fill="#fbcfe8" transform="rotate(-15 32 36)" />
        <ellipse cx="50" cy="34" rx="6" ry="8" fill="#b45309" transform="rotate(15 50 34)" />
        <ellipse cx="50" cy="34" rx="3.5" ry="5" fill="#fbcfe8" transform="rotate(15 50 34)" />

        {/* Head */}
        <ellipse cx="42" cy="52" rx="18" ry="16" fill="url(#mChipmunkBody)" />
        {/* Cheeks */}
        <ellipse cx="34" cy="56" rx="9" ry="8" fill="#fef3c7" />
        <ellipse cx="49" cy="56" rx="9" ry="8" fill="#fef3c7" />
        {/* Head stripes */}
        <path d="M 42 38 L 42 47" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 37 40 L 38 46" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 47 40 L 46 46" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" />

        {/* Eyes */}
        <circle cx="35" cy="51" r="3.2" fill="#1e293b" />
        <circle cx="36" cy="50" r="1.2" fill="#ffffff" />
        <circle cx="48" cy="51" r="3.2" fill="#1e293b" />
        <circle cx="49" cy="50" r="1.2" fill="#ffffff" />

        {/* Blush */}
        <circle cx="30" cy="57" r="3.5" fill="#f43f5e" opacity="0.5" />
        <circle cx="53" cy="57" r="3.5" fill="#f43f5e" opacity="0.5" />

        {/* Nose & Tooth */}
        <polygon points="41,56 43,56 42,58" fill="#e11d48" />
        <rect x="41" y="58.5" width="2" height="2" fill="#ffffff" stroke="#78350f" strokeWidth="0.5" />

        {/* Mini ribbon */}
        <polygon points="42,66 38,63 38,69" fill="#10b981" />
        <polygon points="42,66 46,63 46,69" fill="#10b981" />
        <circle cx="42" cy="66" r="1.5" fill="#fbbf24" />

        {/* Body */}
        <ellipse cx="44" cy="80" rx="17" ry="20" fill="url(#mChipmunkBody)" />
        <ellipse cx="46" cy="82" rx="10" ry="14" fill="#fffbeb" />

        {/* Left Paw holding Calendar */}
        <ellipse cx="58" cy="84" rx="4.5" ry="3.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
        <ellipse cx="59" cy="92" rx="4.5" ry="3.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
      </g>

      {/* ================= PANDA (貓熊) ================= */}
      <g id="panda-avatar">
        {/* Ears */}
        <circle cx="106" cy="33" r="8" fill="#1e293b" />
        <circle cx="106" cy="33" r="4" fill="#475569" />
        <circle cx="134" cy="35" r="8" fill="#1e293b" />
        <circle cx="134" cy="35" r="4" fill="#475569" />

        {/* Alice Bow on Panda Head */}
        <path d="M 120 28 C 112 20, 98 22, 106 31 C 112 32, 117 30, 120 32 C 123 30, 128 32, 134 31 C 142 22, 128 20, 120 28 Z" fill="url(#mAliceBlue)" />
        <circle cx="120" cy="30" r="3" fill="url(#mGoldGrad)" />

        {/* Head */}
        <ellipse cx="120" cy="52" rx="20" ry="17" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />

        {/* Eye Patches */}
        <ellipse cx="110" cy="51" rx="6.5" ry="7.5" fill="#1e293b" transform="rotate(-12 110 51)" />
        <ellipse cx="130" cy="52" rx="6.5" ry="7.5" fill="#1e293b" transform="rotate(12 130 52)" />

        {/* Sparkling Eyes */}
        <ellipse cx="111" cy="51" rx="3.5" ry="4" fill="#0f172a" />
        <circle cx="112" cy="49" r="1.3" fill="#ffffff" />
        <ellipse cx="129" cy="52" rx="3.5" ry="4" fill="#0f172a" />
        <circle cx="130" cy="50" r="1.3" fill="#ffffff" />

        {/* Blush */}
        <ellipse cx="103" cy="58" rx="4" ry="2.5" fill="#fda4af" opacity="0.6" />
        <ellipse cx="136" cy="59" rx="4" ry="2.5" fill="#fda4af" opacity="0.6" />

        {/* Nose & Smile */}
        <ellipse cx="120" cy="57" rx="3.5" ry="2.5" fill="#1e293b" />
        <path d="M 118 61 Q 120 63 122 61" stroke="#1e293b" strokeWidth="1.2" fill="none" strokeLinecap="round" />

        {/* Body */}
        <ellipse cx="118" cy="82" rx="20" ry="22" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 102 78 C 108 95, 128 95, 134 78 C 138 72, 130 68, 124 70 C 114 68, 106 72, 102 78 Z" fill="#1e293b" />

        {/* Right Paw holding Calendar */}
        <ellipse cx="103" cy="84" rx="5" ry="4" fill="#1e293b" />
        <ellipse cx="102" cy="92" rx="5" ry="4" fill="#1e293b" />
      </g>

      {/* ================= MAGICAL CALENDAR (魔法月曆) ================= */}
      <g id="magic-calendar" transform="translate(60, 62)">
        {/* Glow */}
        <rect x="-2" y="-2" width="44" height="42" rx="6" fill="#fef08a" opacity="0.5" />
        {/* Calendar Body */}
        <rect x="0" y="0" width="40" height="38" rx="5" fill="#ffffff" stroke="#fbbf24" strokeWidth="1.8" />
        {/* Top Header */}
        <rect x="0" y="0" width="40" height="11" rx="4" fill="url(#mRoseRibbon)" />
        {/* Rings */}
        <circle cx="8" cy="2" r="1.5" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
        <circle cx="20" cy="2" r="1.5" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />
        <circle cx="32" cy="2" r="1.5" fill="#ffffff" stroke="#64748b" strokeWidth="0.8" />

        <text x="20" y="8" fontSize="5.5" fontWeight="900" fill="#ffffff" textAnchor="middle">
          ★魔法★
        </text>

        {/* Year Number */}
        <text x="20" y="22" fontSize="10" fontWeight="900" fill="#0284c7" textAnchor="middle">
          2026
        </text>
        
        {/* Grid dots */}
        <circle cx="8" cy="28" r="1.2" fill="#38bdf8" />
        <circle cx="14" cy="28" r="1.2" fill="#38bdf8" />
        <circle cx="20" cy="28" r="1.2" fill="#f43f5e" />
        <circle cx="26" cy="28" r="1.2" fill="#38bdf8" />
        <circle cx="32" cy="28" r="1.2" fill="#f43f5e" />

        <circle cx="8" cy="33" r="1.2" fill="#f43f5e" />
        <circle cx="14" cy="33" r="1.2" fill="#38bdf8" />
        <circle cx="20" cy="33" r="1.2" fill="#fbbf24" />
        <circle cx="26" cy="33" r="1.2" fill="#38bdf8" />
        <circle cx="32" cy="33" r="1.2" fill="#38bdf8" />
      </g>

      {/* Magic Stars */}
      <polygon points="80,16 81.5,21 86,22 81.5,23.5 80,28 78.5,23.5 74,22 78.5,21" fill="#fbbf24" />
      <polygon points="14,24 15,27 18,28 15,29 14,32 13,29 10,28 13,27" fill="#fbbf24" />
      <polygon points="148,46 149,49 152,50 149,51 148,54 147,51 144,50 147,49" fill="#ec4899" />
    </svg>
  );
};
