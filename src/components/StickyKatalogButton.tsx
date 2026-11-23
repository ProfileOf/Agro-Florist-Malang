'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

const KATEGORI_EMOJI: Record<string, string> = {
  'duka-cita': '🌿',
  wedding: '💍',
  'grand-opening': '🎊',
  'selamat-sukses': '🎉',
  buket: '💐',
  'bunga-standing': '🪴',
  'bibit-tanaman': '🌱',
  'fresh-flowers': '🌹',
};

type Props = {
  kategori: string;
  kategoriLabel: string;
};

export default function StickyKatalogButton({ kategori, kategoriLabel }: Props) {
  const emoji = KATEGORI_EMOJI[kategori] || '🌸';

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 pointer-events-none">
      <motion.div
        animate={{
          y: [0, -7, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className="pointer-events-auto"
      >
        <Link
          href={`/katalog?kategori=${kategori}`}
          className="group relative flex items-center justify-between sm:justify-start gap-3 sm:gap-4 bg-gradient-to-r from-[#22c55e] via-[#10b981] to-[#059669] text-white px-5 py-3 sm:px-6 sm:py-3.5 rounded-full shadow-[0_12px_36px_rgba(34,197,94,0.45)] border-2 border-white/60 hover:shadow-[0_16px_45px_rgba(34,197,94,0.65)] transition-all duration-300 hover:scale-105 active:scale-95"
          aria-label={`Buka Katalog ${kategoriLabel}`}
        >
          {/* Subtle Outer Glow Halo */}
          <span
            className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#4ade80] to-[#10b981] opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300 -z-10"
            aria-hidden="true"
          />

          {/* Left Content */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Animated Icon Pill */}
            <div className="relative w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/40 shadow-inner">
              <span className="text-base group-hover:scale-125 transition-transform duration-300" aria-hidden="true">
                {emoji}
              </span>
              {/* Ping Radar Dot */}
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-300 rounded-full" />
            </div>

            <div className="flex flex-col text-left min-w-0">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-emerald-100 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-yellow-300 fill-yellow-300" aria-hidden="true" />
                Siap Kirim Malang
              </span>
              <span className="text-sm sm:text-base font-extrabold text-white truncate drop-shadow-sm">
                Lihat Katalog {kategoriLabel}
              </span>
            </div>
          </div>

          {/* Right Action Button Pill */}
          <div className="shrink-0 flex items-center gap-1 bg-white text-[#14532D] text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md group-hover:bg-[#FAF9F5] group-hover:translate-x-0.5 transition-all">
            <ShoppingBag className="w-3.5 h-3.5 text-[#22c55e]" aria-hidden="true" />
            <span className="hidden xs:inline sm:inline">Buka Katalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#14532D] group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
