'use client';

import { useMemo, useRef, useState, type ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import { Product, CategorySlug } from '@/lib/types';
import { categories } from '@/lib/data/categories';
import { collections } from '@/lib/data/collections';
import ProductGrid from '@/components/product/ProductGrid';
import { cn } from '@/lib/utils';
import { matchesProductSearch } from '@/lib/search';

type SortKey = 'featured' | 'new' | 'price-asc' | 'price-desc' | 'best-selling';

const PAGE_SIZE = 12;

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
  const searchParams = useSearchParams();
  const resultsRef = useRef<HTMLDivElement>(null);

  const allSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.sizes))),
    [products]
  );
  const allColors = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.colors.map((c) => c.name)))),
    [products]
  );

  const allBrands = useMemo(() => Array.from(new Set(products.map(p => p.brandName))).sort((a, b) => a.localeCompare(b)), [products]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(searchParams.get('brand') ? [searchParams.get('brand') as string] : []);

  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category') as string] : []
  );
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(300);
  const [sort, setSort] = useState<SortKey>(
    (searchParams.get('sort') as SortKey) ?? 'featured'
  );
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setPage(1);
  }

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (searchParams.get('edit') === 'top-picks' && !p.featured) return false;
      if (searchParams.get('sale') === 'true' && !p.compareAtPrice) return false;
      if (query && !matchesProductSearch(p, query)) return false;
      if (showBrandFilter && selectedBrands.length && !selectedBrands.includes(p.brandName)) return false;
      if (selectedCategories.length && !selectedCategories.some(category => category === 'new-arrivals' ? p.isNew : category === 'sale' ? Boolean(p.compareAtPrice) : category === p.category)) return false;
      if (selectedCollections.length && !selectedCollections.includes(p.collection)) return false;
      if (selectedSizes.length && !p.sizes.some((s) => selectedSizes.includes(s))) return false;
      if (selectedColors.length && !p.colors.some((c) => selectedColors.includes(c.name))) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    switch (sort) {
      case 'new':
        result = [...result].sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      case 'best-selling':
        result = [...result].sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
        break;
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return result;
  }, [products, query, selectedCategories, selectedSizes, selectedColors, selectedCollections, maxPrice, sort, searchParams, showBrandFilter, selectedBrands]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visibleProducts = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function navigatePage(nextPage: number) {
    setPage(nextPage);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function chooseSort(value: SortKey) {
    setSort(value);
    setPage(1);
  }

  function clearAll() {
    setQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedCollections([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(300);
    setPage(1);
  }

  const activeFilterCount =
    (showBrandFilter ? selectedBrands.length : 0) + selectedCategories.length + selectedCollections.length + selectedSizes.length + selectedColors.length + (maxPrice < 300 ? 1 : 0);

  return (
    <div className="grid min-w-0 gap-6 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
      {/* Mobile filter toggle */}
      <div className="flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          aria-expanded={filtersOpen}
          className="text-eyebrow flex items-center gap-2 border border-line px-4 py-2.5 text-xs font-medium text-ink"
        >
          Filter &amp; Sort {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
        <p className="text-xs text-stone">{filtered.length} items</p>
      </div>

      <aside aria-label="Product filters" className={cn('static self-start bg-white/80 p-4 backdrop-blur-sm md:block', filtersOpen ? 'block' : 'hidden')}>
        <button
          type="button"
          onClick={() => setFiltersOpen(false)}
          className="mb-4 block text-xs text-ink underline md:hidden"
          aria-label="Close product filters"
        >
          Close filters
        </button>
        <div className="space-y-8">
          {!hideSearchFilter && <div>
            <label htmlFor="shop-search" className="text-eyebrow mb-3 block text-xs font-medium text-stone">
              Search
            </label>
            <input
              id="shop-search"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={showBrandFilter ? "Search products or brands…" : "Search products…"}
              className="h-11 w-full border border-line bg-transparent px-3 text-sm outline-none placeholder:text-stone focus-visible:border-ink"
            />
          </div>}

          <h2 className="border-b border-line pb-3 text-sm font-medium text-ink">Filter</h2>

          {searchCategoryMenu && <fieldset>
            <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">Category</legend>
            <div className="space-y-2.5">
              {[
                { slug: 'new-arrivals', name: 'New Arrivals' },
                { slug: 'men', name: 'Men' },
                { slug: 'women', name: 'Women' },
              ].map(category => <label key={category.slug} className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite">
                <input type="checkbox" checked={selectedCategories.includes(category.slug)} onChange={() => toggle(selectedCategories, category.slug, setSelectedCategories)} className="h-4 w-4 accent-ink" />
                {category.name}
              </label>)}
              <div>
                <p className="text-sm font-medium text-graphite">Brands</p>
                <div className="mt-3 space-y-2.5 pl-3">
                  {allBrands.map(brand => <label key={brand} className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite">
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(selectedBrands, brand, setSelectedBrands)} className="h-4 w-4 accent-ink" />{brand}
                  </label>)}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-graphite">Collections</p>
                <div className="mt-3 space-y-2.5 pl-3">
                  {collections.filter(collection => products.some(product => product.collection === collection.slug)).map(collection => <label key={collection.slug} className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite">
                    <input type="checkbox" checked={selectedCollections.includes(collection.slug)} onChange={() => toggle(selectedCollections, collection.slug, setSelectedCollections)} className="h-4 w-4 accent-ink" />{collection.name}
                  </label>)}
                </div>
              </div>
              <label className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite">
                <input type="checkbox" checked={selectedCategories.includes('sale')} onChange={() => toggle(selectedCategories, 'sale', setSelectedCategories)} className="h-4 w-4 accent-ink" />Sale
              </label>
            </div>
          </fieldset>}

          {!hideCategoryFilter && !searchCategoryMenu && (
          <fieldset>
            <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">Category</legend>
            <div className="space-y-2.5">
              {categories.filter(c => !categoryFilterSlugs || categoryFilterSlugs.includes(c.slug)).map((c) => (
                <label key={c.slug} className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(c.slug)}
                    onChange={() => toggle(selectedCategories, c.slug, setSelectedCategories)}
                    className="h-4 w-4 accent-ink"
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </fieldset>
          )}

          {showBrandFilter && !searchCategoryMenu && allBrands.length > 0 && (
            <fieldset>
              <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">Brand</legend>
              <div className="space-y-2.5">
                {allBrands.map(brand => (
                  <label key={brand} className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite">
                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggle(selectedBrands, brand, setSelectedBrands)} className="h-4 w-4 accent-ink" />
                    {brand}
                  </label>
                ))}
              </div>
            </fieldset>
          )}



          <fieldset>
            <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">Size</legend>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => toggle(selectedSizes, size, setSelectedSizes)}
                  aria-pressed={selectedSizes.includes(size)}
                  className={cn(
                    'min-h-11 min-w-[2.75rem] border px-2.5 py-1.5 text-xs transition-colors',
                    selectedSizes.includes(size)
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-line text-graphite hover:border-ink'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">Colour</legend>
            <div className="flex flex-wrap gap-3">
              {allColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => toggle(selectedColors, color, setSelectedColors)}
                  aria-pressed={selectedColors.includes(color)}
                  aria-label={color}
                  title={color}
                  className={cn(
                    'h-9 w-9 rounded-full border transition-shadow',
                    selectedColors.includes(color) ? 'ring-2 ring-ink ring-offset-2' : 'border-line'
                  )}
                  style={{
                    backgroundColor:
                      products.flatMap((product) => product.colors).find((option) => option.name === color)?.hex ?? '#8c867c',
                  }}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">
              Max Price: ${maxPrice}
            </legend>
            <input
              type="range"
              min={40}
              max={300}
              step={10}
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setPage(1);
              }}
              className="w-full accent-ink"
              aria-label="Maximum price"
            />
          </fieldset>

          {activeFilterCount > 0 && (
            <button type="button" onClick={clearAll} className="link-underline text-xs text-ink">
              Clear all filters
            </button>
          )}
        </div>
      </aside>

      <div ref={resultsRef} className="min-w-0 scroll-mt-28">
        {resultsHeading}
        <p className="mb-3 hidden text-sm text-stone md:block">{filtered.length} items</p>
        <div className="mb-8 flex flex-wrap items-center gap-2 border border-line bg-bone p-3 text-sm">
          <span className="mr-1 text-graphite">Sort by</span>
          {([
            { value: 'featured', label: 'Relevance' },
            { value: 'new', label: 'Latest' },
            { value: 'best-selling', label: 'Top Sales' },
          ] as const).map(option => <button
            key={option.value}
            type="button"
            onClick={() => chooseSort(option.value)}
            aria-pressed={sort === option.value}
            className={cn('min-h-11 rounded-sm border px-3 py-2 sm:px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone', sort === option.value ? 'border-ink bg-ink text-ivory' : 'border-line bg-ivory text-graphite hover:border-stone hover:bg-sand')}
          >{option.label}</button>)}
          <label className="min-w-[160px] flex-1 sm:max-w-[200px]">
            <span className="sr-only">Sort by price</span>
            <select
              value={sort === 'price-asc' || sort === 'price-desc' ? sort : ''}
              onChange={event => chooseSort((event.target.value || 'featured') as SortKey)}
              className={cn('price-sort-select h-11 w-full rounded-sm border bg-ivory px-3 outline-none', sort.startsWith('price-') ? 'border-ink font-medium text-ink' : 'border-line text-graphite')}
            >
              <option value="">Price</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
          <div className="ml-auto flex items-center gap-4">
            <span aria-live="polite" aria-label={`Page ${currentPage} of ${pageCount}`}><span className="font-medium text-ink">{currentPage}</span>/{pageCount}</span>
            <div className="flex">
              <button type="button" onClick={() => setPage(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous page" className="flex h-11 w-11 items-center justify-center rounded-l-sm border border-line bg-ivory text-graphite transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:bg-bone disabled:text-stone/40">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 6-6 6 6 6" /></svg>
              </button>
              <button type="button" onClick={() => setPage(currentPage + 1)} disabled={currentPage >= pageCount || !filtered.length} aria-label="Next page" className="flex h-11 w-11 items-center justify-center rounded-r-sm border border-l-0 border-line bg-ivory text-graphite transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:bg-bone disabled:text-stone/40">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m10 6 6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>

        <ProductGrid products={visibleProducts} showRating variant={variant} />

        {filtered.length > 0 && <nav aria-label="Product results pagination" className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <button type="button" onClick={() => navigatePage(currentPage - 1)} disabled={currentPage <= 1} aria-label="Previous products page" className="flex h-11 w-11 items-center justify-center text-graphite transition-colors hover:bg-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:text-stone/40">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 6-6 6 6 6" /></svg>
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(pageNumber => <button key={pageNumber} type="button" onClick={() => navigatePage(pageNumber)} aria-label={`Go to products page ${pageNumber}`} aria-current={currentPage === pageNumber ? 'page' : undefined} className={cn('h-11 min-w-11 rounded-sm px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink', currentPage === pageNumber ? 'bg-ink text-ivory' : 'text-graphite hover:bg-bone')}>
            {pageNumber}
          </button>)}
          <button type="button" onClick={() => navigatePage(currentPage + 1)} disabled={currentPage >= pageCount} aria-label="Next products page" className="flex h-11 w-11 items-center justify-center text-graphite transition-colors hover:bg-bone focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:text-stone/40">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m10 6 6 6-6 6" /></svg>
          </button>
        </nav>}


        {children}
      </div>
    </div>
  );
}
