'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const categories = [
  {
    id: 'duka-cita',
    label: 'Duka Cita',
    description: 'Karangan bunga penuh keikhlasan untuk menemani kepergian orang terkasih.',
    image: '/images/dukacita.jpg',
    filter: 'duka-cita',
    waText: 'Halo%20Agro%20Florist%2C%20saya%20mau%20pesan%20bunga%20duka%20cita',
  },
  {
    id: 'wedding',
    label: 'Wedding',
    description: 'Rangkaian bunga pernikahan yang elegan untuk hari paling istimewa Anda.',
    image: '/images/wedding.jpg',
    filter: 'wedding',
    waText: 'Halo%20Agro%20Florist%2C%20saya%20mau%20pesan%20bunga%20wedding',
  },
  {
    id: 'grand-opening',
    label: 'Grand Opening',
    description: 'Papan bunga megah untuk peresmian usaha dan momen pembukaan bisnis.',
    image: '/images/go.jpg',
    filter: 'grand-opening',
    waText: 'Halo%20Agro%20Florist%2C%20saya%20mau%20pesan%20bunga%20grand%20opening',
  },
  {
    id: 'buket-wisuda',
    label: 'Buket Wisuda',
    description: 'Buket bunga segar cantik untuk merayakan kelulusan dan pencapaian.',
    image: '/images/grad.jpg',
    filter: 'buket',
    waText: 'Halo%20Agro%20Florist%2C%20saya%20mau%20pesan%20buket%20wisuda',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const swingTransition = {
  duration: 6,
  repeat: Infinity,
  ease: 'easeInOut' as const,
};

const swingAnimate = {
  rotate: [0, 3, 0, -3, 0],
  transition: swingTransition,
};

export default function ShowcaseSection() {
  const router = useRouter();

  return (
    <section id="showcase" className="relative py-20 bg-[#FAF6EF] overflow-hidden">

      {/* Dekorasi Kiri (mirror) — muncul dari pojok kiri atas, menjulur ke bawah */}
      <motion.div
        animate={swingAnimate}
        className="absolute left-0 top-0 pointer-events-none select-none"
        style={{ transformOrigin: 'top left' }}
      >
        <Image
          src="/images/sidekor.png"
          alt=""
          width={280}
          height={560}
          className="object-contain w-[120px] sm:w-[180px] lg:w-[280px] h-auto"
          style={{ transform: 'scaleX(-1)' }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Dekorasi Kanan — muncul dari pojok kanan atas, menjulur ke bawah */}
      <motion.div
        animate={swingAnimate}
        className="absolute right-0 top-0 pointer-events-none select-none"
        style={{ transformOrigin: 'top right' }}
      >
        <Image
          src="/images/sidekor.png"
          alt=""
          width={280}
          height={560}
          className="object-contain w-[120px] sm:w-[180px] lg:w-[280px] h-auto"
          aria-hidden="true"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block bg-[#14532D]/10 text-[#14532D] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Kategori Kami
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-4xl font-semibold text-[#14532D] mb-3">
            Bunga untuk <br></br>Setiap Momen
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">
            Dari duka cita hingga perayaan — kami hadirkan rangkaian terbaik
            untuk setiap perasaan.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              onClick={() => router.push(`/katalog?kategori=${cat.filter}`)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* overlay on hover */}
                <div className="absolute inset-0 bg-[#0B3B2C]/0 group-hover:bg-[#0B3B2C]/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full">
                    Lihat Katalog →
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#14532D] mb-1 group-hover:text-[#0B3B2C] transition-colors">
                  {cat.label}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-4 line-clamp-2">
                  {cat.description}
                </p>
                <a
                  href={`https://wa.me/6281234567890?text=${cat.waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-[#25D366] text-xs font-semibold hover:underline"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Pesan via WhatsApp
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/katalog"
            className="inline-flex items-center gap-2 bg-[#14532D] hover:bg-[#0B3B2C] text-white font-semibold px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm"
          >
            Lihat Semua Produk
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
