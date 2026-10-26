import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Returns',
  description: 'ELVIC CLOTHING return and exchange policy.',
  path: '/returns',
});

export default function ReturnsPage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Returns' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Returns &amp; Exchanges</h1>

      <div className="mt-10 max-w-2xl space-y-10 text-sm leading-relaxed text-graphite">
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Return Window</h2>
          <p>
            Items may be returned within 30 days of delivery, provided they are unworn, unwashed
            and have all original tags attached.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">How to Start a Return</h2>
          <p>
            Contact our team via the{' '}
            <a href="/contact" className="link-underline text-ink">
              Contact page
            </a>{' '}
            with your order number and the item(s) you&rsquo;d like to return. We&rsquo;ll confirm
            eligibility and provide next steps.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Refunds</h2>
          <p>
            Once your return is received and inspected, refunds are issued to the original payment
            method. Please allow standard processing time for it to appear on your statement.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Exchanges</h2>
          <p>
            Need a different size or colour? Let us know when you start your return and we&rsquo;ll
            help arrange an exchange, subject to availability.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Final Sale Items</h2>
          <p>Items marked as final sale at checkout are not eligible for return or exchange.</p>
        </section>
        <p className="text-xs text-stone">
          This page describes a demo returns policy. Confirm terms with your fulfillment and
          payment providers before launch.
        </p>
      </div>
    </div>
  );
}
