"use client";
import { useState } from "react";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard from "../product/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";

const womenCategories = [
  { label: "Tops & T-Shirts", value: "tops" },
  { label: "Hoodies & Sweatshirts", value: "hoodies" },
  { label: "Dresses", value: "dresses" },
  { label: "Trousers", value: "trousers" },
  { label: "Skirts", value: "skirts" },
  { label: "Jackets", value: "jackets" },
  { label: "Co-ords", value: "coords" },
  { label: "Bodysuits", value: "bodysuits" },
];

const menCategories = [
  { label: "T-Shirts & Vests", value: "tshirts" },
  { label: "Hoodies & Sweatshirts", value: "hoodies" },
  { label: "Joggers & Trousers", value: "joggers" },
  { label: "Shorts", value: "shorts" },
  { label: "Jackets", value: "jackets" },
  { label: "Tracksuits", value: "tracksuits" },
];

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
];

function SidebarContent({ categories, activeCategory, setActiveCategory }) {
  return (
    <div className="flex flex-col py-3">
      {activeCategory && (
        <div className="pb-4 border-b border-border mb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className="font-body text-base font-semibold text-red-500 hover:text-red-700 underline underline-offset-2 transition-colors"
          >
            Clear Filter
          </button>
        </div>
      )}

      <p className="font-body text-base font-semibold text-foreground py-4 uppercase tracking-wide">
        Category
      </p>

      <ul className="flex flex-col">
        {categories.map((cat) => (
          <li key={cat.value}>
            <button
              onClick={() =>
                setActiveCategory(
                  activeCategory === cat.value ? null : cat.value,
                )
              }
              className={`
                w-full text-left font-body py-2 pl-2 border-l-2 transition-colors text-base
                ${
                  activeCategory === cat.value
                    ? "border-foreground text-foreground font-semibold"
                    : "border-transparent text-muted-foreground font-normal hover:text-foreground hover:border-border"
                }
              `}
            >
              {cat.value}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ProductsPageClient({ products, gender }) {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Featured");
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("subcategory");

  const setActiveCategory = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set("subcategory", value);
    else params.delete("category");
    router.push(`?${params.toString()}`);
  };

  const categories =
    gender?.toLowerCase() === "mens" ? menCategories : womenCategories;

  return (
    // ── OUTER WRAPPER — no overflow, no min-h-screen
    <div className="w-full xl:max-w-457.5 mx-auto min-h-screen bg-background">
      {/* ── PAGE HEADER */}
      <div className="w-full px-4 md:px-8 lg:px-12 pt-4 pb-2">
        <h1
          className="font-heading text-foreground tracking-wide"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
        >
          {`${gender} CLOTHING`}
          <span
            className="font-body font-normal text-muted-foreground ml-3"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}
          >
            ({products.length})
          </span>
        </h1>
      </div>

      {/* ── TOP BAR
          MUST be outside the flex row (sidebar + grid)
          sticky top-0 — sticks right below navbar which is also sticky top-0 */}
      <div className="sticky top-0 z-30 w-full px-4 md:px-8 lg:px-12 py-3 bg-background border-b border-border flex items-center justify-between">
        {/* Filter toggle */}
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
            <div className="absolute right-0 top-8 z-30 bg-background border border-border w-52 shadow-sm">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setActiveSort(option);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-body text-base transition-colors hover:bg-accent ${
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

      {/* ── MAIN CONTENT — sidebar + grid side by side
          topbar এর নিচে, flex row */}
      <div className="w-full sm:px-4 md:px-8 lg:px-12 flex gap-8 min-h-screen">
        {/* ── DESKTOP SIDEBAR */}
        {filtersVisible && (
          <aside className="hidden xl:block w-56 shrink-0">
            {/* sidebar sticky — top = navbar + topbar height */}
            <div className="sticky top-[97px] overflow-y-auto max-h-[calc(100vh-97px)] pr-1">
              <SidebarContent
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          </aside>
        )}

        {/* ── MOBILE FILTER DRAWER */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileFilterOpen(false)}
            />
            <div className="absolute top-0 left-0 h-full w-full bg-background flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-5 h-14 border-b border-border sticky top-0 bg-background z-10">
                <span className="font-body text-base font-semibold text-foreground">
                  Filters
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  aria-label="Close filters"
                  className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-accent transition-colors"
                >
                  <X size={22} strokeWidth={2} className="text-foreground" />
                </button>
              </div>
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

        {/* ── PRODUCT GRID */}
        <div className="flex-1 min-w-0 py-4">
          <div
            className={`grid grid-cols-2 gap-2 sm:gap-x-4 gap-y-8 ${
              filtersVisible
                ? "lg:grid-cols-3 xl:grid-cols-3"
                : "lg:grid-cols-4 xl:grid-cols-4"
            }`}
          >
            {products.map((product) => (
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
