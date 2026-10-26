'use client';

import { FormEvent, useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function AccountPage() {
  const [mode, setMode] = useState<'sign-in' | 'create'>('sign-in');
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(
      'Account functionality requires a connected backend. This form is a UI preview only: no account was created or signed in.'
    );
  }

  return (
    <div className="container-elvic py-10 md:py-14">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Account' }]} />

      <div className="mx-auto mt-10 max-w-md">
        <div className="mb-8 flex border-b border-line">
          {(['sign-in', 'create'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setMessage(null);
              }}
              className={cn(
                'flex-1 pb-3 text-xs font-medium uppercase tracking-widest2 transition-colors',
                mode === m ? 'border-b border-ink text-ink' : 'text-stone hover:text-ink'
              )}
            >
              {m === 'sign-in' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <h1 className="font-display text-2xl text-ink">
          {mode === 'sign-in' ? 'Welcome back' : 'Create your Elvic account'}
        </h1>

        {message && (
          <p role="status" className="mt-4 border border-line bg-bone p-4 text-sm text-graphite">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === 'create' && (
            <input type="text" required placeholder="Full name" className="input-field" />
          )}
          <input type="email" required placeholder="Email address" className="input-field" />
          <input type="password" required placeholder="Password" className="input-field" />
          <Button type="submit" className="w-full">
            {mode === 'sign-in' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  );
}
