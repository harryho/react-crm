import * as React from 'react';

import type { CartItem } from '../types';

const STORAGE_KEY = 'crm-cart';

export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  addItem: (variantId: number, qty?: number) => void;
  removeItem: (variantId: number) => void;
  setQty: (variantId: number, qty: number) => void;
  clear: () => void;
}

export const CartContext = React.createContext<CartContextValue>({
  items: [],
  totalItems: 0,
  addItem: () => {},
  removeItem: () => {},
  setQty: () => {},
  clear: () => {},
});

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<CartItem[]>(readStoredCart);

  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = React.useCallback((variantId: number, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.variantId === variantId);
      if (existing) {
        return prev.map((item) =>
          item.variantId === variantId ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { variantId, qty }];
    });
  }, []);

  const removeItem = React.useCallback((variantId: number) => {
    setItems((prev) => prev.filter((item) => item.variantId !== variantId));
  }, []);

  const setQty = React.useCallback((variantId: number, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.variantId !== variantId)
        : prev.map((item) => (item.variantId === variantId ? { ...item, qty } : item))
    );
  }, []);

  const clear = React.useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  const value = React.useMemo(
    () => ({ items, totalItems, addItem, removeItem, setQty, clear }),
    [items, totalItems, addItem, removeItem, setQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return React.useContext(CartContext);
}
