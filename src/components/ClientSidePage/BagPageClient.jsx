"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Heart, Minus, Plus } from "lucide-react";
import { getGuestId } from "@/lib/guestId";
import Link from "next/link";
import useCartStore from "@/store/cartStore";

export default function BagPageClient() {
  const [items, setItems] = useState([]);
  const { incrementCart, decrementCart, setCartCount, cartCount } =
    useCartStore();

  useEffect(() => {
    const fetchCart = async () => {
      const guestId = getGuestId();
      const res = await fetch(`http://localhost:4000/cart?guestId=${guestId}`);
      const data = await res.json();
      setItems(data.items || []);
    };
    fetchCart();
  }, []);

  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // ── Increase quantity

  const handleIncrease = (productId, size) => {
    const updateItems = items.map((item) =>
      item.productId === productId && item.size === size
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    setItems(updateItems);
    const updateItem = updateItems.find(
      (item) => item.productId === productId && item.size === size,
    );
    incrementCart();
    const guestId = getGuestId();
    fetch(`http://localhost:4000/cart/update`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        productId,
        size,
        guestId,
        quantity: updateItem.quantity,
      }),
    });
  };

  // ── Decrease quantity

  const handleDecrease = async (productId, size, quantity) => {
    if (quantity === 1) return;
    const updateProducts = items.map((item) =>
      item.productId === productId && item.size === size
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
          }
        : item,
    );
    setItems(updateProducts);
    const updateItem = updateProducts.find(
      (item) => item.productId === productId && item.size === size,
    );
    decrementCart();
    const guestId = getGuestId();
    await fetch(`http://localhost:4000/cart/update`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        guestId,
        productId,
        size,
        quantity: updateItem.quantity,
      }),
    });
  };

  // ── Remove item
  const handleRemove = async (productId, size) => {
    const deletedItem = items.find(
      (i) => i.productId === productId && i.size === size,
    );
    setItems(
      items.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    );

    setCartCount((prev) => prev - deletedItem.quantity);

    const guestId = getGuestId();
    await fetch(`http://localhost:4000/cart/delete`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ guestId, productId, size }),
    });
  };

  // ── Wishlist
  function handleWishlist(id) {
    console.log("Add to wishlist:", id);
  }

  // ── Calculate totals
  const subtotal = Array.isArray(items)
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;
  const deliveryThreshold = 50;
  const isDeliveryFree = subtotal >= deliveryThreshold;
  const deliveryCharge = isDeliveryFree ? 0 : 4.99;
  const total = subtotal + deliveryCharge;

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-6 lg:py-10">
        {/* ── FREE DELIVERY BANNER */}
        <div className="border border-border p-4 mb-8">
          <p className="font-body font-semibold text-foreground text-base">
            Free UK Delivery on orders over £{deliveryThreshold}
          </p>
          <p className="font-body text-muted-foreground text-sm mt-1">
            {isDeliveryFree
              ? "You qualify for free delivery! 🎉"
              : `Spend £${(deliveryThreshold - subtotal).toFixed(2)} more to get free delivery`}
          </p>
        </div>

        {/* ── MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ── LEFT — BAG ITEMS */}
          <div className="w-full lg:flex-1 flex flex-col">
            <h1 className="font-body font-semibold text-2xl text-foreground mb-6">
              Bag ({items.length})
            </h1>

            {/* ── Empty bag */}
            {items.length === 0 && (
              <div className="py-24 text-center">
                <p className="font-body text-muted-foreground text-base">
                  Your bag is empty
                </p>
              </div>
            )}

            {/* ── BAG ITEM LIST */}
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                className="flex gap-4 sm:gap-6 py-6 border-b border-border"
              >
                {/* ── PRODUCT IMAGE */}
                <div
                  className="relative w-28 sm:w-36 shrink-0 bg-[#f6f6f6]"
                  style={{ aspectRatio: "3/4" }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>

                {/* ── PRODUCT DETAILS */}
                <div className="flex flex-col justify-between flex-1 gap-3">
                  {/* ── Top — brand + name + meta */}
                  <div className="flex flex-col gap-1">
                    {/* ── Brand */}
                    <p className="font-body font-semibold text-foreground text-base">
                      {item.brand}
                    </p>

                    {/* ── Name */}
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-body text-foreground text-base hover:underline leading-snug"
                    >
                      {item.name}
                    </Link>

                    {/* ── Size + Colour */}
                    <div className="flex flex-col gap-0.5 mt-1">
                      <p className="font-body text-muted-foreground text-sm">
                        Size:{" "}
                        <span className="text-foreground font-medium">
                          {item.size}
                        </span>
                      </p>
                      {item.colour && (
                        <p className="font-body text-muted-foreground text-sm">
                          Colour:{" "}
                          <span className="text-foreground font-medium">
                            {item.colour}
                          </span>
                        </p>
                      )}
                    </div>

                    {/* ── PRICE — below details, bigger text */}
                    <p className="font-price font-bold text-foreground text-xl mt-2">
                      £{(item.price * item.quantity).toFixed(2)}
                    </p>
                    {/* ── Unit price if quantity > 1 */}
                    {item.quantity > 1 && (
                      <p className="font-body text-muted-foreground text-xs">
                        £{item.price.toFixed(2)} each
                      </p>
                    )}
                  </div>

                  {/* ── Bottom — quantity controls + actions */}
                  <div className="flex items-center gap-3">
                    {/* ── QUANTITY CONTROLS */}
                    <div className="flex items-center border border-border">
                      <button
                        onClick={() =>
                          handleDecrease(
                            item.productId,
                            item.size,
                            item.quantity,
                          )
                        }
                        disabled={item.quantity === 1}
                        className={`w-9 h-9 flex items-center justify-center transition-colors
                          ${
                            item.quantity === 1
                              ? "opacity-40 cursor-not-allowed"
                              : "hover:bg-accent"
                          }`}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={15} strokeWidth={1.75} />
                      </button>
                      <span className="w-9 h-9 flex items-center justify-center font-body text-base font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          handleIncrease(item.productId, item.size)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-accent transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={15} strokeWidth={1.75} />
                      </button>
                    </div>

                    {/* ── DELETE BUTTON */}
                    <button
                      onClick={() => handleRemove(item.productId, item.size)}
                      className="w-9 h-9 flex items-center justify-center border border-border hover:bg-accent transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} strokeWidth={1.75} />
                    </button>

                    {/* ── WISHLIST BUTTON */}
                    <button
                      onClick={() => handleWishlist(item.productId)}
                      className="w-9 h-9 flex items-center justify-center border border-border hover:bg-accent transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart size={15} strokeWidth={1.75} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT — ORDER SUMMARY */}
          <div className="w-full lg:w-96 lg:sticky lg:top-20 lg:self-start flex flex-col">
            <h2 className="font-body font-semibold text-2xl text-foreground mb-6">
              Summary
            </h2>

            {/* ── PROMO CODE */}
            <div className="border-t border-border">
              <button
                onClick={() => setPromoOpen(!promoOpen)}
                className="w-full flex items-center justify-between py-4 font-body text-base text-foreground hover:opacity-70 transition-opacity"
              >
                Do you have a Promo Code?
                <span className="text-xl">{promoOpen ? "−" : "+"}</span>
              </button>
              {promoOpen && (
                <div className="flex gap-2 pb-4">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                    className="flex-1 border border-border px-3 py-3 font-body text-base bg-background text-foreground outline-none focus:border-foreground transition-colors"
                  />
                  <button className="px-5 py-3 bg-foreground text-background font-body text-base font-semibold hover:opacity-80 transition-opacity">
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* ── SUBTOTAL */}
            <div className="flex justify-between items-center py-4 border-t border-border">
              <p className="font-body text-base text-foreground">Subtotal</p>
              <p className="font-price text-base font-medium text-foreground">
                £{subtotal.toFixed(2)}
              </p>
            </div>

            {/* ── DELIVERY */}
            <div className="flex justify-between items-center py-4 border-t border-border">
              <p className="font-body text-base text-foreground">
                Estimated Delivery
              </p>
              <p className="font-price text-base font-medium text-foreground">
                {isDeliveryFree ? "Free" : `£${deliveryCharge.toFixed(2)}`}
              </p>
            </div>

            {/* ── TOTAL */}
            <div className="flex justify-between items-center py-5 border-t border-b border-border">
              <p className="font-body font-semibold text-foreground text-lg">
                Total
              </p>
              <p className="font-price font-bold text-foreground text-xl">
                £{total.toFixed(2)}
              </p>
            </div>

            {/* ── CHECKOUT BUTTON */}
            <button className="w-full py-4 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity mt-5">
              Checkout
            </button>

            {/* ── TERMS */}
            <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed">
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
