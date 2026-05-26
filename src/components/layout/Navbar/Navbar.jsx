"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  Search,
  User,
  Heart,
  ShoppingBag,
  X,
  ChevronDown,
} from "lucide-react";
import SearchModal from "./SearchModal";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const navLinks = [
  {
    label: "Women",
    href: "/products?gender=womens",
    subcategories: [
      { label: "Tops & T-Shirts", value: "tops" },
      { label: "Hoodies & Sweatshirts", value: "hoodies" },
      { label: "Dresses", value: "dresses" },
      { label: "Trousers", value: "trousers" },
      { label: "Skirts", value: "skirts" },
      { label: "Jackets", value: "jackets" },
      { label: "Co-ords", value: "coords" },
      { label: "Bodysuits", value: "bodysuits" },
    ],
  },
  {
    label: "Men",
    href: "/products?gender=mens",
    subcategories: [
      { label: "T-Shirts & Vests", value: "tshirts" },
      { label: "Hoodies & Sweatshirts", value: "hoodies" },
      { label: "Joggers & Trousers", value: "joggers" },
      { label: "Shorts", value: "shorts" },
      { label: "Jackets", value: "jackets" },
      { label: "Tracksuits", value: "tracksuits" },
    ],
  },
  {
    label: "Kids",
    href: "/kids",
    subcategories: [],
  },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedLink, setExpandedLink] = useState(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) setVisible(true);
      else if (currentY > lastY) setVisible(false);
      else setVisible(true);
      setLastY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  const isActive = (href) => {
    if (href === "/kids") return pathname === "/kids";
    if (href.includes("womens")) {
      return (
        pathname.includes("products") && searchParams.get("gender") === "womens"
      );
    }
    if (href.includes("mens")) {
      return (
        pathname.includes("products") && searchParams.get("gender") === "mens"
      );
    }
    return false;
  };

  return (
    <>
      <nav
        className={`
          sticky top-0 z-50
          border-b border-border bg-background/95 backdrop-blur-sm
          transition-transform duration-300 ease-in-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center h-14 relative">
            {/* ── LEFT — Hamburger + Logo */}
            <div className="flex items-center gap-2 flex-1">
              <button
                className="md:hidden p-1.5 rounded-md hover:bg-accent transition-colors"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={20} strokeWidth={2} />
              </button>

              <Link
                href="/"
                className="font-heading text-xl tracking-[0.25em] uppercase text-foreground"
              >
                Vestis
              </Link>
            </div>

            {/* ── CENTRE — Nav links desktop */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`
                    relative font-body text-sm font-medium tracking-widest uppercase
                    transition-colors duration-200 py-1 group
                    ${
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  {link.label}
                  <span
                    className={`
                      absolute bottom-0 left-0 h-[1.5px] bg-foreground
                      transition-all duration-300 ease-in-out
                      ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                  />
                </Link>
              ))}
            </div>

            {/* ── RIGHT — Icons */}
            <div className="flex items-center gap-0.5 flex-1 justify-end">
              <button
                onClick={() => setSearchOpen(true)}
                className="
                  hidden lg:flex items-center gap-2
                  h-8 w-36 px-3 mr-2
                  rounded-lg bg-accent
                  text-muted-foreground
                  hover:bg-accent/80
                  transition-colors duration-200
                "
                aria-label="Open search"
              >
                <Search size={13} strokeWidth={2} />
                <span className="font-body text-xs text-muted-foreground">
                  Search...
                </span>
              </button>

              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={2} />
              </button>
              <button
                className="p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Account"
              >
                <User size={20} strokeWidth={2} />
              </button>
              <button
                className="p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={2} />
              </button>
              <button
                className="p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Bag"
              >
                <ShoppingBag size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="absolute top-0 left-0 h-full w-full bg-background flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-border shrink-0">
              <Link
                href="/"
                className="font-heading text-lg tracking-[0.25em] uppercase text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vestis
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md hover:bg-accent transition-colors"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={2} />
              </button>
            </div>

            {/* ── Nav links — accordion */}
            <div className="flex flex-col overflow-y-auto flex-1 px-6 mt-5">
              {navLinks.map((link) => (
                <div key={link.label} className="">
                  {/* ── Main row — full row is clickable to expand */}
                  <button
                    onClick={() =>
                      setExpandedLink(
                        expandedLink === link.label ? null : link.label,
                      )
                    }
                    className="w-full flex items-center justify-between py-1"
                  >
                    {/* ── Nike style — large heading font, bold */}
                    <span
                      className={`
                      text-left font-semibold
                        transition-colors duration-200
                        ${isActive(link.href) ? "text-foreground" : "text-foreground"}
                      `}
                      style={{ fontSize: "clamp(1.2rem, 5vw, 2rem)" }}
                    >
                      {link.label}
                    </span>

                    {/* Chevron — only if has subcategories */}
                    {link.subcategories.length > 0 && (
                      <ChevronDown
                        size={25}
                        strokeWidth={2}
                        className={`
                          text-muted-foreground transition-transform duration-200 shrink-0
                          ${expandedLink === link.label ? "rotate-180" : ""}
                        `}
                      />
                    )}
                  </button>

                  {/* ── Subcategories — smooth expand */}
                  {expandedLink === link.label &&
                    link.subcategories.length > 0 && (
                      <div className="flex flex-col pb-4 gap-0">
                        {/* ── View all link */}
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-body text-xl font-semibold text-foreground py-2.5 border-b border-border/20 transition-colors hover:text-muted-foreground"
                        >
                          View All {link.label}
                        </Link>

                        {/* ── Subcategory items */}
                        {link.subcategories.map((sub) => (
                          <Link
                            key={sub.value}
                            href={`${link.href}&subcategory=${sub.value}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-body text-xl text-muted-foreground hover:text-foreground py-2.5 border-b border-border/20 transition-colors duration-150 last:border-0"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* ── Bottom links */}
            <div className="px-6 pb-10 pt-6 flex flex-col gap-4 border-t border-border shrink-0">
              <Link
                href="#"
                className="font-body text-base font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Account
              </Link>
              <Link
                href="#"
                className="font-body text-base  font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href="#"
                className="font-body text-base  font-semibold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Help & FAQs
              </Link>
            </div>
          </div>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
