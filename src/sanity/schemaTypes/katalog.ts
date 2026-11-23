import { defineField, defineType } from 'sanity';

export const katalog = defineType({
  name: 'katalog',
  title: 'Katalog Bunga',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Karangan Bunga',
      type: 'string',
      validation: (Rule) => Rule.required().error('Nama produk wajib diisi'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'nama',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'harga',
      title: 'Harga (Rp)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Duka Cita', value: 'duka-cita' },
          { title: 'Pernikahan (Wedding)', value: 'wedding' },
          { title: 'Grand Opening', value: 'grand-opening' },
          { title: 'Selamat & Sukses', value: 'selamat-sukses' },
          { title: 'Buket Wisuda', value: 'buket' },
          { title: 'Bunga Standing', value: 'bunga-standing' },
          { title: 'Ucapan Bibit Pohon & Buah', value: 'bibit-tanaman' },
          { title: 'Fresh Flowers', value: 'fresh-flowers' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto Produk',
      type: 'image',
      options: {
        hotspot: true, // Memungkinkan crop foto langsung dari Sanity Studio
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
    }),
  ],
});