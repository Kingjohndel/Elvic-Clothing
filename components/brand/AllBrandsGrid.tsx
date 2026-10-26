'use client';

import { useEffect, useRef, useState } from 'react';
import { brands } from '@/lib/data/brands';
import BrandCard from '@/components/brand/BrandCard';
import { cn } from '@/lib/utils';

export default function AllBrandsGrid() {
  const [columns, setColumns] = useState(3);
  const [page, setPage] = useState(1);
  const sizingRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<number>();
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const tablet = window.matchMedia('(min-width: 640px)');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const updateColumns = () => {
      setColumns(desktop.matches ? 3 : tablet.matches ? 2 : 1);
      setPage(1);
    };
    updateColumns();
    tablet.addEventListener('change', updateColumns);
    desktop.addEventListener('change', updateColumns);
    return () => {
      tablet.removeEventListener('change', updateColumns);
      desktop.removeEventListener('change', updateColumns);
    };
  }, []);

  useEffect(() => {
    const sizingGrid = sizingRef.current;
    if (!sizingGrid) return;
    const updateHeight = () => {
      const tallestCard = Math.max(...Array.from(sizingGrid.children, card => card.getBoundingClientRect().height));
      const gap = parseFloat(getComputedStyle(sizingGrid).rowGap) || 0;
      setGridHeight(tallestCard * 2 + gap);
    };
    const observer = new ResizeObserver(updateHeight);
    observer.observe(sizingGrid);
    Array.from(sizingGrid.children).forEach(card => observer.observe(card));
    updateHeight();
    return () => observer.disconnect();
  }, []);

  const pageSize = columns * 2;
  const pageCount = Math.ceil(brands.length / pageSize);
  const currentPage = Math.min(page, pageCount);
  const visibleBrands = brands.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const buttonClass = 'flex h-11 items-center gap-2 border border-line px-3 text-xs text-ink transition-colors hover:border-ink hover:bg-ivory disabled:cursor-not-allowed disabled:opacity-35';

  return <section aria-labelledby="all-brands-title" className="[overflow-anchor:none]">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <h2 id="all-brands-title" className="font-display text-2xl text-ink sm:text-3xl">All Brands</h2>
        <p className="mt-2 text-sm text-graphite">Explore every brand at ELVIC. Swipe or use Previous and Next to browse.</p>
      </div>
      <nav aria-label="All Brands pages" className="flex flex-wrap items-center gap-3">
        <span aria-live="polite" aria-label={`Page ${currentPage} of ${pageCount}`} className="min-w-8 text-sm text-graphite"><strong className="font-medium text-ink">{currentPage}</strong>/{pageCount}</span>
        <button type="button" className={buttonClass} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-controls="all-brands-grid"><span aria-hidden="true">←</span> Previous</button>
        <button type="button" className={buttonClass} disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} aria-controls="all-brands-grid">Next <span aria-hidden="true">→</span></button>
      </nav>
    </div>
    <div className="relative mt-6">
    <div ref={sizingRef} aria-hidden="true" className="pointer-events-none invisible absolute inset-x-0 top-0 grid h-0 overflow-hidden grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 [&_article>div:last-child]:flex-wrap">
      {brands.map(brand => <BrandCard key={brand.slug} brand={brand} />)}
    </div>
    <div id="all-brands-grid" style={{ height: gridHeight, gridTemplateRows: gridHeight ? 'repeat(2, minmax(0, 1fr))' : undefined }} className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 [&_article>div:last-child]:flex-wrap"
      onTouchStart={event => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={event => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const dx = event.changedTouches[0].clientX - start.x;
        const dy = event.changedTouches[0].clientY - start.y;
        if (Math.abs(dx) < 60 || Math.abs(dx) <= Math.abs(dy)) return;
        setPage(Math.max(1, Math.min(pageCount, currentPage + (dx < 0 ? 1 : -1))));
      }}
      onTouchCancel={() => { touchStart.current = null; }}>
      {visibleBrands.map(brand => <BrandCard key={brand.slug} brand={brand} />)}
    </div>
    </div>
    <nav aria-label="All Brands bottom pagination" className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
      <button type="button" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous brands page" aria-controls="all-brands-grid" className="flex h-11 w-11 items-center justify-center text-graphite hover:bg-ivory disabled:cursor-not-allowed disabled:text-stone/40">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m14 6-6 6 6 6" /></svg>
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map(pageNumber => <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} aria-label={`Go to brands page ${pageNumber}`} aria-current={currentPage === pageNumber ? 'page' : undefined} aria-controls="all-brands-grid" className={cn('h-11 min-w-11 rounded-sm px-3 text-sm transition-colors', currentPage === pageNumber ? 'bg-ink text-ivory' : 'text-graphite hover:bg-ivory')}>
        {pageNumber}
      </button>)}
      <button type="button" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} aria-label="Next brands page" aria-controls="all-brands-grid" className="flex h-11 w-11 items-center justify-center text-graphite hover:bg-ivory disabled:cursor-not-allowed disabled:text-stone/40">
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m10 6 6 6-6 6" /></svg>
      </button>
    </nav>
  </section>;
}
