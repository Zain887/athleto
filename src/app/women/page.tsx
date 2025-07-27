'use client';



import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';

export default function WomenPage() {
  const [womenProducts, setWomenProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const allProducts = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>),
        }));

        const filtered = allProducts.filter(
          (p) => p.category.toLowerCase() === 'women'
        );

        setWomenProducts(filtered);
      } catch (err) {
        console.error('Failed to fetch women’s products:', err);
      }
    };

    fetchProducts();
  }, []);

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
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
