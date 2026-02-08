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
        <p className="text-gray-600 text-center mt-1 mb-6">
          Start summarizing emails instantly
        </p>

        <form className="space-y-5">

          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-2 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be at least 8 characters
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          By creating an account, you agree to our{" "}
          <span className="text-blue-600 cursor-pointer">Terms</span> &{" "}
          <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
        </p>

      </div>
    </div>
  );
}
