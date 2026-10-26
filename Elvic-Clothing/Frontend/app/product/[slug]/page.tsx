import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/data/products';
import { buildMetadata, siteConfig } from '@/lib/seo';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import JsonLd from '@/components/JsonLd';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product)
    return buildMetadata({
      title: 'Product Not Found',
      description: 'This product could not be found.',
      path: `/product/${params.slug}`,
      noIndex: true,
    });

  return buildMetadata({
    title: product.name,
    description: product.shortDescription,
    path: `/product/${product.slug}`,
  });
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.id,
    category: product.category,
    url: `${siteConfig.url}/product/${product.slug}`,
    brand: { '@type': 'Brand', name: product.brandName },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      url: `${siteConfig.url}/product/${product.slug}`,
      seller: { '@type': 'Organization', name: siteConfig.name },
    },
  };

  return (
    <div className="container-elvic py-10 md:py-14">
      <JsonLd data={productJsonLd} />
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Brands', href: '/brands' },
          { label: product.brandName, href: `/brands/${product.brand}` },
          { label: product.name },
        ]}
      />
      <div className="mt-6">
        <ProductDetailClient product={product} related={related} />
      </div>
    </div>
  );
}
