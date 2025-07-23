// app/products/page.tsx
import Layout from "../components/Layout";
import Head from "next/head";

export default function ProductsPage() {
  return (
    <Layout>
      <Head>
        <title>Shop Tracksuits Online - ATHLETO Products</title>
        <meta name="description" content="Explore ATHLETO's full range of premium men's, women's, and kids' tracksuits. Comfortable, stylish, and made for every move." />
      </Head>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">All Products</h1>
      <p className="text-gray-700 mb-6">Browse our full range of premium tracksuits for every lifestyle.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Product Cards here */}
      </div>
    </Layout>
  );
}