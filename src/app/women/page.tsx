// src/app/women/page.tsx

export const metadata = {
  title: "Women’s Tracksuits - ATHLETO",
  description:
    "Discover stylish and functional women's tracksuits from ATHLETO. Designed for comfort, crafted for movement.",
};

import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function WomenPage() {
  const womenProducts = products.filter((p) => p.category === "women");

  return (
    <Layout>
      <section className="py-12 px-4 md:px-10">
        <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">
          Women’s Collection
        </h1>
        <p className="text-gray-700 mb-6">
          Stylish, comfortable tracksuits made for women.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {womenProducts.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
