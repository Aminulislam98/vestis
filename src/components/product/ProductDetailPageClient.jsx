"use client";
import { useState } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import { Heart } from "lucide-react";
import SizeSelector from "./SizeSelector";

export default function ProductDetailPageClient({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const isOnSale = product.isOnSale && product.salePrice;
  console.log("this is products images:", product.images);

  return (
    <div className="w-full min-h-screen bg-background pt-0">
      {/* ── Max width container — same as navbar */}
      <div className="max-w-7xl w-full mx-auto  lg:px-12">
        {/* ── MAIN LAYOUT
            Mobile: stacked — image top, details below
            Desktop: side by side — image left, details right */}
        <div className="flex flex-col lg:flex-row items-start">
          {/* ── LEFT — Image Gallery
              Full width on mobile
              45% width on desktop */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-16 lg:self-start lg:h-fit sm:pt-3 ">
            <ProductGallery images={product.images} />
          </div>

          {/* ── RIGHT — Product Details
              Full width on mobile with padding
              55% width on desktop */}
          <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col gap-1 px-4 sm:px-6 lg:px-10 pt-3  pb-8">
            {/* ── BRAND */}
            <p
              className="font-body  font-semibold text-black "
              style={{ fontSize: "clamp(1.2rem, 1.4vw, 2rem)" }}
            >
              {product.brand}
            </p>

            {/* ── PRODUCT NAME + SUBTITLE */}
            <div>
              <h1
                className="font-semibold text-2xl"
                style={{ fontSize: "clamp(1.2rem, 1.4vw, 2rem)" }}
              >
                {product.name}
              </h1>
              <p
                className="font-body text-muted-foreground mt-1 capitalize"
                style={{ fontSize: "clamp(1rem, 1.2vw, 1.5rem)" }}
              >
                {product.gender}'s {product.category}
              </p>
            </div>

            {/* ── PRICE */}
            <div className="flex items-center gap-3 my-4">
              {isOnSale ? (
                <>
                  <span
                    className="font-price font-bold text-red-500"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
                  >
                    £{product.salePrice.toFixed(2)}
                  </span>
                  <span
                    className="font-price text-muted-foreground line-through"
                    style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
                  >
                    £{product.price.toFixed(2)}
                  </span>
                  <span className="font-body text-sm font-semibold text-green-600 dark:text-green-400">
                    {Math.round(
                      ((product.price - product.salePrice) / product.price) *
                        100,
                    )}
                    % off
                  </span>
                </>
              ) : (
                <span
                  className="font-price font-bold text-foreground"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}
                >
                  £{product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* ── SIZE SELECTOR */}
            <SizeSelector
              variants={product.variants}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* ── ACTION BUTTONS */}
            <div className="flex flex-col gap-3 mt-2">
              <button className="w-full py-4 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity">
                Add to Bag
              </button>
              <button className="w-full py-4 border border-foreground text-foreground font-body font-semibold text-base hover:bg-accent transition-colors flex items-center justify-center gap-2">
                Favorite
                <Heart size={18} strokeWidth={1.75} />
              </button>
            </div>

            {/* ── PRODUCT INFO SECTIONS */}
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
