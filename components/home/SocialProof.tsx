import SectionHeading from '@/components/ui/SectionHeading';
import StarRating from '@/components/ui/StarRating';

const PLACEHOLDER_REVIEWS = [
  {
    author: 'Demo Reviewer',
    location: 'Placeholder location',
    rating: 5,
    quote:
      'This is placeholder review copy in the ELVIC voice. Replace this block with a genuine, verified customer review before launch.',
  },
  {
    author: 'Demo Reviewer',
    location: 'Placeholder location',
    rating: 5,
    quote:
      'Placeholder testimonial content: swap in real feedback once ELVIC has live customer orders to draw from.',
  },
  {
    author: 'Demo Reviewer',
    location: 'Placeholder location',
    rating: 4,
    quote:
      'Sample review text used to preview the layout. Not a real customer quote. Update before this site goes live.',
  },
];

export default function SocialProof() {
  return (
    <section className="bg-bone py-24 md:py-32">
      <div className="container-elvic">
        <SectionHeading
          eyebrow="From Our Community"
          title="What People Are Saying"
          description="Sample reviews shown for layout purposes. Replace with genuine, verified ELVIC customer feedback before launch."
        />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEHOLDER_REVIEWS.map((review, i) => (
            <figure key={i} className="border border-line bg-ivory p-7">
              <StarRating rating={review.rating} />
              <blockquote className="mt-5 text-sm leading-relaxed text-graphite">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-xs text-stone">
                <span className="font-medium text-ink">{review.author}</span> &middot; {review.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
