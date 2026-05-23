"use client";
import { useState } from "react";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import SearchModal from "./SearchModal";
import Link from "next/link";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex items-center h-16 px-4 md:px-8 gap-3">
          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-accent"
            aria-label="Open menu"
          >
            <Menu size={25} strokeWidth={2.5} />
          </button>

          {/* website Logo */}
          <Link
            href={"/"}
            className="font-logo text-2xl font-semibold tracking-[0.25em] uppercase"
          >
            Vestis
          </Link>

          {/* Search bar — desktop only */}
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex flex-1 items-center gap-2 h-9 px-3 rounded-md border border-border bg-muted text-muted-foreground text-sm hover:border-foreground/30 transition-colors"
            aria-label="Open search"
          >
            <Search size={15} strokeWidth={1.75} />
            <span>Search for products...</span>
          </button>

          {/* Right icons */}
          <div className="flex items-center gap-1 ml-auto md:ml-0">
            {/* Search icon — mobile only */}
            <button
              onClick={() => setSearchOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
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

            <button className="p-2 rounded-md hover:bg-accent" aria-label="Bag">
              <ShoppingBag size={25} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </nav>
  );
}
