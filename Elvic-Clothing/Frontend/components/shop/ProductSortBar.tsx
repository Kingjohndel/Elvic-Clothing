'use client';
import ChevronIcon from '@/components/ui/ChevronIcon';
import type { ProductCatalogState } from '@/lib/hooks/useProductCatalog';
import { parseSort } from '@/lib/catalog';
import { cn } from '@/lib/utils';
export default function ProductSortBar({ catalog }: { catalog: ProductCatalogState }) {
  const { sort, chooseSort, currentPage, pageCount, setPage, filtered } = catalog;
  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 border border-line bg-bone p-3 text-sm">
      <span className="mr-1 text-graphite">Sort by</span>
      {(
        [
          { value: 'featured', label: 'Relevance' },
          { value: 'new', label: 'Latest' },
          { value: 'best-selling', label: 'Top Sales' },
        ] as const
      ).map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => chooseSort(option.value)}
          aria-pressed={sort === option.value}
          className={cn(
            'min-h-11 rounded-sm border px-3 py-2 sm:px-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bone',
            sort === option.value
              ? 'border-ink bg-ink text-ivory'
              : 'border-line bg-ivory text-graphite hover:border-stone hover:bg-sand',
          )}
        >
          {option.label}
        </button>
      ))}
      <label className="min-w-[160px] flex-1 sm:max-w-[200px]">
        <span className="sr-only">Sort by price</span>
        <select
          value={sort === 'price-asc' || sort === 'price-desc' ? sort : ''}
          onChange={(event) => chooseSort(parseSort(event.target.value))}
          className={cn(
            'price-sort-select h-11 w-full rounded-sm border bg-ivory px-3 outline-none',
            sort.startsWith('price-')
              ? 'border-ink font-medium text-ink'
              : 'border-line text-graphite',
          )}
        >
          <option value="">Price</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </label>
      <div className="ml-auto flex items-center gap-4">
        <span aria-live="polite" aria-label={`Page ${currentPage} of ${pageCount}`}>
          <span className="font-medium text-ink">{currentPage}</span>/{pageCount}
        </span>
        <div className="flex">
          <button
            type="button"
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="flex h-11 w-11 items-center justify-center rounded-l-sm border border-line bg-ivory text-graphite transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:bg-bone disabled:text-stone/40"
          >
            <ChevronIcon direction="left" className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= pageCount || !filtered.length}
            aria-label="Next page"
            className="flex h-11 w-11 items-center justify-center rounded-r-sm border border-l-0 border-line bg-ivory text-graphite transition-colors hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:bg-bone disabled:text-stone/40"
          >
            <ChevronIcon direction="right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
