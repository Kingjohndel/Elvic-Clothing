'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Link from 'next/link';

export default function BrowseRow({
  id,
  title,
  description,
  items,
  href,
  itemLabel = 'products',
  itemClassName,
}: {
  id: string;
  title: string;
  description: string;
  items: { key: string; content: ReactNode }[];
  itemLabel?: string;
  href?: string;
  itemClassName?: string;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    function updateControls() {
      if (!row) return;
      setCanScroll({
        previous: row.scrollLeft > 2,
        next: row.scrollLeft + row.clientWidth < row.scrollWidth - 2,
      });
    }
    updateControls();
    row.addEventListener('scroll', updateControls, { passive: true });
    const observer = new ResizeObserver(updateControls);
    observer.observe(row);
    return () => {
      row.removeEventListener('scroll', updateControls);
      observer.disconnect();
    };
  }, [items.length]);

  function browse(direction: -1 | 1) {
    const row = rowRef.current;
    if (!row) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    row.scrollBy({
      left: direction * row.clientWidth,
      behavior: reducedMotion ? 'auto' : 'smooth',
    });
  }

  return (
    <section aria-labelledby={`${id}-title`}>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <h2
            id={`${id}-title`}
            className="font-display text-2xl leading-tight text-ink sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-graphite">{description}</p>
        </div>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          {href && (
            <Link
              href={href}
              className="link-underline text-eyebrow mr-2 text-[10px] font-medium text-ink"
            >
              View All
            </Link>
          )}
          <button
            type="button"
            onClick={() => browse(-1)}
            disabled={!canScroll.previous}
            aria-label={`Previous ${title} ${itemLabel}`}
            aria-controls={id}
            className="flex h-11 items-center gap-2 border border-line px-3 text-xs text-ink transition-colors hover:border-ink hover:bg-bone disabled:cursor-not-allowed disabled:opacity-35"
          >
            <span aria-hidden="true">←</span> Previous
          </button>
          <button
            type="button"
            onClick={() => browse(1)}
            disabled={!canScroll.next}
            aria-label={`Next ${title} ${itemLabel}`}
            aria-controls={id}
            className="flex h-11 items-center gap-2 border border-line px-3 text-xs text-ink transition-colors hover:border-ink hover:bg-bone disabled:cursor-not-allowed disabled:opacity-35"
          >
            Next <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div
        ref={rowRef}
        id={id}
        role="region"
        aria-label={`${title} ${itemLabel}`}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            browse(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6 md:gap-8"
      >
        {items.map((item) => (
          <div
            key={item.key}
            className={`min-w-0 shrink-0 grow-0 snap-start ${itemClassName ?? 'basis-[calc((100%_-_1rem)/2)] sm:basis-[calc((100%_-_3rem)/3)] md:basis-[calc((100%_-_4rem)/3)] lg:basis-[calc((100%_-_6rem)/4)]'}`}
          >
            {item.content}
          </div>
        ))}
      </div>
    </section>
  );
}
