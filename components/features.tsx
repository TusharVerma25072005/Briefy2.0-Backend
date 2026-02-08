export default function Features() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Powerful Features for Busy People
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-16">
          Everything you need to take control of your inbox and reclaim your time
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">

          <FeatureCard
            title="Email Summarization"
            description="Get instant AI-generated summaries of long emails. Read the key points in seconds instead of minutes."
            gradient="from-blue-500 to-cyan-500"
            icon="⚡"
          />

          <FeatureCard
            title="Smart Categorization"
            description="Automatically organize emails into categories like Work, Personal, Promotions, and more with intelligent AI sorting."
            gradient="from-pink-500 to-purple-500"
            icon="🧠"
          />

          <FeatureCard
            title="Privacy Protection"
            description="Your emails stay private. We use end-to-end encryption and never store your email content on our servers."
            gradient="from-indigo-500 to-blue-500"
            icon="🛡️"
          />

          <FeatureCard
            title="Time Saving"
            description="Save up to 10 hours per week. Spend less time reading emails and more time on what matters most."
            gradient="from-violet-500 to-fuchsia-500"
            icon="⏱️"
          />

        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  gradient,
  icon,
}: {
  title: string;
  description: string;
  gradient: string;
  icon: string;
}) {
  return (
    <section id="features" className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition bg-white">
      
      <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center text-white text-xl font-bold bg-gradient-to-br ${gradient}`}>
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </section>
  );
}
