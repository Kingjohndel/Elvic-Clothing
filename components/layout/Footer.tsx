import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import CountrySelector from '@/components/layout/CountrySelector';
import { siteConfig } from '@/lib/seo';

const SHOP_LINKS = [
  { label: 'Shop All', href: '/shop' },
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Men', href: '/category/men' },
  { label: 'Women', href: '/category/women' },
  { label: 'Unisex', href: '/category/unisex' },
  { label: 'Accessories', href: '/category/accessories' },
  { label: 'Sale', href: '/sale' },
];

const INFO_LINKS = [
  { label: 'Lookbook', href: '/lookbook' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping', href: '/shipping' },
  { label: 'Returns', href: '/returns' },
  { label: 'Size Guide', href: '/size-guide' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', href: siteConfig.social.instagram },
  { label: 'TikTok', href: siteConfig.social.tiktok },
  { label: 'Facebook', href: siteConfig.social.facebook },
  { label: 'X', href: siteConfig.social.x },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory">
      <div className="container-elvic py-16 md:py-20">
        <Newsletter variant="dark" />
      </div>

      <div className="container-elvic grid grid-cols-2 gap-x-6 gap-y-12 border-t border-ivory/10 py-14 md:grid-cols-4 lg:grid-cols-7">
        <div className="col-span-2 lg:col-span-2">
          <Link href="/" className="font-display text-2xl tracking-[0.15em] text-ivory">
            ELVIC
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/70">
            A curated multi-brand fashion destination: considered pieces from the brands worth
            wearing, brought together in one place.
          </p>
          <ul className="mt-6 flex flex-wrap gap-4">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-eyebrow text-xs font-medium text-bone/70 hover:text-ivory"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Shop">
          <h3 className="text-eyebrow mb-4 text-xs font-medium text-bone/50">Shop</h3>
          <ul className="space-y-3">
            {SHOP_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-bone/80 hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Brands">
          <h3 className="text-eyebrow mb-4 text-xs font-medium text-bone/50">Brands</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/brands" className="text-sm text-bone/80 hover:text-ivory">
                All Brands
              </Link>
            </li>
            <li>
              <Link href="/brands#featured" className="text-sm text-bone/80 hover:text-ivory">
                Featured Brands
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Information">
          <h3 className="text-eyebrow mb-4 text-xs font-medium text-bone/50">Information</h3>
          <ul className="space-y-3">
            {INFO_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-bone/80 hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h3 className="text-eyebrow mb-4 text-xs font-medium text-bone/50">Legal</h3>
          <ul className="space-y-3">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-bone/80 hover:text-ivory">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-1">
          <CountrySelector />
        </div>
      </div>

      <div className="container-elvic flex flex-col gap-3 border-t border-ivory/10 py-6 text-xs text-bone/50 sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {new Date().getFullYear()} ELVIC CLOTHING. All rights reserved.</p>
        <p>
          Demo storefront: imagery is AI-generated and illustrative; it does not depict the exact
          branded products. Product data and pricing are examples.
        </p>
      </div>
    </footer>
  );
}
