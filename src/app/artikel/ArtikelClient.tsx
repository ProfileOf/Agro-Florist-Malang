'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Artikel } from '@/lib/artikel';
import { KATEGORI_LABEL, type Produk } from '@/lib/dummyKatalog';

const KATEGORI_EMOJI: Record<string, string> = {
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

const KATEGORI_LIST = [
  'semua',
  'bibit-tanaman',
  'duka-cita',
  'wedding',
  'grand-opening',
  'selamat-sukses',
  'bunga-standing',
  'buket',
  'fresh-flowers',
];

export default function ArtikelClient({ artikelList }: { artikelList: Artikel[] }) {
  const [query, setQuery] = useState('');
  const [aktifKategori, setAktifKategori] = useState('semua');

  const filteredArtikel = useMemo(() => {
    return artikelList.filter((a) => {
      const matchKategori =
        aktifKategori === 'semua' || a.kategori === aktifKategori;
      const matchSearch =
        query.trim() === '' ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.deskripsi.toLowerCase().includes(query.toLowerCase()) ||
        a.ringkasan.toLowerCase().includes(query.toLowerCase());
      return matchKategori && matchSearch;
    });
  }, [artikelList, query, aktifKategori]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Banner Hero */}
        <div className="relative text-white pt-28 pb-14 overflow-hidden">
          <Image
            src="/images/bg.jpg"
            alt=""
            fill
            priority
            className="object-cover object-center"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1b4332]/90 via-[#2d6a4f]/85 to-[#1b4332]/90"
            aria-hidden="true"
          />

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
                  <BookOpen className="w-3.5 h-3.5 inline mr-1.5" aria-hidden="true" />
                  Artikel & Wawasan Florist Malang
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold drop-shadow-md">
                  Artikel Bunga
                </h1>
                <p className="text-[#b7e4c7] mt-2 max-w-xl text-sm sm:text-base leading-relaxed">
                  Pelajari makna filosofis, etika penulisan ucapan, hingga tips memilih
                  karangan bunga dan pohon ucapan terbaik untuk setiap momen spesial.
                </p>
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-64 shrink-0">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Cari artikel / topik..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:bg-white/20 transition-all"
                  aria-label="Cari artikel"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          {/* Category Filter Pills (Scrollable horizontally on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar" role="tablist">
            {KATEGORI_LIST.map((kat) => {
              const label =
                kat === 'semua'
                  ? 'Semua Topik'
                  : KATEGORI_LABEL[kat as Produk['kategori']] || kat;
              const emoji = KATEGORI_EMOJI[kat] || '🌸';
              const isSelected = aktifKategori === kat;

              return (
                <button
                  key={kat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setAktifKategori(kat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#2d6a4f] text-white shadow-md scale-105'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-[#52b788] hover:text-[#2d6a4f] shadow-sm'
                  }`}
                >
                  <span aria-hidden="true">{emoji}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          {/* Article Grid */}
          {filteredArtikel.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
              <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Tidak ada artikel ditemukan
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Coba cari dengan kata kunci lain atau pilih kategori Semua.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setAktifKategori('semua');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2d6a4f] text-white rounded-full text-xs font-semibold hover:bg-[#1b4332] transition-colors"
              >
                Reset Pencarian
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArtikel.map((artikel, idx) => (
                <motion.article
                  key={artikel.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col border border-gray-100 group hover:-translate-y-1"
                >
                  {/* Thumbnail Cover */}
                  <Link href={`/artikel/${artikel.slug}`} className="relative aspect-[16/10] overflow-hidden block">
                    <Image
                      src={artikel.gambar}
                      alt={artikel.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#1b4332]/85 backdrop-blur-sm text-white text-[11px] font-semibold px-3 py-1 rounded-full shadow-sm">
                      <span aria-hidden="true">{KATEGORI_EMOJI[artikel.kategori] || '🌸'}</span>
                      <span>{artikel.kategoriLabel}</span>
                    </div>
                  </Link>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2.5">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {artikel.waktuBaca}
                        </span>
                        <span>•</span>
                        <span>{artikel.penulis}</span>
                      </div>

                      <h2 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-[#14532D] mb-2.5 group-hover:text-[#2d6a4f] transition-colors line-clamp-2">
                        <Link href={`/artikel/${artikel.slug}`}>{artikel.title}</Link>
                      </h2>

                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {artikel.deskripsi}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <Link
                        href={`/artikel/${artikel.slug}`}
                        className="inline-flex items-center gap-1 text-[#2d6a4f] font-semibold text-xs sm:text-sm hover:underline group-hover:gap-2 transition-all"
                      >
                        Baca Artikel
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>

                      <Link
                        href={`/katalog?kategori=${artikel.kategori}`}
                        className="inline-flex items-center gap-1 text-gray-400 hover:text-[#2d6a4f] text-xs transition-colors"
                        title="Buka katalog produk kategori ini"
                      >
                        <span>Lihat Produk</span>
                        <Sparkles className="w-3 h-3 text-[#52b788]" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
