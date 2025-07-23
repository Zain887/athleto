import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-[#1C1C1C] py-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-4 sm:space-y-0 sm:flex-row sm:justify-between text-sm">
        {/* Logo and brand name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/athleto.svg"
            alt="Athleto Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-base font-semibold text-[#1C1C1C]">ATHLETO</span>
        </Link>

        {/* Copyright */}
        <div className="text-gray-400 text-center sm:text-right">
          © {new Date().getFullYear()} ATHLETO. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
