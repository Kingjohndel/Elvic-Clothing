'use client';

import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const FREE_SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING = 8;

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subtotal } = useCart();
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shopping Bag' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink">Shopping Bag</h1>

      {lines.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 py-16 text-center">
          <p className="text-lg text-graphite">Your bag is currently empty.</p>
          <Button href="/shop">Shop Collection</Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
          <ul className="divide-y divide-line border-y border-line">
            {lines.map((line) => {
              const key = `${line.productId}-${line.size}-${line.color}`;
              return (
                <li key={key} className="flex gap-3 py-6 sm:gap-5">
                  <Link href={`/product/${line.slug}`} className="h-28 w-20 shrink-0 overflow-hidden bg-bone sm:h-40 sm:w-32">
                    <PlaceholderImage productId={line.productId} color={line.color} label={`${line.name}: ${line.color}`} />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${line.slug}`} className="link-underline">
                          <p className="font-display text-lg text-ink">{line.name}</p>
                        </Link>
                        <p className="mt-1 text-sm text-stone">
                          {line.color} / {line.size}
                        </p>
                      </div>
                      <p className="text-sm text-ink">{formatPrice(line.price)}</p>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity - 1)}
                          className="flex h-11 w-11 items-center justify-center text-sm"
                          aria-label={`Decrease quantity of ${line.name}`}
                        >
                          &minus;
                        </button>
                        <span className="flex h-9 w-8 items-center justify-center text-sm tabular-nums">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(line.productId, line.size, line.color, line.quantity + 1)}
                          className="flex h-11 w-11 items-center justify-center text-sm"
                          aria-label={`Increase quantity of ${line.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(line.productId, line.size, line.color)}
                        className="link-underline text-xs text-stone hover:text-ink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="h-fit border border-line p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-xl text-ink">Order Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-graphite">Subtotal</dt>
                <dd className="text-ink">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-graphite">Shipping estimate</dt>
                <dd className="text-ink">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <p className="text-xs text-stone">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for free shipping.
                </p>
              )}
              <div className="flex justify-between border-t border-line pt-3 text-base">
                <dt className="text-ink">Total</dt>
                <dd className="text-ink">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Button href="/checkout" className="mt-6 w-full">
              Checkout
            </Button>
            <p className="mt-4 text-center text-xs text-stone">Taxes calculated at checkout.</p>
          </div>
        </div>
      )}
    </div>
  );
}
