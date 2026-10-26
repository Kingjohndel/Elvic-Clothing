import catalogue from '@/lib/data/imagery.json';
import brandCovers from '@/lib/data/brand-imagery.json';
import collectionCovers from '@/lib/data/collection-imagery.json';
import categoryBanners from '@/lib/data/category-banners.json';
export type PhotoVariant = { color: string; hex: string; title: string; source: string; images: string[]; remote: string[]; illustrative?: boolean; views?: string[] };
export const productPhotography = catalogue as Record<string, PhotoVariant[]>;
export function productPhoto(id: string, color?: string) {
  const variants = productPhotography[id];
  return variants?.find((v) => v.color === color) ?? variants?.[0];
}
const brands: Record<string, string> = { 'calvin-klein': 'p1', 'ralph-lauren': 'p2', ashluxe: 'p3', hugo: 'p4', versace: 'p11', lacoste: 'p10', nike: 'p7', adidas: 'p8', 'tommy-hilfiger': 'p9' };
const collections: Record<string, string> = { 'the-essentials': 'p1', 'signature-tailoring': 'p9', 'statement-pieces': 'p11', 'off-duty': 'p3', men: 'p2', women: 'p9', unisex: 'p3', accessories: 'p8' };
export function editorialPhoto(key: string) { return (brandCovers as Record<string, string>)[key] ?? (collectionCovers as Record<string, string>)[key] ?? productPhoto(brands[key] ?? collections[key] ?? key)?.images[0] ?? productPhoto('p9')!.images[0]; }
export function defaultPhoto(label = '', tone = 1) {
  const normalized = label.toLowerCase().replace(/ /g, '-');
  const key = Object.keys({...brands,...collections}).find((k) => normalized.includes(k));
  return editorialPhoto(key ?? ({1:'p1',2:'p9',3:'p2',4:'p9',5:'p4',6:'p10',7:'p3',8:'p11'}[tone] ?? 'p9'));
}

export function categoryBannerPhoto(key: string) { return (categoryBanners as Record<string, string>)[key] ?? editorialPhoto(key); }
