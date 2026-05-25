"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchModal({ open, onClose }) {
  const router = useRouter();
  // const [query, setQuery] = useState("");

  // ── Auto focus input when modal opens
  // useEffect(() => {
  //   if (open) {
  //     setTimeout(() => inputRef.current?.focus(), 100);
  //   } else {
  //     setQuery("");
  //   }
  // }, [open]);

  // ── Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // ── Navigate and close
  const handleNavigate = (href) => {
    router.push(href);
    onClose();
  };

  // ── Clear input
  const handleClear = () => {
    setQuery("");
    inputRef.current?.focus();
  };
  const pathname = usePathname();
  const [searchInput, setSearchInput] = useState("");
  const searchParams = useSearchParams();
  console.log(searchParams);

  const handleSearchInput = () => {
    const params = new URLSearchParams(searchParams);
    if (searchInput) {
      params.set("search", searchInput);
    } else {
      params.delete("search");
    }
    router.push(`/products/${pathname}?${params.toString()}`);
  };

  return (
    <div
      className={`
        fixed inset-0 z-50 bg-background
        flex flex-col
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
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          {/* ── Search pill — no border, grey bg only */}
          <div className="flex items-center gap-2 flex-1 bg-accent rounded-xl px-4 h-11">
            <Search
              onClick={handleSearchInput}
              size={18}
              strokeWidth={2}
              className="text-muted-foreground shrink-0"
            />

            <input
              // ref={inputRef}
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              // onChange={
              //   const value = e.target.value;
              //  setQuery(value);
              //    setSearchInput(valuee)
              // }
              placeholder="Search VESTIS..."
              className="
                flex-1 bg-transparent outline-none border-none ring-0
                font-body text-foreground placeholder:text-muted-foreground
                text-base
              "
              // TODO: wire onChange → debounce → fetch /api/search?q=query
            />

            {/* Clear icon — only when input has value */}
            {/* {query.length > 0 && (
              <button
                onClick={handleClear}
                className="shrink-0 w-5 h-5 rounded-full bg-muted-foreground/40 flex items-center justify-center hover:bg-muted-foreground/60 transition-colors"
                aria-label="Clear search"
              >
                <X size={11} strokeWidth={2.5} className="text-background" />
              </button>
            )} */}
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

      {/* ── DIVIDER — single clean line, no border on items */}
      <div className="h-px bg-border w-full shrink-0" />

      {/* ── RESULTS PANEL */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4">
          {/* ── SECTION: Men */}
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
              <p className="font-body text-base font-medium text-foreground">
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
            <div
              onClick={handleSearchInput}
              className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0"
            >
              <Search
                size={15}
                strokeWidth={1.75}
                className="text-muted-foreground"
              />
            </div>
            <div className="text-left">
              <p className="font-body text-base font-medium text-foreground">
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
              <p className="font-body text-base font-medium text-foreground">
                Men's Shoes
              </p>
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                Trainers, Boots
              </p>
            </div>
          </button>

          {/* ── SECTION: Women */}
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
              <p className="font-body text-base font-medium text-foreground">
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
              <p className="font-body text-base font-medium text-foreground">
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
              <p className="font-body text-base font-medium text-foreground">
                Women's Shoes
              </p>
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                Trainers, Boots
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
