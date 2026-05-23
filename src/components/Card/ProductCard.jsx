import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  const isOnSale = product.originalPrice !== null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4] bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          quality={90}
        />
        {/* Sale badge */}
        {isOnSale && (
          <div className="absolute top-3 left-3">
            <span className="font-body text-xs font-semibold bg-red-500 text-white px-2 py-1 tracking-wide">
              SALE
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-3 pb-1 px-2 sm:px-0">
        {/* Product name */}
        <p className="font-body text-base font-medium text-foreground leading-snug">
          {product.name}
        </p>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-1">
          {isOnSale ? (
            <>
              <span className="font-price text-base font-bold text-red-500">
                £{product.price.toFixed(2)}
              </span>
              <span className="font-price text-base text-muted-foreground line-through">
                £{product.originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="font-price text-base font-bold text-foreground">
              £{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
