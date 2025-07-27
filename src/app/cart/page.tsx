'use client';

import Layout from '../components/Layout';
import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const price =
      typeof item.price === 'number'
        ? item.price
        : parseFloat(item.price?.toString() || '0');
    return sum + price * item.quantity;
  }, 0);

  return (
    <Layout>
      <div className="p-8 md:p-20">
        <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">Your Cart</h1>
        <p className="text-gray-700 mb-6">Review the items in your cart before checkout.</p>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is currently empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border p-4 rounded-lg shadow-sm"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded object-top object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#1C1C1C]">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">Size: {item.size}</p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.name, item.size, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="p-1 rounded hover:bg-red-200"
                    >
                      <Minus size={16} color="red" />
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.name, item.size, item.quantity + 1)
                      }
                      className="p-1 rounded hover:bg-green-200"
                    >
                      <Plus size={16} color="green" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-bold text-[#1C1C1C]">
                    PKR{typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.name, item.size)}
                    className="text-red-600 hover:text-red-800"
                    title="Remove"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center mt-6 border-t pt-4">
              <span className="text-lg font-bold text-[#1C1C1C]">Total</span>
              <span className="text-lg font-bold text-[#1C1C1C]">
                PKR{total.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              className="block text-center bg-[#FFD700] text-[#1C1C1C] px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition mt-6"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
}
