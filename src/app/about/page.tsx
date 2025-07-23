'use client';

import Link from "next/link";
import Layout from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <section className="px-4 py-12 max-w-5xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#1C1C1C] mb-6">
          About <span className="text-[#FFD700]">ATHLETO</span>
        </h1>
        <p className="text-lg text-center text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          ATHLETO was born from a vision to empower everyday athletes with premium tracksuits that deliver
          both performance and lifestyle appeal. Designed for movement, built for confidence—ATHLETO
          celebrates every stride of your journey.
        </p>

        {/* Our Story */}
        <section className="mb-12 border-l-4 border-[#FFD700] pl-6">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3">Our Story</h2>
          <p className="text-gray-700 leading-relaxed text-base">
            We started ATHLETO with a simple goal: to create modern athletic wear that feels as good as it looks.
            With sleek silhouettes, durable fabrics, and inclusive sizing, our tracksuits are crafted for men, women,
            and kids who want to move freely—without compromising on style. From the gym to the streets,
            ATHLETO is designed for every moment of your active life.
          </p>
        </section>

        {/* Our Mission */}
        <section className="bg-[#f9f9f9] p-6 md:p-8 rounded-xl shadow-md mb-12 border border-[#FFD700]/30">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At ATHLETO, we&apos;re committed to redefining activewear. Our mission is to bridge high-performance
            sportswear with modern aesthetics—creating tracksuits that empower people of all ages to feel
            confident, stylish, and comfortable wherever they go.
          </p>
        </section>

        {/* What We Value */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1C1C1C] mb-4">What We Value</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-3 leading-relaxed">
            <li><span className="text-[#FFD700] font-semibold">Performance + Style:</span> Engineered for athletes, styled for everyday wear.</li>
            <li><span className="text-[#FFD700] font-semibold">Comfort in Motion:</span> Breathable, stretchable fabrics that move with you.</li>
            <li><span className="text-[#FFD700] font-semibold">Inclusivity:</span> Tracksuits for all—men, women, and kids of every body type.</li>
            <li><span className="text-[#FFD700] font-semibold">Sustainability:</span> Responsible sourcing, ethical manufacturing, and eco-friendly packaging.</li>
          </ul>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16 bg-[#FFD700]/10 py-10 px-4 rounded-lg border border-[#FFD700]/30">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FFD700] mb-3">
            Join the ATHLETO Movement
          </h2>
          <p className="text-gray-800 mb-6 max-w-xl mx-auto">
            Whether you&apos;re chasing goals or embracing your everyday hustle, ATHLETO is here to outfit your ambition.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#1C1C1C] text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Explore Our Tracksuits
          </Link>
        </section>
      </section>
    </Layout>
  );
}
