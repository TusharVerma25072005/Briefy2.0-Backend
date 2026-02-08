import Hero from "@/components/hero";
import Features from "@/components/features";
import HowItWorks from "@/components/howitworks";
import ReviewsSection from "@/components/reviews";
import DownloadApp from "@/components/download";


export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <HowItWorks />
      <ReviewsSection />
      <DownloadApp />
      
    </div>  
  );
}
