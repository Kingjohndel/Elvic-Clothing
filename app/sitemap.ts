import { MetadataRoute } from 'next';
import { products } from '@/lib/data/products';
import { collections } from '@/lib/data/collections';
import { categories } from '@/lib/data/categories';
import { siteConfig } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/shop',
    '/new-arrivals',
    '/collections',
    '/lookbook',
    '/about',
    '/contact',
    '/faq',
    '/shipping',
    '/returns',
    '/size-guide',
    '/privacy',
    '/terms',
    '/cookies',
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteConfig.url}/category/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${siteConfig.url}/collections/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${siteConfig.url}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...categoryRoutes, ...collectionRoutes, ...productRoutes];
}
