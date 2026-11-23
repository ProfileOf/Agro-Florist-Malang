import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Clock,
  Calendar,
  User,
  ShoppingBag,
  HelpCircle,
  Share2,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StickyKatalogButton from '@/components/StickyKatalogButton';
import { getAllArtikel, getArtikelBySlug } from '@/lib/artikel';
import { dummyKatalog, KATEGORI_LABEL, type Produk } from '@/lib/dummyKatalog';

export async function generateStaticParams() {
  const articles = getAllArtikel();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artikel = await getArtikelBySlug(slug);

  if (!artikel) {
    return { title: 'Artikel Tidak Ditemukan | Agro Florist Malang' };
  }

  const siteUrl = 'https://agrofloristmalang.com';
  const pageUrl = `${siteUrl}/artikel/${artikel.slug}`;

  return {
    title: `${artikel.title} | Agro Florist Malang`,
    description: artikel.deskripsi,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${artikel.title} | Agro Florist Malang`,
      description: artikel.deskripsi,
      url: pageUrl,
      type: 'article',
      images: [
        {
          url: `${siteUrl}${artikel.gambar}`,
          width: 1200,
          height: 630,
          alt: artikel.title,
        },
      ],
    },
  };
}

export default async function DetailArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artikel = await getArtikelBySlug(slug);

  if (!artikel) {
    notFound();
  }

  const allArticles = getAllArtikel();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== artikel.slug)
    .slice(0, 3);

  // Cari produk terkait untuk preview di sidebar
  const matchingDummyProducts = dummyKatalog.filter(
    (p) => p.kategori === artikel.kategori
  );

  // Schema JSON-LD untuk SEO Google (Article + FAQPage)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: artikel.title,
        description: artikel.deskripsi,
        image: `https://agrofloristmalang.com${artikel.gambar}`,
        author: {
          '@type': 'Person',
          name: artikel.penulis || 'Rangga Dwi Saputra',
          jobTitle: 'Content Specialist & Author',
          worksFor: {
            '@type': 'Organization',
            name: 'Agro Florist Malang',
            url: 'https://agrofloristmalang.com',
          },
        },
        publisher: {
          '@type': 'Organization',
          name: 'Agro Florist Malang',
          logo: {
            '@type': 'ImageObject',
            url: 'https://agrofloristmalang.com/images/agroflorist.png',
          },
        },
        datePublished: artikel.tanggal,
        mainEntityOfPage: `https://agrofloristmalang.com/artikel/${artikel.slug}`,
      },
      ...(artikel.faq && artikel.faq.length > 0
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: artikel.faq.map((item) => ({
                '@type': 'Question',
                name: item.tanya,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.jawab,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <Navbar />

      {/* Injeksi JSON-LD Schema untuk Google Rich Snippet */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#FAF9F5] pt-24 pb-20">
        {/* Breadcrumb Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-[#2d6a4f] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
            <Link href="/artikel" className="hover:text-[#2d6a4f] transition-colors">
              Artikel
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
            <span className="text-[#2d6a4f] font-semibold truncate max-w-[200px] sm:max-w-xs">
              {artikel.kategoriLabel}
            </span>
          </nav>
        </div>

        {/* Article Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10 lg:p-12">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-block bg-[#2d6a4f]/10 text-[#2d6a4f] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {artikel.kategoriLabel}
                </span>
                <span className="inline-flex items-center gap-1 text-gray-400 text-xs">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  {artikel.waktuBaca}
                </span>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1 text-gray-400 text-xs">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  {artikel.tanggal}
                </span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#14532D] leading-tight mb-4">
                {artikel.title}
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-normal border-l-4 border-[#52b788] pl-4 italic bg-[#d8f3dc]/20 py-2.5 rounded-r-xl">
                {artikel.ringkasan}
              </p>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-10 shadow-sm border border-gray-100">
              <Image
                src={artikel.gambar}
                alt={artikel.title}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Markdown Content with Clean Typography */}
            <div
              className="prose prose-green max-w-none 
                text-gray-700 leading-relaxed text-[15px] sm:text-base
                [&>h2]:text-xl sm:[&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#14532D] [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:font-[family-name:var(--font-display)]
                [&>h3]:text-lg sm:[&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-[#2d6a4f] [&>h3]:mt-6 [&>h3]:mb-2
                [&>p]:mb-4 [&>p]:leading-relaxed
                [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-2
                [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol>li]:mb-2
                [&>strong]:text-[#14532D] [&>strong]:font-semibold
                [&>hr]:my-8 [&>hr]:border-gray-200"
              dangerouslySetInnerHTML={{ __html: artikel.contentHtml || '' }}
            />

            {/* Byline Penulis (Clean & Sederhana) */}
            <p className="mt-8 text-sm sm:text-base text-gray-700 font-medium">
              {artikel.penulis || 'Rangga Dwi Saputra'} – Penulis
            </p>

            {/* FAQ Accordion Section */}
            {artikel.faq && artikel.faq.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-6 h-6 text-[#2d6a4f]" aria-hidden="true" />
                  <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-[#14532D]">
                    Pertanyaan yang Sering Diajukan (FAQ)
                  </h2>
                </div>

                <div className="space-y-4">
                  {artikel.faq.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#FAF9F5] border border-gray-200 rounded-2xl p-4 sm:p-5 transition-all"
                    >
                      <h3 className="font-semibold text-[#14532D] text-sm sm:text-base mb-2">
                        {item.tanya}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {item.jawab}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inline CTA Box */}
            <div className="mt-12 p-6 sm:p-8 bg-gradient-to-br from-[#1b4332] to-[#2d6a4f] text-white rounded-2xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="inline-block bg-[#52b788]/25 text-[#74c69d] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" aria-hidden="true" />
                  Produk Siap Kirim Hari Ini
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  Pesan {artikel.kategoriLabel} Sekarang
                </h3>
                <p className="text-[#b7e4c7] text-xs sm:text-sm mt-1 max-w-md">
                  Lihat pilihan karangan bunga & bibit pohon terbaik di katalog kami.
                  Gratis ongkir untuk area Kota Malang!
                </p>
              </div>

              <Link
                href={`/katalog?kategori=${artikel.kategori}`}
                className="shrink-0 inline-flex items-center gap-2 bg-[#52b788] hover:bg-[#74c69d] text-[#1b4332] font-bold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                Buka Katalog Produk
              </Link>
            </div>

          </article>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-14">
              <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-bold text-[#14532D] mb-6">
                Baca Artikel Lainnya
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/artikel/${rel.slug}`}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all hover:-translate-y-1 block p-4"
                  >
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
                      <Image
                        src={rel.gambar}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#2d6a4f] bg-[#d8f3dc]/60 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
                      {rel.kategoriLabel}
                    </span>
                    <h3 className="font-semibold text-sm text-[#14532D] group-hover:text-[#2d6a4f] transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sticky Floating CTA Bar (Eye-catching with floating animation) */}
        <StickyKatalogButton
          kategori={artikel.kategori}
          kategoriLabel={artikel.kategoriLabel}
        />
      </main>

      <Footer />
    </>
  );
}
