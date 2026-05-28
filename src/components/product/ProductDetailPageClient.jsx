"use client";
import { useState, useRef, useEffect } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SizeSelector from "./SizeSelector";
import { Heart } from "lucide-react";
import AddToCartButton from "../actionsButtons/AddToCartButton";

export default function ProductDetailPageClient({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const actionButtonsRef = useRef(null);
  const isOnSale = product.isOnSale && product.salePrice;

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
            style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}
          >
            £{product.salePrice.toFixed(2)}
          </span>
          <span
            className="font-price text-muted-foreground line-through"
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
          >
            £{product.price.toFixed(2)}
          </span>
          <span className="font-body text-base font-semibold text-green-600 dark:text-green-400">
            {Math.round(
              ((product.price - product.salePrice) / product.price) * 100,
            )}
            % off
          </span>
        </>
      ) : (
        <span
          className="font-price font-bold text-foreground"
          style={{ fontSize: "clamp(1.3rem, 1.5vw, 1.6rem)" }}
        >
          £{product.price.toFixed(2)}
        </span>
      )}
    </div>
  );

  const ActionButtons = () => (
    <div className="flex flex-col gap-3">
      <AddToCartButton selectedSize={selectedSize} product={product} />
      <button className="w-full py-4 border border-foreground text-foreground font-body font-semibold text-base hover:bg-accent transition-colors flex items-center justify-center gap-2">
        Favourite
        <Heart size={18} strokeWidth={1.75} />
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl sm:max-w-[1100px] 2xl:max-w-[1700px] mx-auto min-h-screen bg-background">
      {/* ── MAIN LAYOUT — full width, no container */}
      <div className="flex flex-col lg:flex-row items-start sm:py-5">
        {/* ── LEFT — Gallery — edge to edge, no padding */}
        <div className="w-full lg:w-[50%] lg:sticky lg:top-16 lg:self-start">
          <ProductGallery images={product.images} />

          {/* ── MOBILE ONLY: details under photo */}
          <div className="lg:hidden px-4 pt-3 pb-2 flex flex-col">
            <p className=" font-semibold text-base ">{product.brand}</p>
            <h1 className="font-semibold text-[19px]">{product.name}</h1>
            <p className="capitalize text-gray-600 text-base">
              {product.gender}'s {product.category}
            </p>
            <div className="mt-1">
              <PriceBlock />
            </div>
          </div>
        </div>

        {/* ── RIGHT — Details */}
        <div className="w-full lg:w-[50%] flex flex-col gap-4 px-4 sm:px-8 lg:px-12  ">
          {/* ── Desktop: Brand, Name, Price */}
          <div className="hidden lg:flex flex-col ">
            <p className="text-base  font-semibold">{product.brand}</p>
            <h1
              className="font-semibold leading-tight"
              style={{ fontSize: "clamp(1rem, 1.3vw, 1.4rem)" }}
            >
              {product.name}
            </h1>
            <p
              className="font-body text-muted-foreground capitalize"
              style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
            >
              {product.gender}'s {product.category}
            </p>
            <div className="mt-1">
              <PriceBlock />
            </div>
          </div>

          {/* ── Divider */}
          <div className="hidden lg:block h-px bg-border w-full" />

          {/* ── Size Selector */}
          <SizeSelector
            variants={product.variants}
            selectedSize={selectedSize}
            onSelect={setSelectedSize}
          />

          {/* ── Action Buttons */}
          <div ref={actionButtonsRef}>
            <ActionButtons />
          </div>

          {/* ── Description */}
          <ProductInfo product={product} />
        </div>
      </div>

      {/* ── MOBILE STICKY BAR */}
      <div
        className={`
          lg:hidden fixed bottom-0 left-0 right-0 z-50
          bg-background/95 backdrop-blur-sm border-t border-border
          px-4 py-3 flex gap-3
          transition-transform duration-300
          ${showStickyBar ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <AddToCartButton selectedSize={selectedSize} product={product} />
        <button className="w-14 py-3 border border-foreground text-foreground flex items-center justify-center hover:bg-accent transition-colors shrink-0">
          <Heart size={18} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}
