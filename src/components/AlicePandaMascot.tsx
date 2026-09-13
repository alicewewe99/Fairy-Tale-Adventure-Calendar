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
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        <radialGradient id="pandaCheekGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="aliceDressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="goldKeyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Fairy magic glow aura */}
      <circle cx="60" cy="60" r="54" fill="#fdf4ff" opacity="0.6" />
      <circle cx="60" cy="60" r="50" stroke="#f472b6" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />

      {/* Panda Ears */}
      <circle cx="34" cy="30" r="16" fill="#1e293b" />
      <circle cx="34" cy="30" r="8" fill="#ec4899" opacity="0.4" />
      <circle cx="86" cy="30" r="16" fill="#1e293b" />
      <circle cx="86" cy="30" r="8" fill="#ec4899" opacity="0.4" />

      {/* Alice Blue Bow on Head */}
      <path
        d="M60 22 C52 14, 38 18, 44 26 C50 32, 56 26, 60 24 C64 26, 70 32, 76 26 C82 18, 68 14, 60 22 Z"
        fill="#0284c7"
      />
      <circle cx="60" cy="23" r="4" fill="#f8fafc" stroke="#0284c7" strokeWidth="1.5" />

      {/* Panda Head */}
      <ellipse cx="60" cy="52" rx="34" ry="30" fill="#ffffff" stroke="#334155" strokeWidth="3" />

      {/* Eye Patches */}
      <ellipse cx="44" cy="50" rx="10" ry="12" fill="#1e293b" transform="rotate(-15 44 50)" />
      <ellipse cx="76" cy="50" rx="10" ry="12" fill="#1e293b" transform="rotate(15 76 50)" />

      {/* Cute Anime Sparkly Eyes */}
      <circle cx="45" cy="49" r="4.5" fill="#ffffff" />
      <circle cx="46" cy="48" r="2" fill="#0284c7" />
      <circle cx="43" cy="51" r="1.2" fill="#ffffff" />

      <circle cx="75" cy="49" r="4.5" fill="#ffffff" />
      <circle cx="74" cy="48" r="2" fill="#0284c7" />
      <circle cx="77" cy="51" r="1.2" fill="#ffffff" />

      {/* Cheeks blush */}
      <ellipse cx="36" cy="62" rx="7" ry="4" fill="url(#pandaCheekGrad)" />
      <ellipse cx="84" cy="62" rx="7" ry="4" fill="url(#pandaCheekGrad)" />

      {/* Panda Nose & Mouth */}
      <ellipse cx="60" cy="58" rx="4" ry="2.8" fill="#1e293b" />
      <path d="M56 63 C58 66, 60 66, 60 63 C60 66, 62 66, 64 63" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />

      {/* Alice Dress Body */}
      <path
        d="M40 80 L32 108 C32 110, 88 110, 88 108 L80 80 Z"
        fill="url(#aliceDressGrad)"
        stroke="#0369a1"
        strokeWidth="2"
      />

      {/* White Apron */}
      <path
        d="M47 80 L42 106 C42 107, 78 107, 78 106 L73 80 Z"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1.5"
      />

      {/* Apron Card Symbols (Heart & Spades) */}
      <path
        d="M60 88 C59 86, 56 86, 56 89 C56 92, 60 95, 60 95 C60 95, 64 92, 64 89 C64 86, 61 86, 60 88 Z"
        fill="#e11d48"
      />

      {/* Arms Holding Magic Pocket Watch and Key */}
      <ellipse cx="34" cy="88" rx="7" ry="12" fill="#1e293b" transform="rotate(25 34 88)" />
      <ellipse cx="86" cy="88" rx="7" ry="12" fill="#1e293b" transform="rotate(-25 86 88)" />

      {/* Magic Pocket Watch in Paw */}
      <circle cx="28" cy="98" r="8" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
      <circle cx="28" cy="98" r="6" fill="#ffffff" />
      <path d="M28 94 L28 98 L31 99" stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 90 L28 88" stroke="#ca8a04" strokeWidth="1.5" />

      {/* Alice Golden Key in Right Paw */}
      <circle cx="92" cy="94" r="4.5" fill="none" stroke="url(#goldKeyGrad)" strokeWidth="1.8" />
      <path d="M92 98 L92 108 L95 106 M92 103 L94 103" stroke="url(#goldKeyGrad)" strokeWidth="1.8" strokeLinecap="round" />

      {/* Floating Magic Stars */}
      <polygon points="18,45 20,49 24,50 20,53 21,57 18,54 15,57 16,53 12,50 16,49" fill="#fbbf24" />
      <polygon points="102,40 103.5,43 107,44 104,46.5 105,50 102,48 99,50 100,46.5 97,44 100.5,43" fill="#ec4899" />
    </svg>
  );
};
