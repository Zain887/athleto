// src/app/products/page.tsx

'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Product } from '../types';


export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>),
      }));
      setProducts(fetched);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout>
      <section className="py-12 px-4 md:px-10">
        <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">
          All Products
        </h1>
        <p className="text-gray-700 mb-6">
          Browse our full range of premium tracksuits for every lifestyle.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
