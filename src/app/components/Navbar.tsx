'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Men', path: '/men' },
    { name: 'Women', path: '/women' },
    { name: 'Kids', path: '/kids' },
  ]

  const isActive = (path: string) => pathname === path

  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/logoblackalone.png"
              alt="Athleto Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-2xl font-extrabold text-[#1C1C1C] tracking-tight">
              ATHLETO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <Link
                key={i}
                href={item.path}
                className={`font-bold text-sm transition-all duration-150 ${
                  isActive(item.path)
                    ? 'text-[#FFD700]'
                    : 'text-[#1C1C1C] hover:text-[#FFD700]'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Search bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-1 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
              />
            </div>

            {/* Cart icon */}
            <Link href="/cart" className="relative text-[#1C1C1C] hover:text-[#FFD700]">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD700] text-xs font-bold text-[#1C1C1C] px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Side (Hamburger + Cart) */}
          <div className="md:hidden flex items-center gap-4">
            {/* Cart icon for mobile */}
            <Link href="/cart" className="relative text-[#1C1C1C] hover:text-[#FFD700]">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FFD700] text-xs font-bold text-[#1C1C1C] px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Hamburger menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-[#1C1C1C] focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-inner">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block font-bold text-sm transition-all duration-150 ${
                isActive(item.path)
                  ? 'text-[#FFD700]'
                  : 'text-[#1C1C1C] hover:text-[#FFD700]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
