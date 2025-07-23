'use client';

import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Image from 'next/image';
import { Plus, Minus, Trash2 } from 'lucide-react'; // ✅ Import icons

interface CartItem {
  name: string;
  price: string;
  size: string;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const grouped: Record<string, CartItem> = {};

    storedCart.forEach((item: CartItem) => {
      const key = item.name + item.size;
      if (!grouped[key]) {
        grouped[key] = { ...item, quantity: 1 };
      } else {
        grouped[key].quantity += 1;
      }
    });

    setCartItems(Object.values(grouped));
  }, []);

  const updateLocalStorage = (items: CartItem[]) => {
    const flat = items.flatMap(item =>
      Array(item.quantity).fill({ ...item, quantity: 1 })
    );
    localStorage.setItem('cart', JSON.stringify(flat));
    setCartItems(items);
  };

  const incrementQty = (index: number) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    updateLocalStorage(updated);
  };

  const decrementQty = (index: number) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateLocalStorage(updated);
    }
  };

  const removeItem = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    updateLocalStorage(updated);
  };

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">Your Cart</h1>
      <p className="text-gray-700 mb-6">Review the items in your cart before checkout.</p>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is currently empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item, index) => (
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
                    onClick={() => decrementQty(index)}
                    className="p-1 rounded hover:bg-red-200"
                  >
                    <Minus size={16} color='red'/>
                  </button>
                  <span className="text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => incrementQty(index)}
                    className="p-1 rounded hover:bg-green-200"
                  >
                    <Plus size={16} color='green'/>
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="font-semibold text-[#1C1C1C]">{item.price}</p>
                <button
                  onClick={() => removeItem(index)}
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
              ${total.toFixed(2)}
            </span>
          </div>

          <button className="mt-4 w-full sm:w-auto bg-[#FFD700] text-[#1C1C1C] font-semibold px-6 py-3 rounded hover:bg-yellow-400 transition">
            Proceed to Checkout
          </button>
        </div>
      )}
    </Layout>
  );
}
