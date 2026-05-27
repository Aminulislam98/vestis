"use client";
import { useState, useRef, useEffect } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SizeSelector from "./SizeSelector";
import { Heart } from "lucide-react";

export default function ProductDetailPageClient({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const actionButtonsRef = useRef(null);
  const isOnSale = product.isOnSale && product.salePrice;

  // ── Hide sticky bar when actual buttons are visible on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting);
      },
      { threshold: 0.5 },
    );

    if (actionButtonsRef.current) {
      observer.observe(actionButtonsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const PriceBlock = () => (
    <div className="flex items-center gap-3">
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
              ((product.price - product.salePrice) / product.price) * 100,
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
  );

  const ActionButtons = () => (
    <div className="flex flex-col gap-3">
      <button className="w-full py-4 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity">
        Add to Bag
      </button>
      <button className="w-full py-4 border border-foreground text-foreground font-body font-semibold text-base hover:bg-accent transition-colors flex items-center justify-center gap-2">
        Favourite
        <Heart size={18} strokeWidth={1.75} />
      </button>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-background pt-0">
      <div className="max-w-7xl w-full mx-auto lg:px-12">
        {/* ── MOBILE ONLY: Name + Price on top */}
        <div className="lg:hidden px-4 pt-2 pb-2 flex flex-col gap-1">
          <p
            className="font-body font-semibold text-black hidden sm:flex"
            style={{ fontSize: "clamp(1rem, 3.5vw, 1.2rem)" }}
          >
            {product.brand}
          </p>
          <h1
            className="font-semibold"
            style={{ fontSize: "clamp(1.1rem, 4vw, 1.4rem)" }}
          >
            {product.name}
          </h1>
          <p className="font-body text-muted-foreground capitalize text-sm">
            {product.gender}'s {product.category}
          </p>
          <div className="mt-1">
            <PriceBlock />
          </div>
        </div>

        {/* ── MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row items-start">
          {/* LEFT — Gallery */}
          <div className="w-full lg:w-[45%] lg:sticky lg:top-16 lg:self-start lg:h-fit">
            <ProductGallery images={product.images} />
          </div>

          {/* RIGHT — Details */}
          <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col gap-1 px-4 sm:px-6 lg:px-10 pt-3 pb-24 lg:pb-8">
            {/* Desktop only: Brand, Name, Price */}
            <div className="hidden lg:flex flex-col gap-1">
              <p
                className="font-body font-semibold text-black"
                style={{ fontSize: "clamp(1.2rem, 1.4vw, 2rem)" }}
              >
                {product.brand}
              </p>
              <div>
                <h1
                  className="font-semibold"
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
              <div className="my-4">
                <PriceBlock />
              </div>
            </div>

            {/* Size Selector */}
            <SizeSelector
              variants={product.variants}
              selectedSize={selectedSize}
              onSelect={setSelectedSize}
            />

            {/* Action Buttons — desktop always visible, mobile reference point */}
            <div ref={actionButtonsRef} className="mt-2">
              <ActionButtons />
            </div>

            {/* Description */}
            <ProductInfo product={product} />
          </div>
        </div>
      </div>

      {/* ── MOBILE STICKY BAR */}
      <div
        className={`
        lg:hidden fixed bottom-0 left-0 right-0 z-50
        bg-background border-t border-border
        px-4 py-3 flex gap-3
        transition-transform duration-300
        ${showStickyBar ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <button className="flex-1 py-3 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity">
          Add to Bag
        </button>
        <button className="w-14 py-3 border border-foreground text-foreground flex items-center justify-center hover:bg-accent transition-colors">
          <Heart size={18} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
