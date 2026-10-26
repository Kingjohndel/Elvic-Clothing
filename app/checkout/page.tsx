'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const FREE_SHIPPING_THRESHOLD = 150;
const FLAT_SHIPPING = 8;

export default function CheckoutPage() {
  const { lines, subtotal, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const shipping = lines.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (lines.length === 0 && !submitted) {
    return (
      <div className="container-elvic py-24 text-center">
        <p className="text-lg text-graphite">Your bag is empty. There&rsquo;s nothing to check out yet.</p>
        <Button href="/shop" className="mt-6">
          Shop Collection
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container-elvic py-24 text-center">
        <p className="text-eyebrow text-xs font-medium text-stone">Demo Checkout</p>
        <h1 className="mt-4 font-display text-4xl text-ink">This was a preview, not a real order.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-graphite">
          No payment was processed and no order was placed. Connect a real payment provider and
          order-management system before taking this checkout live.
        </p>
        <Button href="/shop" className="mt-8">
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Bag', href: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink">Checkout</h1>
      <p className="mt-3 max-w-lg text-sm text-graphite">
        This is a demonstration checkout flow. No payment will be processed and no order will be
        placed: connect a real payment processor before this goes live.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <form onSubmit={handleSubmit} className="space-y-10">
          <fieldset>
            <legend className="mb-4 font-display text-xl text-ink">Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required type="email" placeholder="Email address" className="input-field sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 font-display text-xl text-ink">Shipping Address</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <input required type="text" placeholder="First name" className="input-field" />
              <input required type="text" placeholder="Last name" className="input-field" />
              <input required type="text" placeholder="Address" className="input-field sm:col-span-2" />
              <input required type="text" placeholder="City" className="input-field" />
              <input required type="text" placeholder="Postal code" className="input-field" />
              <input required type="text" placeholder="Country" className="input-field sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 font-display text-xl text-ink">Payment</legend>
            <p className="mb-4 text-xs text-stone">
              Demo only: no payment processor is connected. Do not enter real card details.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" placeholder="Card number" className="input-field sm:col-span-2" disabled />
              <input type="text" placeholder="Expiry" className="input-field" disabled />
              <input type="text" placeholder="CVC" className="input-field" disabled />
            </div>
          </fieldset>

          <Button type="submit" size="lg" className="w-full">
            Place Demo Order
          </Button>
        </form>

        <div className="h-fit border border-line p-6 lg:sticky lg:top-28">
          <h2 className="font-display text-xl text-ink">Order Summary</h2>
          <ul className="mt-5 space-y-3 text-sm text-graphite">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.size}-${line.color}`} className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  {line.name} ({line.color}/{line.size}) &times; {line.quantity}
                </span>
                <span className="shrink-0 whitespace-nowrap text-ink">{formatPrice(line.price * line.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-3 border-t border-line pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-graphite">Subtotal</dt>
              <dd className="text-ink">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-graphite">Shipping</dt>
              <dd className="text-ink">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <dt className="text-ink">Total</dt>
              <dd className="text-ink">{formatPrice(total)}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-stone">
            Need help?{' '}
            <Link href="/contact" className="link-underline text-ink">
              Contact us
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
