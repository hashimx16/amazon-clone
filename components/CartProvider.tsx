"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";

export type CartItem = { product: Product; quantity: number };
type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isDrawerOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  placeOrder: () => string;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState(false);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const value = useMemo<CartContextValue>(() => ({
    items, count, subtotal, isDrawerOpen,
    addItem(product, quantity = 1) {
      if (quantity < 1) return;
      setItems((current) => {
        const existing = current.find((item) => item.product.id === product.id);
        return existing
          ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
          : [...current, { product, quantity }];
      });
      setDrawerOpen(true);
    },
    setQuantity(productId, quantity) {
      setItems((current) => quantity < 1 ? current.filter((item) => item.product.id !== productId) : current.map((item) => item.product.id === productId ? { ...item, quantity } : item));
    },
    removeItem(productId) { setItems((current) => current.filter((item) => item.product.id !== productId)); },
    openDrawer() { setDrawerOpen(true); },
    closeDrawer() { setDrawerOpen(false); },
    openCheckout() { setDrawerOpen(false); setCheckoutOpen(true); },
    closeCheckout() { setCheckoutOpen(false); },
    placeOrder() {
      const trackingId = `AMZ-${Date.now().toString(36).toUpperCase()}`;
      setItems([]);
      return trackingId;
    },
  }), [items, count, subtotal, isDrawerOpen]);

  return <CartContext.Provider value={value}>
    {children}
    <CartDrawer />
    <CheckoutModal open={isCheckoutOpen} />
  </CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
