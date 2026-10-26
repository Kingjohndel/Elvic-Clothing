import { editorialPhoto } from '@/lib/imagery';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Lookbook',
  description: 'The ELVIC lookbook: editorial imagery from the Autumn Collection.',
  path: '/lookbook',
});

const EDITORIALS = [
  { id: 'the-essentials', href: '/collections/the-essentials', title: 'Chapter One: The Essentials', caption: 'Foundational pieces, styled for everyday wear.', tone: 1, span: 'lg:col-span-7' },
  { id: 'signature-tailoring', href: '/collections/signature-tailoring', title: 'Chapter Two: Signature Tailoring', caption: 'Structure with intent.', tone: 4, span: 'lg:col-span-5' },
  { id: 'statement-pieces', href: '/collections/statement-pieces', title: 'Chapter Three: Statement Pieces', caption: 'Black, refined.', tone: 7, span: 'lg:col-span-5' },
  { id: 'off-duty', href: '/collections/off-duty', title: 'Chapter Four: Off Duty', caption: 'Ease, engineered.', tone: 3, span: 'lg:col-span-7' },
  { id: 'details', href: '/category/accessories', title: 'Chapter Five: Details', caption: 'The finishing layer.', tone: 8, span: 'lg:col-span-12' },
];

export default function LookbookPage() {
  return (
    <div>
      <div className="container-elvic py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Lookbook' }]} />
        <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">Lookbook</h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-graphite">
          The Autumn Collection, captured. A first look at how the season&rsquo;s pieces move,
          layer and live together.
        </p>
      </div>

      <div className="container-elvic grid grid-cols-1 gap-4 pb-24 lg:grid-cols-12 md:pb-32">
        {EDITORIALS.map((item) => (
          <figure id={item.id} key={item.title} className={`relative scroll-mt-28 aspect-[4/5] bg-bone ${item.span}`}>
            <Link href={item.href} aria-label={`Shop ${item.title.split(': ')[1]}`} className="lookbook-interactive absolute inset-0 overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink">
            <PlaceholderImage src={editorialPhoto(item.id === 'details' ? 'accessories' : item.id)} label={item.title} monogram={false} className="lookbook-image" />
            <div className="lookbook-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-6 text-ivory">
              <p className="font-display text-xl">{item.title}</p>
              <p className="mt-1 text-xs text-bone/80">{item.caption}</p>
            </div>
            </Link>
          </figure>
        ))}
      </div>
    </div>
  );
}
