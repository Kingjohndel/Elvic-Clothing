import { Collection } from '@/lib/types';

export const collections: Collection[] = [
  {
    slug: 'the-essentials',
    name: 'The Essentials',
    tagline: 'The foundation of a considered wardrobe.',
    description:
      'Clean silhouettes and honest fabrics, built to be worn on repeat. The Essentials strips away the unnecessary and keeps only what earns its place.',
    tone: 1,
  },
  {
    slug: 'signature-tailoring',
    name: 'Signature Tailoring',
    tagline: 'Structure with intent.',
    description:
      'Sharp lines and considered proportions for pieces that hold their shape and command a room without saying a word.',
    tone: 4,
  },
  {
    slug: 'statement-pieces',
    name: 'Statement Pieces',
    tagline: 'Black, refined.',
    description:
      'A study in restraint. Statement Pieces explores tonal black across weight, texture and drape for those who let the cut speak.',
    tone: 7,
  },
  {
    slug: 'off-duty',
    name: 'Off Duty',
    tagline: 'Ease, engineered.',
    description:
      'Relaxed fits and soft-washed fabrics designed for movement: the collection that follows you from studio to street.',
    tone: 3,
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
