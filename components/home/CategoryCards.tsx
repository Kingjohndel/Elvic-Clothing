import { editorialPhoto } from '@/lib/imagery';
import Link from 'next/link';
import { categories } from '@/lib/data/categories';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import SectionHeading from '@/components/ui/SectionHeading';

export default function CategoryCards() {
  return (
    <section className="py-24 md:py-32">
      <div className="container-elvic">
        <SectionHeading eyebrow="Shop by Category" title="Find Your Fit" />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="home-hover-card lookbook-interactive group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink relative block aspect-[3/4] overflow-hidden bg-bone"
            >
              <div className="h-full w-full lookbook-image">
                <PlaceholderImage src={editorialPhoto(category.slug)} label={category.name} monogram={false} />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <div className="lookbook-caption absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl text-ivory">{category.name}</h3>
                <span
                  className="link-underline category-cta mt-2 inline-block max-h-0 overflow-hidden text-eyebrow text-xs font-medium text-ivory/90 opacity-0 transition-all duration-300 ease-editorial group-hover:max-h-8 group-hover:opacity-100 group-focus-visible:max-h-8 group-focus-visible:opacity-100"
                >
                  Shop {category.name} &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
