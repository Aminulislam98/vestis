"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import Image from "next/image";

export default function SearchModal({ open, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(searchInput, 300);

  // ── Auto focus when modal opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setSearchInput("");
  }, [open]);

  // ── Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // ── Fetch suggestions when debounced search changes
  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 1) {
      setResults([]);
      return;
    }
    const getResults = async () => {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/products?search=${debouncedSearch}&limit=8`,
      );
      const data = await res.json();
      setResults(data.data);
      setLoading(false);
    };
    getResults();
  }, [debouncedSearch]);

  // ── Navigate and close
  const handleNavigate = (href) => {
    router.push(href);
    onClose();
  };

  // ── Clear input
  const handleClear = () => {
    setSearchInput("");
    setResults([]);
    inputRef.current?.focus();
  };

  // ── Enter key → products page
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      handleNavigate(`/products?search=${searchInput.trim()}`);
    }
  };

  // blocking scrolling when mobile modal open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-background flex flex-col
        transition-all duration-300 ease-in-out
        ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }
      `}
    >
      {/* ── TOP BAR */}
      <div className="w-full shrink-0 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          {/* ── Search pill
              focus-within → ring appears when input is focused
              transition → smooth ring animation */}
          <div
            className="
            flex items-center gap-2 flex-1 bg-accent rounded-xl px-4 h-11
            ring-1 ring-transparent focus-within:ring-foreground
            transition-all duration-200
          "
          >
            <Search
              size={18}
              strokeWidth={2}
              className="text-muted-foreground shrink-0"
            />
            <input
              ref={inputRef}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search VESTIS..."
              className="
                flex-1 bg-transparent outline-none border-none ring-0
                font-body text-foreground placeholder:text-muted-foreground
                text-base
              "
            />
            {/* Clear button */}
            {searchInput.length > 0 && (
              <button
                onClick={handleClear}
                className="shrink-0 w-5 h-5 rounded-full bg-muted-foreground/40 flex items-center justify-center hover:bg-muted-foreground/60 transition-colors"
              >
                <X size={11} strokeWidth={2.5} className="text-background" />
              </button>
            )}
          </div>

          {/* Cancel button */}
          <button
            onClick={onClose}
            className="font-body text-base text-foreground hover:text-muted-foreground transition-colors shrink-0"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ── DIVIDER */}
      <div className="h-px bg-border w-full shrink-0" />

      {/* ── RESULTS PANEL */}
      <div className="flex-1 overflow-y-auto hide-scrollbar">
        <div className="max-w-4xl mx-auto px-4 pb-8">
          {searchInput.length > 0 ? (
            <>
              {loading ? (
                // ── Skeleton loading
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-3">
                      <div className="w-20 sm:w-28 lg:w-32 aspect-[3/4] rounded-lg bg-accent animate-pulse shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-3 bg-accent animate-pulse rounded w-1/4" />
                        <div className="h-3 bg-accent animate-pulse rounded w-3/4" />
                        <div className="h-3 bg-accent animate-pulse rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length === 0 ? (
                // ── Empty state
                <div className="flex flex-col items-center justify-center pt-20 gap-3">
                  <Search
                    size={32}
                    strokeWidth={1.25}
                    className="text-muted-foreground"
                  />
                  <p className="font-body text-base text-muted-foreground">
                    No results for "{searchInput}"
                  </p>
                </div>
              ) : (
                <>
                  {/* ── Results header */}
                  <div className="flex items-center justify-between pt-5 pb-3">
                    <p className="font-body text-xs font-semibold text-muted-foreground tracking-widest uppercase">
                      Results
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {results.length} found
                    </p>
                  </div>

                  {/* ── GRID
                      Mobile:  1 col
                      Desktop: 2 col — 4 visible at once */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {results.map((product) => (
                      <button
                        key={product.slug}
                        onClick={() =>
                          handleNavigate(`/products/${product.slug}`)
                        }
                        className="flex items-start gap-4 py-4 border-b border-border/50 hover:opacity-60 transition-opacity w-full text-left"
                      >
                        {/* ── Product image — portrait ratio */}
                        <div className="relative w-20 sm:w-28 lg:w-32 shrink-0 bg-[#f6f6f6] rounded-lg overflow-hidden aspect-[3/4]">
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 80px, (max-width: 1024px) 112px, 128px"
                            className="object-cover object-center"
                          />
                        </div>

                        {/* ── Product info */}
                        <div className="flex flex-col gap-1 flex-1 min-w-0 pt-1">
                          {/* Brand */}
                          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            {product.brand}
                          </p>

                          {/* Name — clamp min 1.2rem max 1.3rem */}
                          <p
                            className="font-body font-medium text-foreground leading-snug line-clamp-2"
                            style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)" }}
                          >
                            {product.name}
                          </p>

                          {/* Price */}
                          <div className="flex items-center gap-2 mt-1">
                            {product.isOnSale && product.salePrice ? (
                              <>
                                <span
                                  className="font-body font-semibold text-red-500"
                                  style={{
                                    fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)",
                                  }}
                                >
                                  £{product.salePrice.toFixed(2)}
                                </span>
                                <span className="font-body text-xs text-muted-foreground line-through">
                                  £{product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span
                                className="font-body font-semibold text-foreground"
                                style={{
                                  fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)",
                                }}
                              >
                                £{product.price.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Out of stock */}
                          {product.totalStock === 0 && (
                            <p className="font-body text-xs text-red-500 mt-1">
                              Out of stock
                            </p>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* ── See all results */}
                  <button
                    onClick={() =>
                      handleNavigate(`/products?search=${searchInput.trim()}`)
                    }
                    className="w-full mt-6 py-3 border border-foreground font-body text-sm font-semibold text-foreground hover:bg-accent transition-colors"
                  >
                    See all results for "{searchInput}"
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {/* ── STATIC SUGGESTIONS */}
              <p className="font-body text-xs font-semibold text-muted-foreground tracking-widest uppercase pt-5 pb-2">
                Men
              </p>

              <button
                onClick={() => handleNavigate("/mens")}
                className="w-full flex items-center gap-4 py-3 hover:opacity-60 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Search
                    size={15}
                    strokeWidth={1.75}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="text-left">
                  <p
                    className="font-body font-medium text-foreground"
                    style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)" }}
                  >
                    Men's Tops
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">
                    Hoodies, T-shirts, Jackets
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleNavigate("/mens?category=bottoms")}
                className="w-full flex items-center gap-4 py-3 hover:opacity-60 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Search
                    size={15}
                    strokeWidth={1.75}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="text-left">
                  <p
                    className="font-body font-medium text-foreground"
                    style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)" }}
                  >
                    Men's Bottoms
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">
                    Joggers, Cargo, Shorts
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleNavigate("/mens?category=shoes")}
                className="w-full flex items-center gap-4 py-3 hover:opacity-60 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Search
                    size={15}
                    strokeWidth={1.75}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="text-left">
                  <p
                    className="font-body font-medium text-foreground"
                    style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)" }}
                  >
                    Men's Shoes
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">
                    Trainers, Boots
                  </p>
                </div>
              </button>

              <p className="font-body text-xs font-semibold text-muted-foreground tracking-widest uppercase pt-5 pb-2">
                Women
              </p>

              <button
                onClick={() => handleNavigate("/womens")}
                className="w-full flex items-center gap-4 py-3 hover:opacity-60 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Search
                    size={15}
                    strokeWidth={1.75}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="text-left">
                  <p
                    className="font-body font-medium text-foreground"
                    style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)" }}
                  >
                    Women's Tops
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">
                    Hoodies, Tanks, T-shirts
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleNavigate("/womens?category=bottoms")}
                className="w-full flex items-center gap-4 py-3 hover:opacity-60 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Search
                    size={15}
                    strokeWidth={1.75}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="text-left">
                  <p
                    className="font-body font-medium text-foreground"
                    style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)" }}
                  >
                    Women's Bottoms
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">
                    Joggers, Wide Leg
                  </p>
                </div>
              </button>

              <button
                onClick={() => handleNavigate("/womens?category=shoes")}
                className="w-full flex items-center gap-4 py-3 hover:opacity-60 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <Search
                    size={15}
                    strokeWidth={1.75}
                    className="text-muted-foreground"
                  />
                </div>
                <div className="text-left">
                  <p
                    className="font-body font-medium text-foreground"
                    style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.3rem)" }}
                  >
                    Women's Shoes
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-0.5">
                    Trainers, Boots
                  </p>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
