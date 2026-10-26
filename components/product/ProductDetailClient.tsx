'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

const TABS = ['Description', 'Materials & Care', 'Shipping & Returns'] as const;

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
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Description');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);

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
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!requireSize() || !selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
    router.push('/cart');
  }

  return (
    <>
      <div className="grid min-w-0 gap-8 md:grid-cols-2 lg:gap-12">
        <ProductGallery productId={product.id} color={selectedColor} name={`${product.brandName} ${product.name}`} />

        <div className="min-w-0 pb-24 sm:pb-0">
          <Link href={`/brands/${product.brand}`} className="link-underline text-eyebrow text-xs font-medium text-stone hover:text-ink">{product.brandName}</Link>
          <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-xs text-stone">{product.category}</p>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <span className="text-lg text-ink">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-stone line-through">{formatPrice(product.compareAtPrice)}</span>
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
                    selectedColor === color.name ? 'ring-2 ring-ink ring-offset-2' : 'border-line'
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
                      : 'border-line text-graphite hover:border-ink'
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

          {/* Tabs */}
          <div className="mt-12 border-t border-line pt-8">
            <div className="flex flex-wrap gap-6 border-b border-line" role="tablist">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'pb-3 text-xs font-medium uppercase tracking-widest2 transition-colors',
                    activeTab === tab ? 'border-b border-ink text-ink' : 'text-stone hover:text-ink'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="pt-6 text-sm leading-relaxed text-graphite" role="tabpanel">
              {activeTab === 'Description' && (
                <div className="space-y-4">
                  {product.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}
              {activeTab === 'Materials & Care' && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-eyebrow text-xs font-medium text-ink">Materials</h3>
                    <ul className="space-y-1.5">
                      {product.materials.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-2 text-eyebrow text-xs font-medium text-ink">Care</h3>
                    <ul className="space-y-1.5">
                      {product.care.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {activeTab === 'Shipping & Returns' && (
                <div className="space-y-4">
                  <p>
                    Standard shipping estimates and rates are calculated at checkout based on
                    destination. See our{' '}
                    <a href="/shipping" className="link-underline text-ink">
                      Shipping
                    </a>{' '}
                    page for full details.
                  </p>
                  <p>
                    Unworn items with tags attached can be returned within 30 days of delivery.
                    See our{' '}
                    <a href="/returns" className="link-underline text-ink">
                      Returns
                    </a>{' '}
                    policy for full details.
                  </p>
                </div>
              )}
            </div>
          </div>

          {product.reviews.length > 0 && (
            <div className="mt-12 border-t border-line pt-8">
              <h2 className="font-display text-xl text-ink">Reviews</h2>
              <p className="mt-1 text-xs text-stone">
                Demo reviews shown for layout purposes: replace with genuine customer feedback.
              </p>
              <ul className="mt-6 space-y-6">
                {product.reviews.map((review, i) => (
                  <li key={i} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
                    <StarRating rating={review.rating} />
                    <p className="mt-2 font-display text-base text-ink">{review.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-graphite">{review.body}</p>
                    <p className="mt-2 text-xs text-stone">
                      {review.author} {review.verified && '· Verified'} ·{' '}
                      {new Date(review.date).toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
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

      {sizeGuideOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Size guide"
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        >
          <div className="absolute inset-0 bg-ink/40" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative max-h-[80vh] w-full max-w-lg overflow-y-auto bg-ivory p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl text-ink">Size Guide</h2>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                aria-label="Close size guide"
                className="flex h-9 w-9 items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-eyebrow text-xs text-stone">
                    <th className="py-2 pr-4">Size</th>
                    <th className="py-2 pr-4">Chest (in)</th>
                    <th className="py-2 pr-4">Waist (in)</th>
                    <th className="py-2">Hip (in)</th>
                  </tr>
                </thead>
                <tbody className="text-graphite">
                  {[
                    ['XS', '34–36', '27–29', '35–37'],
                    ['S', '36–38', '29–31', '37–39'],
                    ['M', '38–40', '31–33', '39–41'],
                    ['L', '40–43', '33–36', '41–44'],
                    ['XL', '43–46', '36–39', '44–47'],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-line/60">
                      {row.map((cell, i) => (
                        <td key={i} className="py-2.5 pr-4">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-stone">
              Measurements are approximate and provided as a general guide. See our full{' '}
              <a href="/size-guide" className="link-underline text-ink">
                Size Guide
              </a>{' '}
              page for fit notes by category.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
