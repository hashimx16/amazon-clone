"use client";

export type Filters = { category: string; price: string; fourStars: boolean; primeOnly: boolean };
const categories = ["All", "Electronics", "Fashion", "Home", "Books"];
const prices = [{ id: "all", label: "Any price" }, { id: "under25", label: "Under $25" }, { id: "25to50", label: "$25 to $50" }, { id: "50to100", label: "$50 to $100" }, { id: "over100", label: "$100 & above" }];

export default function FilterSection({ filters, onChange }: { filters: Filters; onChange: (next: Filters) => void }) {
  return <aside aria-label="Product filters" className="h-fit border border-[#e7e7e7] bg-white p-3 lg:sticky lg:top-4">
    <div className="mb-3 flex items-center justify-between border-b border-[#e7e7e7] pb-2.5"><h2 className="text-base font-bold text-gray-900">Filters</h2><button type="button" onClick={() => onChange({ category: "All", price: "all", fourStars: false, primeOnly: false })} className="text-xs font-semibold text-gray-700 hover:underline">Clear all</button></div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
      <fieldset><legend className="mb-1.5 text-sm font-semibold text-gray-900">Category</legend><div className="flex flex-wrap gap-1.5 lg:flex-col lg:items-stretch">{categories.map((category) => <label key={category} className={`cursor-pointer rounded-sm border px-2 py-1 text-sm transition-colors duration-150 ease-out ${filters.category === category ? "border-gray-400 bg-gray-100 font-semibold text-gray-900" : "border-transparent text-gray-700 hover:border-gray-200 hover:bg-gray-100"}`}><input type="radio" name="category-filter" checked={filters.category === category} onChange={() => onChange({ ...filters, category })} className="sr-only" />{category}</label>)}</div></fieldset>
      <fieldset className="border-t border-[#e7e7e7] pt-3 sm:border-0 sm:pt-0 lg:border-t lg:pt-3"><legend className="mb-1.5 text-sm font-semibold text-gray-900">Price</legend><div className="space-y-1.5">{prices.map(({ id, label }) => <label key={id} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"><input type="radio" name="price-filter" checked={filters.price === id} onChange={() => onChange({ ...filters, price: id })} className="accent-gray-900" />{label}</label>)}</div></fieldset>
      <fieldset className="border-t border-[#e7e7e7] pt-3"><legend className="mb-1.5 text-sm font-semibold text-gray-900">Customer reviews</legend><label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={filters.fourStars} onChange={(event) => onChange({ ...filters, fourStars: event.target.checked })} className="accent-gray-900" /><span className="text-gray-700">★★★★</span><span className="text-gray-400">★</span> & up</label></fieldset>
      <fieldset className="border-t border-[#e7e7e7] pt-3"><legend className="mb-1.5 text-sm font-semibold text-gray-900">Delivery</legend><label className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={filters.primeOnly} onChange={(event) => onChange({ ...filters, primeOnly: event.target.checked })} className="accent-gray-900" />Free One-Day Delivery <span className="font-bold text-blue-700">prime</span></label></fieldset>
    </div>
  </aside>;
}
