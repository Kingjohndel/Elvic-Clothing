import { Metadata } from 'next';

export const siteConfig = {
  name: 'ELVIC CLOTHING',
  shortName: 'ELVIC',
  description:
    'ELVIC CLOTHING is a modern premium fashion house designing considered, confident pieces for people who want to look distinctive. Explore new arrivals, signature tailoring and seasonal collections.',
  url: 'https://www.elvicclothing.com',
  ogImage: '/og-image.png',
  social: {
    instagram: 'https://instagram.com/elvicclothing',
    tiktok: 'https://tiktok.com/@elvicclothing',
    facebook: 'https://facebook.com/elvicclothing',
    x: 'https://x.com/elvicclothing',
  },
  // Placeholder contact: replace with the brand's real support address before launch.
  supportEmail: 'support@elvicclothing.com',
};

interface BuildMetadataArgs {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

export function buildMetadata({ title, description, path, image, noIndex }: BuildMetadataArgs): Metadata {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: 'website',
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
