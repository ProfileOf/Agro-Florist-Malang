import { Suspense } from 'react';
import type { Metadata } from 'next';
import { client, isSanityConfigured } from '@/sanity/client';
import { dummyKatalog, type Produk } from '@/lib/dummyKatalog';
import KatalogClient from './KatalogClient';

export const metadata: Metadata = {
  title: 'Katalog Karangan Bunga — Agro Florist Malang',
  description:
    'Lihat semua pilihan karangan bunga duka cita, wedding, grand opening, dan buket dari Agro Florist Malang. Harga terjangkau, bunga segar, pengiriman ke seluruh Malang.',
};

export const revalidate = 60;

type SanityProduk = {
  _id: string;
  nama: string;
  slug: { current: string };
  harga: number;
  kategori: Produk['kategori'];
  foto: { asset: { url: string } } | null;
  deskripsi: string | null;
};

const QUERY = `*[_type == "katalog"] | order(_createdAt asc) {
  _id,
  nama,
  slug,
  harga,
  kategori,
  "foto": foto { asset->{ url } },
  deskripsi
}`;

export default async function KatalogPage() {
  let produkList: Produk[] = dummyKatalog;

  if (isSanityConfigured) {
    try {
      const sanityData: SanityProduk[] = await client!.fetch(QUERY);
      if (sanityData && sanityData.length > 0) {
        produkList = sanityData.map((item, i) => ({
          id: i + 1,
          nama: item.nama,
          slug: item.slug?.current ?? '',
          kategori: item.kategori,
          harga: item.harga,
          gambar: item.foto?.asset?.url ?? '/images/dukacita.jpg',
          deskripsi: item.deskripsi ?? '',
        }));
      }
    } catch {
      // fallback ke dummy
    }
  }

  return (
    <Suspense>
      <KatalogClient produkList={produkList} />
    </Suspense>
  );
}
