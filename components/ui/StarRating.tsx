import { cn } from '@/lib/utils';

export default function StarRating({
  rating,
  reviewCount,
  className,
}: {
  rating: number;
  reviewCount?: number;
  className?: string;
}) {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      <span className="sr-only">{`Rated ${rating} out of 5 stars${
        reviewCount !== undefined ? ` based on ${reviewCount} reviews` : ''
      }`}</span>
      <span aria-hidden="true" className="flex shrink-0 items-center gap-0.5 text-ink">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, rounded - i));
          return (
            <span key={i} className="relative inline-block h-3.5 w-3.5">
              <svg viewBox="0 0 20 20" className="absolute inset-0 h-full w-full text-line" fill="currentColor">
                <path d="M10 1.5l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 15l-5.5 3.1 1.4-6.1L1.2 7.8l6.2-.6L10 1.5z" />
              </svg>
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-ink" fill="currentColor">
                  <path d="M10 1.5l2.6 5.7 6.2.6-4.7 4.2 1.4 6.1L10 15l-5.5 3.1 1.4-6.1L1.2 7.8l6.2-.6L10 1.5z" />
                </svg>
              </span>
            </span>
          );
        })}
      </span>
      {reviewCount !== undefined && (
        <span aria-hidden="true" className="text-xs text-stone">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
