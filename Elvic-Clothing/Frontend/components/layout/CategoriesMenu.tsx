'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const CATEGORY_LINKS = [
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Men', href: '/category/men' },
  { label: 'Women', href: '/category/women' },
  { label: 'Unisex', href: '/category/unisex' },
  { label: 'Accessories', href: '/category/accessories' },
  { label: 'Brands', href: '/brands' },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/sale' },
  { label: 'Shop All', href: '/shop' },
];

export default function CategoriesMenu({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = mobile ? 'mobile-categories-menu' : 'categories-menu';

  useEffect(() => {
    if (!open) return;
    function closeOutside(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [open]);

  function focusLink(position: 'first' | 'last') {
    setOpen(true);
    requestAnimationFrame(() => {
      const links = rootRef.current?.querySelectorAll<HTMLAnchorElement>('a');
      if (links?.length) links[position === 'first' ? 0 : links.length - 1].focus();
    });
  }

  return (
    <li
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === 'mouse') setOpen(true);
      }}
      onPointerLeave={(event) => {
        if (!mobile && event.pointerType === 'mouse') setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            focusLink(event.key === 'ArrowDown' ? 'first' : 'last');
          }
        }}
        className={cn(
          'flex items-center gap-2 text-ink',
          mobile
            ? 'w-full justify-between py-3 font-display text-2xl'
            : 'link-underline text-eyebrow whitespace-nowrap py-3 text-xs font-medium',
        )}
      >
        Categories
        <svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
          className={cn('h-3 w-3 transition-transform', open && 'rotate-180')}
        >
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className={mobile ? 'pb-3' : 'absolute left-0 top-full z-50 w-60 pt-2'}
      >
        <ul
          className={
            mobile
              ? 'space-y-1 border-l border-line pl-4'
              : 'border border-line bg-ivory p-2 shadow-lg'
          }
          aria-label="Categories"
        >
          {CATEGORY_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className={cn(
                  'block text-sm text-graphite transition-colors hover:bg-bone hover:text-ink focus-visible:bg-bone',
                  mobile ? 'px-2 py-2.5' : 'px-4 py-3',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
