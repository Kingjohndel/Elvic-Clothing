import type { Product } from './types';
import { matchesProductSearch } from './search';

export const CATALOG_PAGE_SIZE = 12;
export const DEFAULT_MAX_PRICE = 300;
export const SORT_KEYS = ['featured', 'new', 'price-asc', 'price-desc', 'best-selling'] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export interface ProductFilters {
  query: string;
  brands: string[];
  categories: string[];
  collections: string[];
  sizes: string[];
  colors: string[];
  maxPrice: number;
  topPicksOnly?: boolean;
  saleOnly?: boolean;
}

export function parseSort(value: string | null): SortKey {
  return SORT_KEYS.find((key) => key === value) ?? 'featured';
}

export function isOnSale(product: Product) {
  return product.compareAtPrice !== undefined && product.compareAtPrice > product.price;
}

export function filterAndSortProducts(
  products: readonly Product[],
  filters: ProductFilters,
  sort: SortKey,
) {
  const query = filters.query.trim();
  const result = products.filter((product) => {
    if (filters.topPicksOnly && !product.featured) return false;
    if (filters.saleOnly && !isOnSale(product)) return false;
    if (query && !matchesProductSearch(product, query)) return false;
    if (filters.brands.length && !filters.brands.includes(product.brandName)) return false;
    if (
      filters.categories.length &&
      !filters.categories.some((category) =>
        category === 'new-arrivals'
          ? product.isNew
          : category === 'sale'
            ? isOnSale(product)
            : category === product.category,
      )
    )
      return false;
    if (filters.collections.length && !filters.collections.includes(product.collection))
      return false;
    if (filters.sizes.length && !product.sizes.some((size) => filters.sizes.includes(size)))
      return false;
    if (
      filters.colors.length &&
      !product.colors.some((color) => filters.colors.includes(color.name))
    )
      return false;
    return product.price <= filters.maxPrice;
  });
  switch (sort) {
    case 'new':
      return result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case 'best-selling':
      return result.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    case 'price-asc':
      return result.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return result.sort((a, b) => b.price - a.price);
    default:
      return result;
  }
}

export function paginateProducts(
  products: readonly Product[],
  requestedPage: number,
  pageSize = CATALOG_PAGE_SIZE,
) {
  const safePageSize =
    Number.isSafeInteger(pageSize) && pageSize > 0 ? pageSize : CATALOG_PAGE_SIZE;
  const pageCount = Math.max(1, Math.ceil(products.length / safePageSize));
  const page = Number.isSafeInteger(requestedPage)
    ? Math.max(1, Math.min(requestedPage, pageCount))
    : 1;
  return {
    page,
    pageCount,
    products: products.slice((page - 1) * safePageSize, page * safePageSize),
  };
}
