'use client';

import { createContext, useCallback, useContext, ReactNode } from 'react';

import { useStoredState } from '@/lib/hooks/useStoredState';
import { WISHLIST_STORAGE_KEY, decodeWishlist } from '@/lib/storage';

interface WishlistContextValue {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useStoredState<string[]>(WISHLIST_STORAGE_KEY, [], decodeWishlist);

  const toggle = useCallback(
    (productId: string) => {
      setIds((prev) =>
        prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
      );
    },
    [setIds],
  );

  const has = useCallback((productId: string) => ids.includes(productId), [ids]);

  return (
    <WishlistContext.Provider value={{ ids, toggle, has }}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
