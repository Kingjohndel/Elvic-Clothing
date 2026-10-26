'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { matchesProductSearch } from '@/lib/search';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '@/lib/data/products';
import { collections } from '@/lib/data/collections';
import { categories } from '@/lib/data/categories';
import { formatPrice } from '@/lib/utils';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

export default function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
    setQuery('');
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { products: [], collections: [], categories: [] };
    return {
      products: products.filter((p) => matchesProductSearch(p, q)).slice(0, 6),
      collections: collections.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 3),
      categories: categories.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);

  const hasResults =
    results.products.length + results.collections.length + results.categories.length > 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          className="fixed inset-0 z-50 bg-ink/20"
          onClick={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <div className={`relative flex max-h-[100dvh] flex-col bg-ivory shadow-lg ${hasQuery ? 'h-full' : 'h-auto'}`}>
          <form onSubmit={(event) => { event.preventDefault(); if (hasQuery) { router.push(`/search?q=${encodeURIComponent(query.trim())}`); onClose(); } else { inputRef.current?.focus(); } }} className="container-elvic sticky top-0 z-10 flex shrink-0 items-center gap-2 sm:gap-3 border-b border-line bg-ivory py-3">
            <label htmlFor="site-search" className="sr-only">
              Search products, collections and categories
            </label>
            <input
              ref={inputRef}
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, collections, categories…"
              className="h-11 min-w-0 flex-1 border border-line bg-transparent px-3 text-sm text-ink outline-none placeholder:text-stone focus-visible:border-ink sm:text-base"
            />
            <button type="submit" aria-label="Show search results" className="h-11 shrink-0 bg-ink px-3 text-xs text-ivory">Search</button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-11 w-10 shrink-0 items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </form>

          <div className={`container-elvic min-h-0 overflow-y-auto ${hasQuery ? 'flex-1 py-8' : 'py-4'}`}>
            {!hasQuery && (
              <p className="text-sm text-stone">
                Try &ldquo;Hoodie&rdquo;, &ldquo;Tailored&rdquo;, &ldquo;Women&rdquo; or &ldquo;Noir&rdquo;.
              </p>
            )}

            {hasQuery && !hasResults && (
              <p className="text-sm text-stone">No results for &ldquo;{query}&rdquo;. Try another term.</p>
            )}

            {results.categories.length > 0 && (
              <div className="mb-8">
                <p className="text-eyebrow mb-3 text-xs font-medium text-stone">Categories</p>
                <ul className="flex flex-wrap gap-2">
                  {results.categories.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/category/${c.slug}`}
                        onClick={onClose}
                        className="inline-flex min-h-11 items-center border border-line px-4 py-2 text-sm text-ink hover:border-ink"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.collections.length > 0 && (
              <div className="mb-8">
                <p className="text-eyebrow mb-3 text-xs font-medium text-stone">Collections</p>
                <ul className="flex flex-wrap gap-2">
                  {results.collections.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/collections/${c.slug}`}
                        onClick={onClose}
                        className="inline-flex min-h-11 items-center border border-line px-4 py-2 text-sm text-ink hover:border-ink"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {results.products.length > 0 && (
              <div>
                <p className="text-eyebrow mb-4 text-xs font-medium text-stone">Products</p>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-6">
                  {results.products.map((p) => (
                    <li key={p.id}>
                      <Link href={`/product/${p.slug}`} onClick={onClose} className="group block">
                        <div className="aspect-[3/4] overflow-hidden bg-bone">
                          <PlaceholderImage productId={p.id} color={p.colors[0]?.name} label={`${p.brandName} ${p.name}`} />
                        </div>
                        <p className="mt-2 text-sm text-ink">{p.name}</p>
                        <p className="text-xs text-stone">{formatPrice(p.price)}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
