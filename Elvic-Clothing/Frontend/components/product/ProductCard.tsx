'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice, cn } from '@/lib/utils';
import { useCart } from '@/lib/context/CartContext';
import CatalogImage from '@/components/ui/CatalogImage';
import WishlistButton from '@/components/product/WishlistButton';
import StarRating from '@/components/ui/StarRating';

export default function ProductCard({
  product,
  showRating = false,
  variant = 'default',
}: {
  product: Product;
  showRating?: boolean;
  variant?: 'default' | 'catalog';
}) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? '');
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <div className="product-card group relative flex min-w-0 flex-col">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-bone">
        <Link
          href={`/product/${product.slug}`}
          className="product-card-image relative block h-full w-full"
        >
          <CatalogImage
            productId={product.id}
            color={selectedColor}
            label={`${product.brandName} ${product.name}: ${selectedColor}`}
          />
          <CatalogImage
            productId={product.id}
            color={selectedColor}
            view={1}
            label={`${product.brandName} ${product.name}: alternate view`}
            className="product-card-alternate absolute inset-0 opacity-0"
          />
        </Link>

        <div className="absolute right-3 top-3">
          <WishlistButton
            productId={product.id}
            productName={
              variant === 'catalog' ? `${product.brandName} ${product.name}` : product.name
            }
            size="sm"
          />
        </div>

        {(product.isNew || product.compareAtPrice) && (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-ink px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest2 text-ivory">
                New
              </span>
            )}
            {product.compareAtPrice && (
              <span className="bg-rust px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest2 text-ivory">
                Sale
              </span>
            )}
          </div>
        )}

        {/* Quick add */}
        <div
          className={cn(
            'product-quick-add absolute inset-x-0 bottom-0 bg-ivory/95 backdrop-blur-sm transition-all duration-300 ease-editorial',
            'translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100',
            quickAddOpen && 'translate-y-0 opacity-100',
          )}
        >
          {!quickAddOpen ? (
            <button
              type="button"
              onClick={() => setQuickAddOpen(true)}
              className="text-eyebrow flex w-full items-center justify-center py-3 text-xs font-medium text-ink hover:bg-ink hover:text-ivory transition-colors"
            >
              Quick Add
            </button>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => {
                    addItem(product, size, selectedColor, 1);
                    setQuickAddOpen(false);
                  }}
                  className="min-h-11 min-w-[2.75rem] border border-line px-2 py-1.5 text-xs text-ink transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <Link
          href={`/brands/${product.brand}`}
          className={
            variant === 'catalog'
              ? 'link-underline text-eyebrow max-w-full w-fit break-words text-[10px] sm:text-[11px] font-medium text-stone hover:text-ink'
              : 'text-eyebrow mb-1 w-fit text-[10px] font-medium text-stone hover:text-ink'
          }
        >
          {product.brandName}
        </Link>
        <Link
          href={`/product/${product.slug}`}
          className={cn('link-underline w-fit', variant === 'catalog' && 'mt-1')}
        >
          <h3 className="font-display text-base text-ink">{product.name}</h3>
        </Link>
        <p className="mt-1 text-[10px] tracking-wide text-stone">Illustrative preview</p>
        <p className="mt-1 text-xs text-stone">
          {product.colors.length} colour{product.colors.length !== 1 ? 's' : ''}
        </p>
        <div
          className="mt-2 flex flex-wrap gap-2"
          role="group"
          aria-label={`Colours for ${product.name}`}
        >
          {product.colors.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => setSelectedColor(color.name)}
              aria-label={`${product.name}: ${color.name}`}
              aria-pressed={selectedColor === color.name}
              title={color.name}
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                selectedColor === color.name
                  ? 'border-ink'
                  : 'border-transparent hover:border-stone',
              )}
            >
              <span
                className="h-4 w-4 rounded-full border border-black/15"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
        {showRating && product.reviewCount > 0 && (
          <StarRating
            rating={product.rating}
            reviewCount={product.reviewCount}
            className="mt-1.5"
          />
        )}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-stone line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
