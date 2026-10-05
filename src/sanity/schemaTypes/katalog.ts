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
          { title: 'Selamat & Sukses (Grand Opening)', value: 'grand-opening' },
          { title: 'Buket & Lainnya', value: 'buket' },
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
    defineField({
      name: 'tersedia',
      title: 'Status Stok/Tersedia',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});