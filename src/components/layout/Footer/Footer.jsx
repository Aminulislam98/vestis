import { TextAnimate } from "@/components/ui/text-animate";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border w-full">
      <div className="w-full px-6 sm:px-6 xl:px-10 pt-16 pb-10">
        {/* Newsletter — full width centred */}
        <div className="w-full text-center border-b border-border pb-16">
          <strong
            className="block font-heading text-foreground"
            style={{
              fontSize: "clamp(2rem, 5vw, 2rem)",
              letterSpacing: "0.05em",
            }}
          >
            GET 10% OFF YOUR FIRST ORDER
          </strong>
          <p
            className="font-body text-muted-foreground mt-4 mx-auto max-w-2xl"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)" }}
          >
            Subscribe to our newsletter for exclusive deals, new arrivals and
            members-only offers delivered straight to your inbox.
          </p>

          {/* Email input */}
          <div className="mt-10 flex justify-center">
            <div className="relative w-full max-w-2xl">
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                className="w-full rounded-full border border-border bg-muted px-8 py-5 pe-44 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground"
                style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}
                id="email"
                type="email"
                placeholder="Enter your email address"
              />
              <button
                className="absolute inset-e-2 top-1/2 -translate-y-1/2 rounded-full bg-foreground px-8 py-3.5 font-body font-semibold text-background transition hover:opacity-80 tracking-widest uppercase"
                style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Left — brand + description + social */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <span
              className="font-heading text-foreground"
              style={{
                fontSize: "clamp(2rem, 3vw, 3.5rem)",
                letterSpacing: "0.25em",
              }}
            >
              VESTIS
            </span>
            <p
              className="font-body text-muted-foreground leading-relaxed max-w-sm"
              style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
            >
              Premium fashion for men and women. Shop the latest tops, bottoms
              and shoes — delivered free across the UK. Style that means
              something.
            </p>

            {/* Social icons */}
            <div className="flex gap-5 mt-2">
              {[
                { icon: <FaFacebook size={22} />, label: "Facebook" },
                { icon: <RiInstagramFill size={22} />, label: "Instagram" },
                { icon: <BsTwitterX size={22} />, label: "Twitter" },
                { icon: <FaYoutube size={22} />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Right — 3 link columns */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-10 sm:grid-cols-3">
            {/* Shop */}
            <div>
              <strong
                className="font-body font-semibold text-foreground uppercase tracking-widest"
                style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
              >
                Shop
              </strong>
              <ul className="mt-6 flex flex-col gap-4">
                {[
                  "Men's Tops",
                  "Men's Bottoms",
                  "Women's Tops",
                  "Women's Bottoms",
                  "Shoes",
                  "Sale",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                      style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <strong
                className="font-body font-semibold text-foreground uppercase tracking-widest"
                style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
              >
                Help
              </strong>
              <ul className="mt-6 flex flex-col gap-4">
                {[
                  "FAQs",
                  "Delivery Info",
                  "Returns & Exchanges",
                  "Size Guide",
                  "Track My Order",
                  "Contact Us",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                      style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <strong
                className="font-body font-semibold text-foreground uppercase tracking-widest"
                style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
              >
                About
              </strong>
              <ul className="mt-6 flex flex-col gap-4">
                {[
                  "About VESTIS",
                  "Careers",
                  "Sustainability",
                  "Press",
                  "Affiliates",
                  "Student Discount",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                      style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p
              className="font-body text-muted-foreground"
              style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
            >
              © {new Date().getFullYear()} VESTIS. All rights reserved.
            </p>
            <div className="flex gap-8">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    href="#"
                    className="font-body text-muted-foreground hover:text-foreground transition-colors duration-200"
                    style={{ fontSize: "clamp(0.75rem, 1vw, 0.875rem)" }}
                  >
                    {item}
                  </Link>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
