import type { Product } from '@/lib/types';
import StarRating from '@/components/ui/StarRating';
export default function ProductReviews({ product }: { product: Product }) {
  return (
    <>
      {' '}
      {product.reviews.length > 0 && (
        <div className="mt-12 border-t border-line pt-8">
          <h2 className="font-display text-xl text-ink">Reviews</h2>
          <p className="mt-1 text-xs text-stone">
            Demo reviews shown for layout purposes: replace with genuine customer feedback.
          </p>
          <ul className="mt-6 space-y-6">
            {product.reviews.map((review, i) => (
              <li key={i} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
                <StarRating rating={review.rating} />
                <p className="mt-2 font-display text-base text-ink">{review.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-graphite">{review.body}</p>
                <p className="mt-2 text-xs text-stone">
                  {review.author} {review.verified && '· Verified'} ·{' '}
                  {new Date(review.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
