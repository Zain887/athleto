// app/kids/page.tsx

export const metadata = {
  title: "Kids’ Tracksuits - ATHLETO",
  description:
    "Comfortable, durable, and stylish tracksuits for kids. Discover ATHLETO's kidswear collection today.",
};

import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function KidsPage() {
  const kidsProducts = products.filter((p) => p.category === "kids");

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">
        Kids’ Collection
      </h1>
      <p className="text-gray-700 mb-6">
        Comfortable and playful tracksuits made for kids.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kidsProducts.map((product, i) => (
           <ProductCard key={i} product={product} />
        ))}
      </div>
    </Layout>
  );
}
