import { Suspense } from 'react';
import { buildMetadata } from '@/lib/seo';
import SearchResults from '@/components/shop/SearchResults';

export const metadata = buildMetadata({
  title: 'Search Results',
  description: 'Find ELVIC products and related styles.',
  path: '/search',
});
export default function SearchPage() {
  return (
    <Suspense fallback={<p className="container-elvic py-16">Loading search results…</p>}>
      <SearchResults />
    </Suspense>
  );
}
