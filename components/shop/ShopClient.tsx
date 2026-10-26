'use client';
import { useRef, type ReactNode } from 'react';
import type { Product, CategorySlug } from '@/lib/types';
import { useProductCatalog } from '@/lib/hooks/useProductCatalog';
import ProductGrid from '@/components/product/ProductGrid';
import ProductFilters from './ProductFilters';
import ProductSortBar from './ProductSortBar';
import Pagination from '@/components/ui/Pagination';

export default function ShopClient({
  products,
  hideCategoryFilter = false,
  categoryFilterSlugs,
  searchCategoryMenu = false,
  hideSearchFilter = false,
  showBrandFilter = false,
  variant = 'default',
  children,
  resultsHeading,
}: {
  products: Product[];
  hideCategoryFilter?: boolean;
  categoryFilterSlugs?: CategorySlug[];
  searchCategoryMenu?: boolean;
  hideSearchFilter?: boolean;
  showBrandFilter?: boolean;
  variant?: 'default' | 'catalog';
  children?: ReactNode;
  resultsHeading?: ReactNode;
}) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const catalog = useProductCatalog(products, showBrandFilter || searchCategoryMenu);
  const { filtered, currentPage, pageCount, visibleProducts } = catalog;
  function navigatePage(nextPage: number) {
    catalog.setPage(Math.max(1, Math.min(nextPage, pageCount)));
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resultsRef.current?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });
  }
  return (
    <div className="grid min-w-0 gap-6 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
      <ProductFilters
        catalog={catalog}
        products={products}
        hideCategoryFilter={hideCategoryFilter}
        categoryFilterSlugs={categoryFilterSlugs}
        searchCategoryMenu={searchCategoryMenu}
        hideSearchFilter={hideSearchFilter}
        showBrandFilter={showBrandFilter}
      />
      <div ref={resultsRef} className="min-w-0 scroll-mt-28">
        {resultsHeading}
        <p className="mb-3 hidden text-sm text-stone md:block">{filtered.length} items</p>
        <ProductSortBar catalog={catalog} />
        <ProductGrid products={visibleProducts} showRating variant={variant} />
        {filtered.length > 0 && (
          <Pagination page={currentPage} pageCount={pageCount} onPageChange={navigatePage} />
        )}
        {children}
      </div>
    </div>
  );
}
