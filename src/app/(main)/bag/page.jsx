// ── Bag Page (Static/Dummy Data)
// ── Later: replace dummyItems with real API data

import BagPageClient from "@/components/ClientSidePage/BagPageClient";
export const metadata = {
  title: "Your Bag | Vestis",
  description: "Review your selected items and proceed to checkout.",
  robots: {
    index: false, // ← bag page Google index করবে না
    follow: false,
  },
};

export default function BagPage() {
  return <BagPageClient />;
}
