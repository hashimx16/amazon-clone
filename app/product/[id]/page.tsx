import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import { products } from "@/data/products";

export function generateStaticParams() { return products.map(({ id }) => ({ id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  return { title: product ? `${product.title} | Amazon Rebuild` : "Product not found | Amazon Rebuild" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) notFound();
  return <ProductDetails product={product} />;
}
