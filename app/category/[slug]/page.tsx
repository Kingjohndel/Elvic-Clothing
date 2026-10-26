import { Metadata } from 'next';
import { Suspense } from 'react';
import ShopClient from '@/components/shop/ShopClient';
import CategoryBanner from '@/components/shop/CategoryBanner';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { categories, getCategoryBySlug } from '@/lib/data/categories';
import { getProductsByCategory } from '@/lib/data/products';
import { buildMetadata } from '@/lib/seo';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    return buildMetadata({ title: 'Category Not Found', description: 'This category could not be found.', path: `/category/${params.slug}`, noIndex: true });
  }
  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${category.slug}`,
  });
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();
  const categoryProducts = getProductsByCategory(category.slug);

  return (
    <div>
      <div className="container-elvic py-6 md:py-8">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: category.name }]} />
      </div>
      <CategoryBanner slug={category.slug} title={category.name} description={category.description} />
      <div className="container-elvic py-10 md:py-12">
        <Suspense fallback={<div className="py-24 text-center text-sm text-stone">Loading catalog…</div>}>
          <ShopClient products={categoryProducts} hideCategoryFilter showBrandFilter variant="catalog" />
        </Suspense>
      </div>
    </div>
  );
}
