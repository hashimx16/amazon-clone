"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, CreditCard, MapPin, PackageCheck, X } from "lucide-react";
import { useCart } from "./CartProvider";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
const inputClass = "mt-1 block w-full rounded-md border border-gray-200 bg-[#f7f8fa] px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-500 ";

export default function CheckoutModal({ open }: { open: boolean }) {
  const { items, count, subtotal, closeCheckout, placeOrder } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [trackingId, setTrackingId] = useState("");
  const [orderedTotal, setOrderedTotal] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    function onKeyDown(event: KeyboardEvent) { if (event.key === "Escape") handleClose(); }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function handleClose() { setTrackingId(""); closeCheckout(); }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return;
    setOrderedTotal(subtotal);
    setTrackingId(placeOrder());
  }

  if (!open) return null;
  return <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) handleClose(); }}>
    <div role="dialog" aria-modal="true" aria-label={trackingId ? "Order confirmed" : "Checkout"} className="relative max-h-[min(90vh,850px)] w-full max-w-2xl overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 text-gray-900   sm:p-8">
      <button ref={closeRef} type="button" onClick={handleClose} aria-label="Close checkout" className="absolute right-5 top-5 z-10 rounded-md border border-gray-200 p-2 text-gray-700 transition-colors duration-150 ease-out hover:bg-gray-100 hover:text-gray-900"><X size={21} /></button>
      {trackingId ? <div className="relative py-8 text-center">
        <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-sm border border-gray-200 bg-gray-100 text-gray-900"><PackageCheck size={34} /></div>
        <div className="mt-4 text-xs font-bold uppercase tracking-wide text-gray-700">Order placed</div>
        <h2 className="mt-3 text-3xl font-bold text-gray-900">Thank you for your order!</h2><p className="mx-auto mt-3 max-w-md text-gray-700">Your mock order has been placed. Save the tracking ID below.</p>
        <div className="mx-auto mt-7 max-w-sm rounded-md border border-gray-200 bg-[#f7f8fa] p-5"><p className="text-xs font-bold uppercase tracking-wider text-gray-600">Tracking ID</p><p className="mt-1 text-xl font-bold tracking-wider text-gray-900">{trackingId}</p><p className="mt-3 text-sm text-gray-700">Order total: {money(orderedTotal)}</p></div>
        <button type="button" onClick={handleClose} className=" relative mt-7 overflow-hidden rounded-md bg-amber-400 px-8 py-3 font-bold text-zinc-950  transition-colors duration-150 ease-out hover:bg-amber-300">Continue shopping</button>
      </div> : <form onSubmit={submit}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-700">One-page checkout</p><h2 className="mt-1 text-3xl font-bold text-gray-900">Checkout</h2><p className="mt-2 text-sm text-gray-600">Demo checkout. No payment will be collected.</p>
        <section className="mt-7 rounded-md border border-gray-200 bg-[#f7f8fa] p-5"><div className="mb-4 flex items-center gap-2"><MapPin size={19} className="text-gray-700" /><h3 className="font-bold text-gray-900">Shipping address</h3></div><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs font-semibold text-gray-600">Full name<input name="name" required defaultValue="Alex Morgan" className={inputClass} /></label><label className="text-xs font-semibold text-gray-600">Street address<input name="street" required defaultValue="123 Market Street" className={inputClass} /></label><label className="text-xs font-semibold text-gray-600">City<input name="city" required defaultValue="Seattle" className={inputClass} /></label><label className="text-xs font-semibold text-gray-600">ZIP code<input name="zip" required defaultValue="98101" className={inputClass} /></label></div></section>
        <section className="mt-4 rounded-md border border-gray-200 bg-[#f7f8fa] p-5"><div className="mb-4 flex items-center gap-2"><CreditCard size={19} className="text-gray-700" /><h3 className="font-bold text-gray-900">Payment method</h3></div><div className="grid gap-3 sm:grid-cols-2"><label className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm transition ${paymentMethod === "card" ? "border-gray-400 bg-gray-100" : "border-gray-200 bg-white hover:border-gray-400"}`}><input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} className="accent-gray-900" /><span><strong className="block text-gray-900">Card</strong><span className="text-xs text-gray-600">Visa ending in 4242</span></span></label><label className={`flex cursor-pointer items-center gap-3 rounded-md border p-3 text-sm transition ${paymentMethod === "one-click" ? "border-gray-400 bg-gray-100" : "border-gray-200 bg-white hover:border-gray-400"}`}><input type="radio" name="payment" value="one-click" checked={paymentMethod === "one-click"} onChange={() => setPaymentMethod("one-click")} className="accent-gray-900" /><span><strong className="block text-gray-900">One-Click Pay</strong><span className="text-xs text-gray-600">Use saved details</span></span></label></div></section>
        <section className="mt-4 rounded-md border border-gray-200 bg-[#f7f8fa] p-5"><h3 className="font-bold text-gray-900">Order summary</h3><div className="mt-3 max-h-28 space-y-2 overflow-y-auto">{items.map(({ product, quantity }) => <div key={product.id} className="flex justify-between gap-4 text-sm"><span className="truncate text-gray-700">{product.title} <span className="text-gray-500">× {quantity}</span></span><span className="shrink-0 font-semibold text-gray-900">{money(product.price * quantity)}</span></div>)}</div><div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-bold"><span>Total ({count} {count === 1 ? "item" : "items"})</span><span className="text-gray-900">{money(subtotal)}</span></div><p className="mt-1 text-xs text-gray-700">Prime shipping: free on eligible items</p></section>
        <button type="submit" className=" relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-md bg-amber-400 px-5 py-3.5 font-bold text-zinc-950  transition-colors duration-150 ease-out  hover:bg-amber-300 active:scale-[0.98]"><Check size={19} />Place Order</button>
      </form>}
    </div>
  </div>;
}
