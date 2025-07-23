'use client';

import Layout from "../components/Layout";
import { Mail} from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <Layout>
      <section className="px-4 py-10 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-[#1C1C1C] mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl mx-auto">
          Have a question or want to get in touch? We&apos;re here to help! Reach out to us through the channels below and the ATHLETO team will get back to you as soon as possible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-800 text-base">

          {/* Email */}
          <Link
            href="mailto:support@athleto.com"
            className="group flex items-start space-x-4 bg-gray-100 p-5 rounded-lg shadow hover:shadow-lg hover:border hover:border-[#FFD700] transition-all duration-300"
          >
            <Mail className="text-[#FFD700] group-hover:scale-110 transition" />
            <div>
              <p className="font-semibold text-[#1C1C1C]">Email Us</p>
              <span className="text-blue-600 group-hover:underline">
                support@athleto.com
              </span>
            </div>
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start space-x-4 bg-gray-100 p-5 rounded-lg shadow hover:shadow-lg hover:border hover:border-[#FFD700] transition-all duration-300"
          >
            <FaWhatsapp className="text-[#FFD700] group-hover:scale-110 transition" />
            <div>
              <p className="font-semibold text-[#1C1C1C]">WhatsApp</p>
              <span className="text-green-600 group-hover:underline">
                +92 300 1234567
              </span>
            </div>
          </Link>

          {/* Instagram */}
          <Link
            href="https://instagram.com/athleto"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start space-x-4 bg-gray-100 p-5 rounded-lg shadow hover:shadow-lg hover:border hover:border-[#FFD700] transition-all duration-300"
          >
            <FaInstagram className="text-[#FFD700] group-hover:scale-110 transition" />
            <div>
              <p className="font-semibold text-[#1C1C1C]">Instagram</p>
              <span className="text-pink-600 group-hover:underline">
                @athleto
              </span>
            </div>
          </Link>

          {/* Facebook */}
          <Link
            href="https://facebook.com/athleto"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start space-x-4 bg-gray-100 p-5 rounded-lg shadow hover:shadow-lg hover:border hover:border-[#FFD700] transition-all duration-300"
          >
            <FaFacebookF className="text-[#FFD700] group-hover:scale-110 transition" />
            <div>
              <p className="font-semibold text-[#1C1C1C]">Facebook</p>
              <span className="text-blue-600 group-hover:underline">
                fb.com/athleto
              </span>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
