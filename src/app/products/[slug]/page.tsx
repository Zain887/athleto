'use client';
export const runtime = 'edge';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { db } from '../../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from '../../types';

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProductDetail() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [product, setProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const allProducts = snap.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, 'id'>),
        }));

        const found = allProducts.find((p) => slugify(p.name) === slug);
        if (!found) return notFound();
        setProduct(found);
      } catch (err) {
        console.error('Error fetching product:', err);
        notFound();
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      name: product.name,
      price: product.price.toString(),
      size: product.size.split(',')[0].trim(),
      image: product.image,
      quantity: 1,
    });
  };

  if (!product) return null;

  return (
    <Layout>
      <section className="py-12 px-4 md:px-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div
          className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-white cursor-pointer group"
          onClick={() => setShowModal(true)}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            priority
          />
          <div className="absolute bottom-2 right-2 text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded hidden group-hover:block">
            Click to zoom
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold text-[#1C1C1C]">{product.name}</h1>
          <p className="text-[#FFD700] text-2xl font-semibold">{product.price}</p>
          <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
          <div className="text-sm text-gray-600">
            <p><strong>Available Sizes:</strong> {product.size}</p>
            <p><strong>Category:</strong> {product.category}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 inline-block bg-[#1C1C1C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#333] transition transform hover:scale-105 duration-200"
          >
            Add to Cart
          </button>
        </div>
      </section>

      {/* Modal Image Viewer */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-3xl w-full p-4">
            <Image
              src={product.image}
              alt={product.name}
              width={1200}
              height={1200}
              className="w-full h-auto object-contain rounded-lg shadow-lg"
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-white text-xl bg-black bg-opacity-50 px-3 py-1 rounded hover:bg-opacity-80 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}
