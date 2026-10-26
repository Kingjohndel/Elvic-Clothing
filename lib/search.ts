import { Product } from '@/lib/types';

export function normalizeSearch(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\bt[ -]?shirts?\b/g, 'tee')
    .replace(/\bpants\b/g, 'trouser')
    .replace(/\bdresses\b/g, 'dress')
    .replace(/\bhoodies\b/g, 'hoodie')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}
export function matchesProductSearch(product: Product, query: string) {
  const terms = normalizeSearch(query).split(' ').filter(Boolean);
  const words = normalizeSearch(
    `${product.brandName} ${product.name} ${product.category} ${product.collection} ${product.shortDescription} ${product.colors.map((color) => color.name).join(' ')}`,
  ).split(' ');
  return terms.length > 0 && terms.every((term) => words.some((word) => word.startsWith(term)));
}
