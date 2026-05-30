"use client";
import { useState } from "react";
import SizeGuide from "./SizeGuide";

export default function SizeSelector({ variants, selectedSize, onSelect }) {
  const [showGuide, setShowGuide] = useState(false);

  const sizes = [...new Set(variants.map((v) => v.size))];

  const isOutOfStock = (size) => {
    const variant = variants.find((v) => v.size === size);
    return !variant || variant.stock === 0;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="font-body text-sm font-semibold text-foreground">
          Select Size
        </p>
        <button
          type="button"
          onClick={() => setShowGuide(true)}
          className="font-body text-sm font-semibold underline hover:text-foreground transition-colors cursor-pointer"
        >
          Size Guide
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const outOfStock = isOutOfStock(size);
          return (
            <button
              key={size}
              type="button"
              onClick={() => !outOfStock && onSelect(size)}
              disabled={outOfStock}
              className={`
                relative w-14 h-12 border text-base
                transition-all duration-200
                ${
                  outOfStock
                    ? "border-border text-muted-foreground cursor-not-allowed opacity-40"
                    : selectedSize === size
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-foreground hover:border-foreground"
                }
              `}
            >
              {outOfStock && (
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="absolute w-full h-px bg-border rotate-45" />
                </span>
              )}
              {size}
            </button>
          );
        })}
      </div>

      {showGuide && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowGuide(false)}
        >
          <div
            className="bg-background w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <SizeGuide onClose={() => setShowGuide(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
