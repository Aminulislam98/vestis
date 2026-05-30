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
import useCartStore from "@/store/cartStore";
import { getGuestId } from "@/lib/guestId";
import { authClient } from "@/lib/auth-client";

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
  const { cartCount, setCartCount } = useCartStore();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const { data: session, isPending } = authClient.useSession();

  // ── Hide navbar on scroll down
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

  // ── Active link check
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

  // ── Fetch cart count on session change
  useEffect(() => {
    const fetchCount = async () => {
      if (isPending) return;
      let url;
      if (session?.user?.id) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cart?userId=${session.user.id}`;
      } else {
        const guestId = getGuestId();
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cart?guestId=${guestId}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const totalQuantity = data.items.reduce(
          (acc, item) => acc + (item.quantity || 0),
          0,
        );
        setCartCount(totalQuantity);
      } else {
        setCartCount(0);
      }
    };
    fetchCount();
  }, [isPending, session?.user?.id]);

  // ── Merge guest cart on Google login
  useEffect(() => {
    if (isPending) return;
    if (!session?.user?.id) return;
    const guestId = localStorage.getItem("vestis-guest-id");
    if (!guestId) return;
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart/merge`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ guestId, userId: session.user.id }),
    }).then(() => {
      localStorage.removeItem("vestis-guest-id");
    });
  }, [isPending, session?.user?.id]);

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
        <div className="max-w-[1900px] w-full mx-auto px-4  ">
          <div className="flex items-center h-14 relative">
            {/* ── LEFT — Hamburger + Logo */}
            <div className="flex items-center gap-2 flex-1">
              <button
                className="md:hidden rounded-md hover:bg-accent transition-colors"
                aria-label="Open menu"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={22} strokeWidth={2} />
              </button>
              <Link
                href="/"
                className=" font-semibold text-2xl flex items-center justify-center "
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
                    relative font-body text-base font-semibold 
                    transition-colors duration-200 py-1 group
                    ${isActive(link.href) ? "text-foreground" : "text-foreground hover:opacity-60"}
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
              {/* ── Search — desktop */}
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 h-8 w-36 px-3 mr-2
                  rounded-lg bg-accent text-muted-foreground
                  hover:bg-accent/80 transition-colors duration-200 border"
                aria-label="Open search"
              >
                <Search
                  size={18}
                  strokeWidth={1.75}
                  className="text-foreground"
                />
                <span className="font-body text-sm font-semibold text-foreground">
                  Search...
                </span>
              </button>

              {/* ── Search — mobile */}
              <button
                onClick={() => setSearchOpen(true)}
                className="lg:hidden p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={2} />
              </button>

              {/* ── Account — logged in → /account, not logged in → /signin */}
              <Link
                href={"/account"}
                className="p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Account"
              >
                <User size={20} strokeWidth={2} />
              </Link>

              {/* ── Wishlist */}
              <Link
                href={"/wishlist"}
                className="p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={2} />
              </Link>

              {/* ── Bag — with count badge */}
              <Link
                href="/bag"
                className="relative p-1.5 rounded-md hover:bg-accent transition-colors duration-200"
                aria-label="Bag"
              >
                <ShoppingBag size={20} strokeWidth={2} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
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
            {/* ── Drawer header */}
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

            {/* ── Nav links */}
            <div className="flex flex-col overflow-y-auto flex-1 px-6 mt-5">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <button
                    onClick={() =>
                      setExpandedLink(
                        expandedLink === link.label ? null : link.label,
                      )
                    }
                    className="w-full flex items-center justify-between py-1"
                  >
                    <span
                      className="text-left font-semibold text-foreground"
                      style={{ fontSize: "clamp(1.2rem, 5vw, 2rem)" }}
                    >
                      {link.label}
                    </span>
                    {link.subcategories.length > 0 && (
                      <ChevronDown
                        size={25}
                        strokeWidth={2}
                        className={`text-muted-foreground transition-transform duration-200 shrink-0
                          ${expandedLink === link.label ? "rotate-180" : ""}`}
                      />
                    )}
                  </button>

                  {expandedLink === link.label &&
                    link.subcategories.length > 0 && (
                      <div className="flex flex-col pb-4 gap-0">
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="font-body text-xl font-semibold text-foreground py-2.5 border-b border-border/20 hover:text-muted-foreground transition-colors"
                        >
                          View All {link.label}
                        </Link>
                        {link.subcategories.map((sub) => (
                          <Link
                            key={sub.value}
                            href={`${link.href}&subcategory=${sub.value}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-body text-xl text-muted-foreground hover:text-foreground py-2.5 border-b border-border/20 transition-colors last:border-0"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {/* ── Bottom links — conditional on session */}
            <div className="px-6 pb-10 pt-6 flex flex-col gap-4 border-t border-border shrink-0">
              {session?.user ? (
                // ── Logged in
                <Link
                  href="/account"
                  className="font-body text-base font-semibold text-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>
              ) : (
                // ── Not logged in
                <>
                  <Link
                    href="/signin"
                    className="font-body text-base font-semibold text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="font-body text-base font-semibold text-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Create Account
                  </Link>
                </>
              )}

              {/* ── Track Order — always visible */}
              <Link
                href="/track-order"
                className="font-body text-base font-semibold text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
              </Link>

              <Link
                href="#"
                className="font-body text-base font-semibold text-foreground"
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
