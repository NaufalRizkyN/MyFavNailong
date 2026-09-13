'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export const BackgroundMusic: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPlayingRef = useRef(false);

  // Gentle romantic chord notes (frequencies in Hz)
  // Progression: Fmaj7 -> G -> Em7 -> Am7 (warm romantic melody)
  const progression = [
    // Chord 1: Fmaj7 (F3, A3, C4, E4)
    [174.61, 220.00, 261.63, 329.63],
    // Melody notes
    [349.23, 392.00, 329.63],
    // Chord 2: G (G3, B3, D4, G4)
    [196.00, 246.94, 293.66, 392.00],
    // Melody notes
    [392.00, 440.00, 329.63],
    // Chord 3: Em7 (E3, G3, B3, D4)
    [164.81, 196.00, 246.94, 293.66],
    // Melody notes
    [329.63, 293.66, 261.63],
    // Chord 4: Am7 (A3, C4, E4, G4)
    [220.00, 261.63, 329.63, 392.00],
    // Melody notes
    [261.63, 293.66, 329.63],
  ];

  const playChordNote = (ctx: AudioContext, freq: number, duration: number, gainValue = 0.04) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft electric piano / warm sine
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignored
    }
  };

  const startMelodyLoop = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    let step = 0;
    const intervalTime = 1400; // ms per chord change

    const tick = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;

      const currentChord = progression[step % progression.length];
      currentChord.forEach((freq, idx) => {
        // Slight arpeggio delay
        setTimeout(() => {
          if (isPlayingRef.current && audioCtxRef.current) {
            playChordNote(audioCtxRef.current, freq, 2.2, 0.035);
          }
        }, idx * 100);
      });

      step++;
      timerRef.current = setTimeout(tick, intervalTime);
    };

    tick();
  }, []);

  const stopMelody = useCallback(() => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const toggleMusic = () => {
    setHasInteracted(true);
    if (isPlaying) {
      stopMelody();
    } else {
      startMelodyLoop();
    }
  };

  useEffect(() => {
    return () => {
      stopMelody();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [stopMelody]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMusic}
        type="button"
        title={isPlaying ? "Matikan Musik Latar" : "Putar Musik Latar Lembut"}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs shadow-lg backdrop-blur-md transition-all duration-300 ${
          isPlaying
            ? 'bg-amber-400/90 text-amber-950 border-2 border-amber-300 ring-2 ring-amber-400/30 scale-105'
            : 'bg-white/80 text-slate-600 border-2 border-slate-200 hover:bg-white hover:text-amber-600'
        }`}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-4 h-4 animate-bounce" />
            <span className="hidden sm:inline">BGM: On 🎶</span>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-1 bg-amber-950 h-3 animate-pulse" />
              <span className="w-1 bg-amber-950 h-2 animate-pulse delay-75" />
              <span className="w-1 bg-amber-950 h-3 animate-pulse delay-150" />
            </div>
          </>
        ) : (
          <>
            <Music className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Play BGM 🎵</span>
          </>
        )}
      </button>

      {!hasInteracted && (
        <div className="absolute top-11 right-0 text-[11px] bg-white/95 text-amber-800 px-2.5 py-1 rounded-lg shadow-md border border-amber-200 pointer-events-none whitespace-nowrap animate-bounce-slow">
          🎵 Klik untuk musik santai
        </div>
      )}
    </div>
  );
};
