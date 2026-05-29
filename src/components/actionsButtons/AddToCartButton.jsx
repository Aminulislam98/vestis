"use client";
import { authClient } from "@/lib/auth-client";
import { getGuestId } from "@/lib/guestId";
import useCartStore from "@/store/cartStore";
import React, { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { X, CheckCircle } from "lucide-react";

const AddToCartButton = ({ selectedSize, product }) => {
  const { data: session } = authClient.useSession();
  const { incrementCart, cartCount } = useCartStore();

  // ── Popup state
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToBag = async () => {
    // ── Size validation
    if (!selectedSize) {
      toast.error("Please select a size", {
        style: {
          borderRadius: "0px",
          background: "#000",
          color: "#fff",
          fontSize: "14px",
        },
      });
      return;
    }

    const userId = session?.user?.id || null;
    const guestId = userId ? null : getGuestId();

    const res = await fetch(`http://localhost:4000/cart/add`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        guestId,
        userId,
        productId: product._id,
        name: product.name,
        brand: product.brand,
        image: product.images[0].url,
        price: product.isOnSale ? product.salePrice : product.price,
        size: selectedSize,
        slug: product.slug,
        quantity: 1,
      }),
    });

    if (res.ok) {
      incrementCart();
      setShowPopup(true); // ← popup দেখাও
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {/* ── ADD TO BAG BUTTON */}
      <button
        onClick={handleAddToBag}
        className="w-full py-4 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
      >
        Add to Bag
      </button>

      {/* ── POPUP */}
      {showPopup && (
        <>
          {/* ── Mobile overlay */}
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowPopup(false)}
          />

          {/* ── Mobile — bottom sheet */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-3xl p-6 flex flex-col gap-5">
            <PopupContent
              product={product}
              selectedSize={selectedSize}
              cartCount={cartCount}
              onClose={() => setShowPopup(false)}
            />
          </div>

          {/* ── Desktop — top right */}
          <div className="hidden lg:flex fixed top-20 right-6 z-50 w-[380px] bg-background rounded-2xl shadow-2xl border border-border p-5 flex-col gap-5">
            <PopupContent
              product={product}
              selectedSize={selectedSize}
              cartCount={cartCount}
              onClose={() => setShowPopup(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

// ── Shared popup content
function PopupContent({ product, selectedSize, cartCount, onClose }) {
  const price = product.isOnSale ? product.salePrice : product.price;

  return (
    <>
      {/* ── Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle size={20} strokeWidth={2} className="text-green-500" />
          <p className="font-body font-semibold text-base text-foreground">
            Added to Bag
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-border transition-colors"
        >
          <X size={16} strokeWidth={2} />
        </button>
      </div>

      {/* ── Item */}
      <div className="flex gap-4">
        {/* ── Image */}
        <div
          className="relative shrink-0 rounded-xl overflow-hidden bg-[#f5f5f5]"
          style={{ width: "80px", aspectRatio: "3/4" }}
        >
          <Image
            src={product.images[0].url}
            alt={product.name}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* ── Details */}
        <div className="flex flex-col gap-1 justify-center">
          <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">
            {product.brand}
          </p>
          <p className="font-body font-semibold text-base text-foreground leading-snug">
            {product.name}
          </p>
          <p className="font-body text-sm text-muted-foreground">
            Size: {selectedSize}
          </p>
          <p className="font-price font-bold text-base text-foreground">
            £{price.toFixed(2)}
          </p>
        </div>
      </div>

      {/* ── Buttons */}
      <div className="flex flex-col gap-3">
        <Link
          href="/bag"
          onClick={onClose}
          className="w-full py-3.5 border border-foreground text-foreground font-body font-semibold text-base hover:bg-accent transition-colors text-center rounded-full"
        >
          View Bag ({cartCount})
        </Link>
        <Link
          href="/checkout"
          onClick={onClose}
          className="w-full py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity text-center rounded-full"
        >
          Checkout
        </Link>
      </div>
    </>
  );
}

export default AddToCartButton;
