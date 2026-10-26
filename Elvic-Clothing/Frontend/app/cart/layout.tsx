import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Shopping Bag',
  description: 'Review the items in your ELVIC shopping bag before checkout.',
  path: '/cart',
  noIndex: true,
});

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
