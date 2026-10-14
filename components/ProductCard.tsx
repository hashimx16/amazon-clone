"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useCart } from "./CartProvider";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [whole, cents] = product.price.toFixed(2).split(".");
  return <article className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-md border border-[#e7e7e7] bg-white transition-colors duration-150 ease-out hover:border-[#d5d9d9]">
    <Link href={`/product/${product.id}`} aria-label={`View ${product.title}`} className="absolute inset-0 z-10 rounded-md focus-visible:outline-2 focus-visible:outline-[#f3a847]" />
    <div className="relative flex h-[220px] w-full shrink-0 items-center justify-center overflow-hidden border-b border-[#e7e7e7] bg-white p-4">
      <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain object-center" />
      {product.bestSeller && <span className="absolute left-2 top-2 rounded-sm bg-[#c45500] px-2 py-1 text-[10px] font-bold leading-none text-white">Best Seller</span>}
    </div>
    <div className="flex flex-1 flex-col p-3">
      <p className="text-[11px] text-gray-500">{product.category}</p>
      <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#0f1111] group-hover:text-[#c45500] group-hover:underline">{product.title}</h2>
      <div className="mt-2 flex items-center gap-1.5 text-xs"><span className="font-semibold text-[#0f1111]"><span className="text-[#f3a847]">★</span> {product.rating.toFixed(1)}</span><span className="text-gray-500">({product.reviewCount.toLocaleString()})</span></div>
      <div className="mt-2 flex items-end justify-between gap-2"><span className="inline-flex items-start font-bold tracking-tight text-[#0f1111]"><span className="pt-0.5 text-xs">$</span><span className="text-2xl leading-none">{whole}</span><span className="pt-0.5 text-xs">{cents}</span></span>{product.prime && <span className="text-xs font-semibold text-blue-700">✓ prime</span>}</div>
      <p className="mb-3 mt-1 text-[11px] text-gray-500">Free returns</p>
      <button type="button" onClick={() => { addItem(product); setAdded(true); }} className="relative z-20 mt-auto w-full rounded-lg border border-[#e2b33b] bg-[#ffd814] px-3 py-2 text-sm font-semibold text-[#0f1111] transition-colors duration-150 ease-out hover:bg-[#f7ca00] active:scale-[0.98]">{added ? "Added · Add another" : "Add to Cart"}</button>
    </div>
  </article>;
}
