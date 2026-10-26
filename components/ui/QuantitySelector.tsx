'use client';

import { cn } from '@/lib/utils';

export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
  label = 'Quantity',
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn('inline-flex items-center border border-line', className)}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center text-lg text-ink transition-colors hover:bg-bone disabled:opacity-30"
      >
        &minus;
      </button>
      <span className="flex h-11 w-10 items-center justify-center text-sm tabular-nums" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label.toLowerCase()}`}
        className="flex h-11 w-11 items-center justify-center text-lg text-ink transition-colors hover:bg-bone disabled:opacity-30"
      >
        +
      </button>
    </div>
  );
}
