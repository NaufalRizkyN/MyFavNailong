'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, ArrowLeft, Send, Check } from 'lucide-react';
import { soundFX } from '@/lib/soundEffects';

interface LetterViewProps {
  onBack: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const HEART_COLORS = ['#FF4365', '#F472B6', '#FB7185', '#F59E0B', '#A855F7', '#EC4899'];

export const LetterView: React.FC<LetterViewProps> = ({ onBack }) => {
  const [hugCount, setHugCount] = useState(0);
  const [copied, setCopied] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Initial celebration confetti when opening the letter
    soundFX.playSparkle();
    const end = Date.now() + 1200;
    const colors = ['#f59e0b', '#ec4899', '#38bdf8', '#fbbf24', '#f43f5e'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  // Handle clicking anywhere on screen to spawn cute floating hearts
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
      size: Math.floor(Math.random() * 16) + 18,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    };

    setFloatingHearts((prev) => [...prev.slice(-15), newHeart]);
    soundFX.playPop();

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);
  };

  const handleSendHug = () => {
    soundFX.playSparkle();
    setHugCount((prev) => prev + 1);

    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#FF4365', '#F59E0B', '#EC4899', '#FBBF24'],
    });
  };

  const handleCopy = () => {
    const fullText = `terimacii yaww sudaa mauu bacaa pesan singkat ku inii, aku cuman mau bilang aku minta maaf buat semuanya yg sebelumnya aku lakuin atau hal hal lainnya yg mungkin belom sempet kamu obrolin ke aku aku cuman bisa minta maaf dan gabakal ada pernyataan "pembenaran" dari aku karna itu pure kesalahan ku sendiri even belom ada kata balikan atau semacamnya cuman seharusnya aku uda memposisikan diriku sebagai pacarmu. Disini juga aku mau ngomong kalo aku ga minta ko buat kamu ngasih aku ruang lagi atau semacamnya, wa ku dibales aja uda happy banget hihiii cuman aku mau ntar kalo aku uda jadi yg kamu mau pls bgt di coba lagi yaa☹️, aku gatau harus gimana beneran aku pure linglung kalo gaada km bahkan saat nulis ini aja aku sambil mabuk karna gatau kenapa rasanya sakit aja liat km main sampe ke pantai bareng cowo² hehehe uda deh gitu aja yg mau ku bicarain terimacii yaaaa dan sekali lagi aku minta maaf banget buat kejadian kejadian yg uda ku lakuin. Cemangat ya buat TA nyaaa. I love you so much babe🫶🏻\n\n*note\nini pesanku gausa kamu bales ya, cukup di baca aja dan gausa di reply lagi di dalam chat wa karna aku juga ga buru buru in kamu buat jawab perihal yg ku mau itu (balikan) jadi ya yauda keep aja jawabanmu dan fokus aja sama yg sekarang kamu lakuin`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={handleContainerClick}
      className="relative min-h-screen py-10 px-4 sm:px-6 max-w-3xl mx-auto flex flex-col items-center justify-center cursor-pointer"
    >
      {/* Floating Hearts Click Particles */}
      {floatingHearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute pointer-events-none transition-all ease-out z-50"
          style={{
            left: `${heart.x}px`,
            top: `${heart.y}px`,
            fontSize: `${heart.size}px`,
            color: heart.color,
            animation: 'floatParticle 1.8s forwards',
          }}
        >
          💖
        </span>
      ))}

      {/* Navigation Top Bar */}
      <div className="w-full flex items-center justify-between mb-6 z-10" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onBack}
          type="button"
          className="flex items-center gap-2 bg-white/80 hover:bg-white text-slate-700 hover:text-amber-600 px-4 py-2 rounded-full font-bold text-sm shadow-md border border-white/60 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2 bg-amber-200/80 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-semibold border border-amber-300 shadow-sm">
          <span>🦖 Special for My Nailong</span>
        </div>
      </div>

      {/* Main Letter Card */}
      <div
        className="w-full glass-panel-darker rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cute Top Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400" />

        {/* Decorative Stamps & Tags */}
        <div className="flex items-center justify-between border-b border-amber-200/70 pb-5 mb-7">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-200 flex items-center justify-center text-2xl shadow-inner border-2 border-white">
              💌
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-800 tracking-tight">
                Pesan Tulus Buat Kamu
              </h2>
              <p className="text-xs text-amber-700/80 font-semibold">
                Dari lubuk hati yang paling dalam 💛
              </p>
            </div>
          </div>

          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] font-mono text-slate-400 bg-white/70 px-2.5 py-1 rounded-full border border-slate-200">
              Personal Letter ✨
            </span>
          </div>
        </div>

        {/* The Exact Message Content */}
        <div className="space-y-5 text-slate-700 text-sm sm:text-base leading-relaxed tracking-normal font-medium">
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100/80">
            <p className="text-amber-950">
              terimacii yaww sudaa mauu bacaa pesan singkat ku inii, aku cuman mau bilang aku minta maaf buat semuanya yg sebelumnya aku lakuin atau hal hal lainnya yg mungkin belom sempet kamu obrolin ke aku aku cuman bisa minta maaf dan gabakal ada pernyataan &quot;pembenaran&quot; dari aku karna itu pure kesalahan ku sendiri even belom ada kata balikan atau semacamnya cuman seharusnya aku uda memposisikan diriku sebagai pacarmu.
            </p>
          </div>

          <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100/80">
            <p className="text-rose-950">
              Disini juga aku mau ngomong kalo aku ga minta ko buat kamu ngasih aku ruang lagi atau semacamnya, wa ku dibales aja uda happy banget hihiii cuman aku mau ntar kalo aku uda jadi yg kamu mau pls bgt di coba lagi yaa☹️, aku gatau harus gimana beneran aku pure linglung kalo gaada kamu bahkan saat nulis ini aja aku sambil minum karna gatau kenapa rasanya sakit aja liat km main sampe ke pantai bareng cowo² hehehe uda deh gitu aja yg mau ku bicarain terimacii yaaaa dan sekali lagi aku minta maaf banget buat kejadian kejadian yg uda ku lakuin.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-100/80 via-pink-100/80 to-purple-100/80 p-4 sm:p-5 rounded-2xl border-2 border-dashed border-amber-300 text-slate-800 text-center font-bold sm:text-lg shadow-sm">
            <p>
              Cemangat ya buat TA nyaaa. I love you so much babe🫶🏻
            </p>
          </div>

          {/* Distinct Note Card as requested */}
          <div className="mt-8 relative pt-2">
            <div className="absolute -top-1 left-4 bg-amber-400 text-amber-950 text-xs font-black px-3 py-0.5 rounded-full shadow-sm tracking-wider uppercase">
              *note
            </div>
            <div className="bg-gradient-to-br from-amber-100/70 to-orange-50/90 rounded-2xl p-4 sm:p-5 border-2 border-amber-200 shadow-sm text-amber-950 italic text-xs sm:text-sm leading-relaxed">
              &quot;ini pesanku gausa kamu bales ya, cukup di baca aja dan gausa di reply lagi di dalam chat wa karna aku juga ga buru buru in kamu buat jawab perihal yg ku mau itu (balikan) jadi ya yauda keep aja jawabanmu dan fokus aja sama yg sekarang kamu lakuin&quot;
            </div>
          </div>
        </div>

        {/* Interactive Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleSendHug}
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-rose-400/30 flex items-center justify-center gap-2 transition-transform active:scale-95 group text-sm sm:text-base"
          >
            <Heart className="w-5 h-5 fill-white group-hover:scale-125 transition-transform" />
            <span>Kirim Pelukan & Cinta 🫶🏻</span>
            {hugCount > 0 && (
              <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-extrabold">
                +{hugCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopy}
              type="button"
              className="w-full sm:w-auto bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-700 font-bold px-4 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 transition-all active:scale-95 text-xs sm:text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600">Tersalin! ✨</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Salin Pesan</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Floating hints */}
      <p className="mt-4 text-xs text-slate-500/80 text-center select-none">
        💡 Tips: Klik di mana saja pada layar untuk memunculkan efek hati melayang 💖
      </p>
    </div>
  );
};
