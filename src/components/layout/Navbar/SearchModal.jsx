"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { useDebounce } from "use-debounce";
import Image from "next/image";

const suggestions = [
  {
    heading: "Men",
    items: [
      {
        label: "Men's Tops",
        description: "Hoodies, T-shirts, Jackets",
        href: "/products?gender=mens&subcategory=tshirts",
      },
      {
        label: "Men's Joggers",
        description: "Joggers, Cargo, Shorts",
        href: "/products?gender=mens&subcategory=joggers",
      },
      {
        label: "Men's Hoodies",
        description: "Pullover, Zip-up, Fleece",
        href: "/products?gender=mens&subcategory=hoodies",
      },
    ],
  },
  {
    heading: "Women",
    items: [
      {
        label: "Women's Tops",
        description: "Hoodies, Tanks, T-shirts",
        href: "/products?gender=womens&subcategory=tops",
      },
      {
        label: "Women's Hoodies",
        description: "Pullover, Zip-up, Fleece",
        href: "/products?gender=womens&subcategory=hoodies",
      },
    ],
  },
];

export default function SearchModal({ open, onClose }) {
  const router = useRouter();
  const inputRef = useRef(null);

  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [debouncedSearch] = useDebounce(searchInput, 300);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setSearchInput("");
  }, [open]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 1) {
      setResults([]);
      return;
    }
    const getResults = async () => {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products?search=${debouncedSearch}&limit=8`,
      );
      const data = await res.json();
      setResults(data.data);
      setLoading(false);
    };
    getResults();
  }, [debouncedSearch]);

  const handleNavigate = (href) => {
    router.push(href);
    onClose();
  };

  const handleClear = () => {
    setSearchInput("");
    setResults([]);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      handleNavigate(`/products?search=${searchInput.trim()}`);
    }
  };

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
          <div className="flex items-center gap-2 flex-1 bg-accent rounded-xl px-4 h-11 ring-1 ring-transparent focus-within:ring-foreground transition-all duration-200">
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
              placeholder="Search Vestis..."
              className="flex-1 bg-transparent outline-none border-none ring-0 font-body text-foreground placeholder:text-muted-foreground text-base"
            />
            {searchInput.length > 0 && (
              <button
                onClick={handleClear}
                className="shrink-0 w-5 h-5 rounded-full bg-muted-foreground/40 flex items-center justify-center hover:bg-muted-foreground/60 transition-colors"
              >
                <X size={11} strokeWidth={2.5} className="text-background" />
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="font-body text-base text-foreground hover:opacity-60 transition-opacity shrink-0"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ── DIVIDER */}
      <div className="h-px bg-border w-full shrink-0" />

      {/* ── RESULTS */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 pb-8">
          {searchInput.length > 0 ? (
            <>
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mt-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-3">
                      <div className="w-20 sm:w-28 aspect-[3/4] rounded-lg bg-accent animate-pulse shrink-0" />
                      <div className="flex flex-col gap-2 flex-1">
                        <div className="h-3 bg-accent animate-pulse rounded w-1/4" />
                        <div className="h-3 bg-accent animate-pulse rounded w-3/4" />
                        <div className="h-3 bg-accent animate-pulse rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : results.length === 0 ? (
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
                    <p className="font-body text-base font-semibold text-foreground">
                      Results
                    </p>
                    <p className="font-body text-base text-muted-foreground">
                      {results.length} found
                    </p>
                  </div>

                  {/* ── Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                    {results.map((product) => (
                      <button
                        key={product.slug}
                        onClick={() =>
                          handleNavigate(`/products/${product.slug}`)
                        }
                        className="flex items-start gap-4 py-4 border-b border-border/50 hover:opacity-60 transition-opacity w-full text-left"
                      >
                        <div className="relative w-20 sm:w-28 shrink-0 bg-[#f5f5f5] rounded-lg overflow-hidden aspect-[3/4]">
                          <Image
                            src={product.images[0].url}
                            alt={product.name}
                            fill
                            sizes="112px"
                            className="object-cover object-center"
                          />
                        </div>
                        <div className="flex flex-col gap-1 flex-1 min-w-0 pt-1">
                          <p className="font-body text-base text-muted-foreground">
                            {product.brand}
                          </p>
                          <p className="font-body font-semibold text-base text-foreground leading-snug line-clamp-2">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            {product.isOnSale && product.salePrice ? (
                              <>
                                <span className="font-body font-semibold text-base text-red-500">
                                  £{product.salePrice.toFixed(2)}
                                </span>
                                <span className="font-body text-base text-muted-foreground line-through">
                                  £{product.price.toFixed(2)}
                                </span>
                              </>
                            ) : (
                              <span className="font-body font-semibold text-base text-foreground">
                                £{product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* ── See all */}
                  <button
                    onClick={() =>
                      handleNavigate(`/products?search=${searchInput.trim()}`)
                    }
                    className="w-full mt-6 py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
                  >
                    See all results for "{searchInput}"
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {/* ── STATIC SUGGESTIONS */}
              {suggestions.map((group) => (
                <div key={group.heading}>
                  <p className="font-body font-bold text-base text-foreground pt-6 pb-3 border-b border-border">
                    {group.heading}
                  </p>
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleNavigate(item.href)}
                      className="w-full flex items-center justify-between py-3.5 border-b border-border/50 hover:opacity-60 transition-opacity group"
                    >
                      <div className="text-left">
                        <p className="font-body font-semibold text-base text-foreground">
                          {item.label}
                        </p>
                        <p className="font-body text-base text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                      <ArrowUpRight
                        size={18}
                        strokeWidth={1.75}
                        className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                      />
                    </button>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
