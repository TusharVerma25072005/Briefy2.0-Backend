import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-slate-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">

        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            ✨ AI-Powered Email Intelligence
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Summarize Emails <br />
            Instantly with AI
          </h1>

          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            Save hours every week. Briefy uses advanced AI to summarize,
            categorize, and prioritize your emails — so you only read what
            matters most.
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <Link href="/signup">
              <button className="px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md hover:opacity-90 transition">
                Create Account →
              </button>
            </Link>

            <Link href="/signup">
              <button className="px-6 py-3 rounded-xl border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition">
                Sign Up Free
              </button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Free forever plan
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              No credit card required
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl bg-white p-4 shadow-xl">
            <Image
              src="/hero_image.jpg" 
              alt="App Preview"
              width={600}
              height={600}
              className="rounded-2xl object-cover"
            />
          </div>

          <div className="absolute top-16 -left-10 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
              ✓
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Meeting Reminder</p>
              <p className="text-gray-500">Team sync at 3 PM today</p>
            </div>
          </div>

          <div className="absolute bottom-16 right-0 bg-white shadow-lg rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white">
              ★
            </div>
            <div className="text-sm">
              <p className="font-semibold text-gray-800">Important</p>
              <p className="text-gray-500">Q4 report ready for review</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
