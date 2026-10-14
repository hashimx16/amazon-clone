import ProductBrowser from "@/components/ProductBrowser";
import { products } from "@/data/products";

export default async function Home({ searchParams }: { searchParams: Promise<{ q?: string; category?: string }> }) {
  const { q = "", category = "All" } = await searchParams;
  return <main className="min-h-screen bg-[#f7f8fa] text-gray-900">
    <ProductBrowser products={products} query={q.trim()} initialCategory={category} />
  </main>;
}
