'use client';

import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import { products } from '../../data/products';
import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext'; // 👈 Import Cart Context

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const { addToCart } = useCart(); // 👈 use cart context

  useEffect(() => {
    const found = products.find((p) => slugify(p.name) === slug);
    if (!found) return notFound();
    setProduct(found);
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      name: product.name,
      price: product.price,
      size: product.size.split(',')[0].trim(),
      image: product.image,
      quantity: 1,
    });

  };

  if (!product) return null;

  return (
    <Layout>
      <section className="py-12 px-4 md:px-10 grid md:grid-cols-2 gap-8 items-start">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="rounded-md w-full h-auto object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-4">{product.name}</h1>
          <p className="text-[#FFD700] text-xl font-semibold mb-2">{product.price}</p>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-sm text-gray-600 mb-1">Sizes: {product.size}</p>
          <p className="text-sm text-gray-600 mb-6 capitalize">Category: {product.category}</p>
          <button
            onClick={handleAddToCart}
            className="bg-[#1C1C1C] text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </section>
    </Layout>
  );
}
