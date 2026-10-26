'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/lib/context/CartContext';
import ProductGallery from '@/components/product/ProductGallery';
import WishlistButton from '@/components/product/WishlistButton';
import StarRating from '@/components/ui/StarRating';
import QuantitySelector from '@/components/ui/QuantitySelector';
import Button from '@/components/ui/Button';
import ProductGrid from '@/components/product/ProductGrid';
import SectionHeading from '@/components/ui/SectionHeading';

import ProductInformation from './ProductInformation';
import ProductReviews from './ProductReviews';
import SizeGuideDialog from './SizeGuideDialog';

export default function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), []);
  useEffect(() => () => clearTimeout(addedTimer.current), []);

  function requireSize(): boolean {
    if (!selectedSize) {
      setSizeError(true);
      return false;
    }
    return true;
  }

  function handleAddToBag() {
    if (!requireSize() || !selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setAdded(true);
    clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!requireSize() || !selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
    router.push('/cart');
  }

  return (
    <>
      <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:gap-12">
        <ProductGallery
          productId={product.id}
          color={selectedColor}
          name={`${product.brandName} ${product.name}`}
        />

        <div className="min-w-0 pb-24 sm:pb-0">
          <Link
            href={`/brands/${product.brand}`}
            className="link-underline text-eyebrow text-xs font-medium text-stone hover:text-ink"
          >
            {product.brandName}
          </Link>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-xs text-stone">{product.category}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-lg text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-stone line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            <span className="text-xs text-stone">Demo pricing</span>
          </div>

          {product.reviewCount > 0 && (
            <div className="mt-3">
              <StarRating rating={product.rating} reviewCount={product.reviewCount} />
            </div>
          )}

          <p className="mt-6 max-w-md text-sm leading-relaxed text-graphite">
            {product.shortDescription}
          </p>

          {/* Colour */}
          <div className="mt-8">
            <p className="text-eyebrow mb-3 text-xs font-medium text-stone">
              Colour: <span className="text-graphite">{selectedColor}</span>
            </p>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color.name)}
                  aria-pressed={selectedColor === color.name}
                  aria-label={color.name}
                  title={color.name}
                  className={cn(
                    'h-11 w-11 rounded-full border transition-shadow',
                    selectedColor === color.name ? 'ring-2 ring-ink ring-offset-2' : 'border-line',
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-eyebrow text-xs font-medium text-stone">Size</p>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(true)}
                className="link-underline text-xs text-graphite"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  role="radio"
                  aria-checked={selectedSize === size}
                  onClick={() => {
                    setSelectedSize(size);
                    setSizeError(false);
                  }}
                  className={cn(
                    'min-h-11 min-w-[3rem] border px-3 py-2.5 text-sm transition-colors',
                    selectedSize === size
                      ? 'border-ink bg-ink text-ivory'
                      : 'border-line text-graphite hover:border-ink',
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && (
              <p role="alert" className="mt-2 text-xs text-rust">
                Please select a size before continuing.
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <p className="text-eyebrow mb-3 text-xs font-medium text-stone">Quantity</p>
            <QuantitySelector value={quantity} onChange={setQuantity} />
          </div>

          {/* Actions */}
          <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
            <Button variant="primary" size="lg" onClick={handleAddToBag} className="flex-1">
              {added ? 'Added to Bag' : 'Add to Bag'}
            </Button>
            <Button variant="secondary" size="lg" onClick={handleBuyNow} className="flex-1">
              Buy Now
            </Button>
            <WishlistButton
              productId={product.id}
              productName={`${product.brandName} ${product.name}`}
              className="h-14 w-14 border border-line bg-transparent hover:bg-bone"
            />
          </div>

          {/* Mobile sticky actions */}
          <div className="fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-line bg-ivory px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden">
            <Button variant="primary" onClick={handleAddToBag} className="flex-1">
              {added ? 'Added' : 'Add to Bag'}
            </Button>
            <Button variant="secondary" onClick={handleBuyNow} className="flex-1">
              Buy Now
            </Button>
          </div>

          <ProductInformation product={product} />
          <ProductReviews product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-16 md:mt-32 md:pt-20">
          <SectionHeading eyebrow="You May Also Like" title="Related Products" />
          <div className="mt-10">
            <ProductGrid products={related} variant="catalog" />
          </div>
        </section>
      )}

      {sizeGuideOpen && <SizeGuideDialog onClose={closeSizeGuide} />}
    </>
  );
}
