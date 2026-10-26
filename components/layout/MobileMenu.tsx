'use client';

import { Fragment, useEffect, useRef } from 'react';
import Link from 'next/link';
import CategoriesMenu from '@/components/layout/CategoriesMenu';
import { AnimatePresence, motion } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

const CATEGORY_LINKS = [
  { label: 'Men', href: '/category/men' },
  { label: 'Women', href: '/category/women' },
  { label: 'Unisex', href: '/category/unisex' },
  { label: 'Accessories', href: '/category/accessories' },
];

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute inset-y-0 left-0 flex w-[86%] max-w-sm flex-col overflow-y-auto overscroll-contain pb-[env(safe-area-inset-bottom)] bg-ivory"
          >
            <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center bg-ivory justify-between border-b border-line px-5">
              <span className="font-display text-xl tracking-[0.15em] text-ink">ELVIC</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile primary" className="flex-1 px-5 py-6">
              <ul className="space-y-1">
                {links.map((link) => (
                  <Fragment key={link.href}>
                  {link.label === 'New Arrivals' && <CategoriesMenu mobile onNavigate={onClose} />}
                  <li>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="block py-3 font-display text-2xl text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                  </Fragment>
                ))}
              </ul>

              <div className="mt-8 border-t border-line pt-6">
                <p className="text-eyebrow mb-3 text-xs font-medium text-stone">Shop by Category</p>
                <ul className="space-y-3">
                  {CATEGORY_LINKS.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={onClose} className="inline-flex min-h-11 items-center text-sm text-graphite hover:text-ink">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-line pt-6">
                <Link href="/account" onClick={onClose} className="text-xs text-eyebrow text-graphite hover:text-ink">
                  Account
                </Link>
                <Link href="/wishlist" onClick={onClose} className="text-xs text-eyebrow text-graphite hover:text-ink">
                  Wishlist
                </Link>
                <Link href="/contact" onClick={onClose} className="text-xs text-eyebrow text-graphite hover:text-ink">
                  Contact
                </Link>
              </div>
            </nav>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
