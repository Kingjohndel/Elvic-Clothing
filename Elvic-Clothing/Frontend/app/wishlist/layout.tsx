import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Wishlist',
  description: 'Products you have saved to your ELVIC wishlist.',
  path: '/wishlist',
  noIndex: true,
});

export default function WishlistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
