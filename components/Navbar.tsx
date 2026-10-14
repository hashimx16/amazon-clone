"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Search, ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

const categories = ["All", "Electronics", "Home", "Fashion", "Books"];

export default function Navbar() {
  const { count, openDrawer } = useCart();
  const [postalCode, setPostalCode] = useState("");
  const [draftCode, setDraftCode] = useState("");
  const [locationOpen, setLocationOpen] = useState(false);

  return <header className="relative z-20 border-b border-[#0f1720] bg-[#131921] text-white">
    <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 py-2 lg:flex-nowrap lg:gap-4 lg:px-8">
      <Link href="/" aria-label="Amazon Rebuild home" className="flex shrink-0 items-end rounded-sm px-1 text-xl font-bold tracking-tight outline-none focus-visible:ring-1 focus-visible:ring-gray-500">amazon<span className="text-[#febd69]">.</span><span className="ml-1 text-[9px] font-semibold tracking-wide text-gray-300">REBUILD</span></Link>
      <div className="relative order-3 w-full shrink-0 sm:order-none sm:w-auto"><button type="button" onClick={() => setLocationOpen(!locationOpen)} aria-expanded={locationOpen} className="flex w-full items-center gap-1.5 rounded-sm px-1.5 py-1 text-left transition-colors duration-150 ease-out hover:bg-[#232f3e] sm:w-auto"><MapPin size={17} className="shrink-0 text-gray-300" /><span className="leading-tight"><span className="block text-[11px] text-gray-300">Deliver to</span><span className="block text-xs font-semibold">{postalCode || "Your location"}</span></span><ChevronDown size={12} className="text-gray-300" /></button>
        {locationOpen && <form onSubmit={(event) => { event.preventDefault(); setPostalCode(draftCode.trim()); setLocationOpen(false); }} className="absolute left-0 top-full mt-1 w-64 rounded-sm border border-gray-200 bg-white p-3 text-gray-900"><label htmlFor="postal-code" className="mb-2 block text-sm font-semibold">Choose delivery location</label><input id="postal-code" value={draftCode} onChange={(event) => setDraftCode(event.target.value)} placeholder="Enter postal code" className="w-full rounded-sm border border-gray-200 bg-[#f7f8fa] px-3 py-2 text-sm outline-none focus:border-gray-500" /><button className="mt-2 w-full rounded-sm bg-amber-400 px-3 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-150 ease-out hover:bg-amber-300 active:scale-[0.98]">Apply</button></form>}
      </div>
      <form action="/" role="search" className="order-2 flex h-10 min-w-0 flex-1 overflow-hidden rounded-md border-2 border-transparent bg-white text-[#0f1111] focus-within:border-[#febd69] sm:order-none"><label htmlFor="search-category" className="sr-only">Search category</label><select id="search-category" name="category" defaultValue="All" className="max-w-24 shrink-0 cursor-pointer border-r border-gray-200 bg-gray-100 px-2 text-xs font-medium outline-none sm:max-w-none">{categories.map((category) => <option key={category} value={category}>{category}</option>)}</select><label htmlFor="search-products" className="sr-only">Search products</label><input id="search-products" name="q" placeholder="Search products" className="min-w-0 flex-1 bg-white px-3 text-sm outline-none" /><button type="submit" aria-label="Search" className="flex w-11 shrink-0 items-center justify-center border-l border-[#d99a3c] bg-[#febd69] text-[#0f1111] transition-colors duration-150 hover:bg-[#f3a847] active:scale-[0.98]"><Search size={20} strokeWidth={2.5} /></button></form>
      <nav aria-label="Account and shopping" className="order-4 ml-auto flex items-center gap-1 sm:order-none sm:ml-0 lg:gap-2"><Link href="/account" className="rounded-sm px-1.5 py-1 leading-tight transition-colors duration-150 ease-out hover:bg-[#232f3e]"><span className="block text-[11px] text-gray-300">Hello, sign in</span><span className="block text-xs font-semibold">Account & Lists</span></Link><Link href="/orders" className="hidden rounded-sm px-1.5 py-1 leading-tight transition-colors duration-150 ease-out hover:bg-[#232f3e] md:block"><span className="block text-[11px] text-gray-300">Returns</span><span className="block text-xs font-semibold">& Orders</span></Link><button type="button" onClick={openDrawer} aria-label={`Open cart with ${count} items`} className="relative flex items-end gap-1 rounded-sm px-1.5 py-1 transition-colors duration-150 ease-out hover:bg-[#232f3e]"><span className="relative"><ShoppingCart size={25} strokeWidth={1.8} /><span className="absolute -right-1 -top-2 flex min-w-4 items-center justify-center rounded-sm bg-[#febd69] px-0.5 text-[10px] font-bold text-[#0f1111]">{count}</span></span><span className="hidden text-xs font-semibold sm:inline">Cart</span></button></nav>
    </div>
  </header>;
}
