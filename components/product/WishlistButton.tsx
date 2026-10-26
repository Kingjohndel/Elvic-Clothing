'use client';

import { useWishlist } from '@/lib/context/WishlistContext';
import { cn } from '@/lib/utils';

export default function WishlistButton({
  productId,
  productName,
  className,
  size = 'md',
}: {
  productId: string;
  productName: string;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const { has, toggle } = useWishlist();
  const active = has(productId);
  const dim = size === 'sm' ? 'h-8 w-8' : 'h-10 w-10';

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(productId);
      }}
      aria-pressed={active}
      aria-label={active ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      className={cn(
        'flex items-center justify-center rounded-full bg-ivory/90 backdrop-blur-sm transition-colors hover:bg-ivory',
        dim,
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={cn('h-4 w-4 transition-colors', active ? 'text-rust' : 'text-ink')}
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.5s-7.5-4.6-10-9.1C.6 8.1 2 4.5 5.4 3.7c2-.5 4 .3 5.1 2.1a.6.6 0 001 0c1.1-1.8 3.1-2.6 5.1-2.1 3.4.8 4.8 4.4 3.4 7.7-2.5 4.5-10 9.1-10 9.1z"
        />
      </svg>
    </button>
  );
}
