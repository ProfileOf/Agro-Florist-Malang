import Link from 'next/link';
import { Flower2, MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1b4332] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-[#52b788] flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <span className="block font-bold text-white text-sm leading-none">
                  Agro Florist
                </span>
                <span className="block text-xs text-[#52b788] leading-none">
                  Malang
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs mb-5">
              Florist terpercaya di Malang. Menyediakan karangan bunga duka
              cita, wedding, grand opening, dan buket untuk setiap momen
              spesial Anda.
            </p>
            {/* Social media */}
            
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-[#52b788] uppercase tracking-wider">
              Navigasi
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Katalog Produk', href: '/katalog' },
                { label: 'Produk Unggulan', href: '/#showcase' },
                { label: 'Cara Pesan', href: '/#cara-pesan' },
                { label: 'Testimoni', href: '/#testimoni' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:pl-1 transition-all"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-semibold text-sm mb-4 text-[#52b788] uppercase tracking-wider">
              Kontak
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#52b788] mt-0.5 shrink-0" aria-hidden="true" />
                <span>Jl. Contoh No. 123, Kec. Lowokwaru, Kota Malang, Jawa Timur</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#52b788] shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/6281234567890"
                  className="hover:text-white transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#52b788] mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  Senin – Sabtu: 08.00 – 20.00
                  <br />
                  Minggu: 09.00 – 17.00
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <p>© {currentYear} Agro Florist Malang. Hak cipta dilindungi.</p>
          <p>Dibuat dengan ❤️ di Malang</p>
        </div>
      </div>
    </footer>
  );
}
