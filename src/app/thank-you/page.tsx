import Link from "next/link";

// ✅ FILE: app/thank-you/page.tsx
export default function ThankYouPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-center px-4">
            <div className="max-w-lg p-8 rounded-lg shadow bg-[#fdf7e3] border border-[#FFD700] text-[#1C1C1C]">
                <h1 className="text-4xl font-bold mb-4">🎉 Thank You!</h1>
                <p className="text-lg mb-6">Your order has been placed successfully.</p>
                <p className="text-base">We&apos;ll contact you shortly for confirmation. Stay tuned!</p>
                <Link href="/" className="mt-6 inline-block bg-[#FFD700] text-[#1C1C1C] font-bold px-6 py-3 rounded hover:bg-yellow-400 transition">
                    Go Back to Home
                </Link>
                <Link
                  href={`https://wa.me/923302376222?text=${encodeURIComponent("Hi! I placed an order on ATHLETO. Please confirm my order.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
                >
                  Confirm on WhatsApp
                </Link>
            </div>
        </div>
    );
}