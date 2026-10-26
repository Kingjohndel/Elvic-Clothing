import { editorialPhoto } from '@/lib/imagery';
import Link from 'next/link';
import { brands } from '@/lib/data/brands';
import BrowseRow from '@/components/ui/BrowseRow';
import PlaceholderImage from '@/components/ui/PlaceholderImage';

export default function TopBrandsRow() {
  return (
    <BrowseRow
      id="top-brands-row"
      title="Top Brands"
      description="Explore the labels in the ELVIC edit."
      href="/brands"
      itemLabel="brands"
      items={brands.map(brand => ({
        key: brand.slug,
        content: (
          <Link href={`/brands/${brand.slug}`} className="home-hover-card lookbook-interactive group block border border-line bg-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <div className="relative aspect-[4/3] overflow-hidden bg-bone">
              <div className="h-full w-full lookbook-image">
                <PlaceholderImage src={editorialPhoto(brand.slug)} label={brand.name} monogram={false} />
              </div>
            </div>
            <div className="p-5">
            <p className="text-eyebrow text-[10px] font-medium text-stone">{brand.category}</p>
            <h3 className="mt-1 font-display text-xl text-ink">{brand.name}</h3>
            <span className="link-underline text-eyebrow mt-3 inline-block text-[10px] font-medium text-ink">Shop Brand →</span>
            </div>
          </Link>
        ),
      }))}
    />
  );
}
