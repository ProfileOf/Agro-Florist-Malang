'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    num: '01',
    title: 'Hubungi Kami',
    desc: 'Chat WhatsApp kami dan ceritakan kebutuhan Anda — momen apa, kapan, dan budget yang disiapkan.',
    gradient: 'from-[#14532D] to-[#166534]',
    glow: 'shadow-green-800/40',
    ring: 'ring-white/60',
  },
  {
    num: '02',
    title: 'Diskusi Desain',
    desc: 'Tim kami membantu Anda memilih jenis bunga, warna, dan ukuran yang paling sesuai.',
    gradient: 'from-[#15803d] to-[#16a34a]',
    glow: 'shadow-green-600/40',
    ring: 'ring-white/60',
  },
  {
    num: '03',
    title: 'Konfirmasi & Bayar',
    desc: 'Setujui desain dan lakukan pembayaran. Kami terima transfer bank dan dompet digital.',
    gradient: 'from-[#166534] to-[#15803d]',
    glow: 'shadow-green-700/40',
    ring: 'ring-white/60',
  },
  {
    num: '04',
    title: 'Pengiriman Tepat Waktu',
    desc: 'Pesanan dikirim ke lokasi Anda di Malang, tepat waktu sesuai jadwal yang disepakati.',
    gradient: 'from-[#14532D] to-[#166534]',
    glow: 'shadow-green-800/40',
    ring: 'ring-white/60',
  },
];

export default function CaraPesanSection() {
  return (
    <section id="cara-pesan" className="relative py-20 bg-white overflow-hidden">
      {/* Corner decorations – pojok kiri atas
          Gambar asli menempel di pojok kanan bawah (seperti HeroSection pojok kanan bawah).
          Untuk pojok kiri atas: flip horizontal (scaleX(-1)) + flip vertikal (scaleY(-1))
          supaya bunga mengarah ke dalam sudut kiri atas. */}
      <motion.div
        className="pointer-events-none absolute top-0 left-0 select-none z-10"
        initial={{ opacity: 0, x: -50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top left' }}
        >
          <Image
            src="/images/corner.png"
            alt=""
            width={208}
            height={208}
            className="w-[120px] sm:w-[160px] lg:w-[208px] h-auto object-contain"
            style={{ transform: 'scaleX(-1) scaleY(-1)' }}
          />
        </motion.div>
      </motion.div>

      {/* Corner decorations – pojok kanan atas
          Untuk pojok kanan atas: hanya flip vertikal (scaleY(-1))
          supaya bunga mengarah ke dalam sudut kanan atas. */}
      <motion.div
        className="pointer-events-none absolute top-0 right-0 select-none z-10"
        initial={{ opacity: 0, x: 50, y: -50 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.9, delay: 0.35, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <motion.div
          animate={{ rotate: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          style={{ transformOrigin: 'top right' }}
        >
          <Image
            src="/images/corner.png"
            alt=""
            width={208}
            height={208}
            className="w-[120px] sm:w-[160px] lg:w-[208px] h-auto object-contain"
            style={{ transform: 'scaleY(-1)' }}
          />
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#14532D]/10 text-[#14532D] text-xs font-semibold px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Mudah &amp; Cepat
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-semibold text-[#14532D] mb-3">
            Cara Pemesanan
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-[15px] leading-relaxed">
            Proses pesan karangan bunga hanya 4 langkah mudah, bisa langsung
            lewat WhatsApp.
          </p>
        </motion.div>

        {/* ── MOBILE: vertical timeline from left ── */}
        <div className="lg:hidden relative">
          <div
            aria-hidden="true"
            className="absolute left-[32px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-[#14532D]/20 to-transparent"
          />

          <div className="flex flex-col gap-7">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-5"
              >
                {/* Number bubble: gradien hijau + circle.png overlay + nomor */}
                <div className="relative shrink-0 z-10 w-[64px] h-[64px]">
                  {/* Layer 1: lingkaran gradien hijau (background utama) */}
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.gradient} shadow-lg ${s.glow} ring-4 ${s.ring}`}
                  />
                  {/* Layer 2: circle.png sebagai ornamen dekoratif */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 + 0.15 }}
                    whileHover={{ rotate: 30 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/images/circle.png"
                      alt=""
                      width={64}
                      height={64}
                      aria-hidden="true"
                      className="w-full h-full object-contain opacity-60"
                    />
                  </motion.div>
                  {/* Layer 3: nomor putih dengan shadow agar kontras */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-white text-[13px] font-extrabold tracking-wide leading-none"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.55)' }}
                    >
                      {s.num}
                    </span>
                  </div>
                </div>

                {/* Content card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex-1 bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#14532D]/20 rounded-2xl px-4 py-4 shadow-sm hover:shadow-md transition-colors cursor-default"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-[15px] font-semibold text-[#14532D] mb-1">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed">
                    {s.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── DESKTOP: horizontal grid 4 columns ── */}
        <div className="hidden lg:block relative">
          <div
            aria-hidden="true"
            className="absolute top-[64px] left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-[#14532D]/20 to-transparent"
          />

          <div className="grid grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -8 }}
                className="flex flex-col items-center text-center group cursor-default"
              >
                {/* Number bubble: gradien hijau + circle.png overlay + nomor */}
                <div className="relative mb-6 w-[128px] h-[128px]">
                  {/* Glow halo on hover */}
                  <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-25 blur-xl transition-opacity duration-300 scale-125`} />

                  {/* Layer 1: lingkaran gradien hijau (background utama) */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${s.gradient} shadow-lg ${s.glow} group-hover:shadow-2xl transition-shadow duration-300 ring-4 ring-white`}
                  />

                  {/* Layer 2: circle.png sebagai ornamen dekoratif */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18, delay: i * 0.12 + 0.2 }}
                    whileHover={{ rotate: 20 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/images/circle.png"
                      alt=""
                      width={128}
                      height={128}
                      aria-hidden="true"
                      className="w-full h-full object-contain opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    />
                  </motion.div>

                  {/* Layer 3: nomor putih dengan shadow agar kontras di atas hijau */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="text-white text-3xl font-extrabold tracking-tight leading-none"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                    >
                      {s.num}
                    </span>
                  </div>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#14532D] mb-2 group-hover:text-[#0B3B2C] transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed max-w-[200px] group-hover:text-gray-600 transition-colors">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="https://wa.me/6281234567890?text=Halo%20Agro%20Florist%2C%20saya%20mau%20pesan..."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
          >
            <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Mulai Pesan via WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
}
