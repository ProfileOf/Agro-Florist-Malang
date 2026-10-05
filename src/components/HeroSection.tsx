'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// const categories = [
//   { label: 'Duka Cita', href: '/katalog?kategori=duka-cita' },
//   { label: 'Wedding', href: '/katalog?kategori=wedding' },
//   { label: 'Grand Opening', href: '/katalog?kategori=grand-opening' },
//   { label: 'Buket', href: '/katalog?kategori=buket' },
// ];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0B3B2C] to-[#14532D]"
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />

      {/* 1/4 circle accent — pojok kanan bawah */}
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-tl-full bg-[#0B3B2C]/60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-10 pb-0 w-full">
        <div className="grid md:grid-cols-2 gap-8 items-center">

          {/* ── Left — copy ── */}
          <div className="pb-16 pt-16 md:pb-24">

            {/* Trust badges */}
            {/* <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-6"
            >
              <span className="text-white/70 text-xs font-medium tracking-wide">🚚 Kirim hari yang sama</span>
              <span className="text-white/30 text-xs hidden sm:inline">·</span>
              <span className="text-white/70 text-xs font-medium tracking-wide">💐 Mulai Rp75.000</span>
            </motion.div> */}

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="font-[family-name:var(--font-display)] font-semibold text-white leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              Bunga untuk<br />
              Setiap Momen{' '}
              <em className="text-[#CFE8C8] not-italic italic">Bermakna.</em>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-white/80 text-[17px] sm:text-[18px] leading-relaxed mb-8 max-w-sm"
            >
              Papan bunga duka cita, wedding, grand opening, sampai buket personal.
              Dirangkai profesional, diantar ke seluruh Malang.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="https://wa.me/6281234567890?text=Halo%20Agro%20Florist%2C%20saya%20mau%20pesan..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pesan via WhatsApp
              </a>
              <button
                onClick={() => document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-all cursor-pointer text-sm"
              >
                Lihat Katalog
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </motion.div>

            {/* Category chips */}
            {/* <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.35 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="text-xs font-medium text-white/70 border border-white/20 px-3 py-1.5 rounded-full hover:bg-white/10 hover:text-white transition-all"
                >
                  {cat.label}
                </Link>
              ))}
            </motion.div> */}

          </div>

          {/* ── Right — buket keluar dari arch frame ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-[340px] lg:max-w-[420px]">

              {/* Layer 1 (bawah): Arch frame */}
              <div
                aria-hidden="true"
                className="absolute inset-x-6 bottom-0 top-[12%] rounded-t-full bg-[#0B3B2C]/50 ring-1 ring-white/10 z-0"
              />

              {/* Layer 2 (atas): Buket — keluar dari frame */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <Image
                  src="/images/buket.png"
                  alt="Buket bunga cantik dari Agro Florist Malang"
                  width={500}
                  height={600}
                  priority
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              {/* Floating card — duka cita */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute top-[18%] -left-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-xl"
                aria-hidden="true"
              >
                <span className="text-2xl">🌿</span>
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Duka Cita</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Mulai Rp150rb</p>
                </div>
              </motion.div>

              {/* Floating card — wedding */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute bottom-[15%] -right-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-3 py-2.5 flex items-center gap-2.5 shadow-xl"
                aria-hidden="true"
              >
                <span className="text-2xl">💍</span>
                <div>
                  <p className="text-white text-xs font-semibold leading-none">Wedding</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Mulai Rp350rb</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Corner decorations — pojok bawah kiri */}
      <motion.div
        className="absolute bottom-0 left-0 pointer-events-none select-none z-10"
        initial={{ opacity: 0, x: -60, y: 60 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        style={{ transformOrigin: 'bottom left' }}
      >
        <motion.div
          animate={{ rotate: [-4, 4, -4] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{ transformOrigin: 'bottom left' }}
        >
          <Image
            src="/images/corner.png"
            alt=""
            width={220}
            height={220}
            aria-hidden="true"
            className="w-[150px] sm:w-[180px] lg:w-[220px] h-auto"
            style={{ transform: 'scaleX(-1)' }}
          />
        </motion.div>
      </motion.div>

      {/* Corner decorations — pojok bawah kanan */}
      <motion.div
        className="absolute bottom-0 right-0 pointer-events-none select-none z-10"
        initial={{ opacity: 0, x: 60, y: 60 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
        style={{ transformOrigin: 'bottom right' }}
      >
        <motion.div
          animate={{ rotate: [4, -4, 4] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{ transformOrigin: 'bottom right' }}
        >
          <Image
            src="/images/corner.png"
            alt=""
            width={220}
            height={220}
            aria-hidden="true"
            className="w-[150px] sm:w-[180px] lg:w-[220px] h-auto"
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/40"
        aria-hidden="true"
      >
        <div className="w-5 h-8 border border-white/20 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-white/30 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
