export type CategorySlug = 'men' | 'women' | 'unisex' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandName: string;
  category: CategorySlug;
  collection: string;
  price: number;
  compareAtPrice?: number;
  isNew: boolean;
  isBestSeller: boolean;
  featured?: boolean;
  colors: ProductColor[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string[];
  materials: string[];
  care: string[];
  tone: number;
  reviews: ProductReview[];
}

export interface Collection {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tone: number;
}

export interface CartLine {
  productId: string;
  slug: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  tone: number;
}
