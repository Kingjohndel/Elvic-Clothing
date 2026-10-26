import { editorialPhoto } from '@/lib/imagery';
import { brands } from '@/lib/data/brands';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BrandCard from '@/components/brand/BrandCard';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import AllBrandsGrid from '@/components/brand/AllBrandsGrid';
import JsonLd from '@/components/JsonLd';
import { buildMetadata, siteConfig } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Top Brands',
  description: 'Discover a curated selection of fashion brands, brought together in one considered destination.',
  path: '/brands',
});

export default function BrandsPage() {
  const directoryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: brands.map((brand, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteConfig.url}/brands/${brand.slug}`,
      name: brand.name,
    })),
  };

  return (
    <div>
      <JsonLd data={directoryJsonLd} />
      <div className="container-elvic py-6 md:py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Brands' }]} />
      </div>
      <section className="relative flex min-h-[240px] items-end overflow-hidden bg-ink text-ivory md:min-h-[260px]">
        <div className="absolute inset-0">
          <div className="grid h-full grid-cols-3">{['tommy-hilfiger', 'ashluxe', 'versace'].map(slug => <div key={slug} className="h-full min-w-0 overflow-hidden"><PlaceholderImage src={editorialPhoto(slug)} label={`${slug.replace(/-/g, ' ')} style edit`} monogram={false} /></div>)}</div>
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/60 to-ink/50" />
        </div>
        <div className="container-elvic relative z-10 py-8">
          <p className="text-eyebrow text-xs font-medium text-ivory/85">Curated, Not Endless</p>
          <h1 className="mt-3 font-display text-5xl sm:text-6xl">Top Brands</h1>
          <p className="mt-3 max-w-md text-base text-ivory/90">
            Discover a curated selection of fashion from some of the world’s most recognized and sought-after brands: brought together in one considered destination.
          </p>
        </div>
      </section>
      <section id="featured" className="container-elvic scroll-mt-24 py-10 md:py-12">
        <h2 className="text-eyebrow mb-8 text-xs font-medium text-stone">Top 3 Brands</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {brands.filter(brand => brand.featured).slice(0, 3).map(brand => <div key={brand.slug} className="brand-featured-card border border-line bg-bone p-4 [&_article>div:last-child]:flex-wrap">
            <p className="text-eyebrow mb-4 inline-block bg-ink px-3 py-1.5 text-[10px] font-medium text-ivory">Top Brand</p>
            <BrandCard brand={brand} />
          </div>)}
        </div>
      </section>
      <section className="bg-bone py-20 md:py-28">
        <div className="container-elvic">
          <AllBrandsGrid />
        </div>
      </section>
    </div>
  );
}
