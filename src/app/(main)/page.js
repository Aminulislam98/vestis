import AnnouncementBanner from "@/components/layout/Navbar/AnnouncementBanner";
import ExploreSection from "@/components/Sections/ExploreSection";
import HeroBanner from "@/components/Sections/HeroBanner";
import NewArrivals from "@/components/Sections/NewArrivals";
import RecentlyViewed from "@/components/Sections/RecentlyViewed";

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <HeroBanner />
      <ExploreSection />
      <NewArrivals />
      <RecentlyViewed />
    </>
  );
}
