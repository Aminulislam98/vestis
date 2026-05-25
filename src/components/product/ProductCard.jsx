import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  console.log("this is one product:", product);
  // ── Price display logic
  // isOnSale=true + salePrice present → red sale price + grey strikethrough original
  // Otherwise                         → single bold black price
  const isOnSale = product.isOnSale && product.salePrice != null;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Product image container
          - aspect-3/4 portrait keeps consistent card height across the grid
          - bg-[#f6f6f6] light grey matches Nike/Zara product photo backgrounds
          - object-center keeps the clothing centred in the frame
          - group-hover:scale-105 → subtle zoom on card hover */}
      <div className="relative overflow-hidden w-full bg-[#f6f6f6] aspect-3/4 max-h-100 md:max-h-105 2xl:max-h-150">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover object-center transition-transform duration-500 sm:group-hover:scale-105"
          quality={90}
          priority
        />
      </div>

      {/* Card info section — sits below the image
            1. Brand name  — bold black
            2. Product name — grey muted
            3. Price block  — bold; red + strikethrough if on sale */}
      <div className=" sm:px-0 px-3.5 pb-1">
        {/* Brand name — e.g. "Jordan", "Nike", "Zara" */}
        <p className="font-body text-base 2xl:text-xl font-semibold text-foreground leading-snug mt-2">
          {product.brand}
        </p>

        {/* Product name — acts as the subtitle / descriptor line in grey
            e.g. "Men's Graphic T-Shirt" */}
        <p className="font-body text-[17px] text-muted-foreground mt-0.5 leading-snug">
          {product.name}
        </p>

        {/* Price block
            Sale:    red salePrice  +  grey struck-through original price
            Regular: single bold black price */}
        <div className="flex items-center gap-2 ">
          {isOnSale ? (
            <>
              {/* Sale price — red */}
              <span className="font-body text-base font-bold text-red-500">
                £{product.salePrice.toFixed(2)}
              </span>
              {/* Original price — grey with strikethrough */}
              <span className="font-body text-base text-muted-foreground line-through">
                £{product.price.toFixed(2)}
              </span>
            </>
          ) : (
            /* Regular price — black */
            <span className="font-body text-base font-bold text-foreground">
              £{product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
