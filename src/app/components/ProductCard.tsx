// src/components/ProductCard.tsx

import Image from "next/image";
import { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#1C1C1C]">{product.name}</h3>
        <p className="text-[#FFD700] font-semibold">{product.price}</p>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="text-xs text-gray-400">Sizes: {product.size}</p>
        <p className="text-xs text-gray-400 capitalize">Category: {product.category}</p>
      </div>
    </div>
  );
}
