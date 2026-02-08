"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-2">
          <Image src="/briefy.png" alt="Briefy Logo" width={120} height={120}  />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <Link href="#features" className="hover:text-blue-600 transition">
            Features
          </Link>
          <Link href="#how" className="hover:text-blue-600 transition">
            How It Works
          </Link>
          {/* <Link href="#pricing" className="hover:text-blue-600 transition">
            Pricing
          </Link> */}
          <Link href="/signup">
            <button className="ml-2 px-4 py-2 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 hover:opacity-90 transition">
              Sign Up Free
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
