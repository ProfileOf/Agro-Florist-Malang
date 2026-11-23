import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export type FAQItem = {
  tanya: string;
  jawab: string;
};

export type Artikel = {
  title: string;
  slug: string;
  kategori: string;
  kategoriLabel: string;
  deskripsi: string;
  gambar: string;
  waktuBaca: string;
  tanggal: string;
  penulis: string;
  ringkasan: string;
  faq: FAQItem[];
  contentHtml?: string;
  rawContent?: string;
};

const ARTIKEL_DIR = path.join(process.cwd(), 'content', 'artikel');

export function getAllArtikel(): Artikel[] {
  if (!fs.existsSync(ARTIKEL_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(ARTIKEL_DIR);
  const articles: Artikel[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;

    const fullPath = path.join(ARTIKEL_DIR, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    articles.push({
      title: data.title || '',
      slug: data.slug || fileName.replace(/\.md$/, ''),
      kategori: data.kategori || '',
      kategoriLabel: data.kategoriLabel || '',
      deskripsi: data.deskripsi || '',
      gambar: data.gambar || '/images/dukacita.jpg',
      waktuBaca: data.waktuBaca || '3 min baca',
      tanggal: data.tanggal || '',
      penulis: data.penulis || 'Tim Agro Florist Malang',
      ringkasan: data.ringkasan || '',
      faq: data.faq || [],
      rawContent: content,
    });
  }

  // Urutan berdasarkan tanggal terbaru
  return articles.sort((a, b) => (b.tanggal > a.tanggal ? 1 : -1));
}

export async function getArtikelBySlug(slug: string): Promise<Artikel | null> {
  const fullPath = path.join(ARTIKEL_DIR, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Konversi markdown ke HTML
  const contentHtml = await marked.parse(content);

  return {
    title: data.title || '',
    slug: data.slug || slug,
    kategori: data.kategori || '',
    kategoriLabel: data.kategoriLabel || '',
    deskripsi: data.deskripsi || '',
    gambar: data.gambar || '/images/dukacita.jpg',
    waktuBaca: data.waktuBaca || '3 min baca',
    tanggal: data.tanggal || '',
    penulis: data.penulis || 'Tim Agro Florist Malang',
    ringkasan: data.ringkasan || '',
    faq: data.faq || [],
    contentHtml,
    rawContent: content,
  };
}

export function getArtikelByKategori(kategori: string): Artikel | null {
  const all = getAllArtikel();
  return all.find((a) => a.kategori === kategori) || null;
}
