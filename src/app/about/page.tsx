'use client';

import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-extrabold text-[#1C1C1C] mb-4">About ATHLETO</h1>
      <p className="text-gray-700 mb-6">
        ATHLETO is built to inspire comfort and confidence through modern athletic wear. We specialize in
        tracksuits for men, women, and kids that blend style and function.
      </p>

      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-[#1C1C1C] mb-2">Our Vision</h2>
        <p className="text-gray-700">
          Our vision is to redefine activewear by merging performance-driven design with everyday style.
          Whether you&rsquo;re training, traveling, or relaxing, ATHLETO is made for movement.
        </p>
      </section>
    </Layout>
  );
}
