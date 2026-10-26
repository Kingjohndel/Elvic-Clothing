'use client';

import { ReactNode } from 'react';
import { MotionConfig } from 'framer-motion';
import { CartProvider } from '@/lib/context/CartContext';
import { WishlistProvider } from '@/lib/context/WishlistContext';
import CartDrawer from '@/components/layout/CartDrawer';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <WishlistProvider>
          {children}
          <CartDrawer />
        </WishlistProvider>
      </CartProvider>
    </MotionConfig>
  );
}
