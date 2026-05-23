"use client";
import { useState } from "react";
import ProductCard from "../Card/ProductCard";
import { TextAnimate } from "../ui/text-animate";

const menProducts = [
  {
    id: 1,
    name: "Camo Hooded Jacket",
    price: 49.99,
    originalPrice: 79.99,
    slug: "camo-hooded-jacket",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=90",
  },
  {
    id: 2,
    name: "White Oversized Tee",
    price: 19.99,
    originalPrice: null,
    slug: "white-oversized-tee",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=90",
  },
  {
    id: 3,
    name: "Khaki Muscle Vest",
    price: 14.99,
    originalPrice: 24.99,
    slug: "khaki-muscle-vest",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=90",
  },
  {
    id: 4,
    name: "Rust Sleeveless Top",
    price: 16.99,
    originalPrice: null,
    slug: "rust-sleeveless-top",
    image:
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=90",
  },
  {
    id: 5,
    name: "Grey Slim Joggers",
    price: 29.99,
    originalPrice: 44.99,
    slug: "grey-slim-joggers",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=90",
  },
  {
    id: 6,
    name: "Black Bomber Jacket",
    price: 59.99,
    originalPrice: 89.99,
    slug: "black-bomber-jacket",
    image:
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?w=600&q=90",
  },
  {
    id: 7,
    name: "Navy Linen Shirt",
    price: 34.99,
    originalPrice: null,
    slug: "navy-linen-shirt",
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=90",
  },
  {
    id: 8,
    name: "Beige Cargo Shorts",
    price: 24.99,
    originalPrice: 39.99,
    slug: "beige-cargo-shorts",
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=600&q=90",
  },
];

const womenProducts = [
  {
    id: 1,
    name: "Floral Wrap Dress",
    price: 39.99,
    originalPrice: 59.99,
    slug: "floral-wrap-dress",
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=90",
  },
  {
    id: 2,
    name: "White Linen Blouse",
    price: 24.99,
    originalPrice: null,
    slug: "white-linen-blouse",
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&q=90",
  },
  {
    id: 3,
    name: "Beige Wide Leg Trousers",
    price: 34.99,
    originalPrice: 49.99,
    slug: "beige-wide-leg-trousers",
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=90",
  },
  {
    id: 4,
    name: "Black Slip Dress",
    price: 29.99,
    originalPrice: null,
    slug: "black-slip-dress",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=90",
  },
  {
    id: 5,
    name: "Stripe Co-ord Set",
    price: 44.99,
    originalPrice: 64.99,
    slug: "stripe-co-ord-set",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=90",
  },
  {
    id: 6,
    name: "Cream Knit Cardigan",
    price: 32.99,
    originalPrice: null,
    slug: "cream-knit-cardigan",
    image:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&q=90",
  },
  {
    id: 7,
    name: "Denim Mini Skirt",
    price: 22.99,
    originalPrice: 34.99,
    slug: "denim-mini-skirt",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=90",
  },
  {
    id: 8,
    name: "Rust Crop Jacket",
    price: 54.99,
    originalPrice: 74.99,
    slug: "rust-crop-jacket",
    image:
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=90",
  },
];

export default function TrendingSection() {
  const [active, setActive] = useState("women");
  const products = active === "men" ? menProducts : womenProducts;

  return (
    <section className="w-full py-10 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 px-4">
        <h2 className="font-heading text-3xl md:text-4xl tracking-wide">
          TRENDING
        </h2>
        <TextAnimate
          animation="blurIn"
          as="h2"
          className=" hidden md:flex font-heading text-3xl md:text-4xl tracking-wide"
        >
          Fresh drops. Real style. No compromise.
        </TextAnimate>
        {/* Toggle */}
        <div className="flex items-center border border-border  gap-1">
          <button
            onClick={() => setActive("women")}
            className={`font-body text-sm font-medium px-5 py-1.5  transition-all duration-300 ${
              active === "women"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Women
          </button>
          <button
            onClick={() => setActive("men")}
            className={`font-body text-sm font-medium px-5 py-1.5  transition-all duration-300 ${
              active === "men"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Men
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-3 gap-y-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
