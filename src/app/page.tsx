// src/app/page.tsx
import { fetchProducts } from './lib/fetchProducts';
import Layout from './components/Layout';
import ProductCard from './components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import { Timestamp } from 'firebase/firestore';

export const metadata = {
  title: 'ATHLETO - Premium Tracksuits for Men, Women & Kids',
  description:
    'Discover ATHLETO’s premium tracksuits crafted for comfort, performance, and everyday style.',
};

export default async function Home() {
  const allProductsRaw = await fetchProducts();

  const allProducts = allProductsRaw.map((p) => ({
    ...p,
    createdAt:
      p.createdAt && typeof p.createdAt === 'object' && 'toDate' in p.createdAt
        ? (p.createdAt as Timestamp).toDate().toISOString()
        : null,

  }));

  const featured = allProducts.slice(0, 8);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-black text-white flex items-center justify-center">
        <Image
          src="/images/hero.jpg"
          alt="ATHLETO Hero"
          fill
          className="object-cover object-top opacity-60"
          priority
        />
        <div className="relative text-center px-4 py-6 bg-black/40 backdrop-blur-sm rounded-xl max-w-2xl mx-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFD700] mb-4 drop-shadow-lg">
            Welcome to ATHLETO
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white drop-shadow-md">
            Premium tracksuits for every body. Designed for movement, made for comfort.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 md:px-10">
        <h2 className="text-3xl font-bold text-[#FFD700] mb-6 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-[#f9f9f9] py-12 px-4 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            At ATHLETO, we believe in creating premium athletic wear that fits your lifestyle.
            Our tracksuits are engineered for performance and comfort, making them perfect for training,
            lounging, or daily wear.
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-12 px-4 md:px-10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#FFD700] mb-8">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { quote: "The best tracksuit I've ever owned. Stylish and super comfy!", name: 'Ayesha R.' },
              { quote: 'Perfect fit and top-notch quality. Will definitely buy again.', name: 'Ahmed M.' },
              { quote: 'My kids love them! Great for school and sports.', name: 'Sana K.' },
            ].map((t, i) => (
              <div key={i} className="bg-[#1c1c1c] text-white p-6 rounded-lg shadow">
                <p className="italic">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 font-semibold">– {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#FFD700] py-10 px-4 text-center">
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">
          Ready to Upgrade Your Activewear?
        </h2>
        <p className="text-[#1C1C1C] mb-4">
          Shop our collections today and experience comfort in motion.
        </p>
        <Link
          href="/products"
          className="inline-block bg-[#1C1C1C] text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
        >
          Shop Now
        </Link>
      </section>
    </Layout>
  );
}
