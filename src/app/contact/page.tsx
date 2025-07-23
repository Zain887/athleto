// app/contact/page.tsx
import Layout from "../components/Layout";
import Head from "next/head";

export default function ContactPage() {
  return (
    <Layout>
      <Head>
        <title>Contact ATHLETO - Get in Touch</title>
        <meta name="description" content="Need help or have a question? Contact ATHLETO’s support team today." />
      </Head>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-6">Have a question or comment? Fill out the form below and we’ll get back to you.</p>
      {/* Contact form or details go here */}
    </Layout>
  );
}