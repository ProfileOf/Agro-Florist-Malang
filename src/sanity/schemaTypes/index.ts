import { type SchemaTypeDefinition } from 'sanity';
import { katalog } from './katalog';
import { testimoni } from './testimoni';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [katalog, testimoni],
};