import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'agro-florist-malang',
  title: 'Agro Florist Malang — CMS',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'teb9ra8g',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',

  basePath: '/studio',

  plugins: [
    structureTool(),
  ],

  schema,
});
