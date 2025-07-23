'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
    const { cart, clearCart } = useCart();

    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        payment: 'COD',
    });

    const [copiedText, setCopiedText] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace('$', ''));
            return sum + price * item.quantity;
        }, 0);

        const timestamp = new Date().toLocaleString('en-GB', {
            timeZone: 'Asia/Karachi',
            hour12: false
        }).replace(',', '');

        const orderData = {
            ...form,
            cart,
            total,
            timestamp
        };

        // Save to localStorage
        const previousOrders = JSON.parse(localStorage.getItem('athleto-orders') || '[]');
        localStorage.setItem('athleto-orders', JSON.stringify([...previousOrders, orderData]));

        alert("Order placed successfully and saved locally!");
        clearCart();
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedText(text);
            setTimeout(() => setCopiedText(''), 2000);
        });
    };

    return (
        <Layout>
            <section className="px-4 py-12 max-w-3xl mx-auto text-[#1C1C1C]">
                <h1 className="text-4xl font-extrabold text-center mb-6">Checkout</h1>

                {/* Order Summary */}
                <div className="bg-[#fdf7e3] border border-[#FFD700] p-5 rounded-lg shadow mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-[#1C1C1C]">Your Order</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {cart.map((item, i) => (
                                <li key={i} className="py-2 flex justify-between text-base">
                                    <span className="font-medium">{item.name} (x{item.quantity})</span>
                                    <span className="text-[#FFD700]">{item.price}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Checkout Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#FFD700] px-4 py-3 rounded text-[#1C1C1C] placeholder-gray-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#FFD700] px-4 py-3 rounded text-[#1C1C1C] placeholder-gray-500"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Shipping Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#FFD700] px-4 py-3 rounded text-[#1C1C1C] placeholder-gray-500"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={form.city}
                        onChange={handleChange}
                        required
                        className="w-full border border-[#FFD700] px-4 py-3 rounded text-[#1C1C1C] placeholder-gray-500"
                    />

                    {/* Payment */}
                    <div>
                        <label className="block font-semibold mb-2 text-[#1C1C1C]">Payment Method</label>
                        <select
                            name="payment"
                            value={form.payment}
                            onChange={handleChange}
                            className="w-full border border-[#FFD700] px-4 py-3 rounded text-[#1C1C1C]"
                        >
                            <option value="COD">Cash on Delivery</option>
                            <option value="BankTransfer">Bank Transfer</option>
                            <option value="JazzCash">JazzCash</option>
                        </select>

                        {/* Payment Instructions */}
                        {form.payment === 'BankTransfer' && (
                            <div className="text-sm bg-yellow-100 border border-yellow-300 p-4 mt-4 rounded text-[#1C1C1C]">
                                <p>Send payment to:</p>
                                <p><strong>Bank:</strong> Bank Alfalah</p>
                                <p><strong>Account Title:</strong> Muhammad Zain</p>
                                <p className="flex items-center gap-2">
                                    <strong>Account Number:</strong> 55755001359161
                                    <button
                                        onClick={() => copyToClipboard("55755001359161")}
                                        className="text-xs text-blue-600 underline"
                                        type="button"
                                    >
                                        {copiedText === "55755001359161" ? "✔ Copied" : "Copy"}
                                    </button>
                                </p>
                                <p className="flex items-center gap-2">
                                    <strong>IBAN:</strong> PK10ALFH5575005001359161
                                    <button
                                        onClick={() => copyToClipboard("PK10ALFH5575005001359161")}
                                        className="text-xs text-blue-600 underline"
                                        type="button"
                                    >
                                        {copiedText === "PK10ALFH5575005001359161" ? "✔ Copied" : "Copy"}
                                    </button>
                                </p>
                                <p>Send your receipt after placing the order at <strong>+923302376222</strong>.</p>
                            </div>
                        )}
                        {form.payment === 'JazzCash' && (
                            <div className="text-sm bg-pink-100 border border-pink-300 p-4 mt-4 rounded text-[#1C1C1C]">
                                <p>
                                    Send JazzCash to: <strong>0321-8431118</strong>
                                    <button
                                        onClick={() => copyToClipboard("0321-8431118")}
                                        className="ml-2 text-xs text-blue-600 underline"
                                        type="button"
                                    >
                                        {copiedText === "0321-8431118" ? "✔ Copied" : "Copy"}
                                    </button>
                                </p>
                                <p>Send your receipt after placing the order at <strong>+923302376222</strong>.</p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#FFD700] text-[#1C1C1C] font-bold text-lg py-3 rounded hover:bg-yellow-400 transition"
                    >
                        Place Order
                    </button>
                </form>
            </section>
        </Layout>
    );
}
