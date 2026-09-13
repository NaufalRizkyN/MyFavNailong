'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { soundFX } from '@/lib/soundEffects';

const FUNNY_MESSAGES = [
  "Eitss ga kenaa! 😜",
  "Gabisa di-klik wkwk 😝",
  "Pencet yang 'okay' ajaa please 🥺",
  "Tombol ini mogok kerja kak! 🏃‍♂️💨",
  "Hayo mau ngejar kemana lagi? 😂",
  "Gaboleh nolak yaa :P",
  "Udaah jangan dipencet, pencet yang kuning/hijau aja! ✨",
  "Nyerah kan? Wkwk 🤭",
  "Yah kabur lagi ke pojokan 👻",
  "Tangkap aku kalau bisaa! 💨"
];

export const RunawayButton: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isMoved, setIsMoved] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate a new safe random position within viewport
  const moveButton = useCallback(() => {
    soundFX.playBoing();

    if (typeof window === 'undefined') return;

    // Viewport dimensions with padding
    const padding = 24;
    const btnWidth = buttonRef.current?.offsetWidth || 180;
    const btnHeight = buttonRef.current?.offsetHeight || 56;

    const maxX = window.innerWidth - btnWidth - padding;
    const maxY = window.innerHeight - btnHeight - padding;

    // Generate random coordinates within screen
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding + 60, Math.floor(Math.random() * maxY));

    setPosition({ x: randomX, y: randomY });
    setIsMoved(true);

    // Update message
    setAttemptCount((prev) => {
      const next = prev + 1;
      const msgIndex = (next - 1) % FUNNY_MESSAGES.length;
      setMessage(FUNNY_MESSAGES[msgIndex]);

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      messageTimeoutRef.current = setTimeout(() => {
        setMessage(null);
      }, 2500);

      return next;
    });
  }, []);

  // Handle mobile touch or desktop click/hover attempts
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    moveButton();
  };

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      {/* Speech bubble showing teasing funny text */}
      {message && (
        <div
          className={`fixed z-50 transition-all duration-300 pointer-events-none animate-bounce-slow`}
          style={
            position
              ? {
                  left: `${Math.min(Math.max(16, position.x - 20), (typeof window !== 'undefined' ? window.innerWidth - 240 : 200))}px`,
                  top: `${Math.max(16, position.y - 54)}px`,
                }
              : {
                  left: '50%',
                  transform: 'translateX(-50%)',
                  top: '-48px',
                }
          }
        >
          <div className="bg-white/95 text-rose-600 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg border-2 border-rose-200 flex items-center gap-1.5 whitespace-nowrap">
            <span>{message}</span>
            {attemptCount > 3 && (
              <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full">
                x{attemptCount}
              </span>
            )}
          </div>
        </div>
      )}

      {/* The Runaway Button */}
      <button
        ref={buttonRef}
        type="button"
        onMouseEnter={moveButton}
        onClick={handleInteraction}
        onTouchStart={handleInteraction}
        className={`select-none font-bold text-slate-600 bg-white/80 hover:bg-rose-50 active:bg-rose-100 border-2 border-slate-300 hover:border-rose-400 px-6 py-3.5 rounded-2xl shadow-md backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2 cursor-not-allowed group text-sm sm:text-base ${
          isMoved ? 'fixed z-40' : 'relative'
        }`}
        style={
          position
            ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }
            : {}
        }
        aria-label="gamau dan males"
      >
        <span className="group-hover:rotate-12 transition-transform duration-200">😝</span>
        <span>gamau dan males</span>
      </button>
    </div>
  );
};
