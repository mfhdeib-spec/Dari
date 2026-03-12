import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/product/ProductDetailsClient";
import { products } from "@/lib/mock/products";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const youMightAlsoLike = products.filter((p) => p.id !== id).slice(0, 4);

  return <ProductDetailsClient product={product} youMightAlsoLike={youMightAlsoLike} />;
}

