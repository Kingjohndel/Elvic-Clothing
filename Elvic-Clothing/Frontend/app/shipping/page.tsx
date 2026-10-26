import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Shipping',
  description: 'Shipping methods, timelines and rates for ELVIC CLOTHING orders.',
  path: '/shipping',
});

export default function ShippingPage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shipping' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Shipping</h1>

      <div className="mt-10 max-w-2xl space-y-10 text-sm leading-relaxed text-graphite">
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Processing Time</h2>
          <p>
            Orders are typically processed within 1–2 business days before dispatch. You&rsquo;ll
            receive a confirmation once your order has shipped.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Shipping Rates</h2>
          <p>
            Standard shipping is a flat $8, and complimentary on orders over $150 before tax. Exact
            rates and delivery windows for your address are calculated and shown at checkout.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Delivery Estimates</h2>
          <p>
            Domestic delivery generally takes 3–7 business days after dispatch; international
            delivery times vary by destination and customs processing.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Order Tracking</h2>
          <p>
            A tracking link is included in your shipping confirmation email so you can follow your
            order from dispatch to delivery.
          </p>
        </section>
        <p className="text-xs text-stone">
          This page describes a demo shipping policy. Replace figures and timelines with your actual
          carrier terms before launch.
        </p>
      </div>
    </div>
  );
}
