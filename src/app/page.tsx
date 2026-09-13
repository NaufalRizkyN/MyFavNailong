'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { NailongMascot } from '@/components/NailongMascot';
import { RunawayButton } from '@/components/RunawayButton';
import { LetterView } from '@/components/LetterView';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { soundFX } from '@/lib/soundEffects';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'welcome' | 'letter'>('welcome');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleOkayClick = () => {
    soundFX.playSparkle();

    // Trigger colorful confetti burst
    confetti({
      particleCount: 80,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFD166', '#FF6584', '#06D6A0', '#118AB2', '#A855F7'],
    });

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('letter');
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  const handleBackToWelcome = () => {
    soundFX.playPop();
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('welcome');
      setIsTransitioning(false);
    }, 350);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-yellow-100 via-rose-100 to-sky-100 flex flex-col justify-center items-center p-4 selection:bg-amber-300">
      {/* Persistent BGM Toggle */}
      <BackgroundMusic />

      {/* Ambient Colorful Background Blobs & Floating Bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-amber-300/30 blur-3xl animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-300/30 blur-3xl animate-float-reverse" />
        <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-sky-200/30 blur-3xl animate-pulse-glow" />

        {/* Little Floating Decorative Sparkles & Hearts */}
        <span className="absolute top-[15%] left-[12%] text-2xl animate-float opacity-70">⭐</span>
        <span className="absolute top-[25%] right-[15%] text-2xl animate-wiggle opacity-60">✨</span>
        <span className="absolute bottom-[20%] left-[10%] text-3xl animate-bounce-slow opacity-65">💛</span>
        <span className="absolute bottom-[30%] right-[12%] text-2xl animate-float-reverse opacity-75">🌸</span>
        <span className="absolute top-[60%] left-[8%] text-2xl animate-wiggle opacity-55">☁️</span>
        <span className="absolute top-[70%] right-[18%] text-2xl animate-float opacity-60">🦖</span>
      </div>

      {/* Main Dynamic View Transition */}
      <div
        className={`w-full relative z-10 transition-all duration-400 transform ${
          isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {currentPage === 'welcome' ? (
          <div className="max-w-xl mx-auto flex flex-col items-center justify-center min-h-screen py-10 px-4 text-center">
            {/* Top Cute Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/80 border border-amber-300/70 text-amber-900 font-bold px-4 py-1.5 rounded-full shadow-sm text-xs sm:text-sm mb-4 animate-bounce-slow backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Ada yang mau ngomong sesuatu nih...</span>
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            </div>

            {/* Mascot: Cute Nailong */}
            <div className="my-2">
              <NailongMascot mood="happy" />
            </div>

            {/* Title: Exact text required "Buat My Fav Nailong" */}
            <h1 className="text-3xl sm:text-5xl font-black font-heading tracking-tight mt-3 mb-2 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
              Buat My Fav Nailong
            </h1>

            {/* Statement: Exact text required "please dibaca yaa huhu" */}
            <p className="text-slate-600 font-semibold text-base sm:text-xl mb-8 flex items-center justify-center gap-2">
              <span>please dibaca yaa huhu</span>
              <span className="inline-block animate-wiggle">🥺👉👈</span>
            </p>

            {/* Interactive Decision Buttons Box */}
            <div className="w-full glass-panel rounded-3xl p-6 sm:p-8 shadow-xl relative border-2 border-white/80">
              <p className="text-xs sm:text-sm font-bold text-slate-500 mb-6 uppercase tracking-wider">
                Mau baca suratnya sekarang kan? 👇
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 min-h-[120px]">
                {/* Tombol 1: "okay" */}
                <button
                  type="button"
                  onClick={handleOkayClick}
                  className="w-full sm:w-auto relative group overflow-hidden bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-black text-base sm:text-lg px-8 py-4 rounded-2xl shadow-lg shadow-amber-400/40 hover:shadow-amber-400/60 active:scale-95 transition-all duration-200 border-2 border-amber-200 flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-amber-950 text-amber-950 group-hover:scale-125 transition-transform" />
                  <span>okay</span>
                  <span className="inline-block group-hover:translate-x-1 transition-transform">✨</span>
                </button>

                {/* Tombol 2: "gamau dan males" (Runaway Button) */}
                <RunawayButton />
              </div>
            </div>

            {/* Bottom playful footnote */}
            <p className="mt-8 text-xs text-slate-500/80 font-medium">
              Dibuat dengan segenap rasa & ketulusan 💛
            </p>
          </div>
        ) : (
          <LetterView onBack={handleBackToWelcome} />
        )}
      </div>
    </main>
  );
}
