import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description: 'Answers to common questions about ordering, sizing, shipping and returns at ELVIC CLOTHING.',
  path: '/faq',
});

const FAQS = [
  {
    q: 'How do I find my size?',
    a: 'Every product page includes a Size Guide link with detailed measurements. You can also visit our full Size Guide page for fit notes by category.',
  },
  {
    q: 'How long does shipping take?',
    a: 'Shipping timelines and rates are outlined on our Shipping page and vary by destination. An estimate is also shown at checkout before you complete an order.',
  },
  {
    q: 'What is your return policy?',
    a: 'Unworn items with tags attached can be returned within 30 days of delivery. Full details are on our Returns page.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'International shipping availability and rates are shown at checkout based on your delivery address.',
  },
  {
    q: 'How do I care for my ELVIC pieces?',
    a: 'Each product page lists specific materials and care instructions under the "Materials & Care" tab: please follow those over general guidance.',
  },
  {
    q: 'I have a question that isn’t answered here.',
    a: 'Reach out through our Contact page and our team will get back to you.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="container-elvic py-10 md:py-14">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Frequently Asked Questions</h1>

      <div className="mt-12 max-w-2xl divide-y divide-line border-y border-line">
        {FAQS.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink">
              {item.q}
              <span className="shrink-0 text-xl text-stone transition-transform group-open:rotate-45" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-graphite">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
