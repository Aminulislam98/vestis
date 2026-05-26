"use client";
import { useState, useEffect } from "react";
import { Menu, Search, User, Heart, ShoppingBag, X } from "lucide-react";
import SearchModal from "./SearchModal";
import Link from "next/link";

const navLinks = [
  { label: "Women", href: "/products?gender=womens" },
  { label: "Men", href: "/products?gender=mens" },
  { label: "Kids", href: "/kids" },
];

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Hide navbar on scroll down, show on scroll up
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      // ── Always show at top of page
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastY) {
        // ── Scrolling down → hide
        setVisible(false);
      } else {
        // ── Scrolling up → show
        setVisible(true);
      }
      setLastY(currentY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  return (
    <>
      {/* ── NAVBAR
          Hides on scroll down, slides back in on scroll up */}
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
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-1.5 rounded-md hover:bg-accent transition-colors"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={20} strokeWidth={2} />
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="font-heading text-xl tracking-[0.25em] uppercase text-foreground"
              >
                Vestis
              </Link>
            </div>

            {/* ── CENTRE — Nav links, desktop only */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm font-medium text-foreground hover:text-muted-foreground transition-colors tracking-widest uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── RIGHT — Search + Icons */}
            <div className="flex items-center gap-0.5 flex-1 justify-end">
              {/* ── Search bar pill — desktop only
                  Looks like Apple's search — grey pill, subtle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="
                  hidden lg:flex items-center gap-2
                  h-8 w-36 px-3 mr-2
                  rounded-lg bg-accent
                  text-muted-foreground
                  hover:bg-accent/80
                  transition-colors
                "
                aria-label="Open search"
              >
                <Search size={13} strokeWidth={2} />
                <span className="font-body text-xs text-muted-foreground">
                  Search...
                </span>
              </button>

              {/* Search icon — mobile only */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={2} />
              </button>

              {/* User */}
              <button
                className="p-1.5 rounded-md hover:bg-accent transition-colors"
                aria-label="Account"
              >
                <User size={20} strokeWidth={2} />
              </button>

              {/* Wishlist */}
              <button
                className="p-1.5 rounded-md hover:bg-accent transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={2} />
              </button>

              {/* Bag */}
              <button
                className="p-1.5 rounded-md hover:bg-accent transition-colors"
                aria-label="Bag"
              >
                <ShoppingBag size={20} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── SPACER — pushes content below fixed navbar */}
      {/* <div className="h-14" /> */}

      {/* ── MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer panel */}
          <div className="absolute top-0 left-0 h-full w-72 bg-background flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-border">
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

            {/* Drawer nav links */}
            <div className="flex flex-col px-6 pt-6 gap-0">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-2xl tracking-widest text-foreground hover:text-muted-foreground transition-colors py-4 border-b border-border/40 uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Drawer bottom links */}
            <div className="mt-auto px-6 pb-10 flex flex-col gap-4">
              <Link
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Account
              </Link>
              <Link
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link
                href="#"
                className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
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
