import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Cookie Policy',
  description: 'How ELVIC CLOTHING uses cookies and similar technologies.',
  path: '/cookies',
});

export default function CookiesPage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Cookie Policy' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Cookie Policy</h1>
      <p className="mt-3 text-xs text-stone">
        Last updated: placeholder: set this when the policy is finalized.
      </p>

      <div className="mt-10 max-w-2xl space-y-8 text-sm leading-relaxed text-graphite">
        <p className="border border-line bg-bone p-4 text-xs text-graphite">
          This is a template cookie policy for a demo storefront. It is not legal advice. Have this
          reviewed by qualified counsel before publishing it for a live business.
        </p>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">What Are Cookies</h2>
          <p>
            Cookies are small text files stored on your device that help websites function and
            remember information about your visit.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">How We Use Them</h2>
          <p>
            This demo site uses your browser&rsquo;s local storage (a cookie-adjacent technology) to
            remember your shopping bag and wishlist between visits, entirely on your device. It does
            not currently use tracking or advertising cookies.
          </p>
        </section>
        <section>
          <h2 className="mb-3 font-display text-xl text-ink">Managing Cookies</h2>
          <p>
            You can clear your browser&rsquo;s local storage and cookies at any time through your
            browser settings, which will reset your saved bag and wishlist on this site.
          </p>
        </section>
      </div>
    </div>
  );
}
