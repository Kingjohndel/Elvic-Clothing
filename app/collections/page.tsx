import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import CollectionCard from '@/components/collection/CollectionCard';
import { collections } from '@/lib/data/collections';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Collections',
  description: 'Explore ELVIC CLOTHING’s seasonal collections, from foundational essentials to signature tailoring.',
  path: '/collections',
});

export default function CollectionsPage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Collections' }]} />
      <div className="mt-6 mb-12">
        <SectionHeading as="h1" eyebrow="Curated" title="Collections" />
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2">
        {collections.map((collection) => (
          <CollectionCard key={collection.slug} collection={collection} />
        ))}
      </div>
    </div>
  );
}
