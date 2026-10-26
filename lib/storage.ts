import { products } from './data/products';
import type { CartLine } from './types';

export const CART_STORAGE_KEY = 'elvic-cart-v1';
export const WISHLIST_STORAGE_KEY = 'elvic-wishlist-v1';

function parseArray(raw: string | null): unknown[] {
  try {
    const value: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function isPositiveQuantity(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0;
}

/** Restore valid selections using current catalog metadata, never stored prices. */
export function decodeCart(raw: string | null): CartLine[] {
  const lines = new Map<string, CartLine>();
  for (const value of parseArray(raw)) {
    if (!value || typeof value !== 'object') continue;
    const item = value as Record<string, unknown>;
    const product = products.find((product) => product.id === item.productId);
    if (
      !product ||
      typeof item.size !== 'string' ||
      typeof item.color !== 'string' ||
      !product.sizes.includes(item.size) ||
      !product.colors.some((color) => color.name === item.color) ||
      !isPositiveQuantity(item.quantity)
    )
      continue;
    const key = JSON.stringify([product.id, item.size, item.color]);
    const existing = lines.get(key);
    const quantity = (existing?.quantity ?? 0) + item.quantity;
    if (!isPositiveQuantity(quantity)) continue;
    lines.set(key, {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      tone: product.tone,
      size: item.size,
      color: item.color,
      quantity,
    });
  }
  return [...lines.values()];
}

export function decodeWishlist(raw: string | null): string[] {
  const validIds = new Set(products.map((product) => product.id));
  return [
    ...new Set(
      parseArray(raw).filter((id): id is string => typeof id === 'string' && validIds.has(id)),
    ),
  ];
}
