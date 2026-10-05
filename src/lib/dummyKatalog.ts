export type Produk = {
  id: number;
  nama: string;
  slug: string;
  kategori: 'duka-cita' | 'wedding' | 'grand-opening' | 'buket';
  harga: number;
  gambar: string;
  deskripsi: string;
};

export const KATEGORI_LABEL: Record<Produk['kategori'] | 'semua', string> = {
  semua: 'Semua',
  'duka-cita': 'Duka Cita',
  wedding: 'Wedding',
  'grand-opening': 'Grand Opening',
  buket: 'Buket & Lainnya',
};

export const dummyKatalog: Produk[] = [
  // Duka Cita
  {
    id: 1,
    nama: 'Papan Bunga Duka Cita Premium',
    slug: 'papan-bunga-duka-cita-premium',
    kategori: 'duka-cita',
    harga: 750000,
    gambar: '/images/dukacita.jpg',
    deskripsi: 'Rangkaian papan bunga duka cita elegan dengan bunga segar pilihan, cocok untuk berbagai acara belasungkawa.',
  },
  {
    id: 2,
    nama: 'Papan Bunga Duka Cita Simpel',
    slug: 'papan-bunga-duka-cita-simpel',
    kategori: 'duka-cita',
    harga: 500000,
    gambar: '/images/dukacita.jpg',
    deskripsi: 'Pilihan ekonomis namun tetap elegan dan bermartabat untuk momen belasungkawa.',
  },
  {
    id: 3,
    nama: 'Papan Bunga Duka Cita Eksklusif',
    slug: 'papan-bunga-duka-cita-eksklusif',
    kategori: 'duka-cita',
    harga: 1200000,
    gambar: '/images/dukacita.jpg',
    deskripsi: 'Papan bunga duka cita mewah dengan rangkaian bunga premium dan desain eksklusif.',
  },
  // Wedding
  {
    id: 4,
    nama: 'Rangkaian Bunga Wedding Elegan',
    slug: 'rangkaian-bunga-wedding-elegan',
    kategori: 'wedding',
    harga: 1200000,
    gambar: '/images/wedding.jpg',
    deskripsi: 'Dekorasi pernikahan romantis dengan mawar putih dan pink yang memukau.',
  },
  {
    id: 5,
    nama: 'Buket Pengantin Premium',
    slug: 'buket-pengantin-premium',
    kategori: 'wedding',
    harga: 850000,
    gambar: '/images/wedding.jpg',
    deskripsi: 'Buket pengantin mewah dengan bunga segar pilihan, sempurna untuk hari istimewa Anda.',
  },
  {
    id: 6,
    nama: 'Dekorasi Meja Wedding',
    slug: 'dekorasi-meja-wedding',
    kategori: 'wedding',
    harga: 400000,
    gambar: '/images/wedding.jpg',
    deskripsi: 'Rangkaian bunga cantik untuk dekorasi meja resepsi pernikahan Anda.',
  },
  {
    id: 7,
    nama: 'Arch Bunga Wedding',
    slug: 'arch-bunga-wedding',
    kategori: 'wedding',
    harga: 2500000,
    gambar: '/images/wedding.jpg',
    deskripsi: 'Gerbang bunga akad yang memukau untuk dokumentasi foto pernikahan terbaik.',
  },
  // Grand Opening
  {
    id: 8,
    nama: 'Standing Flower Grand Opening',
    slug: 'standing-flower-grand-opening',
    kategori: 'grand-opening',
    harga: 850000,
    gambar: '/images/go.jpg',
    deskripsi: 'Standing flower megah untuk grand opening toko atau kantor, kesan pertama yang sempurna.',
  },
  {
    id: 9,
    nama: 'Papan Bunga Selamat & Sukses',
    slug: 'papan-bunga-selamat-sukses',
    kategori: 'grand-opening',
    harga: 650000,
    gambar: '/images/go.jpg',
    deskripsi: 'Papan bunga ucapan selamat yang cerah dan meriah untuk perayaan grand opening.',
  },
  {
    id: 10,
    nama: 'Rangkaian Bunga Promosi',
    slug: 'rangkaian-bunga-promosi',
    kategori: 'grand-opening',
    harga: 450000,
    gambar: '/images/go.jpg',
    deskripsi: 'Pilihan ekonomis untuk melengkapi dekorasi grand opening bisnis Anda.',
  },
  {
    id: 11,
    nama: 'Bunga Meja Kantor Grand Opening',
    slug: 'bunga-meja-kantor-grand-opening',
    kategori: 'grand-opening',
    harga: 300000,
    gambar: '/images/go.jpg',
    deskripsi: 'Rangkaian bunga meja elegan untuk mempercantik kantor atau toko yang baru dibuka.',
  },
  // Buket
  {
    id: 12,
    nama: 'Buket Bunga Wisuda',
    slug: 'buket-bunga-wisuda',
    kategori: 'buket',
    harga: 350000,
    gambar: '/images/grad.jpg',
    deskripsi: 'Buket colorful spesial wisuda, lengkap dengan pita dan kartu ucapan.',
  },
  {
    id: 13,
    nama: 'Buket Ulang Tahun',
    slug: 'buket-ulang-tahun',
    kategori: 'buket',
    harga: 250000,
    gambar: '/images/buket.png',
    deskripsi: 'Buket bunga ceria dan meriah sebagai kado ulang tahun yang berkesan.',
  },
  {
    id: 14,
    nama: 'Hand Bouquet Premium',
    slug: 'hand-bouquet-premium',
    kategori: 'buket',
    harga: 550000,
    gambar: '/images/buket.png',
    deskripsi: 'Hand bouquet mewah dengan bunga pilihan premium, cocok untuk hadiah spesial.',
  },
  {
    id: 15,
    nama: 'Buket Bunga Kering',
    slug: 'buket-bunga-kering',
    kategori: 'buket',
    harga: 180000,
    gambar: '/images/grad.jpg',
    deskripsi: 'Buket bunga kering estetik yang tahan lama, hiasan rumah sekaligus hadiah unik.',
  },
];
