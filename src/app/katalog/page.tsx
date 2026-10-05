import type { Metadata } from 'next';
import KatalogClient from './KatalogClient';

export const metadata: Metadata = {
  title: 'Katalog Karangan Bunga — Agro Florist Malang',
  description:
    'Lihat semua pilihan karangan bunga duka cita, wedding, grand opening, dan buket dari Agro Florist Malang. Harga terjangkau, bunga segar, pengiriman ke seluruh Malang.',
};

export default function KatalogPage() {
  return <KatalogClient />;
}
