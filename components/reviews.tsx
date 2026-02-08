import Image from "next/image"

const reviews = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    text: "Briefy has been a game-changer for my productivity. I used to spend 2+ hours daily on emails. Now I breeze through my inbox in 30 minutes!",
  },
  {
    name: "Marcus Rodriguez",
    role: "Graduate Student",
    text: "As a student juggling classes and research, Briefy helps me stay on top of important emails from professors without getting overwhelmed.",
  },
  {
    name: "Emily Johnson",
    role: "Software Engineer",
    text: "The privacy-first approach gives me peace of mind. Smart summarization without compromising my data security. Exactly what I needed!",
    
  },
]

export default function ReviewsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 text-center">

        <h2 className="text-4xl font-bold text-gray-900">
          Loved by Students & Professionals
        </h2>
        <p className="mt-3 text-gray-600">
          Join thousands who’ve transformed their email experience
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex gap-1 text-yellow-400 mb-4">
                {"★★★★★".split("").map((star, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-gray-700 italic mb-6">
                “{review.text}”
              </p>

              <div className="flex items-center gap-3">
                
                <div className="text-left">
                  <p className="font-semibold text-gray-900">
                    {review.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {review.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 inline-flex items-center gap-2 bg-blue-50 px-5 py-2 rounded-full text-blue-700 font-medium">
          ⭐ 4.9/5 from 2,000+ users
        </div>
      </div>
    </section>
  )
}
