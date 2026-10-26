import { Product } from '@/lib/types';
import ProductCard from '@/components/product/ProductCard';

export default function ProductGrid({
  products,
  showRating = false,
  variant = 'default',
}: {
  products: Product[];
  showRating?: boolean;
  variant?: 'default' | 'catalog';
}) {
  if (products.length === 0) {
    return (
      <div className="border border-line py-24 text-center">
        <p className="font-display text-xl text-ink">No products found</p>
        <p className="mt-2 text-sm text-stone">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="product-grid-container">
      <div className="product-grid grid gap-x-3 gap-y-8 sm:gap-x-6 sm:gap-y-10">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showRating={showRating}
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
}
