"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ChevronRight, MapPin, PackageCheck, Star, Truck } from "lucide-react";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";

function imageViews(image: string) {
  const base = new URL(image);
  base.searchParams.set("w", "1200");
  base.searchParams.set("q", "90");
  const detail = new URL(base);
  detail.searchParams.set("h", "900");
  detail.searchParams.set("fit", "crop");
  detail.searchParams.set("crop", "center");
  const close = new URL(base);
  close.searchParams.set("h", "700");
  close.searchParams.set("fit", "crop");
  close.searchParams.set("crop", "right");
  return [{ src: base.toString(), label: "Full view" }, { src: detail.toString(), label: "Detail view" }, { src: close.toString(), label: "Close-up view" }];
}

export default function ProductDetails({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const { addItem, openCheckout } = useCart();
  const views = imageViews(product.image);
  const price = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(product.price);

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + (product.prime ? 1 : 3));
    setDeliveryDate(new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(date));
  }, [product.prime]);

  function addToCart(buyNow = false) {
    addItem(product, quantity);
    if (buyNow) openCheckout();
    setFeedback(`${quantity} added to cart.`);
  }

  return <main className="min-h-screen bg-[#f7f8fa] px-4 pb-16 text-gray-900 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-[1500px]">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 py-4 text-xs text-gray-600"><Link href="/" className="hover:text-gray-900">Home</Link><ChevronRight size={12} /><Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-gray-900">{product.category}</Link><ChevronRight size={12} /><span className="max-w-64 truncate text-gray-800">{product.title}</span></nav>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <section aria-label="Product images" className="min-w-0"><div className="flex aspect-square max-h-[610px] items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white p-5"><img src={views[selected].src} alt={`${product.title} — ${views[selected].label}`} className="h-full w-full object-contain transition duration-150 ease-out hover:scale-[1.02]" /></div><div className="mt-3 flex gap-2">{views.map((view, index) => <button key={view.label} type="button" aria-label={`Show ${view.label}`} aria-pressed={selected === index} onClick={() => setSelected(index)} className={`h-16 w-16 overflow-hidden rounded-md border bg-white p-1 transition-colors duration-150 ease-out ${selected === index ? "border-gray-400" : "border-gray-200 hover:border-gray-400"}`}><img src={view.src} alt="" className="h-full w-full object-contain" /></button>)}</div></section>
        <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_270px]">
          <section className="min-w-0"><p className="text-xs text-gray-600">{product.category}</p><h1 className="mt-1 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">{product.title}</h1><div className="mt-3 flex items-center gap-2 text-sm"><Star size={16} fill="currentColor" className="text-gray-700" /><span className="font-semibold text-gray-700">{product.rating.toFixed(1)}</span><span className="text-gray-600">{product.reviewCount.toLocaleString()} ratings</span></div><div className="mt-4 flex flex-wrap gap-2">{product.bestSeller && <span className="rounded-sm bg-gray-100 px-2 py-1 text-xs font-bold text-gray-900">Best Seller</span>}{product.prime && <span className="text-xs font-bold text-blue-700">✓ prime</span>}</div><div className="my-5 border-t border-gray-200" />
            <div className="mt-6 rounded-md border border-gray-200 bg-white p-4"><h2 className="mb-3 text-base font-bold text-gray-900">Key specifications</h2><div className="grid grid-cols-2 gap-2">{Object.entries(product.specs ?? {}).map(([key, value]) => <div key={key} className="rounded-md border border-gray-200 bg-[#f7f8fa] px-3 py-2"><span className="block text-[11px] font-semibold uppercase tracking-wide text-gray-600">{key}</span><span className="mt-1 block text-sm font-medium text-gray-900">{value}</span></div>)}</div></div>
          </section>
          <aside aria-label="Buy box" className="h-fit rounded-md border border-gray-200 bg-white p-4 xl:sticky xl:top-4"><p className="text-3xl font-bold text-gray-900">{price}</p><div className="mt-4 flex items-start gap-2 text-sm"><Truck size={18} className="mt-0.5 shrink-0 text-gray-700" /><p>{product.prime ? <><strong className="text-gray-700">Prime one-day delivery</strong><br /><span className="text-gray-700">Estimated {deliveryDate || "tomorrow"}</span></> : <span className="text-gray-700">Estimated delivery {deliveryDate || "in 3 days"}</span>}</p></div><p className="mt-2 flex items-center gap-2 text-xs text-gray-600"><MapPin size={14} /> Estimate varies by location</p><div className="my-4 border-t border-gray-200" /><p className="flex items-center gap-2 font-semibold text-gray-700"><PackageCheck size={18} /> In stock</p><label htmlFor="pdp-quantity" className="mt-4 block text-sm font-medium text-gray-800">Quantity</label><select id="pdp-quantity" value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} className="mt-1 w-full rounded-md border border-gray-200 bg-[#f7f8fa] px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-500">{Array.from({ length: 10 }, (_, index) => index + 1).map((n) => <option key={n} value={n}>{n}</option>)}</select><button type="button" onClick={() => addToCart()} className="mt-4 w-full rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-[#0f1111] transition-colors duration-150 ease-out hover:bg-amber-300 active:scale-[0.98]">Add to Cart</button><button type="button" onClick={() => addToCart(true)} className="mt-2 w-full rounded-md bg-amber-400 px-4 py-2.5 text-sm font-semibold text-[#0f1111] transition-colors duration-150 ease-out hover:bg-amber-300 active:scale-[0.98]">Buy Now</button>{feedback && <p role="status" className="mt-3 flex items-start gap-1.5 text-sm text-gray-700"><Check size={16} className="shrink-0" />{feedback}</p>}</aside>
        </div>
      </div>
    </div>
  </main>;
}
