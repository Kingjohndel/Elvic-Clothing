'use client';

import { cn } from '@/lib/utils';
import ChevronIcon from './ChevronIcon';

interface Props {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  itemLabel?: string;
  ariaLabel?: string;
  ariaControls?: string;
  hoverSurface?: 'bone' | 'ivory';
}

export default function Pagination({
  page,
  pageCount,
  onPageChange,
  itemLabel = 'products',
  ariaLabel = 'Product results pagination',
  ariaControls,
  hoverSurface = 'bone',
}: Props) {
  const hover = hoverSurface === 'ivory' ? 'hover:bg-ivory' : 'hover:bg-bone';
  const arrowClass = cn(
    'flex h-11 w-11 items-center justify-center text-graphite transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:cursor-not-allowed disabled:text-stone/40',
    hover,
  );
  return (
    <nav
      aria-label={ariaLabel}
      className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5"
    >
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label={`Previous ${itemLabel} page`}
        aria-controls={ariaControls}
        className={arrowClass}
      >
        <ChevronIcon direction="left" />
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onPageChange(number)}
          aria-label={`Go to ${itemLabel} page ${number}`}
          aria-current={page === number ? 'page' : undefined}
          aria-controls={ariaControls}
          className={cn(
            'h-11 min-w-11 rounded-sm px-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink',
            page === number ? 'bg-ink text-ivory' : cn('text-graphite', hover),
          )}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        aria-label={`Next ${itemLabel} page`}
        aria-controls={ariaControls}
        className={arrowClass}
      >
        <ChevronIcon direction="right" />
      </button>
    </nav>
  );
}
