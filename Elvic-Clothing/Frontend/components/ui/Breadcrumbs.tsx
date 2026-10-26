import Link from 'next/link';
import { siteConfig } from '@/lib/seo';

export interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${siteConfig.url}${item.href}` : undefined,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex flex-wrap items-center gap-2 text-stone">
        {items.map((item, index) => (
          <li key={item.label} className="flex min-w-0 items-center gap-2">
            {item.href && index !== items.length - 1 ? (
              <Link href={item.href} className="link-underline hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-graphite">
                {item.label}
              </span>
            )}
            {index !== items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
