'use client';

import { useWishlist } from '@/lib/context/WishlistContext';
import { products } from '@/lib/data/products';
import ProductGrid from '@/components/product/ProductGrid';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishlistProducts = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Wishlist</h1>

      {wishlistProducts.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 py-16 text-center">
          <p className="text-eyebrow text-xs font-medium text-stone">Wishlist</p>
          <p className="font-display text-2xl text-ink sm:text-3xl">Nothing saved yet</p>
          <p className="max-w-sm text-sm leading-relaxed text-graphite">
            Save the pieces that catch your eye: they’ll live here until you’re ready.
          </p>
          <Button href="/new-arrivals" className="mt-2">Shop New Arrivals</Button>
        </div>
      ) : (
        <div className="mt-12">
          <ProductGrid products={wishlistProducts} showRating variant="catalog" />
        </div>
      )}
    </div>
  );
}
