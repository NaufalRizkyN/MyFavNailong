'use client';

import React from 'react';

interface NailongMascotProps {
  mood?: 'happy' | 'pleading' | 'shy';
  className?: string;
}

export const NailongMascot: React.FC<NailongMascotProps> = ({
  mood = 'happy',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient Glow */}
      <div className="absolute w-44 h-44 bg-gradient-to-tr from-amber-300/40 via-yellow-200/50 to-pink-300/40 rounded-full blur-2xl animate-pulse-glow" />

      {/* Nailong Character SVG */}
      <svg
        viewBox="0 0 200 220"
        className="w-48 h-52 sm:w-56 sm:h-60 filter drop-shadow-xl animate-float"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients for cute 3D chubby look */}
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF066" />
            <stop offset="50%" stopColor="#FFD11A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="bellyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>

          <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF8080" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>

          <linearGradient id="cheekGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B8B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF8E9E" stopOpacity="0.3" />
          </linearGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Tail */}
        <path
          d="M 140 160 C 170 170, 185 155, 175 140 C 168 130, 155 145, 138 150 Z"
          fill="url(#bodyGrad)"
          stroke="#D97706"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Tail spike */}
        <polygon points="172,137 182,143 170,147" fill="url(#hornGrad)" />

        {/* Back Spikes */}
        <polygon points="68,48 70,36 78,44" fill="url(#hornGrad)" />
        <polygon points="122,48 130,36 132,48" fill="url(#hornGrad)" />
        <polygon points="144,80 156,76 148,90" fill="url(#hornGrad)" />
        <polygon points="147,105 159,102 149,115" fill="url(#hornGrad)" />

        {/* Cute Dragon Horns */}
        <path
          d="M 65 52 C 58 35, 48 30, 42 38 C 45 48, 55 52, 63 56 Z"
          fill="url(#hornGrad)"
          stroke="#E11D48"
          strokeWidth="1.5"
        />
        <path
          d="M 135 52 C 142 35, 152 30, 158 38 C 155 48, 145 52, 137 56 Z"
          fill="url(#hornGrad)"
          stroke="#E11D48"
          strokeWidth="1.5"
        />

        {/* Main Chubby Body + Head (Iconic Pear Shape) */}
        <path
          d="M 100 45 
             C 145 45, 158 80, 155 110 
             C 152 135, 170 165, 150 190 
             C 130 210, 70 210, 50 190 
             C 30 165, 48 135, 45 110 
             C 42 80, 55 45, 100 45 Z"
          fill="url(#bodyGrad)"
          stroke="#D97706"
          strokeWidth="3.5"
        />

        {/* Chubby Belly */}
        <ellipse
          cx="100"
          cy="148"
          rx="44"
          ry="38"
          fill="url(#bellyGrad)"
          stroke="#FBBF24"
          strokeWidth="2"
        />

        {/* Belly subtle rolls/folds */}
        <path
          d="M 90 145 C 97 149, 103 149, 110 145"
          stroke="#F59E0B"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Little chubby feet */}
        <ellipse
          cx="70"
          cy="195"
          rx="18"
          ry="11"
          fill="#FFD11A"
          stroke="#D97706"
          strokeWidth="3"
        />
        <ellipse
          cx="130"
          cy="195"
          rx="18"
          ry="11"
          fill="#FFD11A"
          stroke="#D97706"
          strokeWidth="3"
        />

        {/* Rosy Blushing Cheeks */}
        <ellipse cx="62" cy="115" rx="12" ry="7" fill="url(#cheekGrad)" />
        <ellipse cx="138" cy="115" rx="12" ry="7" fill="url(#cheekGrad)" />

        {/* Big Cute Expressive Eyes */}
        <g className="animate-wiggle origin-center">
          {/* Left Eye */}
          <ellipse cx="78" cy="95" rx="11" ry="14" fill="#1E1B4B" />
          <ellipse cx="75" cy="90" rx="4.5" ry="5.5" fill="#FFFFFF" />
          <circle cx="82" cy="101" r="2.2" fill="#FFFFFF" />

          {/* Right Eye */}
          <ellipse cx="122" cy="95" rx="11" ry="14" fill="#1E1B4B" />
          <ellipse cx="119" cy="90" rx="4.5" ry="5.5" fill="#FFFFFF" />
          <circle cx="126" cy="101" r="2.2" fill="#FFFFFF" />
        </g>

        {/* Nostrils */}
        <circle cx="95" cy="104" r="2" fill="#D97706" />
        <circle cx="105" cy="104" r="2" fill="#D97706" />

        {/* Mouth depending on mood */}
        {mood === 'pleading' ? (
          // Pleading wobbly cute mouth
          <path
            d="M 92 118 Q 100 114 108 118"
            stroke="#92400E"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          // Happy smiling open mouth
          <g>
            <path
              d="M 90 113 Q 100 126 110 113"
              fill="#BE123C"
              stroke="#92400E"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Cute tongue */}
            <path
              d="M 94 117 Q 100 124 106 117 Z"
              fill="#FDA4AF"
            />
          </g>
        )}

        {/* Cute Hands holding a glowing heart */}
        <g className="animate-bounce-slow">
          {/* Left Hand */}
          <ellipse
            cx="60"
            cy="142"
            rx="11"
            ry="9"
            transform="rotate(25 60 142)"
            fill="#FFD11A"
            stroke="#D97706"
            strokeWidth="2.5"
          />

          {/* Right Hand */}
          <ellipse
            cx="140"
            cy="142"
            rx="11"
            ry="9"
            transform="rotate(-25 140 142)"
            fill="#FFD11A"
            stroke="#D97706"
            strokeWidth="2.5"
          />

          {/* Cute Heart in hands */}
          <path
            d="M 100 148 C 96 137, 83 138, 86 148 C 88 156, 100 165, 100 165 C 100 165, 112 156, 114 148 C 117 138, 104 137, 100 148 Z"
            fill="#FF4365"
            stroke="#FFFFFF"
            strokeWidth="2"
            filter="drop-shadow(0 2px 4px rgba(255, 67, 101, 0.4))"
          />
        </g>
      </svg>
    </div>
  );
};
