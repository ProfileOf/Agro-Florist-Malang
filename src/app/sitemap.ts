import type { MetadataRoute } from 'next';
import { dummyKatalog } from '@/lib/dummyKatalog';
import { getAllArtikel } from '@/lib/artikel';
import { client, isSanityConfigured } from '@/sanity/client';

export const revalidate = 3600; // Revalidate setiap 1 jam

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://agrofloristmalang.com';
  const currentDate = new Date().toISOString();

  // 1. Halaman Statis Utama
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/katalog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  // 2. Halaman Produk (Gabungan Sanity + Dummy)
  let productSlugs = dummyKatalog.map((p) => p.slug);

  if (isSanityConfigured && client) {
    try {
      const sanityProducts: { slug: { current: string } }[] = await client.fetch(
        '*[_type == "katalog" && defined(slug.current)]{ slug }'
      );
      if (sanityProducts && sanityProducts.length > 0) {
        const sanitySlugs = sanityProducts.map((p) => p.slug.current);
        const combined = new Set([...sanitySlugs, ...productSlugs]);
        productSlugs = Array.from(combined);
      }
    } catch {
      // fallback to dummy slugs
    }
  }

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/katalog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 3. Halaman Artikel Literasi
  const articles = getAllArtikel();
  const articlePages: MetadataRoute.Sitemap = articles.map((art) => ({
    url: `${baseUrl}/artikel/${art.slug}`,
    lastModified: art.tanggal ? new Date(art.tanggal).toISOString() : currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...productPages, ...articlePages];
}
