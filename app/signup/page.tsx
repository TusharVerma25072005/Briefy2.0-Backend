"use client";

import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center px-6">

      <Link href="/" className="mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2">
        ← Back to Home
      </Link>

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <div className="flex flex-col items-center mb-6">
          <Image src="/briefy.png" alt="Briefy" width={100} height={100} />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create Account
        </h2>

        <p className="text-gray-600 text-center mt-2 mb-6">
          Continue by connecting Gmail
        </p>

        <button
          onClick={() => window.location.href = "/api/auth/gmail/login"}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
        >
          Continue with Gmail
        </button>
        <button
          onClick={() => window.location.href = "/api/auth/outlook/login"}
          className="w-full mt-3 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold hover:opacity-90 transition"
        >
          Continue with Outlook
        </button>

      </div>
    </div>
  );
}
