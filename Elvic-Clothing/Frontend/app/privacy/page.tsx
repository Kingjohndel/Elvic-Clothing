import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata, siteConfig } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How ELVIC CLOTHING collects, uses and protects your information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Privacy Policy</h1>
      <p className="mt-3 text-xs text-stone">
        Last updated: placeholder: set this when the policy is finalized.
      </p>

      <div className="mt-10 max-w-2xl space-y-8 text-sm leading-relaxed text-graphite">
        <p className="border border-line bg-bone p-4 text-xs text-graphite">
          This is a template privacy policy for a demo storefront. It is not legal advice. Have this
          reviewed by qualified counsel before publishing it for a live business.
        </p>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Information We Collect</h2>
          <p>
            When you browse ELVIC or place an order, we may collect information such as your name,
            email address, shipping address and order details, along with basic usage data (like
            pages visited) to help us improve the site.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">How We Use Information</h2>
          <p>
            We use the information we collect to process orders, respond to inquiries, improve our
            products and site experience, and, where you&rsquo;ve opted in, send updates about new
            collections and releases.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Cookies</h2>
          <p>
            We use cookies and similar technologies to keep the site functioning correctly and to
            understand how it&rsquo;s used. See our{' '}
            <a href="/cookies" className="link-underline text-ink">
              Cookie Policy
            </a>{' '}
            for details.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Sharing of Information</h2>
          <p>
            We do not sell personal information. We may share information with service providers
            (such as payment processors and shipping carriers) solely to fulfill our obligations to
            you.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Your Choices</h2>
          <p>
            You can unsubscribe from marketing emails at any time via the link in those emails, or
            contact us to request access to or deletion of your data.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Contact</h2>
          <p>
            Questions about this policy can be sent to{' '}
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
