# Progress — Agro Florist Malang Landing Page

## ✅ Sudah Selesai

### Setup & Konfigurasi
- [x] Project Next.js 16 (App Router) dengan TypeScript
- [x] Tailwind CSS v4 terpasang
- [x] Framer Motion terpasang (untuk animasi)
- [x] Lucide React terpasang (icon library)
- [x] `next-sanity` dan `@sanity/image-url` terpasang
- [x] `.env.local` sudah diisi `SANITY_PROJECT_ID` dan `SANITY_DATASET`

### Sanity CMS
- [x] Schema **Katalog Bunga** (`katalog.ts`) — field: nama, slug, harga, kategori, foto, deskripsi, status stok
- [x] Schema **Testimoni Pelanggan** (`testimoni.ts`) — field: nama, jabatan/kota, pesan, rating, foto profil
- [x] Schema di-register di `schemaTypes/index.ts`

---

## ❌ Belum Dikerjakan

### Sanity Studio
- [ ] Setup Sanity Studio (file `sanity.config.ts` + route `/studio` di Next.js)
- [ ] Koneksi Sanity client (`src/sanity/client.ts` atau `lib/sanity.ts`)
- [ ] Helper `urlFor()` untuk gambar Sanity

### Halaman Utama (Landing Page — `src/app/page.tsx`)
- [x] **Navbar** — logo, navigasi anchor + link katalog, tombol WhatsApp CTA, hamburger mobile, scroll-aware background
- [x] **Section Hero** — headline, subheadline, 2 CTA button, floating badge animasi, social proof, scroll indicator
- [x] **Section Showcase** — 4 produk dummy dengan hover effect + badge + link WhatsApp per produk
- [x] **Section Cara Pesan** — 4 langkah dengan icon, connector line desktop, CTA WhatsApp
- [x] **Section Testimoni** — 6 card ulasan dummy, rating bintang, overall rating summary
- [x] **Footer** — logo, deskripsi brand, sosmed, navigasi, kontak lengkap, copyright
> ⚠️ Masih pakai data dummy/static — belum terhubung ke Sanity CMS

### Halaman Katalog (`src/app/katalog/page.tsx`)
- [x] Halaman katalog `/katalog` dengan metadata SEO
- [x] Filter/tab per kategori + badge jumlah produk per tab
- [x] Search bar realtime (filter nama & deskripsi)
- [x] Grid 15 produk dummy dengan foto, nama, harga, badge, deskripsi
- [x] Stok habis overlay + state disabled
- [x] Empty state saat hasil pencarian kosong
- [x] CTA banner konsultasi custom di bagian bawah
- [x] Data produk dipusatkan di `src/lib/dummyKatalog.ts` (siap diganti Sanity)
> ⚠️ Masih pakai data dummy — belum terhubung ke Sanity CMS

### SEO
- [ ] Metadata dinamis di `layout.tsx` (title, description, Open Graph, Twitter Card)
- [ ] Sitemap (`sitemap.ts`)
- [ ] `robots.ts`
- [ ] Structured Data / JSON-LD untuk produk (opsional, bonus SEO)

### UI & Animasi
- [ ] Custom warna/tema brand (hijau florist?) di Tailwind config
- [ ] Animasi scroll-triggered dengan Framer Motion (section masuk saat di-scroll)
- [ ] Micro-interaction pada tombol dan kartu produk
- [ ] Smooth scroll antar section

### Lain-lain
- [ ] Sanity token read (untuk fetch data di server component)
- [ ] `next.config.ts` — whitelist domain gambar Sanity (`cdn.sanity.io`)
- [ ] Responsif mobile (navbar hamburger menu, grid katalog)
- [ ] Deploy ke Vercel (konfigurasi env di dashboard Vercel)

---

## Tech Stack yang Dipakai
| Kebutuhan | Library |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 |
| Animasi | Framer Motion |
| CMS | Sanity v3 |
| Icon | Lucide React |
| Image | next/image + @sanity/image-url |
| Deploy | Vercel (rekomendasi) |
