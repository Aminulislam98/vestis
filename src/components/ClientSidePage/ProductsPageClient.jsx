"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard from "../product/ProductCard";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS — category lists & sort options
//
// 💡 EXTRACT CANDIDATE → lib/constants/products.js  (or constants/filters.js)
//    Move `womenCategories`, `menCategories`, and `sortOptions` there.
//    Then import them in any page that needs filtering/sorting.
//    Nothing else needed — they are plain arrays with no dependencies.
// ─────────────────────────────────────────────────────────────────────────────

// Categories shown in the sidebar — conditional on the `gender` prop
// Add / remove category labels here as the catalogue grows
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

// Sort options shown in the top-bar dropdown
// TODO: wire each option to actual sort logic (re-order array or router query param)
const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
];

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT CARD COMPONENT
//
// 💡 EXTRACT CANDIDATE → components/products/ProductCard.jsx
//    Move the entire `ProductCard` function (below) to its own file.
//    What to take with it:
//      • The `ProductCard` function itself
//      • No extra imports needed beyond: Image, Link (next)
//    Props it receives:   { product }
//    Product fields used: slug, images[0], name, brand, isOnSale, salePrice, price
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR CONTENT COMPONENT
//
// 💡 EXTRACT CANDIDATE → components/products/FilterSidebar.jsx
//    Move the entire `SidebarContent` function (below) to its own file.
//    What to take with it:
//      • The `SidebarContent` function itself
//    Props it receives:   { categories, activeCategory, setActiveCategory }
//    What stays here:     The <aside> wrapper + mobile drawer shell — those
//                         are layout concerns that belong in the page component.
//
//    When you add more filter types (Size, Fit, Sale toggle, Brand):
//    create a separate FilterSection component and compose them inside here.
// ─────────────────────────────────────────────────────────────────────────────
function SidebarContent({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-col bg-red-400">
      {/* Clear filter button — only rendered when a category is actively selected */}
      {activeCategory && (
        <div className="pb-4 border-b border-zinc-200 mb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className="font-body text-base md:text-base font-semibold text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Category filter heading */}
      <p className="font-body text-xl md:text-base font-semibold text-black py-4">
        Category
      </p>

      {/* Category list — single select
          Active  → bold text + solid black left border (2px)
          Default → normal weight + transparent border
          Hover   → zinc-600 text + zinc-400 border
          Clicking the already-active category deselects it (toggle) */}
      <ul className="flex flex-col gap-0.5">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`
                w-full text-left font-body py-2.5 pl-2 md:py-2  border-l-2 transition-colors
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

      {/* ── ADD MORE FILTER SECTIONS HERE
          e.g. <SizeFilter />, <FitFilter />, <BrandFilter />, <SaleToggle />
          Each should be its own small component accepting value + onChange props */}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SORT DROPDOWN COMPONENT
//
// 💡 EXTRACT CANDIDATE → components/products/SortDropdown.jsx
//    Move the sort dropdown JSX block (below) to its own file.
//    What to take with it:
//      • The sort dropdown div + button + options list
//      • `sortOptions` constant (or import from lib/constants/products.js)
//      • ChevronDown import from lucide-react
//    Props it receives:   { activeSort, sortOpen, setSortOpen, setActiveSort }
//    What stays here:     Just <SortDropdown ... /> in the top bar
// ─────────────────────────────────────────────────────────────────────────────
// (Sort dropdown is currently inlined in the top bar below for simplicity.
//  Extract it when the top-bar section grows or needs reuse on other pages.)

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT — ProductsPageClient
//
// Responsibilities:
//   • Owns all filter/sort UI state
//   • Controls sidebar visibility (desktop collapse + mobile drawer)
//   • Renders: page header → top bar → sidebar → product grid
//
// This component is intentionally kept as the orchestrator.
// The heavy UI pieces (ProductCard, SidebarContent) are already separated above.
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductsPageClient({ products, gender }) {
  // Sidebar visibility — desktop: collapses aside panel; mobile: opens drawer
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sort dropdown open/close state + currently selected sort label
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Featured");

  // Active category filter — null means no filter applied
  // TODO: when wiring to the server, push this value as a URL query param
  //       so the page fetches pre-filtered products from the DB
  const [activeCategory, setActiveCategory] = useState(null);

  // Pick the correct category list based on which gender page we're on
  const categories =
    gender?.toLowerCase() === "men" ? menCategories : womenCategories;

  return (
    <div className="w-full xl:max-w-457.5 mx-auto min-h-screen bg-background">
      {/* ── PAGE HEADER
          Shows gender label + total product count
          Font size uses clamp() so it scales between mobile and wide desktop */}
      <div className="w-full px-3 md:px-8 lg:px-12 pt-2 ">
        <h1
          className="font-heading text-foreground tracking-wide"
          style={{ fontSize: "clamp(1.5rem, 3vw, 1.5rem)" }}
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

      {/* ── TOP BAR — sticky below the site navbar (top-16)
          Left:  "Hide / Show Filters" toggle button
          Right: "Sort By" dropdown
          z-30 keeps it above product cards but below any modals/drawers */}
      <div className="sticky top-16 z-30 w-full px-4 md:px-8 lg:px-12 py-3 bg-background flex items-center justify-between ">
        {/* Filter toggle — on desktop collapses the sidebar aside;
            on mobile opens the drawer (both states share one boolean pair) */}
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

        {/* 💡 EXTRACT CANDIDATE: move this sort dropdown block to SortDropdown.jsx
            Props needed: activeSort, sortOpen, setSortOpen, setActiveSort, sortOptions */}
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

          {/* Dropdown panel — absolute positioned below the trigger button */}
          {sortOpen && (
            <div className="absolute right-0 top-10 z-30 bg-background border border-border w-56 shadow-sm">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActiveSort(option);
                    setSortOpen(false);
                    // TODO: wire sort to re-order `products` or push router query param
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

      {/* ── MAIN CONTENT AREA — sidebar + product grid side by side */}
      <div className="w-full sm:px-4 md:px-8 lg:px-12 flex gap-8 ">
        {/* DESKTOP SIDEBAR — hidden below xl breakpoint
            sticky top-32 keeps it in view while the grid scrolls
            When filtersVisible=false this aside is completely removed from layout */}
        {filtersVisible && (
          <aside className="hidden xl:block w-60 shrink-0">
            <div className="sticky top-32 overflow-y-auto max-h-[calc(100vh-8rem)] pr-1">
              <SidebarContent
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </aside>
        )}

        {/* MOBILE FILTER DRAWER — only rendered on small screens (md:hidden)
            Fixed full-screen overlay: backdrop (left) + drawer panel (right)
            Clicking the backdrop also closes the drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden ">
            {/* Semi-transparent backdrop — click closes the drawer */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFilterOpen(false)}
            />

            {/* Drawer panel — slides in from the left edge */}
            <div className="absolute top-0 left-0 h-full w-full bg-background flex flex-col overflow-y-auto ">
              {/* Drawer header — sticky so it stays visible when filter list scrolls */}
              <div className="flex items-center justify-between px-5 h-16 border-b border-border sticky top-0 bg-background z-10">
                <span className="font-body text-xl font-semibold text-black">
                  Filters
                </span>
                {/* Close button — w-12 h-12 gives a large tap target on mobile */}
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                  className="w-12 h-12 flex items-center justify-center rounded-md hover:bg-zinc-100 transition-colors"
                >
                  <X size={26} strokeWidth={2} className="text-black" />
                </button>
              </div>

              {/* Drawer body — same SidebarContent reused from desktop */}
              <div className="px-5 py-4">
                <SidebarContent
                  categories={categories}
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                />
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT GRID
            Always 2 cols on mobile, 3 cols on desktop.
            Hiding the sidebar makes each card wider — not more columns.
            flex-1 min-w-0 prevents grid overflow when sidebar is visible */}
        <div className="flex-1 min-w-0">
          <div
            className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2  gap-2 sm:gap-x-4 gap-y-8 ${filtersVisible ? "lg:grid-cols-3 xl:grid-cols-3" : "lg:grid-cols-4 xl:grid-cols-4"}`}
          >
            {products.map((product) => (
              /* ProductCard is its own component — see extraction note above */
              <ProductCard
                key={product._id ?? product.slug}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
