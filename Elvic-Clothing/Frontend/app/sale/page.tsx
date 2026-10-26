import { Suspense } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CategoryBanner from '@/components/shop/CategoryBanner';
import ShopClient from '@/components/shop/ShopClient';
import { products } from '@/lib/data/products';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Sale',
  description:
    'A curated edit of markdowns across the brands ELVIC carries while sizes and stock last.',
  path: '/sale',
});

export default function SalePage() {
  const saleProducts = products.filter(
    (product) => product.compareAtPrice !== undefined && product.compareAtPrice > product.price,
  );

  return (
    <div>
      <div className="container-elvic py-6 md:py-8">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' },
            { label: 'Sale' },
          ]}
        />
      </div>
      <CategoryBanner
        slug="sale"
        eyebrow="Considered Reductions"
        title="Sale"
        description="A curated edit of markdowns across the brands ELVIC carries while sizes and stock last."
      />
      <div className="container-elvic py-10 md:py-12">
        <Suspense
          fallback={<div className="py-24 text-center text-sm text-stone">Loading catalog…</div>}
        >
          <ShopClient products={saleProducts} showBrandFilter variant="catalog" />
        </Suspense>
      </div>
    </div>
  );
}
