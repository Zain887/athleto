// app/page.tsx (Home page)
export const metadata = {
  title: "Home - ATHLETO",
  description:
    "Premium tracksuits designed for Men, Women, and Kids. Discover your perfect fit with ATHLETO’s modern activewear.",
};

import Layout from "./components/Layout";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="text-center py-12 bg-[#1C1C1C] text-white">
        <h1 className="text-4xl font-extrabold text-[#FFD700] mb-4">
          Welcome to ATHLETO
        </h1>
        <p className="max-w-2xl mx-auto">
          Premium tracksuits for every body. Designed for movement, made for
          comfort. Explore our collections for Men, Women, and Kids.
        </p>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 md:px-10">
        <h2 className="text-2xl font-bold text-[#FFD700] mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#f9f9f9] py-12 px-4 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700">
            At ATHLETO, we believe in creating premium athletic wear that fits
            your lifestyle. Our tracksuits are engineered for performance and
            comfort, making them perfect for training, lounging, or daily wear.
          </p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#FFD700] py-10 px-4 text-center">
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">
          Ready to Upgrade Your Activewear?
        </h2>
        <p className="text-[#1C1C1C] mb-4">
          Shop our collections today and experience comfort in motion.
        </p>
        <a
          href="/products"
          className="inline-block bg-[#1C1C1C] text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Shop Now
        </a>
      </section>
    </Layout>
  );
}