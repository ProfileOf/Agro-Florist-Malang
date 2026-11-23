import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://agrofloristmalang.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/'], // Jangan indeks dashboard Sanity Studio
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
