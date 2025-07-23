// src/app/products/page.tsx

export const metadata = {
  title: "Shop Tracksuits Online - ATHLETO Products",
  description:
    "Explore ATHLETO's full range of premium men's, women's, and kids' tracksuits. Comfortable, stylish, and made for every move.",
};

import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function ProductsPage() {
  return (
    <Layout>
      <section className="py-12 px-4 md:px-10">
        <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">
          All Products
        </h1>
        <p className="text-gray-700 mb-6">
          Browse our full range of premium tracksuits for every lifestyle.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={i} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
