'use client';

import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { CartLine, Product } from '@/lib/types';

import { useStoredState } from '@/lib/hooks/useStoredState';
import { CART_STORAGE_KEY, decodeCart, isPositiveQuantity } from '@/lib/storage';

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function lineKey(productId: string, size: string, color: string) {
  return `${productId}__${size}__${color}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useStoredState<CartLine[]>(CART_STORAGE_KEY, [], decodeCart);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback(
    (product: Product, size: string, color: string, quantity = 1) => {
      if (
        !isPositiveQuantity(quantity) ||
        !product.sizes.includes(size) ||
        !product.colors.some((option) => option.name === color)
      )
        return;
      setLines((prev) => {
        const key = lineKey(product.id, size, color);
        const existing = prev.find((l) => lineKey(l.productId, l.size, l.color) === key);
        if (existing) {
          if (!isPositiveQuantity(existing.quantity + quantity)) return prev;
          return prev.map((l) =>
            lineKey(l.productId, l.size, l.color) === key
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            size,
            color,
            quantity,
            tone: product.tone,
          },
        ];
      });
      setIsOpen(true);
    },
    [setLines],
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      const key = lineKey(productId, size, color);
      setLines((prev) => prev.filter((l) => lineKey(l.productId, l.size, l.color) !== key));
    },
    [setLines],
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (!Number.isSafeInteger(quantity)) return;
      const key = lineKey(productId, size, color);
      setLines((prev) =>
        quantity <= 0
          ? prev.filter((l) => lineKey(l.productId, l.size, l.color) !== key)
          : prev.map((l) =>
              lineKey(l.productId, l.size, l.color) === key ? { ...l, quantity } : l,
            ),
      );
    },
    [setLines],
  );

  const clearCart = useCallback(() => setLines([]), [setLines]);

  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.quantity, 0), [lines]);
  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
