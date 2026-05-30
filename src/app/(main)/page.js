import AnnouncementBanner from "@/components/layout/Navbar/AnnouncementBanner";
import ExploreSection from "@/components/Sections/ExploreSection";
import HeroBanner from "@/components/Sections/HeroBanner";
import NewArrivals from "@/components/Sections/NewArrivals";
import RecentlyViewed from "@/components/Sections/RecentlyViewed";
import FadeUp from "@/components/ui/FadeUp";

export const metadata = {
  title: "Vestis | Premium Fashion Store",
  description:
    "Shop the latest men's and women's fashion at Vestis. Free UK delivery on orders over £50. New arrivals every week.",
  keywords: [
    "fashion",
    "mens clothing",
    "womens clothing",
    "premium fashion",
    "UK fashion",
    "Vestis",
    "free delivery",
  ],
  openGraph: {
    title: "Vestis | Premium Fashion Store",
    description:
      "Shop the latest men's and women's fashion at Vestis. Free UK delivery on orders over £50.",
    url: "https://vestis-psi.vercel.app",
    siteName: "Vestis",
    type: "website",
    images: [
      {
        url: "https://vestis-psi.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Vestis Fashion Store",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vestis | Premium Fashion Store",
    description: "Shop the latest men's and women's fashion at Vestis.",
    images: ["https://vestis-psi.vercel.app/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://vestis-psi.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      <AnnouncementBanner />
      <HeroBanner />
      <FadeUp>
        <ExploreSection />
      </FadeUp>
      <FadeUp delay={0.1}>
        <NewArrivals />
      </FadeUp>
      <FadeUp delay={0.2}>
        <RecentlyViewed />
      </FadeUp>
    </>
  );
}
