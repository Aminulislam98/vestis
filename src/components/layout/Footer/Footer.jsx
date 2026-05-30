import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

const footerLinks = [
  {
    heading: "Shop",
    links: [
      { label: "Men", href: "/products?gender=mens" },
      { label: "Women", href: "/products?gender=womens" },
      { label: "New Arrivals", href: "/products" },
      { label: "Sale", href: "/products" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Track Order", href: "/track-order" },
      { label: "Delivery Info", href: "/delivery" },
      { label: "Returns", href: "/returns" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  {
    icon: FaFacebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100093614353745",
  },
  {
    icon: RiInstagramFill,
    label: "Instagram",
    href: "https://www.facebook.com/profile.php?id=100093614353745",
  },
  {
    icon: BsTwitterX,
    label: "Twitter",
    href: "https://www.facebook.com/profile.php?id=100093614353745",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "https://www.facebook.com/profile.php?id=100093614353745",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#f5f5f5] border-t border-border">
      <div className="w-full px-6 sm:px-10 xl:px-16 py-16 flex flex-col gap-14">
        {/* ── TOP */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between">
          {/* ── Brand */}
          <div className="flex flex-col gap-4 lg:w-[280px]">
            <p
              className="text-4xl text-foreground"
              style={{ fontFamily: "var(--font-signature)" }}
            >
              Vestis
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed max-w-xs">
              Premium fashion for men and women. Style that means something.
            </p>
            <div className="flex items-center gap-5 mt-2">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
            {footerLinks.map((section) => (
              <div key={section.heading} className="flex flex-col gap-4">
                <p className="font-body font-semibold text-base text-foreground uppercase tracking-widest">
                  {section.heading}
                </p>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-body text-base text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── DIVIDER */}
        <div className="h-px bg-border" />

        {/* ── BOTTOM */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-base text-muted-foreground">
            © {new Date().getFullYear()} Vestis. All rights reserved.
          </p>
          <p className="font-body text-base text-muted-foreground">
            Free UK Delivery over £50 · Free Returns
          </p>
        </div>
      </div>
    </footer>
  );
}
