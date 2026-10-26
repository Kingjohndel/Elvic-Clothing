import { editorialPhoto } from '@/lib/imagery';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Button from '@/components/ui/Button';

const PREVIEWS = [
  { tone: 2, chapter: 'the-essentials', title: 'The Essentials' },
  { tone: 6, chapter: 'signature-tailoring', title: 'Signature Tailoring' },
  { tone: 4, chapter: 'statement-pieces', title: 'Statement Pieces' },
  { tone: 8, chapter: 'off-duty', title: 'Off Duty' },
];

export default function LookbookPreview() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-elvic">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Lookbook"
            title="Autumn Edit, Styled"
            description="A first look at how the season's pieces move together: captured, not staged."
          />
          <Button href="/lookbook" variant="secondary" className="shrink-0">
            View Lookbook
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {PREVIEWS.map((item, i) => (
            <Link
              key={item.chapter}
              href={`/lookbook#${item.chapter}`}
              aria-label={`View ${item.title} in the lookbook`}
              className={`home-hover-card lookbook-interactive relative block aspect-[3/4] overflow-hidden bg-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink ${i === 1 || i === 2 ? 'md:mt-10' : ''}`}
            >
              <PlaceholderImage src={editorialPhoto(item.chapter)} label={item.title} monogram={false} className="lookbook-image" />
              <span aria-hidden="true" className="lookbook-preview-caption absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-5 text-sm text-ivory">
                {item.title} <span className="ml-2 inline-block">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
