"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Product } from "@/data/products";
import FilterSection, { type Filters } from "./FilterSection";
import ProductCard from "./ProductCard";

const categories = ["All", "Electronics", "Fashion", "Home", "Books"];

function matchesPrice(price: number, bucket: string) {
  switch (bucket) { case "under25": return price < 25; case "25to50": return price >= 25 && price < 50; case "50to100": return price >= 50 && price < 100; case "over100": return price >= 100; default: return true; }
}

export default function ProductBrowser({ products, query = "", initialCategory = "All" }: { products: Product[]; query?: string; initialCategory?: string }) {
  const [filters, setFilters] = useState<Filters>({ category: initialCategory, price: "all", fourStars: false, primeOnly: false });
  const visible = useMemo(() => products.filter((product) => (filters.category === "All" || product.category === filters.category) && (!query || product.title.toLowerCase().includes(query.toLowerCase())) && matchesPrice(product.price, filters.price) && (!filters.fourStars || product.rating >= 4) && (!filters.primeOnly || product.prime)), [products, query, filters]);
  return <section id="products" className="mx-auto max-w-[1600px] px-4 text-gray-900 sm:px-6 lg:px-8">
    <div className="flex min-h-12 flex-wrap items-center justify-between gap-2 border-b border-gray-200 py-2.5">
      <p className="text-sm text-gray-700" aria-live="polite">Showing <strong className="font-semibold text-gray-900">{visible.length}</strong> {visible.length === 1 ? "product" : "products"}{query && <span className="text-gray-500"> for “{query}”</span>}</p>
      <div className="flex flex-wrap items-center gap-1" aria-label="Catalog shortcuts"><a href="#search-products" aria-label="Search catalog" className="mr-1 flex h-7 w-7 items-center justify-center rounded-sm border border-gray-200 text-gray-600 transition-colors duration-150 ease-out hover:bg-gray-100 hover:text-gray-900"><Search size={14} /></a>{categories.map((category) => <button key={category} type="button" aria-pressed={filters.category === category} onClick={() => setFilters({ ...filters, category })} className={`rounded-sm border px-2.5 py-1 text-xs transition-colors duration-150 ease-out ${filters.category === category ? "border-gray-400 bg-gray-100 font-semibold text-gray-900" : "border-gray-200 bg-white text-gray-600 hover:border-gray-400 hover:text-gray-900"}`}>{category}</button>)}</div>
    </div>
    <div className="grid gap-4 py-4 lg:grid-cols-[210px_minmax(0,1fr)]"><FilterSection filters={filters} onChange={setFilters} /><div>{visible.length ? <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="flex min-h-60 flex-col items-center justify-center rounded-sm border border-gray-200 bg-white p-8 text-center"><h2 className="text-base font-semibold">No products match these filters</h2><p className="mt-1 text-sm text-gray-600">Try another category or clear the filters.</p><button type="button" onClick={() => setFilters({ category: "All", price: "all", fourStars: false, primeOnly: false })} className="mt-4 rounded-sm bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-150 ease-out hover:bg-amber-300 active:scale-[0.98]">Clear filters</button></div>}</div></div>
  </section>;
}
