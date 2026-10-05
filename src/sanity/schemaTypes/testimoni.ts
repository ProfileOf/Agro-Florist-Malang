import { defineField, defineType } from 'sanity';

export const testimoni = defineType({
  name: 'testimoni',
  title: 'Testimoni Pelanggan',
  type: 'document',
  fields: [
    defineField({
      name: 'namaPemberi',
      title: 'Nama Pelanggan / Instansi',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'jabatanAtauKota',
      title: 'Jabatan / Lokasi (Opsional)',
      type: 'string',
      description: 'Contoh: PT Sekawan Media / Malang',
    }),
    defineField({
      name: 'pesan',
      title: 'Pesan / Ulasan',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating Bintang (1 - 5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'foto',
      title: 'Foto Profil / Bukti (Opsional)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
});