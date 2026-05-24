"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";

// const products = [
//   {
//     id: 1,
//     name: "Studio Fleece Oversized Crew",
//     subtitle: "Women's Oversized Crew",
//     price: 49.99,
//     originalPrice: null,
//     slug: "studio-fleece-oversized-crew",
//     badge: "Just In",
//     image:
//       "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=90",
//   },
//   {
//     id: 2,
//     name: "Oversized Pullover Hoodie",
//     subtitle: "Women's Pullover Hoodie",
//     price: 54.99,
//     originalPrice: null,
//     slug: "oversized-pullover-hoodie",
//     badge: "Just In",
//     image:
//       "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=90",
//   },
//   {
//     id: 3,
//     name: "High-Rise Cuffed Trousers",
//     subtitle: "Women's High-Rise Trousers",
//     price: 54.99,
//     originalPrice: 74.99,
//     slug: "high-rise-cuffed-trousers",
//     badge: "Just In",
//     image:
//       "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=90",
//   },
//   {
//     id: 4,
//     name: "Floral Wrap Dress",
//     subtitle: "Women's Wrap Dress",
//     price: 39.99,
//     originalPrice: 59.99,
//     slug: "floral-wrap-dress",
//     badge: null,
//     image:
//       "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=90",
//   },
//   {
//     id: 5,
//     name: "White Linen Blouse",
//     subtitle: "Women's Linen Top",
//     price: 24.99,
//     originalPrice: null,
//     slug: "white-linen-blouse",
//     badge: null,
//     image:
//       "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=90",
//   },
//   {
//     id: 6,
//     name: "Black Slip Dress",
//     subtitle: "Women's Slip Dress",
//     price: 29.99,
//     originalPrice: null,
//     slug: "black-slip-dress",
//     badge: "Sale",
//     image:
//       "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=90",
//   },
//   {
//     id: 7,
//     name: "Cream Knit Cardigan",
//     subtitle: "Women's Knit Cardigan",
//     price: 32.99,
//     originalPrice: null,
//     slug: "cream-knit-cardigan",
//     badge: null,
//     image:
//       "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=90",
//   },
//   {
//     id: 8,
//     name: "Stripe Co-ord Set",
//     subtitle: "Women's Co-ord",
//     price: 44.99,
//     originalPrice: 64.99,
//     slug: "stripe-co-ord-set",
//     badge: null,
//     image:
//       "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=90",
//   },
//   {
//     id: 9,
//     name: "Rust Crop Jacket",
//     subtitle: "Women's Crop Jacket",
//     price: 54.99,
//     originalPrice: 74.99,
//     slug: "rust-crop-jacket",
//     badge: "Sale",
//     image:
//       "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=90",
//   },
//   {
//     id: 10,
//     name: "Denim Mini Skirt",
//     subtitle: "Women's Mini Skirt",
//     price: 22.99,
//     originalPrice: 34.99,
//     slug: "denim-mini-skirt",
//     badge: null,
//     image:
//       "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=90",
//   },
//   {
//     id: 11,
//     name: "Beige Wide Leg Trousers",
//     subtitle: "Women's Wide Leg",
//     price: 34.99,
//     originalPrice: null,
//     slug: "beige-wide-leg-trousers",
//     badge: "Just In",
//     image:
//       "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=90",
//   },
//   {
//     id: 12,
//     name: "Summer Oversized Tee",
//     subtitle: "Women's T-Shirt",
//     price: 18.99,
//     originalPrice: null,
//     slug: "summer-oversized-tee",
//     badge: null,
//     image:
//       "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=90",
//   },
// ];

const filterCategories = [
  "Tops & T-Shirts",
  "Hoodies & Sweatshirts",
  "Shorts",
  "Trousers & Tights",
  "Jackets",
  "Tracksuits",
  "Skirts & Dresses",
  "Bodysuits",
];

const accordionFilters = [
  "Shop By Price",
  "Sale & Offers",
  "Size",
  "Colour",
  "Brand",
  "Fit",
  "Collections",
];

const sortOptions = [
  "Featured",
  "Price: Low to High",
  "Price: High to Low",
  "Newest First",
];

export default function ProductsPageClient({ products }) {
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeSort, setActiveSort] = useState("Featured");
  const [openFilter, setOpenFilter] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-background">
      {/* ── Page header */}
      <div className="w-full px-4 md:px-8 lg:px-12 pt-5 pb-4">
        <h1
          className="font-heading text-foreground tracking-wide"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          WOMEN'S CLOTHING
          <span
            className="font-body font-normal text-muted-foreground ml-3"
            style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}
          >
            ({products.length})
          </span>
        </h1>
      </div>

      {/* ── Top bar — sticky */}
      <div className="sticky top-16 z-30 w-full px-4 md:px-8 lg:px-12 py-3 border-y border-border bg-background flex items-center justify-between">
        {/* Filter toggle */}
        <button
          onClick={() => {
            setFiltersVisible(!filtersVisible);
            setMobileFilterOpen(!mobileFilterOpen);
          }}
          className="flex items-center gap-2 font-body text-foreground hover:text-muted-foreground transition-colors"
          style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
        >
          <SlidersHorizontal size={18} strokeWidth={1.75} />
          {filtersVisible ? "Hide Filters" : "Show Filters"}
        </button>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center gap-2 font-body font-medium text-foreground hover:text-muted-foreground transition-colors"
            style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
          >
            Sort By: {activeSort}
            <ChevronDown
              size={18}
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
                  className={`w-full text-left px-5 py-3 font-body transition-colors hover:bg-accent ${
                    activeSort === option
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  }`}
                  style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Main content */}
      <div className="w-full sm:px-4 md:px-8 lg:px-12 flex gap-8 mt-6">
        {/* ── LEFT SIDEBAR — sticky desktop */}
        {filtersVisible && (
          <aside className="hidden md:flex flex-col w-52 lg:w-60 shrink-0">
            <div className="sticky top-32 overflow-y-auto max-h-[calc(100vh-8rem)]">
              {/* Category links */}
              <ul className="flex flex-col gap-4 mb-8">
                {filterCategories.map((cat) => (
                  <li key={cat}>
                    <button
                      className="font-body text-foreground hover:text-muted-foreground transition-colors text-left"
                      style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="border-t border-border mb-2" />

              {/* Accordion filters */}
              <div className="flex flex-col">
                {accordionFilters.map((filter) => (
                  <div key={filter} className="border-b border-border">
                    <button
                      onClick={() =>
                        setOpenFilter(openFilter === filter ? null : filter)
                      }
                      className="w-full flex items-center justify-between py-3 font-body font-medium text-foreground hover:text-muted-foreground transition-colors"
                      style={{ fontSize: "clamp(0.875rem, 1.1vw, 1rem)" }}
                    >
                      {filter}
                      <ChevronDown
                        size={16}
                        strokeWidth={1.75}
                        className={`transition-transform duration-200 ${
                          openFilter === filter ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openFilter === filter && (
                      <div className="pb-4">
                        <p
                          className="font-body text-muted-foreground"
                          style={{ fontSize: "clamp(0.8rem, 1vw, 0.9rem)" }}
                        >
                          Filter options coming soon
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
            <div className="absolute top-0 left-0 h-full w-72 bg-background flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-6 h-14 border-b border-border sticky top-0 bg-background">
                <span className="font-body text-base font-semibold text-foreground">
                  Filters
                </span>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 hover:bg-accent rounded-md"
                >
                  <X size={18} strokeWidth={1.75} />
                </button>
              </div>

              <div className="px-6 py-4">
                <ul className="flex flex-col gap-4">
                  {filterCategories.map((cat) => (
                    <li key={cat}>
                      <button className="font-body text-base text-foreground hover:text-muted-foreground transition-colors text-left">
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border mx-6" />

              <div className="px-6 flex flex-col">
                {accordionFilters.map((filter) => (
                  <div key={filter} className="border-b border-border">
                    <button
                      onClick={() =>
                        setOpenFilter(openFilter === filter ? null : filter)
                      }
                      className="w-full flex items-center justify-between py-3 font-body text-base font-medium text-foreground"
                    >
                      {filter}
                      <ChevronDown
                        size={16}
                        strokeWidth={1.75}
                        className={`transition-transform duration-200 ${
                          openFilter === filter ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {openFilter === filter && (
                      <div className="pb-4">
                        <p className="font-body text-sm text-muted-foreground">
                          Filter options coming soon
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PRODUCT GRID */}
        <div className="flex-1 min-w-0">
          <div
            className={`grid gap-x-1 gap-y-10 ${
              filtersVisible
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            }`}
          >
            {products.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="group block"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    quality={90}
                    priority
                  />
                </div>

                {/* Info */}
                <div className="pt-3 px-2.5 pb-1">
                  {/* Badge */}
                  {product.badge && (
                    <p
                      className={`font-body font-semibold mb-1 ${
                        product.badge === "Sale"
                          ? "text-red-500"
                          : "text-orange-500"
                      }`}
                      style={{ fontSize: "clamp(1rem, 1vw, 0.95rem)" }}
                    >
                      {product.badge}
                    </p>
                  )}

                  {/* Product name */}
                  <p
                    className="font-body font-semibold text-foreground leading-snug"
                    style={{ fontSize: "clamp(1rem, 1.2vw, 1.1rem)" }}
                  >
                    {product.name}
                  </p>

                  {/* Subtitle */}
                  <p
                    className="font-body text-muted-foreground mt-0.5"
                    style={{ fontSize: "clamp(0.9rem, 1vw, 0.95rem)" }}
                  >
                    {product.subtitle}
                  </p>

                  {/* Price */}
                  <div className="flex items-center gap-2 mt-1.5">
                    {product.originalPrice ? (
                      <>
                        <span
                          className="font-price font-bold text-red-500"
                          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                        >
                          £{product.price.toFixed(2)}
                        </span>
                        <span
                          className="font-price text-muted-foreground line-through"
                          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                        >
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span
                        className="font-price font-bold text-foreground"
                        style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)" }}
                      >
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
