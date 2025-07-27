"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Product } from "../types"; // use this type instead of static data

interface ProductCardProps {
  product: Product;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ProductCard({ product }: ProductCardProps) {
  const slug = slugify(product.name);
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    addToCart({
      name: product.name,
      price: product.price.toString(),
      size: product.size.split(",")[0].trim(),
      image: product.image,
      quantity: 1,
    });
  };

  return (
    <Link href={`/products/${slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={300}
          className="h-80 w-full object-cover object-top"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-[#1C1C1C]">{product.name}</h3>
          <p className="text-[#FFD700] font-semibold">
            {typeof product.price === "number" ? `PKR ${product.price}` : product.price}
          </p>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <p className="text-xs text-gray-400">Sizes: {product.size}</p>
          <p className="text-xs text-gray-400 capitalize">
            Category: {product.category}
          </p>
          <button
            onClick={handleAdd}
            className="mt-2 w-full bg-[#1C1C1C] text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
