'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/context/CartContext';
import { products } from '@/lib/data/products';
import { formatPrice } from '@/lib/utils';
import CatalogImage from '@/components/ui/CatalogImage';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { isOpen, closeCart, lines, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeCart();
    }
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-ink/40"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory"
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5 md:h-20">
              <h2 className="text-eyebrow text-xs font-medium text-ink">
                Shopping Bag {itemCount > 0 && `(${itemCount})`}
              </h2>
              <button
                type="button"
                onClick={closeCart}
                aria-label="Close bag"
                className="flex h-10 w-10 items-center justify-center"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex min-w-0 flex-1 flex-col items-center justify-center gap-4 px-5 text-center">
                <p className="font-display text-xl text-ink">Your bag is empty</p>
                <Button href="/shop" variant="secondary" onClick={closeCart}>
                  Shop Collection
                </Button>
              </div>
            ) : (
              <>
                <ul className="min-h-0 flex-1 divide-y divide-line overflow-y-auto overscroll-contain px-5">
                  {lines.map((line) => {
                    const product = products.find((product) => product.id === line.productId);
                    const brandName = product?.brandName;
                    const key = `${line.productId}-${line.size}-${line.color}`;
                    return (
                      <li key={key} className="flex gap-4 py-5">
                        <Link
                          href={`/product/${line.slug}`}
                          onClick={closeCart}
                          className="h-24 w-20 shrink-0 overflow-hidden bg-bone"
                        >
                          <CatalogImage
                            productId={line.productId}
                            color={line.color}
                            label={`${line.name}: ${line.color}`}
                          />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${line.slug}`}
                              onClick={closeCart}
                              className="link-underline"
                            >
                              {brandName && (
                                <p className="text-eyebrow text-[10px] font-medium text-stone">
                                  {brandName}
                                </p>
                              )}
                              <p className="font-display text-sm text-ink">{line.name}</p>
                            </Link>
                            <button
                              type="button"
                              onClick={() => removeItem(line.productId, line.size, line.color)}
                              aria-label={`Remove ${line.name} from bag`}
                              className="flex h-11 w-11 shrink-0 items-center justify-center text-stone hover:text-ink"
                            >
                              <svg
                                viewBox="0 0 24 24"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                              </svg>
                            </button>
                          </div>
                          <p className="mt-1 text-xs text-stone">
                            {line.color} / {line.size}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center border border-line">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    line.productId,
                                    line.size,
                                    line.color,
                                    line.quantity - 1,
                                  )
                                }
                                className="flex h-11 w-11 items-center justify-center text-sm"
                                aria-label={`Decrease quantity of ${line.name}`}
                              >
                                &minus;
                              </button>
                              <span className="flex h-8 w-7 items-center justify-center text-xs tabular-nums">
                                {line.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(
                                    line.productId,
                                    line.size,
                                    line.color,
                                    line.quantity + 1,
                                  )
                                }
                                className="flex h-11 w-11 items-center justify-center text-sm"
                                aria-label={`Increase quantity of ${line.name}`}
                              >
                                +
                              </button>
                            </div>
                            <span className="text-sm text-ink">
                              {formatPrice(line.price * line.quantity)}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="shrink-0 border-t border-line px-5 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                  <div className="mb-4 flex items-center justify-between text-sm">
                    <span className="text-graphite">Subtotal</span>
                    <span className="text-ink">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mb-4 text-xs text-stone">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button href="/cart" onClick={closeCart} className="w-full">
                    View Bag &amp; Checkout
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
