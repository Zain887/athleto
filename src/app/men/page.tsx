// src/app/men/page.tsx

export const metadata = {
  title: "Men’s Tracksuits - ATHLETO",
  description:
    "Shop the latest premium men's tracksuits at ATHLETO. Athletic wear designed for performance, comfort, and style.",
};

import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function MenPage() {
  const menProducts = products.filter((p) => p.category === "men");

  return (
    <Layout>
      <section className="py-12 px-4 md:px-10">
        <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">
          Men’s Collection
        </h1>
        <p className="text-gray-700 mb-6">
          Discover performance-ready tracksuits made for men.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
