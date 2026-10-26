'use client';
import { useState, useId } from 'react';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
const TABS = ['Description', 'Materials & Care', 'Shipping & Returns'] as const;
export default function ProductInformation({ product }: { product: Product }) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Description');
  const id = useId();
  const activeIndex = TABS.indexOf(activeTab);
  return (
    <div className="mt-12 border-t border-line pt-8">
      <div
        className="flex flex-wrap gap-6 border-b border-line"
        role="tablist"
        aria-label="Product information"
      >
        {TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel`}
            aria-selected={activeTab === tab}
            tabIndex={activeTab === tab ? 0 : -1}
            onClick={() => setActiveTab(tab)}
            onKeyDown={(event) => {
              let nextIndex: number;
              if (event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length;
              else if (event.key === 'ArrowLeft')
                nextIndex = (index + TABS.length - 1) % TABS.length;
              else if (event.key === 'Home') nextIndex = 0;
              else if (event.key === 'End') nextIndex = TABS.length - 1;
              else return;
              event.preventDefault();
              setActiveTab(TABS[nextIndex]);
              event.currentTarget.ownerDocument.getElementById(`${id}-tab-${nextIndex}`)?.focus();
            }}
            className={cn(
              'pb-3 text-xs font-medium uppercase tracking-widest2 transition-colors',
              activeTab === tab ? 'border-b border-ink text-ink' : 'text-stone hover:text-ink',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div
        className="pt-6 text-sm leading-relaxed text-graphite"
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${activeIndex}`}
      >
        {activeTab === 'Description' && (
          <div className="space-y-4">
            {product.description.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}
        {activeTab === 'Materials & Care' && (
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 text-eyebrow text-xs font-medium text-ink">Materials</h3>
              <ul className="space-y-1.5">
                {product.materials.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-eyebrow text-xs font-medium text-ink">Care</h3>
              <ul className="space-y-1.5">
                {product.care.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {activeTab === 'Shipping & Returns' && (
          <div className="space-y-4">
            <p>
              Standard shipping estimates and rates are calculated at checkout based on destination.
              See our{' '}
              <a href="/shipping" className="link-underline text-ink">
                Shipping
              </a>{' '}
              page for full details.
            </p>
            <p>
              Unworn items with tags attached can be returned within 30 days of delivery. See our{' '}
              <a href="/returns" className="link-underline text-ink">
                Returns
              </a>{' '}
              policy for full details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
