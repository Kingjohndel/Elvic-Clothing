'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useWishlist } from '@/lib/context/WishlistContext';
import MobileMenu from '@/components/layout/MobileMenu';
import SearchOverlay from '@/components/layout/SearchOverlay';
import CategoriesMenu from '@/components/layout/CategoriesMenu';

const NAV_LINKS = [
  { label: 'New Arrivals', href: '/new-arrivals' },
  { label: 'Men', href: '/category/men' },
  { label: 'Women', href: '/category/women' },
  { label: 'Brands', href: '/brands' },
  { label: 'Collections', href: '/collections' },
  { label: 'Sale', href: '/sale' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount, openCart, isOpen: cartOpen } = useCart();
  const { ids } = useWishlist();

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen || cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, searchOpen, cartOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1280px)');
    const closeDesktopMenu = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener('change', closeDesktopMenu);
    return () => desktop.removeEventListener('change', closeDesktopMenu);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <div className="container-elvic flex h-16 items-center justify-between md:h-20">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-11 w-11 items-center justify-center xl:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <Link
            href="/"
            className="shrink-0 font-display text-xl tracking-[0.15em] text-ink sm:text-2xl md:text-3xl"
          >
            ELVIC
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-4 xl:gap-7">
              {NAV_LINKS.map((link) => (
                <Fragment key={link.href}>
                  {link.label === 'New Arrivals' && <CategoriesMenu />}
                  <li>
                    <Link
                      href={link.href}
                      className="link-underline text-eyebrow text-xs font-medium text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-0 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-11 w-11 items-center justify-center"
              aria-label="Search"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
              </svg>
            </button>

            <Link
              href="/account"
              className="hidden h-11 w-11 items-center justify-center sm:flex"
              aria-label="Account"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="3.5" />
                <path strokeLinecap="round" d="M4.5 20c1.6-3.4 4.4-5 7.5-5s5.9 1.6 7.5 5" />
              </svg>
            </Link>

            <Link
              href="/wishlist"
              className="relative flex h-11 w-11 items-center justify-center"
              aria-label={`Wishlist${ids.length ? ` (${ids.length} items)` : ''}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.5s-7.5-4.6-10-9.1C.6 8.1 2 4.5 5.4 3.7c2-.5 4 .3 5.1 2.1a.6.6 0 001 0c1.1-1.8 3.1-2.6 5.1-2.1 3.4.8 4.8 4.4 3.4 7.7-2.5 4.5-10 9.1-10 9.1z"
                />
              </svg>
              {ids.length > 0 && (
                <span className="absolute right-0.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-ivory">
                  {ids.length}
                </span>
              )}
            </Link>

            <button
              type="button"
              onClick={openCart}
              className="relative flex h-11 w-11 items-center justify-center"
              aria-label={`Shopping bag${itemCount ? ` (${itemCount} items)` : ''}`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 8h12l-1 12H7L6 8z" />
                <path strokeLinecap="round" d="M9 8V6a3 3 0 016 0v2" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-ivory">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={NAV_LINKS} />
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
