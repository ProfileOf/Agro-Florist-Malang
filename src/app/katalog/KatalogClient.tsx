'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Search, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { KATEGORI_LABEL, type Produk } from '@/lib/dummyKatalog';

type FilterKategori = Produk['kategori'] | 'semua';

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
  'buket',
];

const KATEGORI_EMOJI: Record<FilterKategori, string> = {
  semua: '🌸',
  'duka-cita': '🌿',
  wedding: '💍',
  'grand-opening': '🎊',
  buket: '💐',
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

  const produkTampil = useMemo(() => {
    return produkList.filter((p) => {
      const cocokKategori =
        aktifKategori === 'semua' || p.kategori === aktifKategori;
      const cocokSearch =
        query.trim() === '' ||
        p.nama.toLowerCase().includes(query.toLowerCase()) ||
        p.deskripsi.toLowerCase().includes(query.toLowerCase());
      return cocokKategori && cocokSearch;
    });
  }, [aktifKategori, query, produkList]);

  const jumlahPerKategori = useMemo(() => {
    const map: Record<FilterKategori, number> = {
      semua: produkList.length,
      'duka-cita': 0,
      wedding: 0,
      'grand-opening': 0,
      buket: 0,
    };
    produkList.forEach((p) => {
      map[p.kategori] += 1;
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
          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter kategori">
            {KATEGORI_TABS.map((kat) => (
              <button
                key={kat}
                role="tab"
                aria-selected={aktifKategori === kat}
                onClick={() => setAktifKategori(kat)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  aktifKategori === kat
                    ? 'bg-[#2d6a4f] text-white shadow-md scale-105'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#52b788] hover:text-[#2d6a4f]'
                }`}
              >
                <span aria-hidden="true">{KATEGORI_EMOJI[kat]}</span>
                {KATEGORI_LABEL[kat]}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    aktifKategori === kat
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {jumlahPerKategori[kat]}
                </span>
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-500 mb-6">
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
                key={`${aktifKategori}-${query}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              >
                {produkTampil.map((produk, i) => (
                  <motion.div
                    key={produk.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image area */}
                    <div className="relative aspect-square overflow-hidden bg-[#d8f3dc]">
                      <Image
                        src={produk.gambar}
                        alt={produk.nama}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />

                      {/* Hover overlay — CTA */}
                      <div className="absolute inset-0 bg-[#2d6a4f]/0 group-hover:bg-[#2d6a4f]/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <a
                          href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20pesan%20${encodeURIComponent(produk.nama)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-[#2d6a4f] font-semibold text-sm px-4 py-2 rounded-full shadow-lg hover:bg-[#2d6a4f] hover:text-white transition-all"
                          aria-label={`Pesan ${produk.nama}`}
                        >
                          Pesan Sekarang
                        </a>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
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
                          href={`https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20pesan%20${encodeURIComponent(produk.nama)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-[#d8f3dc] hover:bg-[#2d6a4f] text-[#2d6a4f] hover:text-white flex items-center justify-center transition-all"
                          aria-label={`Pesan ${produk.nama}`}
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
                href="https://wa.me/6281234567890?text=Halo%2C%20saya%20ingin%20tanya%20soal%20karangan%20bunga%20custom"
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
