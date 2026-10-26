import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'The terms governing use of the ELVIC CLOTHING website and purchases.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Terms of Service</h1>
      <p className="mt-3 text-xs text-stone">
        Last updated: placeholder: set this when the terms are finalized.
      </p>

      <div className="mt-10 max-w-2xl space-y-8 text-sm leading-relaxed text-graphite">
        <p className="border border-line bg-bone p-4 text-xs text-graphite">
          This is a template terms document for a demo storefront. It is not legal advice. Have this
          reviewed by qualified counsel before publishing it for a live business.
        </p>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Use of Site</h2>
          <p>
            By using this site you agree to use it lawfully and not to misuse its content,
            functionality or product data.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Products &amp; Pricing</h2>
          <p>
            Product descriptions, availability and pricing shown on this site are illustrative demo
            content and may change without notice until a live catalog is connected.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Orders</h2>
          <p>
            This demo storefront does not process real payments or fulfil real orders. A live
            deployment must connect a payment processor and order-management system before accepting
            orders.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Intellectual Property</h2>
          <p>
            All ELVIC branding, copy and design on this site belongs to ELVIC CLOTHING and may not
            be reproduced without permission.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Contact</h2>
          <p>
            Questions about these terms can be sent to{' '}
            <a href={`mailto:${siteConfig.supportEmail}`} className="link-underline text-ink">
              {siteConfig.supportEmail}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
