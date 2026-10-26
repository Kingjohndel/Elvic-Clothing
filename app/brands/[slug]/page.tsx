import { editorialPhoto } from '@/lib/imagery';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { brands } from '@/lib/data/brands';
import { brandProfiles } from '@/lib/data/brandProfiles';
import { products } from '@/lib/data/products';
import ShopClient from '@/components/shop/ShopClient';
import SectionHeading from '@/components/ui/SectionHeading';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import ProductGrid from '@/components/product/ProductGrid';
import Button from '@/components/ui/Button';
import JsonLd from '@/components/JsonLd';
import { buildMetadata, siteConfig } from '@/lib/seo';

export function generateStaticParams() {
  return brands.map(brand => ({ slug: brand.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const brand = brands.find(brand => brand.slug === params.slug);
  if (!brand) return buildMetadata({ title: 'Brand Not Found', description: 'This brand could not be found.', path: `/brands/${params.slug}`, noIndex: true });
  return buildMetadata({ title: brand.name, description: brand.description, path: `/brands/${brand.slug}` });
}

export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = brands.find(brand => brand.slug === params.slug);
  if (!brand) notFound();
  const brandProducts = products.filter(product => product.brand === brand.slug);
  const profile = brandProfiles[brand.slug];

  if (!profile) {
    return (
      <section className="container-elvic py-16 md:py-24">
        <SectionHeading eyebrow="Shop Brand" title={brand.name} />
        <div className="mt-12"><Suspense><ShopClient products={brandProducts} /></Suspense></div>
      </section>
    );
  }

  const selectedProducts = profile.selected.map(slug => products.find(product => product.slug === slug)!).filter(Boolean);
  const brandJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Brand',
    name: brand.name,
    description: brand.description,
    url: `${siteConfig.url}/brands/${brand.slug}`,
  };

  return (
    <div>
      <JsonLd data={brandJsonLd} />
      <div className="container-elvic py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Brands', href: '/brands' }, { label: brand.name }]} />
      </div>
      <section className="relative flex h-[56vh] min-h-[420px] items-end overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0">
          <PlaceholderImage src={editorialPhoto(brand.slug)} monogram={false} />
          <div className="absolute inset-0 bg-ink/40" />
        </div>
        <div className="container-elvic relative z-10 pb-14">
          <p className="text-eyebrow text-xs font-medium text-bone/70">{brand.category}</p>
          <h1 className="mt-3 max-w-2xl font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl">{brand.name}</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-bone/85">{profile.tagline}</p>
          <Button href="#collection" variant="invert" size="lg" className="mt-8">Shop {brand.name}</Button>
        </div>
      </section>
      <section className="container-elvic py-20 md:py-28">
        <SectionHeading eyebrow="Featured" title={`${brand.name}, Selected`} />
        <div className="mt-10"><ProductGrid products={selectedProducts} showRating variant="catalog" /></div>
      </section>
      <section className="bg-bone py-20 md:py-28">
        <div className="container-elvic grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-eyebrow mb-5 text-xs font-medium text-stone">The Brand</p>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{brand.description}</h2>
          </div>
          <div className="space-y-5 text-base leading-relaxed text-graphite">
            <p>{profile.story[0]}</p>
            <p>{profile.story[1]}</p>
            <p className="text-xs text-stone">{profile.story[2]}</p>
          </div>
        </div>
      </section>
      <section id="collection" className="container-elvic scroll-mt-24 py-20 md:py-28">
        <SectionHeading eyebrow="Complete Collection" title={`All ${brand.name}`} description={`Every ${brand.name} piece currently curated on ELVIC.`} />
        <div className="mt-10">
          <Suspense fallback={<div className="py-24 text-center text-sm text-stone">Loading catalog…</div>}>
            <ShopClient products={brandProducts} variant="catalog" />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
