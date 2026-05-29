"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Heart, Minus, Plus, ShoppingBag } from "lucide-react";
import { getGuestId } from "@/lib/guestId";
import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { authClient } from "@/lib/auth-client";

export default function BagPageClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { incrementCart, decrementCart, setCartCount } = useCartStore();
  const { data: session } = authClient.useSession();
  const [promoOpen, setPromoOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  // ── Fetch cart items on load
  useEffect(() => {
    const fetchCart = async () => {
      let url;
      if (session?.user?.id) {
        url = `http://localhost:4000/cart?userId=${session?.user?.id}`;
      } else {
        const guestId = getGuestId();
        url = `http://localhost:4000/cart?guestId=${guestId}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    };
    fetchCart();
  }, [session?.user?.id]);

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

    const userId = session?.user?.id || null;
    const guestId = userId ? null : getGuestId();

    fetch(`http://localhost:4000/cart/update`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        productId,
        userId,
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
    const userId = session?.user?.id || null;
    const guestId = userId ? null : getGuestId();
    await fetch(`http://localhost:4000/cart/update`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        guestId,
        userId,
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
    for (let i = 0; i < deletedItem.quantity; i++) {
      decrementCart();
    }
    const userId = session?.user?.id || null;
    const guestId = userId ? null : getGuestId();
    await fetch(`http://localhost:4000/cart/delete`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ guestId, userId, productId, size }),
    });
  };

  // ── Wishlist placeholder
  function handleWishlist(id) {
    console.log("Add to wishlist:", id);
  }

  // ── Calculate totals — only if items exist
  const subtotal =
    items.length > 0
      ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
      : 0;
  const deliveryThreshold = 50;
  const isDeliveryFree = subtotal >= deliveryThreshold;
  const deliveryCharge = isDeliveryFree ? 0 : 4.99;

  // ── Only add delivery charge if there are items
  const total = items.length > 0 ? subtotal + deliveryCharge : 0;

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        {/* ── PAGE TITLE */}
        <h1 className="font-body font-semibold text-2xl text-foreground mb-8">
          Bag {items.length > 0 && `(${items.length})`}
        </h1>

        {/* ── EMPTY BAG */}
        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <ShoppingBag
              size={48}
              strokeWidth={1}
              className="text-muted-foreground"
            />
            <div className="text-center flex flex-col gap-2">
              <p className="font-body font-semibold text-foreground text-lg">
                Your bag is empty
              </p>
              <p className="font-body text-muted-foreground text-base">
                Add some items to get started
              </p>
            </div>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* ── MAIN LAYOUT — only show if items exist */}
        {items.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* ── LEFT — BAG ITEMS */}
            <div className="w-full lg:flex-1 flex flex-col">
              {/* ── FREE DELIVERY BANNER */}
              {!isDeliveryFree && (
                <div className="bg-[#f5f5f5] dark:bg-accent rounded-2xl px-5 py-4 mb-6">
                  <p className="font-body text-sm text-foreground">
                    Spend{" "}
                    <span className="font-semibold">
                      £{(deliveryThreshold - subtotal).toFixed(2)}
                    </span>{" "}
                    more for free UK delivery
                  </p>
                </div>
              )}

              {isDeliveryFree && (
                <div className="bg-[#f5f5f5] dark:bg-accent rounded-2xl px-5 py-4 mb-6">
                  <p className="font-body text-sm text-foreground font-semibold">
                    🎉 You qualify for free UK delivery!
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
                  <Link href={`/products/${item.slug}`}>
                    <div
                      className="relative w-24 sm:w-32 shrink-0 bg-[#f5f5f5] rounded-xl overflow-hidden"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* ── PRODUCT DETAILS */}
                  <div className="flex flex-col justify-between flex-1 gap-4">
                    {/* ── Top — brand + name + size + price */}
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">
                          {item.brand}
                        </p>
                        <Link
                          href={`/products/${item.slug}`}
                          className="font-body font-semibold text-foreground text-base hover:underline leading-snug"
                        >
                          {item.name}
                        </Link>
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

                      {/* ── Price */}
                      <div className="text-right shrink-0">
                        <p className="font-price font-bold text-foreground text-lg">
                          £{(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="font-body text-muted-foreground text-sm">
                            £{item.price.toFixed(2)} each
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ── Bottom — quantity + actions */}
                    <div className="flex items-center gap-3">
                      {/* ── QUANTITY CONTROLS */}
                      <div className="flex items-center bg-accent rounded-xl overflow-hidden">
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
                            ${item.quantity === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-border"}`}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className="w-9 h-9 flex items-center justify-center font-body text-base font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleIncrease(item.productId, item.size)
                          }
                          className="w-9 h-9 flex items-center justify-center hover:bg-border transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>

                      {/* ── DELETE BUTTON */}
                      <button
                        onClick={() => handleRemove(item.productId, item.size)}
                        className="w-9 h-9 flex items-center justify-center bg-accent rounded-xl hover:bg-border transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} strokeWidth={1.75} />
                      </button>

                      {/* ── WISHLIST BUTTON */}
                      <button
                        onClick={() => handleWishlist(item.productId)}
                        className="w-9 h-9 flex items-center justify-center bg-accent rounded-xl hover:bg-border transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart size={14} strokeWidth={1.75} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── RIGHT — ORDER SUMMARY */}
            <div className="w-full lg:w-[380px] lg:sticky lg:top-8 lg:self-start flex flex-col gap-0">
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
                      className="flex-1 h-11 border border-border px-3 font-body text-base bg-background text-foreground outline-none focus:border-foreground transition-colors rounded-xl"
                    />
                    <button className="px-5 py-2 bg-foreground text-background font-body text-base font-semibold hover:opacity-80 transition-opacity rounded-xl">
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

              {/* ── CHECKOUT BUTTON — disabled if no items */}
              <Link
                href={items.length > 0 ? "/checkout" : "#"}
                className={`w-full py-4 font-body font-semibold text-base transition-opacity mt-5 text-center block rounded-full
                  ${
                    items.length > 0
                      ? "bg-foreground text-background hover:opacity-80"
                      : "bg-foreground/40 text-background cursor-not-allowed pointer-events-none"
                  }`}
              >
                Checkout
              </Link>

              {/* ── TRACK ORDER LINK */}
              <Link
                href="/track-order"
                className="font-body text-sm text-muted-foreground text-center hover:text-foreground transition-colors underline underline-offset-4 mt-4"
              >
                Track an existing order
              </Link>

              {/* ── TERMS */}
              <p className="font-body text-sm text-muted-foreground mt-4 leading-relaxed text-center">
                By selecting checkout, you agree to our{" "}
                <span className="underline cursor-pointer">Terms of Use</span>,{" "}
                <span className="underline cursor-pointer">Terms of Sale</span>{" "}
                and{" "}
                <span className="underline cursor-pointer">Returns Policy</span>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
