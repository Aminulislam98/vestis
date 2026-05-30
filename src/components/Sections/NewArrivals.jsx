"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NewArrivals() {
  const [products, setProducts] = useState([]);

  // ── Fetch newest 8 products
  useEffect(() => {
    const fetchNewArrivals = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/products?limit=8`,
      );
      const data = await res.json();
      setProducts(data.data || []);
    };
    fetchNewArrivals();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="w-full sm:px-6 lg:px-12 py-12 border-t border-border">
      {/* ── Header */}
      <div className="flex items-center justify-between mb-8 px-3 md:px-0">
        <h2 className="font-body font-bold text-2xl text-foreground">
          New Arrivals
        </h2>
        <Link
          href="/products"
          className="font-body text-base text-foreground hover:opacity-60 transition-opacity underline underline-offset-4"
        >
          View All
        </Link>
      </div>

      {/* ── Products grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
        {products.map((item) => {
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
                {/* ── Sale badge */}
                {itemOnSale && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white font-body font-semibold text-sm px-3 py-1 rounded">
                    Sale
                  </span>
                )}
              </div>

              {/* ── Details */}
              <div className="flex flex-col gap-0.5 sm:px-1 px-3 ">
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
