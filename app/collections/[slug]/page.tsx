import { editorialPhoto } from '@/lib/imagery';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import ProductGrid from '@/components/product/ProductGrid';
import { collections, getCollectionBySlug } from '@/lib/data/collections';
import { getProductsByCollection } from '@/lib/data/products';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) {
    return buildMetadata({ title: 'Collection Not Found', description: 'This collection could not be found.', path: `/collections/${params.slug}`, noIndex: true });
  }
  return buildMetadata({
    title: collection.name,
    description: collection.description,
    path: `/collections/${collection.slug}`,
  });
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = getCollectionBySlug(params.slug);
  if (!collection) notFound();
  const collectionProducts = getProductsByCollection(collection.slug);

  return (
    <div>
      <div className="container-elvic py-10 md:py-14">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Collections', href: '/collections' },
            { label: collection.name },
          ]}
        />
      </div>

      <section className="relative flex h-[50vh] min-h-[380px] items-end overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0">
          <PlaceholderImage src={editorialPhoto(collection.slug)} monogram={false} />
          <div className="absolute inset-0 bg-ink/40" />
        </div>
        <div className="container-elvic relative z-10 pb-12">
          <p className="text-eyebrow text-xs font-medium text-bone/70">Collection</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">{collection.name}</h1>
          <p className="mt-3 max-w-md text-base text-bone/85">{collection.tagline}</p>
        </div>
      </section>

      <div className="container-elvic py-16 md:py-20">
        <p className="max-w-2xl text-base leading-relaxed text-graphite">{collection.description}</p>
        <div className="mt-12">
          <ProductGrid products={collectionProducts} showRating variant={collection.slug === 'signature-tailoring' ? 'catalog' : 'default'} />
        </div>
      </div>
    </div>
  );
}
