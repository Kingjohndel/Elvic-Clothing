import type { Metadata } from 'next';
import { Bodoni_Moda, Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/layout/Providers';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/lib/seo';

const bodoniModa = Bodoni_Moda({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  // Next's bundled fallback metrics do not include Bodoni Moda.
  adjustFontFallback: false,
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Wear Your Identity`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: 'website',
    images: [{ url: siteConfig.ogImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/favicon.svg`,
  sameAs: Object.values(siteConfig.social),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoniModa.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ivory font-sans text-ink antialiased">
        <JsonLd data={organizationJsonLd} />
        <Providers>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
