"use client";

import { useEffect, useRef } from "react";
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useCart } from "./CartProvider";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function CartDrawer() {
  const { items, count, subtotal, isDrawerOpen, closeDrawer, setQuantity, removeItem, openCheckout } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDrawerOpen) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) { if (event.key === "Escape") closeDrawer(); }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDrawerOpen, closeDrawer]);

  return <div className={`fixed inset-0 z-50 transition-[visibility] duration-200 ${isDrawerOpen ? "visible" : "invisible"}`} aria-hidden={!isDrawerOpen}>
    <button type="button" aria-label="Close cart drawer" onClick={closeDrawer} className={`absolute inset-0 w-full bg-black/70 transition-opacity duration-150 ease-out ${isDrawerOpen ? "opacity-100" : "opacity-0"}`} />
    <aside role="dialog" aria-modal="true" aria-label="Shopping cart" className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-gray-200 bg-white text-gray-900   transition-transform duration-200 ease-out ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700">Your shopping bag</p><h2 className="mt-1 text-2xl font-bold">Cart <span className="text-base font-normal text-gray-600">({count})</span></h2></div><button ref={closeRef} type="button" onClick={closeDrawer} aria-label="Close cart" className="rounded-md border border-gray-200 p-2 text-gray-700 transition-colors duration-150 ease-out hover:border-gray-400 hover:bg-gray-100 hover:text-gray-900"><X size={22} /></button></div>
      {items.length ? <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">{items.map(({ product, quantity }) => <div key={product.id} className="flex gap-4 rounded-md border border-gray-200 bg-[#f7f8fa] p-3 "><img src={product.image} alt="" className="h-24 w-24 shrink-0 rounded-md bg-gray-100 object-contain" /><div className="min-w-0 flex-1"><p className="line-clamp-2 text-sm font-semibold text-gray-900">{product.title}</p><p className="mt-1 text-sm font-bold text-gray-900">{money(product.price)} <span className="font-normal text-gray-600">each</span></p>{product.prime && <span className="text-xs font-bold text-blue-700">✓ prime</span>}<div className="mt-2 flex items-center justify-between"><div className="flex items-center rounded-md border border-gray-200 bg-white"><button type="button" aria-label={`Decrease quantity of ${product.title}`} onClick={() => setQuantity(product.id, quantity - 1)} className="rounded-l-full p-1.5 transition-colors duration-150 ease-out hover:bg-gray-100"><Minus size={15} /></button><span className="min-w-8 text-center text-sm font-semibold">{quantity}</span><button type="button" aria-label={`Increase quantity of ${product.title}`} onClick={() => setQuantity(product.id, quantity + 1)} className="rounded-r-full p-1.5 transition-colors duration-150 ease-out hover:bg-gray-100"><Plus size={15} /></button></div><button type="button" aria-label={`Remove ${product.title}`} onClick={() => removeItem(product.id)} className="rounded-full p-2 text-gray-600 transition-colors duration-150 ease-out hover:bg-gray-100 hover:text-gray-900"><Trash2 size={17} /></button></div></div></div>)}</div> : <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><div className="rounded-lg border border-gray-200 bg-gray-100 p-5"><ShoppingBag size={44} className="text-gray-700" /></div><h3 className="mt-5 text-xl font-bold">Your cart is empty</h3><p className="mt-2 text-sm text-gray-600">Products you add will appear here.</p><button type="button" onClick={closeDrawer} className="mt-5 rounded-md bg-amber-400 px-5 py-2 text-sm font-bold text-zinc-950 transition-colors duration-150 ease-out hover:bg-amber-300">Continue shopping</button></div>}
      {items.length > 0 && <div className="border-t border-gray-200 bg-white p-5  "><div className="flex items-center justify-between text-lg font-bold"><span>Subtotal ({count} {count === 1 ? "item" : "items"})</span><span className="text-gray-900">{money(subtotal)}</span></div><p className="mt-2 flex items-center gap-2 text-sm text-gray-700"><Truck size={17} /> {items.every(({ product }) => product.prime) ? "Free Prime shipping on your order" : "Prime items qualify for free shipping"}</p><button type="button" onClick={openCheckout} className=" relative mt-5 w-full overflow-hidden rounded-md bg-amber-400 px-4 py-3 font-bold text-zinc-950  transition-colors duration-150 ease-out  hover:bg-amber-300 active:scale-[0.98]">Proceed to Checkout</button></div>}
    </aside>
  </div>;
}
