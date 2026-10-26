import { Metadata } from 'next';
import { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CategoryBanner from '@/components/shop/CategoryBanner';
import { products } from '@/lib/data/products';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Shop All',
  description:
    'Browse the full ELVIC CLOTHING catalog. Filter by category, size, colour and price across men, women, unisex and accessories.',
  path: '/shop',
});

export default function ShopPage() {
  return (
    <div>
      <div className="container-elvic py-6 md:py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} />
      </div>
      <CategoryBanner slug="shop" eyebrow="Full Catalog" title="Shop All" description="Explore the complete ELVIC shop, from everyday essentials to statement pieces across every brand." />
      <div className="container-elvic py-10 md:py-12">
        <Suspense fallback={<div className="py-24 text-center text-sm text-stone">Loading catalog…</div>}>
          <ShopClient products={products} showBrandFilter searchCategoryMenu variant="catalog" />
        </Suspense>
      </div>
    </div>
  );
}
