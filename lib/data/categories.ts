import { CategorySlug } from '@/lib/types';

export interface CategoryMeta {
  slug: CategorySlug;
  name: string;
  description: string;
  tone: number;
}

export const categories: CategoryMeta[] = [
  {
    slug: 'men',
    name: 'Men',
    description: 'Tailored essentials and considered outerwear for the modern wardrobe.',
    tone: 5,
  },
  {
    slug: 'women',
    name: 'Women',
    description: 'Fluid silhouettes and refined tailoring built for movement and presence.',
    tone: 2,
  },
  {
    slug: 'unisex',
    name: 'Unisex',
    description: 'Genderless staples designed around fit, fabric and form: for everyone.',
    tone: 6,
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'The final layer. Considered details that complete the Elvic silhouette.',
    tone: 8,
  },
];

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categories.find((c) => c.slug === slug);
}
