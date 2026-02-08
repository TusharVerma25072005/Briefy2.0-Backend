export default function DownloadApp() {
  return (
    <section id="download" className="bg-gradient-to-b from-white to-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">

        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Briefy on Your Phone
          </h2>

          <p className="text-gray-600 max-w-lg mb-8">
            Read smarter, faster, and stress-free. Download the Briefy mobile app to get instant email summaries anytime, anywhere.
          </p>

          <a
            href="https://play.google.com"
            target="_blank"
            className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:scale-105 transition shadow-lg"
          >
            <img
              src="/google_play.png"
              alt="Google Play"
              className="w-24 h-24"
            />
            <div className="text-left">
              <p className="text-xs text-gray-300">Get it on</p>
              <p className="font-semibold text-sm">Google Play</p>
            </div>
          </a>
        </div>

        <div className="flex justify-center">
          <img
            src="/app-mockup.png"
            alt="Briefy Mobile App"
            className="w-[280px] md:w-[340px] drop-shadow-2xl"
          />
        </div>

      </div>
    </section>
  );
}
