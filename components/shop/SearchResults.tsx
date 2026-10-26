'use client';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/lib/data/products';
import { matchesProductSearch } from '@/lib/search';
import ShopClient from '@/components/shop/ShopClient';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

export default function SearchResults() {
  const query = (useSearchParams().get('q') ?? '').trim();
  const matches = query ? products.filter(product => matchesProductSearch(product, query)) : [];
  return <div className="container-elvic py-10 md:py-14">
    <div className="mb-8"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} /></div>
    <h1 className="sr-only">Search results</h1>
    {!matches.length && <p role="status" className="mb-8 text-sm text-stone">{query ? `0 results for “${query}”` : 'Enter a search to find products.'}</p>}
    {matches.length > 0 && <ShopClient key={query} products={matches} showBrandFilter searchCategoryMenu variant="catalog" resultsHeading={
query && <p className="mb-3 flex items-center gap-2 text-sm text-graphite">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6M10 21h4M8 14c-2-1.4-3-3.2-3-5a7 7 0 0 1 14 0c0 1.8-1 3.6-3 5l-1 2H9l-1-2Z" />
        <path d="M12 8v4M12 5.5h.01" />
      </svg>
      <span>Search result for <strong className="font-medium">“{query}”</strong></span>
    </p>
    } />}
    {query && !matches.length && <p className="mb-8 text-sm text-graphite">No matching products. Try a brand, category or shorter search term, or <Link href="/shop" className="underline">browse all products</Link>.</p>}
  </div>;
}
