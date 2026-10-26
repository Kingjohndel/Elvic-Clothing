import { editorialPhoto } from '@/lib/imagery';
import Link from 'next/link';
import CatalogImage from '@/components/ui/CatalogImage';
import { products } from '@/lib/data/products';
import { brands } from '@/lib/data/brands';

export default function BrandCard({ brand }: { brand: (typeof brands)[number] }) {
  const count = products.filter((product) => product.brand === brand.slug).length;

  return (
    <article className="brand-card group flex min-w-0 flex-col border border-line bg-ivory">
      <Link
        href={`/brands/${brand.slug}`}
        className="brand-card-image lookbook-interactive relative block w-full overflow-hidden bg-bone aspect-[4/5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        <div className="relative h-full w-full lookbook-image">
          <CatalogImage src={editorialPhoto(brand.slug)} label={brand.name} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
        <div className="lookbook-caption absolute inset-x-0 bottom-0 p-6">
          <p className="text-eyebrow text-[11px] font-medium text-ivory/70">{brand.category}</p>
          <h3 className="mt-2 font-display text-ivory text-2xl">{brand.name}</h3>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="max-w-sm text-sm leading-relaxed text-graphite">{brand.description}</p>
        <div className="mt-5 flex flex-col items-start gap-3">
          <p className="text-xs text-stone">
            {count} {count === 1 ? 'piece' : 'pieces'} on ELVIC
          </p>
          <Link
            href={`/brands/${brand.slug}`}
            className="brand-shop-link link-underline text-eyebrow min-w-0 text-xs font-medium text-ink"
          >
            <span>Shop {brand.name}</span>{' '}
            <span aria-hidden="true" className="brand-shop-arrow inline-block">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
