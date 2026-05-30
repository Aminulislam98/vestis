"use client";
import { useState, useRef, useEffect } from "react";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SizeSelector from "./SizeSelector";
import { Heart } from "lucide-react";
import AddToCartButton from "../actionsButtons/AddToCartButton";
import { saveViewedProduct } from "@/lib/viewedProducts";
import Image from "next/image";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { getGuestId } from "@/lib/guestId";
import { toast } from "sonner";

export default function ProductDetailPageClient({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const actionButtonsRef = useRef(null);
  const isOnSale = product.isOnSale && product.salePrice;
  const { data: session, isPending } = authClient.useSession();
  const [guestId, setGuestId] = useState(null);
  const userId = session?.user?.id;
  const [isWishListed, setWishListed] = useState(false);

  useEffect(() => {
    if (isPending) return;
    const checkWishList = async () => {
      let url;
      if (userId) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist?userId=${userId}`;
      }
      if (guestId) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist?guestId=${guestId}`;
      }
      const res = await fetch(url);
      const data = await res.json(res);
      const exists = data.items?.find((i) => i.productId === product._id);
      setWishListed(!!exists);
    };
    checkWishList();
  }, [isPending, userId, guestId]);

  useEffect(() => {
    const checkUserId = () => {
      if (isPending) return;
      if (!userId) {
        setGuestId(getGuestId());
      }
    };
    checkUserId();
  }, [userId]);

  const handleFavorite = async () => {
    if (isPending) return;
    setWishListed(!isWishListed);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId || null,
        guestId: userId ? null : guestId,
        productId: product._id,
        name: product.name,
        price: product.price,
        brand: product.brand,
        slug: product.slug,
        image: product.images[0].url,
      }),
    });
    if (!isWishListed) {
      toast.success("Added to Wishlist");
    } else {
      toast.success("Removed from Wishlist");
    }
  };

  // ── Save to viewed history
  useEffect(() => {
    saveViewedProduct({
      _id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images[0].url,
      salePrice: product.salePrice,
      isOnSale: product.isOnSale,
      slug: product.slug,
      category: product.category,
      gender: product.gender,
    });
  }, [product._id]);

  // ── Fetch related products
  useEffect(() => {
    const fetchRelated = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products/related?gender=${product.gender}&category=${product.category}&exclude=${product._id}`,
      );
      const data = await res.json();
      setRelatedProducts(data.data || []);
    };
    fetchRelated();
  }, [product._id]);

  // ── Sticky bar observer
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

  // ── Price block
  const PriceBlock = () => (
    <div className="flex items-center gap-3">
      {isOnSale ? (
        <>
          <span className="font-price font-bold text-red-500 text-2xl">
            £{product.salePrice.toFixed(2)}
          </span>
          <span className="font-price text-muted-foreground line-through text-lg">
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
        <span className="font-price font-bold text-foreground text-xl">
          £{product.price.toFixed(2)}
        </span>
      )}
    </div>
  );

  // ── Action buttons
  const ActionButtons = () => (
    <div className="flex flex-col gap-3">
      <AddToCartButton selectedSize={selectedSize} product={product} />
      <button
        onClick={handleFavorite}
        className="w-full py-4 border border-foreground text-foreground font-body font-semibold text-base hover:bg-accent transition-colors flex items-center justify-center gap-2 rounded-full"
      >
        <Heart size={18} strokeWidth={1.75} />
        {isWishListed ? "Wishlisted" : "Favorite"}
      </button>
    </div>
  );

  return (
    <div>
      <div className="max-w-7xl sm:max-w-[1100px] 2xl:max-w-[1700px] mx-auto min-h-screen bg-background ">
        {/* ── MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row items-start lg:py-6 gap-4">
          {/* ── LEFT — Gallery */}
          <div className="w-full lg:w-[40%] lg:sticky lg:top-16 lg:self-start">
            <ProductGallery images={product.images} />

            {/* ── Mobile only — details under image */}
            <div className="lg:hidden  py-2 flex flex-col gap-1 px-3">
              <p className="font-semibold text-base">{product.brand}</p>
              <h1 className="font-body font-bold text-xl text-foreground leading-tight">
                {product.name}
              </h1>
              <p className="font-body text-base text-muted-foreground capitalize">
                {product.gender}'s {product.category}
              </p>
              <div className="mt-2">
                <PriceBlock />
              </div>
            </div>
          </div>

          {/* ── RIGHT — Details */}
          <div className="w-full  flex flex-col gap-5 lg:pt-2 px-3">
            {/* ── Desktop — Brand, Name, Price */}
            <div className="hidden lg:flex flex-col ">
              <p className="font-semibold text-base">{product.brand}</p>
              <h1 className="font-body font-bold text-xl text-foreground leading-tight">
                {product.name}
              </h1>
              <p className="font-body text-base text-muted-foreground capitalize">
                {product.gender}'s {product.category}
              </p>
              <div className="mt-3">
                <PriceBlock />
              </div>
            </div>

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

            {/* ── Product Info */}
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
          <button className="w-14 py-3 border border-foreground text-foreground flex items-center justify-center hover:bg-accent transition-colors shrink-0 rounded-full">
            <Heart size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
      <div>
        {/* ── YOU MAY ALSO LIKE */}
        {relatedProducts.length > 0 && (
          <div className=" py-7 sm:py-12 sm:px-3  w-full mx-auto px-4 md:px-8 lg:px-12">
            {/* ── Section header */}
            <h2 className="font-body font-bold text-2xl text-foreground mb-8 px-3 sm:px-0">
              You May Also Like
            </h2>

            {/* ── Products grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
              {relatedProducts.map((item) => {
                const itemOnSale = item.isOnSale && item.salePrice;
                return (
                  <Link
                    key={item._id}
                    href={`/products/${item.slug}`}
                    className="flex flex-col gap-2 group"
                  >
                    {/* ── Image */}
                    <div
                      className="relative w-full overflow-hidden bg-[#f5f5f5] sm:rounded-sm"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={item.images[0].url}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* ── Details */}
                    <div className="flex flex-col gap-0.5 px-2 sm:px-0">
                      <p className="font-semibold text-base">{item.brand}</p>
                      <p className="font-body font-semibold text-base text-foreground leading-snug">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {itemOnSale ? (
                          <>
                            <p className="font-price font-bold text-base text-red-500">
                              £{item.salePrice.toFixed(2)}
                            </p>
                            <p className="font-price text-sm text-muted-foreground line-through">
                              £{item.price.toFixed(2)}
                            </p>
                          </>
                        ) : (
                          <p className="font-price font-bold text-base text-foreground">
                            £{item.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
