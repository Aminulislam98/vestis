"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";

// ─────────────────────────────────────────────
// CATEGORIES — conditional by gender
// Add / remove items here as needed
// ─────────────────────────────────────────────
const womenCategories = [
  "Tops & T-Shirts",
  "Hoodies & Sweatshirts",
  "Dresses",
  "Trousers",
  "Skirts",
  "Jackets",
  "Co-ords",
  "Bodysuits",
];

const menCategories = [
  "T-Shirts & Vests",
  "Hoodies & Sweatshirts",
  "Joggers & Trousers",
  "Shorts",
  "Jackets",
  "Tracksuits",
];

// ─────────────────────────────────────────────
// SORT OPTIONS — add / remove as needed
// ─────────────────────────────────────────────
const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
];

export default function ProductsPageClient({ products, gender }) {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Featured");

  // ── Category filter state
  // null = nothing selected, string = selected category
  // Click same category again → deselects (back to null)
  // Wire setActiveCategory to router.push() later for server filtering
  const [activeCategory, setActiveCategory] = useState(null);

  // ── Gender-conditional category list
  const categories =
    gender?.toLowerCase() === "men" ? menCategories : womenCategories;

  // ─────────────────────────────────────────────
  // SIDEBAR CONTENT — shared by desktop + mobile
  // ─────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col">
      {/* Clear — only visible when a category is active */}
      {activeCategory && (
        <div className="pb-4 border-b border-zinc-200 mb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className="font-body text-base md:text-sm font-semibold text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* ── CATEGORY LIST
          Single select — one active at a time
          Active  → bold + solid left black border
          Default → normal weight, transparent border
          Hover   → zinc-600 text + zinc-400 border
          Text    → text-lg mobile / text-base desktop
      */}
      <p className="font-body text-xl md:text-base font-semibold text-black py-4">
        Category
      </p>
      <ul className="flex flex-col gap-0.5">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() =>
                // toggle: click active category → deselect
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`
                w-full text-left font-body py-2.5 md:py-2 pl-3 border-l-2 transition-colors
                text-lg md:text-base
                ${
                  activeCategory === cat
                    ? "border-black text-black font-semibold"
                    : "border-transparent text-black font-normal hover:text-zinc-600 hover:border-zinc-400"
                }
              `}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>

      {/* ── ADD MORE FILTERS HERE LATER
          e.g. Size, Colour, Fit, Sale, Collections
          Each will be its own FilterSection component
      */}
    </div>
  );

  return (
    <div className="w-full 2xl:px-80 min-h-screen bg-background">
      {/* Page header */}
      <div className="w-full px-4 md:px-8 lg:px-12 pt-5 pb-4">
        <h1
          className="font-heading text-foreground tracking-wide"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {`${gender} CLOTHING`}
          <span
            className="font-body font-normal text-muted-foreground ml-3"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
          >
            ({products.length})
          </span>
        </h1>
      </div>

      {/* Top bar — sticky */}
      <div className="sticky top-16 z-30 w-full px-4 md:px-8 lg:px-12 py-3  bg-background flex items-center justify-between">
        {/* Toggle sidebar — desktop / opens drawer on mobile */}
        <button
          onClick={() => {
            setFiltersVisible(!filtersVisible);
            setMobileFilterOpen(!mobileFilterOpen);
          }}
          className="flex items-center gap-2 font-body text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          <SlidersHorizontal size={20} strokeWidth={1.75} />
          {filtersVisible ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 font-body text-base font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Sort By: {activeSort}
            <ChevronDown
              size={20}
              strokeWidth={1.75}
              className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
            />
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-10 z-30 bg-background border border-border w-56 shadow-sm">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActiveSort(option);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 font-body text-base transition-colors hover:bg-accent ${
                    activeSort === option
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="w-full sm:px-4 md:px-8 lg:px-12 flex gap-8 mt-6">
        {/* Desktop sidebar — w-44 narrow so product grid gets more room */}
        {filtersVisible && (
          <aside className="hidden md:block w-44 shrink-0">
            <div className="sticky top-32 overflow-y-auto max-h-[calc(100vh-8rem)] pr-1">
              <SidebarContent />
            </div>
          </aside>
        )}

        {/* Mobile filter drawer — slides in from left */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop — click to close */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFilterOpen(false)}
            />
            {/* Drawer panel */}
            <div className="absolute top-0 left-0 h-full w-80 bg-background flex flex-col overflow-y-auto">
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-border sticky top-0 bg-background z-10">
                <span className="font-body text-xl font-semibold text-black">
                  Filters
                </span>
                {/* Close button — w-12 h-12 large tap target, X size 26 clearly visible */}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                  className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-zinc-100 transition-colors"
                >
                  <X size={26} strokeWidth={2} className="text-black" />
                </button>
              </div>
              {/* Drawer body */}
              <div className="px-5 py-4">
                <SidebarContent />
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {/* Always 2 cols mobile, 3 cols desktop — same as Nike
              Sidebar hiding makes each card bigger, not more columns */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-x-2 gap-y-8">
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group block"
              >
                {/* Product image
                    Mobile  → aspect-[3/4] tall portrait, good for small screens
                    Desktop → aspect-[2/3] slightly less tall, less vertical space wasted
                    object-top keeps face/clothing visible, never crops the top
                */}
                {/* aspect-square matches Nike's 592x592 square image format
                    object-top keeps clothing/face in frame, never crops top */}
                <div className="relative overflow-hidden aspect-4/5 md:aspect-square bg-muted">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="md:object-cover object-contain md:object-top transition-transform duration-500 group-hover:scale-105"
                    quality={90}
                    priority
                  />
                </div>

                {/* Product info
                    Fixed Tailwind sizes — no clamp, consistent across all cards
                    Mobile  → slightly larger for readability
                    Desktop → tighter since more cards fit per row
                */}
                <div className="pt-2.5 px-1 pb-1">
                  {/* Badge — Sale red / Just In orange */}
                  {product.badge && (
                    <p
                      className={`font-body text-xs font-semibold mb-1 ${
                        product.badge === "Sale"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                    >
                      {product.badge}
                    </p>
                  )}
                  {/* Product name */}
                  <p className="font-body text-base 2xl:text-xl font-semibold text-foreground leading-snug">
                    {product.name}
                  </p>
                  {/* Subtitle */}
                  <p className="font-body text-base text-muted-foreground mt-0.5">
                    {product.subtitle}
                  </p>
                  {/* Price */}
                  <div className="flex items-center gap-2 mt-1.5">
                    {product.originalPrice ? (
                      <>
                        {/* Sale price — red */}
                        <span className="font-price text-sm font-bold text-red-500">
                          £{product.price.toFixed(2)}
                        </span>
                        {/* Original price — strikethrough */}
                        <span className="font-price text-sm text-muted-foreground line-through">
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-price text-sm font-bold text-foreground">
                        £{product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
