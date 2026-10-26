'use client';
import type { Product, CategorySlug } from '@/lib/types';
import type { ProductCatalogState } from '@/lib/hooks/useProductCatalog';
import { categories } from '@/lib/data/categories';
import { collections } from '@/lib/data/collections';
import { cn } from '@/lib/utils';
interface Props {
  catalog: ProductCatalogState;
  products: Product[];
  hideCategoryFilter?: boolean;
  categoryFilterSlugs?: CategorySlug[];
  searchCategoryMenu?: boolean;
  hideSearchFilter?: boolean;
  showBrandFilter?: boolean;
}
export default function ProductFilters({
  catalog,
  products,
  hideCategoryFilter,
  categoryFilterSlugs,
  searchCategoryMenu,
  hideSearchFilter,
  showBrandFilter,
}: Props) {
  const {
    allSizes,
    allColors,
    allBrands,
    query,
    setQuery,
    selectedBrands,
    setSelectedBrands,
    selectedCategories,
    setSelectedCategories,
    selectedCollections,
    setSelectedCollections,
    selectedSizes,
    setSelectedSizes,
    selectedColors,
    setSelectedColors,
    maxPrice,
    setMaxPrice,
    filtersOpen,
    setFiltersOpen,
    toggle,
    clearAll,
    activeFilterCount,
    filtered,
    setPage,
  } = catalog;
  return (
    <>
      {' '}
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
      <aside
        aria-label="Product filters"
        className={cn(
          'static self-start bg-white/80 p-4 backdrop-blur-sm md:block',
          filtersOpen ? 'block' : 'hidden',
        )}
      >
        <button
          type="button"
          onClick={() => setFiltersOpen(false)}
          className="mb-4 block text-xs text-ink underline md:hidden"
          aria-label="Close product filters"
        >
          Close filters
        </button>
        <div className="space-y-8">
          {!hideSearchFilter && (
            <div>
              <label
                htmlFor="shop-search"
                className="text-eyebrow mb-3 block text-xs font-medium text-stone"
              >
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
                placeholder={showBrandFilter ? 'Search products or brands…' : 'Search products…'}
                className="h-11 w-full border border-line bg-transparent px-3 text-sm outline-none placeholder:text-stone focus-visible:border-ink"
              />
            </div>
          )}

          <h2 className="border-b border-line pb-3 text-sm font-medium text-ink">Filter</h2>

          {searchCategoryMenu && (
            <fieldset>
              <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">Category</legend>
              <div className="space-y-2.5">
                {[
                  { slug: 'new-arrivals', name: 'New Arrivals' },
                  { slug: 'men', name: 'Men' },
                  { slug: 'women', name: 'Women' },
                ].map((category) => (
                  <label
                    key={category.slug}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.slug)}
                      onChange={() =>
                        toggle(selectedCategories, category.slug, setSelectedCategories)
                      }
                      className="h-4 w-4 accent-ink"
                    />
                    {category.name}
                  </label>
                ))}
                <div>
                  <p className="text-sm font-medium text-graphite">Brands</p>
                  <div className="mt-3 space-y-2.5 pl-3">
                    {allBrands.map((brand) => (
                      <label
                        key={brand}
                        className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite"
                      >
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggle(selectedBrands, brand, setSelectedBrands)}
                          className="h-4 w-4 accent-ink"
                        />
                        {brand}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-graphite">Collections</p>
                  <div className="mt-3 space-y-2.5 pl-3">
                    {collections
                      .filter((collection) =>
                        products.some((product) => product.collection === collection.slug),
                      )
                      .map((collection) => (
                        <label
                          key={collection.slug}
                          className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCollections.includes(collection.slug)}
                            onChange={() =>
                              toggle(selectedCollections, collection.slug, setSelectedCollections)
                            }
                            className="h-4 w-4 accent-ink"
                          />
                          {collection.name}
                        </label>
                      ))}
                  </div>
                </div>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes('sale')}
                    onChange={() => toggle(selectedCategories, 'sale', setSelectedCategories)}
                    className="h-4 w-4 accent-ink"
                  />
                  Sale
                </label>
              </div>
            </fieldset>
          )}

          {!hideCategoryFilter && !searchCategoryMenu && (
            <fieldset>
              <legend className="text-eyebrow mb-3 text-xs font-medium text-stone">Category</legend>
              <div className="space-y-2.5">
                {categories
                  .filter((c) => !categoryFilterSlugs || categoryFilterSlugs.includes(c.slug))
                  .map((c) => (
                    <label
                      key={c.slug}
                      className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite"
                    >
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
                {allBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex cursor-pointer items-center gap-2.5 text-sm text-graphite"
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggle(selectedBrands, brand, setSelectedBrands)}
                      className="h-4 w-4 accent-ink"
                    />
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
                      : 'border-line text-graphite hover:border-ink',
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
                    selectedColors.includes(color)
                      ? 'ring-2 ring-ink ring-offset-2'
                      : 'border-line',
                  )}
                  style={{
                    backgroundColor:
                      products
                        .flatMap((product) => product.colors)
                        .find((option) => option.name === color)?.hex ?? '#8c867c',
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
    </>
  );
}
