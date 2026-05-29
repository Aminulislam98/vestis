"use client";
import { useEffect, useState } from "react";
import { getViewedProducts } from "@/lib/viewedProducts";
import Image from "next/image";
import Link from "next/link";

export default function RecentlyViewed() {
  const [viewed, setViewed] = useState([]);

  useEffect(() => {
    const getViewed = () => {
      const products = getViewedProducts();
      setViewed(products);
    };
    getViewed();
  }, []);

  if (viewed.length === 0) return null;

  return (
    <section className="w-full  sm:px-6 lg:px-12 py-6 md:py-12 border-t border-border">
      {/* ── Section header */}
      <h2 className="font-body font-bold text-2xl text-foreground mb-6 px-3">
        Recently Viewed
      </h2>

      {/* ── Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 sm:gap-6">
        {viewed.map((item) => {
          const itemOnSale = item.isOnSale && item.salePrice;
          return (
            <Link
              key={item._id}
              href={`/products/${item.slug}`}
              className="flex flex-col gap-2 group"
            >
              {/* ── Image */}
              <div
                className="relative w-full overflow-hidden bg-[#f5f5f5] md:rounded-sm"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* ── Details */}
              <div className="flex flex-col gap-0.5 px-3 md:px-0">
                <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">
                  {item.brand}
                </p>
                <p className="font-body font-semibold text-base text-foreground leading-snug line-clamp-1">
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
    </section>
  );
}
