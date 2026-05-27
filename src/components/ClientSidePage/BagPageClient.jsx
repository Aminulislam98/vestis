"use client";
import { useState } from "react";
import Image from "next/image";
import { Trash2, Heart, Minus, Plus } from "lucide-react";

// ── Dummy cart items — replace with real API data later
const initialItems = [
  {
    id: "1",
    productId: "6a14aa40",
    name: "Nike Icon Futura T-Shirt",
    brand: "Nike",
    category: "Men's T-Shirts",
    size: "M",
    colour: "White",
    price: 24.99,
    image:
      "https://ik.imagekit.io/1rddifmjm/Products/Nike/mens/tops/nike%20mens%20top/M+NSW+TEE+ICON+FUTURA.avif",
    quantity: 1,
  },
  {
    id: "2",
    productId: "6a1384b2",
    name: "Nike Brush Fleece Pullover Hoodie",
    brand: "Nike",
    category: "Men's Tops",
    size: "L",
    colour: "Cream",
    price: 74.99,
    image:
      "https://ik.imagekit.io/1rddifmjm/Products/Nike/mens/tops/nike%20mens%20top/M+NK+TF+SI+BRSH+PO+HD.avif",
    quantity: 1,
  },
];

export default function BagPageClient() {
  // ── Cart items state — later replace initialItems with API fetch
  const [items, setItems] = useState(initialItems);

  // ── Promo code toggle
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // ── Increase quantity
  // TODO: connect to PATCH /cart/update
  function handleIncrease(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }

  // ── Decrease quantity — remove item if quantity reaches 0
  // TODO: connect to PATCH /cart/update or DELETE /cart/delete
  function handleDecrease(id) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  // ── Remove item from cart
  // TODO: connect to DELETE /cart/delete
  function handleRemove(id) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  // ── Add to wishlist
  // TODO: connect to wishlist API
  function handleWishlist(id) {
    console.log("Add to wishlist:", id);
  }

  // ── Calculate subtotal
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  // ── Free delivery threshold
  const deliveryThreshold = 50;
  const isDeliveryFree = subtotal >= deliveryThreshold;
  const deliveryCharge = isDeliveryFree ? 0 : 4.99;
  const total = subtotal + deliveryCharge;

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
        {/* ── FREE DELIVERY BANNER */}
        <div className="border border-border p-4 mb-6">
          <p className="font-body font-semibold text-foreground text-sm">
            Free UK Delivery on orders over £{deliveryThreshold}
          </p>
          <p className="font-body text-muted-foreground text-sm mt-0.5">
            {isDeliveryFree
              ? "You qualify for free delivery!"
              : `Spend £${(deliveryThreshold - subtotal).toFixed(2)} more to get free delivery`}
          </p>
        </div>

        {/* ── MAIN LAYOUT
            Mobile: stacked — items top, summary below
            Desktop: side by side — items left, summary right */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ── LEFT — BAG ITEMS */}
          <div className="w-full lg:flex-1 flex flex-col gap-0">
            <h1 className="font-body font-semibold text-xl text-foreground mb-4">
              Bag
            </h1>

            {/* ── Empty bag */}
            {items.length === 0 && (
              <div className="py-16 text-center">
                <p className="font-body text-muted-foreground text-base">
                  Your bag is empty
                </p>
              </div>
            )}

            {/* ── BAG ITEM LIST */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 py-6 border-b border-border"
              >
                {/* ── PRODUCT IMAGE */}
                <div className="relative w-28 h-36 shrink-0 bg-[#f6f6f6]">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                {/* ── PRODUCT DETAILS + ACTIONS */}
                <div className="flex flex-col justify-between flex-1">
                  {/* ── Top row — name + price */}
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex flex-col gap-0.5">
                      <p className="font-body font-semibold text-foreground text-sm">
                        {item.brand}
                      </p>
                      <p className="font-body text-foreground text-sm">
                        {item.name}
                      </p>
                      <p className="font-body text-muted-foreground text-sm">
                        {item.category}
                      </p>
                      {item.colour && (
                        <p className="font-body text-muted-foreground text-sm">
                          {item.colour}
                        </p>
                      )}
                      <p className="font-body text-muted-foreground text-sm">
                        Size {item.size}
                      </p>
                    </div>

                    {/* ── Price */}
                    <p className="font-price font-semibold text-foreground text-sm shrink-0">
                      £{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* ── Bottom row — quantity + actions */}
                  <div className="flex items-center gap-3 mt-3">
                    {/* ── QUANTITY CONTROLS */}
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() => handleDecrease(item.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} strokeWidth={1.75} />
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center font-body text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrease(item.id)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} strokeWidth={1.75} />
                      </button>
                    </div>

                    {/* ── DELETE BUTTON */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="w-8 h-8 flex items-center justify-center border border-border hover:bg-accent transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={14} strokeWidth={1.75} />
                    </button>

                    {/* ── WISHLIST BUTTON */}
                    <button
                      onClick={() => handleWishlist(item.id)}
                      className="w-8 h-8 flex items-center justify-center border border-border hover:bg-accent transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={14} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT — ORDER SUMMARY
              Mobile: full width below items
              Desktop: sticky right side */}
          <div className="w-full lg:w-80 lg:sticky lg:top-20 lg:self-start flex flex-col gap-0">
            <h2 className="font-body font-semibold text-xl text-foreground mb-4">
              Summary
            </h2>

            {/* ── PROMO CODE */}
            <div className="border-t border-border">
              <button
                onClick={() => setPromoOpen(!promoOpen)}
                className="w-full flex items-center justify-between py-4 font-body text-sm text-foreground hover:opacity-70 transition-opacity"
              >
                Do you have a Promo Code?
                <span className="text-lg">{promoOpen ? "−" : "+"}</span>
              </button>

              {/* ── Promo input — shows when toggled */}
              {promoOpen && (
                <div className="flex gap-2 pb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 border border-border px-3 py-2 font-body text-sm bg-background text-foreground outline-none focus:border-foreground transition-colors"
                  />
                  <button className="px-4 py-2 bg-foreground text-background font-body text-sm font-semibold hover:opacity-80 transition-opacity">
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* ── SUBTOTAL */}
            <div className="flex justify-between items-center py-3 border-t border-border">
              <p className="font-body text-sm text-foreground">Subtotal</p>
              <p className="font-price text-sm text-foreground">
                £{subtotal.toFixed(2)}
              </p>
            </div>

            {/* ── DELIVERY */}
            <div className="flex justify-between items-center py-3 border-t border-border">
              <p className="font-body text-sm text-foreground">
                Estimated Delivery
              </p>
              <p className="font-price text-sm text-foreground">
                {isDeliveryFree ? "Free" : `£${deliveryCharge.toFixed(2)}`}
              </p>
            </div>

            {/* ── TOTAL */}
            <div className="flex justify-between items-center py-4 border-t border-b border-border">
              <p className="font-body font-semibold text-foreground">Total</p>
              <p className="font-price font-semibold text-foreground">
                £{total.toFixed(2)}
              </p>
            </div>

            {/* ── CHECKOUT BUTTON */}
            <button className="w-full py-4 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity mt-4">
              Checkout
            </button>

            {/* ── TERMS */}
            <p className="font-body text-xs text-muted-foreground mt-4 leading-relaxed">
              By selecting checkout, you confirm that you have read and agree to
              our <span className="underline cursor-pointer">Terms of Use</span>
              , <span className="underline cursor-pointer">Terms of Sale</span>{" "}
              and{" "}
              <span className="underline cursor-pointer">Returns Policy</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
