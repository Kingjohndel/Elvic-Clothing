'use client';

import { FormEvent, useId, useState } from 'react';
import Button from '@/components/ui/Button';

export default function Newsletter({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle');
  const inputId = useId();
  const isDark = variant === 'dark';

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend is connected yet: this simply confirms the intent to
    // subscribe. Wire this up to a real email provider before launch.
    setStatus('submitted');
  }

  return (
    <div className={isDark ? 'text-ivory' : 'text-ink'}>
      <p className="text-eyebrow text-xs font-medium text-stone">Newsletter</p>
      <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
        Stay in the World of Elvic
      </h2>
      <p className={`mt-4 max-w-md text-sm leading-relaxed ${isDark ? 'text-bone/80' : 'text-graphite'}`}>
        Be the first to discover new collections, exclusive releases and stories from ELVIC.
      </p>

      {status === 'submitted' ? (
        <p className="mt-6 text-sm" role="status">
          You&rsquo;re on the list. Welcome to ELVIC.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor={inputId} className="sr-only">
            Email address
          </label>
          <input
            id={inputId}
            type="email"
            required
            placeholder="Enter your email"
            className={`h-12 min-w-0 flex-1 border bg-transparent px-4 text-sm outline-none transition-colors placeholder:text-stone focus-visible:ring-0 ${
              isDark ? 'border-bone/40 text-ivory' : 'border-line text-ink'
            }`}
          />
          <Button type="submit" variant={isDark ? 'invertOutline' : 'primary'}>
            Join Elvic
          </Button>
        </form>
      )}
    </div>
  );
}
