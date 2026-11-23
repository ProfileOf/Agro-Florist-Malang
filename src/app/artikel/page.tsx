import type { Metadata } from 'next';
import ArtikelClient from './ArtikelClient';
import { getAllArtikel } from '@/lib/artikel';

export const metadata: Metadata = {
  title: 'Artikel Karangan Bunga Malang | Agro Florist',
  description:
    'Kumpulan artikel, literasi, dan etika pemesanan karangan bunga duka cita, wedding, grand opening, buket wisuda, dan tren pohon ucapan di Malang Raya.',
  openGraph: {
    title: 'Artikel Florist Malang — Agro Florist',
    description:
      'Wawasan lengkap seputar karangan bunga, bibit pohon ucapan ramah lingkungan, dan tips memilih bunga terbaik di Malang & Batu.',
    images: [{ url: '/images/bg.jpg' }],
  },
};

export default function ArtikelPage() {
  const artikelList = getAllArtikel();
  return <ArtikelClient artikelList={artikelList} />;
}
