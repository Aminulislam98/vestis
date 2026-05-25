"use client";

export default function SizeSelector({ variants, selectedSize, onSelect }) {
  // ── Get all unique sizes from variants array
  const sizes = [...new Set(variants.map((v) => v.size))];

  // ── Check if a size is out of stock
  // Finds the variant with matching size and checks stock
  const isOutOfStock = (size) => {
    const variant = variants.find((v) => v.size === size);
    return !variant || variant.stock === 0;
  };

  return (
    <div className="flex flex-col gap-3">
      {/* ── Header row — label + size guide */}
      <div className="flex items-center justify-between">
        <p className="font-body text-sm font-semibold text-foreground">
          Select Size
        </p>
        <button className="font-body text-sm font-semibold  underline hover:text-foreground transition-colors hover:cursor-pointer">
          Size Guide
        </button>
      </div>

      {/* ── Size buttons
          Out of stock = crossed out + disabled
          Selected = black filled
          Available = outlined */}
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => {
          const outOfStock = isOutOfStock(size);
          return (
            <button
              key={size}
              onClick={() => !outOfStock && onSelect(size)}
              disabled={outOfStock}
              className={`
                relative w-14 h-12 border font-body text-sm
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
              {/* ── Cross line through out of stock sizes */}
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
    </div>
  );
}
