import { editorialPhoto } from '@/lib/imagery';
import Link from 'next/link';
import { Collection } from '@/lib/types';
import CatalogImage from '@/components/ui/CatalogImage';

export default function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="collection-card home-hover-card group block border border-line bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-bone">
        <div className="lookbook-image h-full w-full">
          <CatalogImage src={editorialPhoto(collection.slug)} label={collection.name} />
        </div>
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/10" />
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-8 pt-12 text-center sm:pb-10 ${collection.tone >= 5 ? 'bg-gradient-to-t from-ink/60 to-transparent text-ivory' : 'bg-gradient-to-t from-bone/85 to-transparent text-ink'}`}
        >
          <p className="text-eyebrow text-[10px] font-medium opacity-75 sm:text-xs">Collection</p>
          <p className="mt-2 text-sm leading-relaxed">{collection.name}</p>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl text-ink">{collection.name}</h3>
        <p className="mt-1 text-sm text-stone">{collection.tagline}</p>
        <span className="link-underline mt-3 inline-block text-eyebrow text-xs font-medium text-ink">
          Explore Collection
        </span>
      </div>
    </Link>
  );
}
