import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Agro Florist Malang — Karangan Bunga Duka Cita, Wedding & Grand Opening',
  description:
    'Florist terpercaya di Malang. Menyediakan karangan bunga duka cita, wedding, grand opening, dan buket segar. Pesan mudah via WhatsApp, pengiriman ke seluruh Malang.',
  keywords: [
    'florist malang',
    'karangan bunga malang',
    'bunga duka cita malang',
    'bunga wedding malang',
    'papan bunga malang',
    'standing flower malang',
    'buket bunga malang',
  ],
  openGraph: {
    title: 'Agro Florist Malang — Karangan Bunga Segar & Berkualitas',
    description:
      'Florist terpercaya di Malang untuk karangan bunga duka cita, wedding, grand opening, dan buket.',
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${fraunces.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)]">{children}</body>
    </html>
  );
}
