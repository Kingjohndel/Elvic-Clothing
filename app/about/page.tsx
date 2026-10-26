import { Metadata } from 'next';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import Button from '@/components/ui/Button';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About',
  description:
    'The story behind ELVIC CLOTHING: a multi-brand fashion destination built on identity, confidence and curation.',
  path: '/about',
});

const VALUES = [
  {
    "title": "Identity",
    "body": "We believe clothing is a language before it is a product. Every piece on ELVIC is chosen to let the wearer say something without saying anything at all."
  },
  {
    "title": "Confidence",
    "body": "Confidence isn’t loud. It’s a shoulder that sits right, a hem that falls correctly, a fabric that moves the way you do. We look for that quiet certainty in everything we carry."
  },
  {
    "title": "Curation",
    "body": "Nothing lands on ELVIC by accident: the weight of a fabric, the placement of a seam, the way a garment ages, all get a second look. Curation is the discipline behind the assortment."
  },
  {
    "title": "Expression",
    "body": "ELVIC is not a uniform, and it’s not one label. It’s a wardrobe of considered choices across brands, curated so the person wearing it always remains the point."
  }
];

export default function AboutPage() {
  return (
    <div>
      <div className="container-elvic py-10 md:py-14">
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      </div>

      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink text-ivory">
        <div className="absolute inset-0">
          <PlaceholderImage tone={7} monogram={false} />
          <div className="absolute inset-0 bg-ink/40" />
        </div>
        <div className="container-elvic relative z-10 pb-16">
          <p className="text-eyebrow text-xs font-medium text-bone/70">About Elvic</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-tight sm:text-6xl md:text-7xl">
            A house built on identity.
          </h1>
        </div>
      </section>

      <section className="container-elvic py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-eyebrow mb-5 text-xs font-medium text-stone">Our Philosophy</p>
            <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              We don’t chase trends. We edit for certainty.
            </h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-graphite">
            <p>{"ELVIC began as a rejection of disposable fashion: trend pieces made to be photographed once and forgotten. We wanted to build a single destination for the labels that earn a place in someone’s wardrobe for years, not weeks."}</p>
            <p>{"That meant slowing down. Fewer brands, more consideration. Every piece we choose to carry is tested against a simple standard: does it make the person wearing it feel more like themselves, not less?"}</p>
            <p>{"The name ELVIC has no hidden meaning to decode: it was chosen to sound like nothing else, because the brand isn’t trying to belong to a category. It’s trying to define its own."}</p>
          </div>
        </div>
      </section>

      <section className="bg-bone py-20 md:py-28">
        <div className="container-elvic grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <div key={value.title} className="border-t border-ink/20 pt-6">
              <h3 className="font-display text-2xl text-ink">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-elvic grid gap-6 py-20 sm:grid-cols-2 md:py-28">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">
          <PlaceholderImage tone={3} eyebrow="Curation" label="The Elvic Edit" />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden bg-bone sm:mt-14">
          <PlaceholderImage tone={6} eyebrow="Vision" label="Autumn Edit" />
        </div>
      </section>

      <section className="container-elvic pb-24 text-center md:pb-32">
        <h2 className="font-display text-3xl text-ink sm:text-4xl">Discover the Collection</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-graphite">{"Explore the pieces that carry this philosophy: from foundational essentials to statement tailoring, across every brand ELVIC carries."}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/shop">Shop Collection</Button>
          <Button href="/brands" variant="secondary">View Brands</Button>
        </div>
      </section>
    </div>
  );
}
