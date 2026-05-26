import {
  Cormorant_Garamond,
  Bebas_Neue,
  DM_Sans,
  Inter_Tight,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

const cormorant = Cormorant_Garamond({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
  variable: "--font-logo",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-price",
  display: "swap",
});

export const metadata = {
  title: "VESTIS | Fashion Store",
  description:
    "Shop the latest mens tops, womens tops, bottoms and shoes at VESTIS. Premium fashion for everyone.",
  keywords: [
    "fashion",
    "mens clothing",
    "womens clothing",
    "shoes",
    "tops",
    "bottoms",
    "VESTIS",
  ],
  authors: [{ name: "VESTIS" }],
  creator: "VESTIS",
  openGraph: {
    title: "VESTIS — Premium Fashion Store",
    description: "Shop the latest mens and womens fashion at VESTIS.",
    url: "https://vestis.co.uk",
    siteName: "VESTIS",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${cormorant.variable}
        ${bebas.variable}
        ${dmSans.variable}
        ${interTight.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        <main>{children}</main>
      </body>
    </html>
  );
}
