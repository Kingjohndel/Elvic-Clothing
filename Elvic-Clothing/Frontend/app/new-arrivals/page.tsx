import { Metadata } from 'next';
import { Suspense } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CategoryBanner from '@/components/shop/CategoryBanner';
import ShopClient from '@/components/shop/ShopClient';
import { getNewArrivals } from '@/lib/data/products';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'New Arrivals',
  description:
    'Shop the latest ELVIC CLOTHING releases: new pieces added in small, considered drops.',
  path: '/new-arrivals',
});

export default function NewArrivalsPage() {
  const newArrivals = getNewArrivals();

  return (
    <div>
      <div className="container-elvic py-6 md:py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'New Arrivals' },
          ]}
        />
      </div>
      <CategoryBanner
        slug="new-arrivals"
        eyebrow="Just In"
        title="New Arrivals"
        description="The latest pieces added to ELVIC, across every brand we carry."
      />
      <div className="container-elvic py-10 md:py-12">
        <Suspense
          fallback={<div className="py-24 text-center text-sm text-stone">Loading catalog…</div>}
        >
          <ShopClient products={newArrivals} showBrandFilter variant="catalog" />
        </Suspense>
      </div>
    </div>
  );
}
