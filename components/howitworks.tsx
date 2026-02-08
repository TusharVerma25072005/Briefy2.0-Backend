export default function HowItWorks() {
  return (
    <section id="how" className="bg-gradient-to-b from-slate-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          How It Works
        </h2>

        <p className="text-gray-600 max-w-xl mx-auto mb-20">
          Get started in minutes. No complex setup required.
        </p>

        <div className="relative grid md:grid-cols-3 gap-12">

          <div className="hidden md:block absolute top-[70px] left-0 right-0 h-[2px] bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300" />

          <StepCard
            step="01"
            title="Connect Your Email"
            description="Securely link your email account in seconds. We support Gmail, Outlook, and more."
            icon="📧"
          />

          <StepCard
            step="02"
            title="AI Does the Work"
            description="Our advanced AI reads and summarizes your emails, categorizing them by importance and topic."
            icon="🧠"
          />

          <StepCard
            step="03"
            title="Read What Matters"
            description="Get instant summaries and smart notifications. Focus only on the emails that need your attention."
            icon="✅"
          />

        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  title,
  description,
  icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="flex flex-col items-center text-center relative">

      <div className="relative mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
          <span className="text-4xl text-white">{icon}</span>
        </div>

        <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          {step}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-sm max-w-xs leading-relaxed">
        {description}
      </p>

    </div>
  );
}
