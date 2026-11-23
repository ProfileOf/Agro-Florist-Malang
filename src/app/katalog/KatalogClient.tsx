'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  ArrowLeft,
  Search,
  Tag,
  ArrowUpDown,
  ChevronDown,
  Check,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { KATEGORI_LABEL, type Produk } from '@/lib/dummyKatalog';

type FilterKategori = Produk['kategori'] | 'semua';
type SortOption = 'default' | 'terendah' | 'tertinggi';

const SORT_OPTIONS: { value: SortOption; label: string; shortLabel: string }[] = [
  { value: 'default', label: 'Default / Rekomendasi', shortLabel: 'Default' },
  { value: 'terendah', label: 'Harga: Terendah ke Tertinggi', shortLabel: 'Harga Terendah' },
  { value: 'tertinggi', label: 'Harga: Tertinggi ke Terendah', shortLabel: 'Harga Tertinggi' },
];

function formatRupiah(angka: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
}

const KATEGORI_TABS: FilterKategori[] = [
  'semua',
  'duka-cita',
  'wedding',
  'grand-opening',
  'selamat-sukses',
  'buket',
  'bunga-standing',
  'bibit-tanaman',
  'fresh-flowers',
];

const KATEGORI_EMOJI: Record<FilterKategori, string> = {
  semua: '🌸',
  'duka-cita': '🌿',
  wedding: '💍',
  'grand-opening': '🎊',
  'selamat-sukses': '🎉',
  buket: '💐',
  'bunga-standing': '🪴',
  'bibit-tanaman': '🌱',
  'fresh-flowers': '🌹',
};

export default function KatalogClient({ produkList }: { produkList: Produk[] }) {
  const searchParams = useSearchParams();
  const paramKategori = searchParams.get('kategori') as FilterKategori | null;
  const initialKategori: FilterKategori =
    paramKategori && KATEGORI_TABS.includes(paramKategori as FilterKategori)
      ? paramKategori
      : 'semua';

  const [aktifKategori, setAktifKategori] = useState<FilterKategori>(initialKategori);
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  const [openKategoriMobile, setOpenKategoriMobile] = useState(false);
  const [openKategoriDesktop, setOpenKategoriDesktop] = useState(false);
  const [openSortDesktop, setOpenSortDesktop] = useState(false);
  const [openSortMobile, setOpenSortMobile] = useState(false);

  const kategoriMobileRef = useRef<HTMLDivElement>(null);
  const kategoriDesktopRef = useRef<HTMLDivElement>(null);
  const sortDesktopRef = useRef<HTMLDivElement>(null);
  const sortMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (kategoriMobileRef.current && !kategoriMobileRef.current.contains(target)) {
        setOpenKategoriMobile(false);
      }
      if (kategoriDesktopRef.current && !kategoriDesktopRef.current.contains(target)) {
        setOpenKategoriDesktop(false);
      }
      if (sortDesktopRef.current && !sortDesktopRef.current.contains(target)) {
        setOpenSortDesktop(false);
      }
      if (sortMobileRef.current && !sortMobileRef.current.contains(target)) {
        setOpenSortMobile(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentSort =
    SORT_OPTIONS.find((s) => s.value === sortOption) ?? SORT_OPTIONS[0];

  const produkTampil = useMemo(() => {
    const filtered = produkList.filter((p) => {
      const cocokKategori =
        aktifKategori === 'semua' || p.kategori === aktifKategori;
      const cocokSearch =
        query.trim() === '' ||
        p.nama.toLowerCase().includes(query.toLowerCase()) ||
        p.deskripsi.toLowerCase().includes(query.toLowerCase());
      return cocokKategori && cocokSearch;
    });

    if (sortOption === 'terendah') {
      return [...filtered].sort((a, b) => a.harga - b.harga);
    }
    if (sortOption === 'tertinggi') {
      return [...filtered].sort((a, b) => b.harga - a.harga);
    }

    return filtered;
  }, [aktifKategori, query, sortOption, produkList]);

  const jumlahPerKategori = useMemo(() => {
    const map: Record<FilterKategori, number> = {
      semua: produkList.length,
      'duka-cita': 0,
      wedding: 0,
      'grand-opening': 0,
      'selamat-sukses': 0,
      buket: 0,
      'bunga-standing': 0,
      'bibit-tanaman': 0,
      'fresh-flowers': 0,
    };
    produkList.forEach((p) => {
      if (map[p.kategori] !== undefined) {
        map[p.kategori] += 1;
      }
    });
    return map;
  }, [produkList]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Page header — banner dengan bg.jpg */}
        <div className="relative text-white pt-28 pb-14 overflow-hidden">
          {/* Background image */}
          <Image
            src="/images/bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            aria-hidden="true"
          />
          {/* Overlay gelap agar teks tetap terbaca */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b4332]/85 via-[#2d6a4f]/80 to-[#1b4332]/85" aria-hidden="true" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[#52b788] hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Kembali ke Beranda
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block bg-[#52b788]/20 text-[#52b788] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  <Tag className="w-3 h-3 inline mr-1" aria-hidden="true" />
                  {produkList.length} Produk Tersedia
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-md">
                  Katalog Karangan Bunga
                </h1>
                <p className="text-[#b7e4c7] mt-2 max-w-lg">
                  Temukan rangkaian bunga terbaik untuk setiap momen spesial
                  Anda. Dibuat segar setiap hari.
                </p>
              </div>

              {/* Search box */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Cari produk..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:bg-white/20 transition-all"
                  aria-label="Cari produk"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Desktop Filter Bar: Category Dropdown + Custom Sorting Dropdown */}
          <div className="hidden md:flex items-center justify-between gap-4 mb-6">
            {/* Left: Category Dropdown */}
            <div className="flex items-center gap-3">
              <div ref={kategoriDesktopRef} className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenKategoriDesktop((prev) => !prev);
                    setOpenSortDesktop(false);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer shadow-sm ${
                    openKategoriDesktop || aktifKategori !== 'semua'
                      ? 'bg-white border-[#2d6a4f] text-[#2d6a4f] ring-2 ring-[#2d6a4f]/15'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#52b788]'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={openKategoriDesktop}
                  aria-label="Filter kategori"
                >
                  <span className="text-gray-400 text-xs font-normal">Kategori:</span>
                  <span className="text-base" aria-hidden="true">{KATEGORI_EMOJI[aktifKategori]}</span>
                  <span className="font-semibold text-gray-800">{KATEGORI_LABEL[aktifKategori]}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      aktifKategori !== 'semua'
                        ? 'bg-[#2d6a4f]/10 text-[#2d6a4f]'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {jumlahPerKategori[aktifKategori]}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openKategoriDesktop ? 'rotate-180 text-[#2d6a4f]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {openKategoriDesktop && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-1.5 z-40 max-h-[380px] overflow-y-auto"
                      role="listbox"
                    >
                      {KATEGORI_TABS.map((kat) => {
                        const isSelected = aktifKategori === kat;
                        return (
                          <button
                            key={kat}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setAktifKategori(kat);
                              setOpenKategoriDesktop(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors text-left cursor-pointer ${
                              isSelected
                                ? 'bg-[#2d6a4f] text-white shadow-sm'
                                : 'text-gray-700 hover:bg-[#d8f3dc]/60 hover:text-[#1b4332]'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-base shrink-0" aria-hidden="true">{KATEGORI_EMOJI[kat]}</span>
                              <span className="truncate">{KATEGORI_LABEL[kat]}</span>
                            </div>
                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-100 text-gray-500'
                                }`}
                              >
                                {jumlahPerKategori[kat]}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-1" aria-hidden="true" />}
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Reset filter shortcut */}
              {aktifKategori !== 'semua' && (
                <button
                  type="button"
                  onClick={() => setAktifKategori('semua')}
                  className="text-xs text-gray-500 hover:text-[#2d6a4f] font-medium hover:underline cursor-pointer transition-colors"
                >
                  Reset Kategori
                </button>
              )}
            </div>

            {/* Custom Sorting dropdown on desktop + Baca Artikel Button */}
            <div className="flex items-center gap-3">
              <Link
                href={aktifKategori === 'semua' ? '/artikel' : `/artikel/${aktifKategori}`}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#d8f3dc]/60 hover:bg-[#b7e4c7] text-[#1b4332] border border-[#52b788]/30 shadow-sm hover:shadow transition-all hover:scale-105 cursor-pointer"
                title="Baca artikel terkait"
              >
                <BookOpen className="w-4 h-4 text-[#2d6a4f]" aria-hidden="true" />
                <span>
                  {aktifKategori === 'semua'
                    ? 'Baca Artikel'
                    : `Artikel ${KATEGORI_LABEL[aktifKategori]}`}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2d6a4f]" aria-hidden="true" />
              </Link>

              <div ref={sortDesktopRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setOpenSortDesktop((prev) => !prev);
                    setOpenKategoriDesktop(false);
                  }}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer shadow-sm ${
                    openSortDesktop || sortOption !== 'default'
                      ? 'bg-white border-[#2d6a4f] text-[#2d6a4f] ring-2 ring-[#2d6a4f]/15'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#52b788]'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={openSortDesktop}
                  aria-label="Urutkan produk berdasarkan harga"
                >
                  <ArrowUpDown className="w-4 h-4 text-[#2d6a4f]" aria-hidden="true" />
                  <span>Urutkan: {currentSort.shortLabel}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                      openSortDesktop ? 'rotate-180 text-[#2d6a4f]' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence>
                  {openSortDesktop && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -6, scale: 0.98 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-1.5 z-40"
                      role="listbox"
                    >
                      {SORT_OPTIONS.map((opt) => {
                        const isSelected = sortOption === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            onClick={() => {
                              setSortOption(opt.value);
                              setOpenSortDesktop(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer ${
                              isSelected
                                ? 'bg-[#2d6a4f] text-white shadow-sm'
                                : 'text-gray-700 hover:bg-[#d8f3dc]/60 hover:text-[#1b4332]'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Mobile Filter Bar: 2 Custom Dropdowns */}
          <div className="md:hidden grid grid-cols-2 gap-2.5 mb-6">
            {/* Custom Dropdown 1: Kategori */}
            <div ref={kategoriMobileRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setOpenKategoriMobile((prev) => !prev);
                  setOpenSortMobile(false);
                }}
                className={`w-full inline-flex items-center justify-between gap-1.5 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-sm ${
                  openKategoriMobile || aktifKategori !== 'semua'
                    ? 'bg-white border-[#2d6a4f] text-[#2d6a4f] ring-2 ring-[#2d6a4f]/15'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#52b788]'
                }`}
                aria-haspopup="listbox"
                aria-expanded={openKategoriMobile}
                aria-label="Filter kategori"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-sm shrink-0" aria-hidden="true">{KATEGORI_EMOJI[aktifKategori]}</span>
                  <span className="truncate">{KATEGORI_LABEL[aktifKategori]}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    openKategoriMobile ? 'rotate-180 text-[#2d6a4f]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {openKategoriMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute left-0 mt-2 w-[calc(100vw-2rem)] max-w-[270px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-1.5 z-40"
                    role="listbox"
                  >
                    {KATEGORI_TABS.map((kat) => {
                      const isSelected = aktifKategori === kat;
                      return (
                        <button
                          key={kat}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setAktifKategori(kat);
                            setOpenKategoriMobile(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer ${
                            isSelected
                              ? 'bg-[#2d6a4f] text-white shadow-sm'
                              : 'text-gray-700 hover:bg-[#d8f3dc]/60 hover:text-[#1b4332]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-sm shrink-0" aria-hidden="true">{KATEGORI_EMOJI[kat]}</span>
                            <span className="truncate">{KATEGORI_LABEL[kat]}</span>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <span
                              className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              {jumlahPerKategori[kat]}
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" aria-hidden="true" />}
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Custom Dropdown 2: Sorting Harga */}
            <div ref={sortMobileRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setOpenSortMobile((prev) => !prev);
                  setOpenKategoriMobile(false);
                }}
                className={`w-full inline-flex items-center justify-between gap-1.5 px-3.5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer shadow-sm ${
                  openSortMobile || sortOption !== 'default'
                    ? 'bg-white border-[#2d6a4f] text-[#2d6a4f] ring-2 ring-[#2d6a4f]/15'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-[#52b788]'
                }`}
                aria-haspopup="listbox"
                aria-expanded={openSortMobile}
                aria-label="Urutkan produk berdasarkan harga"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#2d6a4f] shrink-0" aria-hidden="true" />
                  <span className="truncate">{currentSort.shortLabel}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                    openSortMobile ? 'rotate-180 text-[#2d6a4f]' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {openSortMobile && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-[250px] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-1.5 z-40"
                    role="listbox"
                  >
                    {SORT_OPTIONS.map((opt) => {
                      const isSelected = sortOption === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSortOption(opt.value);
                            setOpenSortMobile(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer ${
                            isSelected
                              ? 'bg-[#2d6a4f] text-white shadow-sm'
                              : 'text-gray-700 hover:bg-[#d8f3dc]/60 hover:text-[#1b4332]'
                          }`}
                        >
                          <span className="truncate">{opt.label}</span>
                          {isSelected && <Check className="w-4 h-4 text-white shrink-0 ml-2" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tombol Baca Artikel Kategori Mobile */}
            <Link
              href={aktifKategori === 'semua' ? '/artikel' : `/artikel/${aktifKategori}`}
              className="col-span-2 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-xs font-semibold bg-[#d8f3dc]/60 text-[#1b4332] border border-[#52b788]/30 shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#2d6a4f]" aria-hidden="true" />
              <span>
                {aktifKategori === 'semua'
                  ? 'Baca Artikel Florist'
                  : `Artikel: ${KATEGORI_LABEL[aktifKategori]}`}
              </span>
              <ArrowRight className="w-3 h-3 text-[#2d6a4f]" aria-hidden="true" />
            </Link>
          </div>

          {/* Result count */}
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Menampilkan{' '}
            <span className="font-semibold text-gray-700">{produkTampil.length}</span>{' '}
            produk
            {query && (
              <>
                {' '}untuk kata kunci{' '}
                <span className="font-semibold text-[#2d6a4f]">
                  &ldquo;{query}&rdquo;
                </span>
              </>
            )}
          </p>

          {/* Product grid */}
          <AnimatePresence mode="wait">
            {produkTampil.length > 0 ? (
              <motion.div
                key={`${aktifKategori}-${query}-${sortOption}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {produkTampil.map((produk, i) => (
                  <motion.div
                    key={`${produk.slug || 'prod'}-${produk.id || i}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
                  >
                    {/* Stretched link — klik di mana saja pada kartu untuk melihat detail */}
                    <Link
                      href={`/katalog/${produk.slug}`}
                      className="absolute inset-0 z-0"
                      aria-label={`Lihat detail ${produk.nama}`}
                    />

                    {/* Image area */}
                    <div className="relative aspect-square overflow-hidden bg-[#d8f3dc]">
                      <Image
                        src={produk.gambar}
                        alt={produk.nama}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1 relative z-10 pointer-events-none">
                      <span className="text-xs text-[#52b788] font-medium">
                        {KATEGORI_LABEL[produk.kategori]}
                      </span>
                      <h2 className="text-sm font-semibold text-gray-800 mt-1 mb-1.5 line-clamp-2 group-hover:text-[#2d6a4f] transition-colors flex-1">
                        {produk.nama}
                      </h2>
                      <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                        {produk.deskripsi}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[#2d6a4f] font-bold text-base">
                          {formatRupiah(produk.harga)}
                        </span>
                        <a
                          href={`https://wa.me/6287762093492?text=Halo%2C%20saya%20ingin%20pesan%20${encodeURIComponent(produk.nama)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pointer-events-auto w-8 h-8 rounded-full bg-[#d8f3dc] hover:bg-[#2d6a4f] text-[#2d6a4f] hover:text-white flex items-center justify-center transition-all shadow-sm hover:scale-105"
                          aria-label={`Pesan ${produk.nama} via WhatsApp`}
                          title="Pesan via WhatsApp"
                        >
                          <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
                <p className="text-gray-500 font-medium">
                  Produk tidak ditemukan
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Coba kata kunci lain atau pilih kategori berbeda
                </p>
                <button
                  onClick={() => {
                    setQuery('');
                    setAktifKategori('semua');
                  }}
                  className="mt-4 text-sm text-[#2d6a4f] hover:underline cursor-pointer"
                >
                  Reset filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative mt-16 rounded-2xl overflow-hidden text-center text-white"
          >
            {/* bg.jpg sebagai latar CTA */}
            <Image
              src="/images/bg.jpg"
              alt=""
              fill
              className="object-cover object-center"
              aria-hidden="true"
            />
            {/* overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332]/90 to-[#2d6a4f]/90" aria-hidden="true" />

            <div className="relative px-8 py-10">
              {/* Badge menonjol */}
              <span className="inline-flex items-center gap-2 bg-white/15 border border-white/30 backdrop-blur-sm text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-wide">
                Tidak menemukan yang Anda cari?
              </span>

              <p className="text-lg font-semibold mb-1">
                Kami menerima pesanan custom
              </p>
              <p className="text-[#b7e4c7] text-sm mb-6">
                Sesuaikan desain, warna, dan ukuran sesuai kebutuhan dan budget Anda.
              </p>
              <a
                href="https://wa.me/6287762093492?text=Halo%2C%20saya%20ingin%20tanya%20soal%20karangan%20bunga%20custom"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-[#2d6a4f] font-semibold px-6 py-3 rounded-full hover:bg-[#d8f3dc] transition-all hover:scale-105"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Konsultasi Gratis
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
