import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

/** True kalau env vars Sanity sudah diset dengan benar */
export const isSanityConfigured = Boolean(projectId);

// Hanya buat client kalau projectId tersedia
// Saat build tanpa env vars (misal Vercel sebelum env diset), client = null
export const client = isSanityConfigured
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: true,
      token: process.env.SANITY_API_TOKEN,
    })
  : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!client) throw new Error('Sanity client not configured');
  return imageUrlBuilder(client).image(source);
}
