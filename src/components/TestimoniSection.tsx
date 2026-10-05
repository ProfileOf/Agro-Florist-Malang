'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const dummyTestimoni = [
  {
    id: 1,
    nama: 'Siti Rahayu',
    jabatanAtauKota: 'Malang',
    pesan:
      'Karangan bunganya sangat cantik dan rapi! Pengiriman tepat waktu, bunga masih sangat segar sampai tujuan. Sangat puas dan akan order lagi.',
    rating: 5,
    initials: 'SR',
    color: 'bg-pink-400',
  },
  {
    id: 2,
    nama: 'PT Sekawan Media',
    jabatanAtauKota: 'Grand Opening Kantor Baru',
    pesan:
      'Kami memesan standing flower untuk grand opening kantor. Hasilnya mewah, sangat sesuai ekspektasi. Tim Agro Florist sangat profesional dan responsif.',
    rating: 5,
    initials: 'SM',
    color: 'bg-blue-400',
  },
  {
    id: 3,
    nama: 'Budi Santoso',
    jabatanAtauKota: 'Kepanjen, Malang',
    pesan:
      'Papan bunga duka cita yang dikirim sangat layak dan bermartabat. Keluarga kami sangat berterima kasih atas pelayanan yang cepat dan harga yang terjangkau.',
    rating: 5,
    initials: 'BS',
    color: 'bg-[#14532D]',
  },
  {
    id: 4,
    nama: 'Dewi Lestari',
    jabatanAtauKota: 'Pengantin — Malang',
    pesan:
      'Buket pernikahan kami sangat indah! Warna dan pilihan bunganya persis seperti yang saya mau. Kak florist sangat sabar dan mau revisi desain sampai cocok.',
    rating: 5,
    initials: 'DL',
    color: 'bg-purple-400',
  },
  {
    id: 5,
    nama: 'Rizky Firmansyah',
    jabatanAtauKota: 'Blimbing, Malang',
    pesan:
      'Beli buket wisuda untuk adik. Hasilnya bagus banget, bunga segar, harga bersahabat. Packing juga aman, sampai rumah masih cantik. Recommended!',
    rating: 5,
    initials: 'RF',
    color: 'bg-orange-400',
  },
  {
    id: 6,
    nama: 'CV Maju Bersama',
    jabatanAtauKota: 'Launching Produk',
    pesan:
      'Sudah 3x order untuk event perusahaan kami. Selalu puas dengan hasilnya! Responsif di WhatsApp, pengiriman on time, dan bunga selalu segar.',
    rating: 5,
    initials: 'MB',
    color: 'bg-teal-500',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Rating ${rating} dari 5 bintang`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${
            s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimoniCard({ t }: { t: (typeof dummyTestimoni)[0] }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/60 flex flex-col gap-4 h-full">
      {/* Quote + stars */}
      <div className="flex items-start justify-between">
        <div className="w-8 h-8 rounded-lg bg-[#14532D]/8 flex items-center justify-center">
          <Quote
            className="w-4 h-4 text-[#14532D]/40 fill-[#14532D]/15"
            aria-hidden="true"
          />
        </div>
        <StarRating rating={t.rating} />
      </div>

      {/* Review */}
      <p className="text-gray-600 text-[14px] leading-relaxed flex-1">
        &ldquo;{t.pesan}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
        <div
          className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}
          aria-hidden="true"
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{t.nama}</p>
          {t.jabatanAtauKota && (
            <p className="text-xs text-gray-400 mt-0.5">{t.jabatanAtauKota}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TestimoniSection() {
  // Desktop: 3 cards visible → max index = total - 3
  // Mobile:  1 card  visible → max index = total - 1
  const total = dummyTestimoni.length;
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);
  const autoRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = (e: MediaQueryListEvent | MediaQueryList) =>
      setIsMobile(e.matches);
    update(mq);
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = total - visibleCount;

  // Clamp index when breakpoint changes
  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setDirection(dir);
      setIndex((prev) => {
        const next = prev + dir;
        if (next < 0) return maxIndex;
        if (next > maxIndex) return 0;
        return next;
      });
    },
    [maxIndex],
  );

  // Auto-play every 5 s
  const resetAuto = useCallback(() => {
    if (autoRef.current) clearTimeout(autoRef.current);
    autoRef.current = setTimeout(() => goTo(1), 5000);
  }, [goTo]);

  useEffect(() => {
    resetAuto();
    return () => {
      if (autoRef.current) clearTimeout(autoRef.current);
    };
  }, [index, resetAuto]);

  const handlePrev = () => {
    goTo(-1);
    resetAuto();
  };
  const handleNext = () => {
    goTo(1);
    resetAuto();
  };

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const visibleCards = dummyTestimoni.slice(index, index + visibleCount);

  return (
    <section id="testimoni" className="relative py-20 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/bg.jpg"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-center"
        quality={80}
        priority={false}
      />
      {/* Overlay — hijau gelap semi-transparan supaya card & teks terbaca */}
      <div className="absolute inset-0 bg-[#0D3320]/70" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-white/15 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase border border-white/20">
            Kata Mereka
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-white mb-3">
            Testimoni Pelanggan
          </h2>
          <p className="text-white/75 max-w-md mx-auto text-[15px] leading-relaxed">
            Lebih dari 500 pelanggan telah mempercayakan momen spesial mereka
            kepada Agro Florist Malang.
          </p>
        </motion.div>

        {/* Slider */}
        <div className="relative">
          {/* Cards area */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className={`grid gap-5 ${
                  isMobile
                    ? 'grid-cols-1'
                    : 'grid-cols-3'
                }`}
              >
                {visibleCards.map((t) => (
                  <TestimoniCard key={t.id} t={t} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nav buttons */}
          <button
            onClick={handlePrev}
            aria-label="Testimoni sebelumnya"
            className="absolute -left-4 sm:-left-5 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm
              flex items-center justify-center text-[#14532D]
              hover:bg-[#14532D] hover:text-white hover:border-[#14532D]
              transition-colors duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Testimoni berikutnya"
            className="absolute -right-4 sm:-right-5 top-1/2 -translate-y-1/2 z-10
              w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm
              flex items-center justify-center text-[#14532D]
              hover:bg-[#14532D] hover:text-white hover:border-[#14532D]
              transition-colors duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Navigasi testimoni">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Halaman ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
                resetAuto();
              }}
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
