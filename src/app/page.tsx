import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ShowcaseSection from '@/components/ShowcaseSection';
import CaraPesanSection from '@/components/CaraPesanSection';
import TestimoniSection from '@/components/TestimoniSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ShowcaseSection />
        <CaraPesanSection />
        <TestimoniSection />
      </main>
      <Footer />
    </>
  );
}
