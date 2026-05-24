import BrandMarquee from "@/components/Sections/BrandMarquee";
import TrendingSection from "@/components/Sections/CategorySection";
import ExploreSection from "@/components/Sections/ExploreSection";
import HeroBanner from "@/components/Sections/HeroBanner";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <BrandMarquee />
      <ExploreSection />
      <TrendingSection />
    </>
  );
}
