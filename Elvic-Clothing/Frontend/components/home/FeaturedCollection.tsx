import { editorialPhoto } from '@/lib/imagery';
import { Collection } from '@/lib/types';
import CatalogImage from '@/components/ui/CatalogImage';
import Button from '@/components/ui/Button';

export default function FeaturedCollection({ collection }: { collection: Collection }) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-elvic grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="home-hover-card lookbook-interactive relative aspect-[4/5] w-full overflow-hidden bg-bone lg:order-2">
          <CatalogImage
            className="lookbook-image"
            src={editorialPhoto(collection.slug)}
            label={collection.name}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-bone/85 to-transparent px-6 pb-8 pt-12 text-center sm:pb-10">
            <p className="text-eyebrow text-[10px] font-medium text-graphite sm:text-xs">
              Featured Collection
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{collection.name}</p>
          </div>
        </div>

        <div className="lg:order-1">
          <p className="text-eyebrow mb-5 text-xs font-medium text-stone">Featured Collection</p>
          <h2 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl">
            {collection.name}
          </h2>
          <p className="mt-4 text-lg text-graphite">{collection.tagline}</p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-graphite">
            {collection.description}
          </p>
          <Button href={`/collections/${collection.slug}`} variant="secondary" className="mt-9">
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
