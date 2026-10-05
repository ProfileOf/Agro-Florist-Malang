import { client, isSanityConfigured } from '@/sanity/client';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import CaraPesanSection from '@/components/CaraPesanSection';
import TestimoniSection, { type TestimoniItem } from '@/components/TestimoniSection';
import Footer from '@/components/Footer';

export const revalidate = 60;

const TESTIMONI_QUERY = `*[_type == "testimoni"] | order(_createdAt asc) {
  _id,
  namaPemberi,
  jabatanAtauKota,
  pesan,
  rating,
  "foto": foto { asset->{ url } }
}`;

type SanityTestimoni = {
  _id: string;
  namaPemberi: string;
  jabatanAtauKota?: string;
  pesan: string;
  rating: number;
  foto?: { asset?: { url?: string } } | null;
};

export default async function Home() {
  let testimoniList: TestimoniItem[] = [];

  if (isSanityConfigured) {
    try {
      const data: SanityTestimoni[] = await client.fetch(TESTIMONI_QUERY);
      if (data && data.length > 0) {
        testimoniList = data.map((item, i) => ({
          id: i + 1,
          nama: item.namaPemberi,
          jabatanAtauKota: item.jabatanAtauKota ?? '',
          pesan: item.pesan,
          rating: item.rating,
          foto: item.foto?.asset?.url ?? null,
        }));
      }
    } catch {
      // fallback ke dummy di dalam TestimoniSection
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ShowcaseSection />
        <CaraPesanSection />
        <TestimoniSection testimoniList={testimoniList} />
      </main>
      <Footer />
    </>
  );
}
