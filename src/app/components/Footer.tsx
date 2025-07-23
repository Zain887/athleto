'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';


export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#1C1C1C] text-white py-10 relative">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row sm:justify-between items-center gap-6 text-sm">

        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/athleto.svg"
            alt="Athleto Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-base font-semibold text-white">ATHLETO</span>
        </Link>

        {/* Navigation */}
        <div className="flex space-x-6 font-medium">
          <Link href="/about" className="hover:text-[#FFD700] transition text-white">About</Link>
          <Link href="/contact" className="hover:text-[#FFD700] transition text-white">Contact</Link>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <Link
            href="https://facebook.com/athleto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-[#FFD700] transition"
          >
            <FaFacebookF size={20} strokeWidth={1.8} />
         </Link>
          <Link
            href="https://instagram.com/athleto"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-[#FFD700] transition"
          >
            <FaInstagram size={20} strokeWidth={1.8} />
         </Link>
          <Link
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-[#FFD700] transition"
          >
            <FaWhatsapp size={20} strokeWidth={1.8} />
         </Link>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className="absolute right-4 bottom-4 bg-[#1C1C1C] text-white p-2 rounded-full hover:bg-[#FFD700] hover:text-white transition"
      >
        <ArrowUp size={18} />
      </button>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-xs mt-8">
        © {new Date().getFullYear()} ATHLETO. All rights reserved.
      </div>
    </footer>
  );
}
