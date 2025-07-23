// app/cart/page.tsx

export const metadata = {
  title: "Your Cart - ATHLETO",
  description: "View and manage your selected ATHLETO tracksuits before checkout.",
};

import Layout from "../components/Layout";
import Image from "next/image";

export default function CartPage() {
  // Dummy cart items for now
  const cartItems = [
    {
      name: "Men's Elite Tracksuit",
      price: "$79.99",
      size: "L",
      quantity: 1,
      image: "/images/dummy.png",
    },
    {
      name: "Kids' Play Tracksuit",
      price: "$59.99",
      size: "S",
      quantity: 2,
      image: "/images/dummy.png",
    },
  ];

  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <Layout>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">Your Cart</h1>
      <p className="text-gray-700 mb-6">
        Review the items in your cart before proceeding to checkout.
      </p>

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
                className="rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-[#1C1C1C]">{item.name}</h3>
                <p className="text-gray-600 text-sm">
                  Size: {item.size} | Qty: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-[#1C1C1C]">{item.price}</p>
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
