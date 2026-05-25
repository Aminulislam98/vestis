"use client";
import { useState } from "react";
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

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background w-full ">
        <div className="max-w-450 mx-auto px-3  md:px-8 lg:px-12">
          <div className="flex items-center h-16 relative">
            {/* ── LEFT ── Hamburger + Logo */}
            <div className="flex items-center gap-3 flex-1">
              {/* Hamburger — mobile only */}
              <button
                className="md:hidden p-2 rounded-md hover:bg-accent"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={25} strokeWidth={2.5} />
              </button>

              {/* Logo */}
              <Link
                href="/"
                className="font-heading text-2xl tracking-[0.25em] uppercase text-foreground"
              >
                Vestis
              </Link>
            </div>

            {/* ── CENTRE ── Women Men Kids — desktop only */}
            <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-base font-semibold text-foreground hover:text-foreground/60 transition-colors duration-200 tracking-widest uppercase"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* ── RIGHT ── Search + Icons */}
            <div className="flex items-center gap-1 flex-1 justify-end">
              {/* Search bar — desktop only */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 h-9 w-40 px-3 rounded-md border border-border bg-muted text-muted-foreground hover:border-foreground/30 transition-colors mr-3"
                aria-label="Open search"
              >
                <Search size={14} strokeWidth={1.75} />
                <span className="font-body text-xs text-muted-foreground">
                  Search...
                </span>
              </button>

              {/* Search icon — mobile only */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-accent"
                aria-label="Search"
              >
                <Search size={25} strokeWidth={2.5} />
              </button>

              <button
                className="p-2 rounded-md hover:bg-accent"
                aria-label="Account"
              >
                <User size={25} strokeWidth={2.5} />
              </button>

              <button
                className="p-2 rounded-md hover:bg-accent"
                aria-label="Wishlist"
              >
                <Heart size={25} strokeWidth={2.5} />
              </button>

              <button
                className="p-2 rounded-md hover:bg-accent"
                aria-label="Bag"
              >
                <ShoppingBag size={25} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute top-0 left-0 h-full w-72 bg-background flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-border">
              <Link
                href="/"
                className="font-heading text-xl tracking-[0.25em] uppercase text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vestis
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-accent"
                aria-label="Close menu"
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>

            {/* Drawer nav links */}
            <div className="flex flex-col px-6 pt-8 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-3xl tracking-widest text-foreground hover:text-foreground/60 transition-colors duration-200 py-4 border-b border-border/40 uppercase"
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
