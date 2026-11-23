'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Menu, X, Settings } from 'lucide-react';

const navLinks = [
  { label: 'Beranda', href: '/#hero' },
  { label: 'Produk', href: '/#showcase' },
  { label: 'Cara Pesan', href: '/#cara-pesan' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Katalog', href: '/katalog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isDetailPage =
    (pathname.startsWith('/katalog/') && pathname !== '/katalog') ||
    (pathname.startsWith('/artikel/') && pathname !== '/artikel');
  const isSolidNav = scrolled || isDetailPage;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jika sudah di beranda (/), scroll smooth ke section.
  // Jika di halaman lain, navigasi ke /#section lalu biarkan browser handle hash scroll.
  const handleNavClick = (href: string) => {
    setIsOpen(false);

    const isHashLink = href.startsWith('/#');
    if (!isHashLink) return; // biarkan Link biasa yang handle

    const hash = href.slice(1); // misal '#hero'

    if (pathname === '/') {
      // Sudah di beranda — scroll langsung
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Di halaman lain — navigasi ke beranda dengan hash
      router.push(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolidNav
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link href="/" className="flex items-center group py-1" aria-label="Beranda Agro Florist Malang">
            <div className="relative h-11 sm:h-12 flex items-center group-hover:scale-105 transition-transform duration-300">
              {/* Logo Putih: saat bg hijau gelap (belum scroll) — diperbesar agar seimbang dengan logo hijau */}
              <Image
                src="/images/logo_putih.png"
                alt="Agro Florist Malang"
                width={180}
                height={65}
                className={`h-11 sm:h-12 w-auto object-contain transition-all duration-300 drop-shadow-sm scale-110 sm:scale-125 origin-left ${
                  isSolidNav ? 'opacity-0 absolute pointer-events-none' : 'opacity-100'
                }`}
                priority
              />
              {/* Logo Hijau: saat bg putih (scrolled) */}
              <Image
                src="/images/logo_hijau.png"
                alt="Agro Florist Malang"
                width={180}
                height={52}
                className={`h-10 sm:h-11 w-auto object-contain transition-opacity duration-300 ${
                  isSolidNav ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'
                }`}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
                    isSolidNav
                      ? 'text-gray-700 hover:text-[#008000] hover:bg-[#d8f3dc]/60'
                      : 'text-white hover:text-white hover:bg-white/20'
                  }`}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    isSolidNav
                      ? 'text-gray-700 hover:text-[#008000] hover:bg-[#d8f3dc]/60'
                      : 'text-white hover:text-white hover:bg-white/20'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA & Studio Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href="https://wa.me/6287762093492?text=Halo%2C%20saya%20ingin%20pesan%20karangan%20bunga"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:shadow-lg hover:scale-105 ${
                isSolidNav
                  ? 'bg-[#008000] hover:bg-[#006800] text-white'
                  : 'bg-white hover:bg-white/90 text-[#008000]'
              }`}
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Pesan Sekarang
            </a>

            <a
              href="https://agrofloristmalang.com/studio"
              target="_blank"
              rel="noopener noreferrer"
              title="Studio Sanity"
              aria-label="Studio Sanity"
              className={`group/gear w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 ${
                isSolidNav
                  ? 'bg-gray-100 hover:bg-[#d8f3dc]/60 text-gray-700 hover:text-[#008000] border border-gray-200 hover:border-[#008000]/30'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
            >
              <Settings className="w-4 h-4 transition-transform duration-300 group-hover/gear:rotate-90" />
            </a>
          </div>

          {/* Mobile hamburger & gear */}
          <div className="flex md:hidden items-center gap-1.5">
            <a
              href="https://agrofloristmalang.com/studio"
              target="_blank"
              rel="noopener noreferrer"
              title="Studio Sanity"
              aria-label="Studio Sanity"
              className={`p-2 rounded-lg transition-colors ${
                isSolidNav ? 'text-gray-700 hover:bg-[#d8f3dc]/60' : 'text-white hover:bg-white/20'
              }`}
            >
              <Settings className="w-5 h-5" />
            </a>
            <button
              className={`p-2 rounded-lg transition-colors ${
                isSolidNav ? 'text-gray-700 hover:bg-[#d8f3dc]/60' : 'text-white hover:bg-white/20'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) =>
              link.href.startsWith('/#') ? (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#2d6a4f] hover:bg-[#d8f3dc]/60 rounded-lg transition-all cursor-pointer"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-[#2d6a4f] hover:bg-[#d8f3dc]/60 rounded-lg transition-all"
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href="https://wa.me/6287762093492?text=Halo%2C%20saya%20ingin%20pesan%20karangan%20bunga"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center justify-center gap-2 bg-[#2d6a4f] text-white text-sm font-medium px-4 py-2.5 rounded-full transition-all"
              onClick={() => setIsOpen(false)}
            >
              Pesan via WhatsApp
            </a>
            <a
              href="https://agrofloristmalang.com/studio"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:text-[#008000] hover:bg-emerald-50 text-sm font-medium px-4 py-2.5 rounded-full transition-all"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4 text-gray-500" />
              Buka Sanity Studio
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
