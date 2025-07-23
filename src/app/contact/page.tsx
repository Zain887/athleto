// app/contact/page.tsx

export const metadata = {
  title: "Contact ATHLETO - Get in Touch",
  description: "Need help or have a question? Contact ATHLETO’s support team today.",
};

import Layout from "../components/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">
        Have a question or comment? Fill out the form below and we’ll get back to you shortly.
      </p>

      <form className="grid grid-cols-1 gap-4 max-w-xl">
        <input
          type="text"
          placeholder="Your Name"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="border border-gray-300 rounded px-4 py-2"
          required
        />
        <textarea
          placeholder="Your Message"
          rows={5}
          className="border border-gray-300 rounded px-4 py-2"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-[#1C1C1C] text-white px-6 py-2 rounded font-semibold hover:bg-[#333] transition"
        >
          Send Message
        </button>
      </form>
    </Layout>
  );
}
