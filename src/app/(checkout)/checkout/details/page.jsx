"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Truck, Zap, Clock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getGuestId } from "@/lib/guestId";
import { useRouter } from "next/navigation";

const deliveryOptions = [
  {
    id: "standard",
    label: "Standard Delivery",
    description: "3-5 working days",
    price: 0,
    icon: Truck,
  },
  {
    id: "express",
    label: "Express Delivery",
    description: "1-2 working days",
    price: 4.99,
    icon: Zap,
  },
  {
    id: "nextday",
    label: "Next Day Delivery",
    description: "Order before 9pm",
    price: 7.99,
    icon: Clock,
  },
];

const inputCls =
  "w-full h-12 px-4 bg-background border border-border rounded-xl font-body text-base text-foreground placeholder:text-muted-foreground outline-none focus:border-foreground transition-all";

export default function CheckoutDetailsClient() {
  const router = useRouter();
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [items, setItems] = useState([]);
  const formRef = useRef(null);
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id || null;

  // ── Fetch cart items
  // FIX: Google login হলে Navbar merge এর জন্য 800ms wait করো
  // আগে merge হওয়ার আগেই fetch হচ্ছিল → items empty আসছিল ❌
  // তাই order এ empty items যাচ্ছিল → server reject করছিল ❌
  useEffect(() => {
    if (isPending) return;

    const fetchCart = async () => {
      // ── userId আছে মানে Google login হয়েছে
      // Navbar এ merge চলছে — merge শেষ হওয়ার আগেই fetch হলে empty আসবে
      // তাই 800ms wait করো
      if (userId) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      let url;
      if (userId) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cart?userId=${userId}`;
      } else {
        const guestId = getGuestId();
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/cart?guestId=${guestId}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
    };

    fetchCart();
  }, [isPending, session?.user?.id]);

  // ── Pre-fill form if logged in
  useEffect(() => {
    if (session?.user && formRef.current) {
      formRef.current.elements["name"].value = session?.user.name;
      formRef.current.elements["email"].value = session?.user.email;
    }
  }, [session]);

  // ── Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const deliveryCharge =
    deliveryOptions.find((d) => d.id === selectedDelivery)?.price || 0;
  const isFreeDelivery = subtotal >= 50 && selectedDelivery === "standard";
  const actualDeliveryCharge = isFreeDelivery ? 0 : deliveryCharge;
  const total = subtotal + actualDeliveryCharge;

  // ── Handle form submit
  const handleSubmit = async (e) => {
    const guestId = userId ? null : getGuestId();
    e.preventDefault();

    const form = e.currentTarget;
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const phone = form.elements["phone"].value;
    const address1 = form.elements["address1"].value;
    const address2 = form.elements["address2"].value;
    const city = form.elements["city"].value;
    const postcode = form.elements["postcode"].value;

    const orderData = {
      userId,
      guestId,
      items,
      deliveryDetails: {
        name,
        email,
        phone,
        address1,
        address2,
        city,
        postcode,
      },
      deliveryMethod: selectedDelivery,
      deliveryCharge: actualDeliveryCharge,
      subtotal,
      total,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/order`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    if (res.ok) {
      router.push(`/order-confirmation/${data.orderId}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-12 items-start"
          >
            {/* ── LEFT — DELIVERY DETAILS + METHOD */}
            <div className="w-full lg:flex-1 flex flex-col gap-8">
              {/* ── DELIVERY DETAILS */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-body font-bold text-xl text-foreground">
                    Delivery Details
                  </h2>
                  <p className="font-body text-base text-muted-foreground">
                    Where should we send your order?
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                    className={inputCls}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className={inputCls}
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    required
                    className={inputCls}
                  />
                  <input
                    type="text"
                    name="address1"
                    placeholder="Address line 1"
                    required
                    className={inputCls}
                  />
                  <input
                    type="text"
                    name="address2"
                    placeholder="Address line 2 (optional)"
                    className={inputCls}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      required
                      className={inputCls}
                    />
                    <input
                      type="text"
                      name="postcode"
                      placeholder="Postcode"
                      required
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>

              {/* ── DIVIDER */}
              <div className="h-px bg-border" />

              {/* ── DELIVERY METHOD */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-body font-bold text-xl text-foreground">
                    Delivery Method
                  </h2>
                  <p className="font-body text-base text-muted-foreground">
                    Choose how you want your order delivered.
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {deliveryOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = selectedDelivery === option.id;
                    const isFree = option.id === "standard" && subtotal >= 50;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedDelivery(option.id)}
                        className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all text-left border
                          ${
                            isSelected
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background border-border hover:border-foreground"
                          }`}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.75}
                          className={`shrink-0 ${isSelected ? "text-background" : "text-foreground"}`}
                        />
                        <div className="flex flex-col flex-1">
                          <p
                            className={`font-body font-semibold text-base ${isSelected ? "text-background" : "text-foreground"}`}
                          >
                            {option.label}
                          </p>
                          <p
                            className={`font-body text-base ${isSelected ? "text-background/70" : "text-muted-foreground"}`}
                          >
                            {option.description}
                          </p>
                        </div>
                        <p
                          className={`font-price font-semibold text-base shrink-0 ${isSelected ? "text-background" : "text-foreground"}`}
                        >
                          {isFree
                            ? "Free"
                            : option.price === 0
                              ? "Free"
                              : `£${option.price.toFixed(2)}`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── RIGHT — ORDER SUMMARY */}
            <div className="w-full lg:w-[360px] lg:sticky lg:top-8 flex flex-col gap-5 bg-[#f5f5f5] dark:bg-accent p-6 rounded-2xl">
              <h2 className="font-body font-bold text-xl text-foreground">
                Order Summary
              </h2>

              {/* ── Items */}
              <div className="flex flex-col gap-4">
                {items.length === 0 && (
                  <p className="font-body text-base text-muted-foreground">
                    Your bag is empty
                  </p>
                )}
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-3"
                  >
                    <div className="relative w-16 h-[84px] shrink-0 rounded-xl overflow-hidden bg-background">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p className="font-body font-semibold text-foreground text-base">
                          {item.brand}
                        </p>
                        <p className="font-body text-foreground text-base leading-snug">
                          {item.name}
                        </p>
                        <p className="font-body text-muted-foreground text-base mt-0.5">
                          Size: {item.size} · Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-price font-semibold text-foreground text-base">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="h-px bg-border" />

              {/* ── Totals */}
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="font-body text-base text-foreground">
                    Subtotal
                  </p>
                  <p className="font-price text-base text-foreground">
                    £{subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-body text-base text-foreground">
                    Delivery
                  </p>
                  <p className="font-price text-base text-foreground">
                    {actualDeliveryCharge === 0
                      ? "Free"
                      : `£${actualDeliveryCharge.toFixed(2)}`}
                  </p>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <p className="font-body font-semibold text-base text-foreground">
                    Total
                  </p>
                  <p className="font-price font-bold text-xl text-foreground">
                    £{total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ── Place Order */}
              <button
                type="submit"
                className="w-full py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
              >
                Place Order
              </button>

              <p className="font-body text-base text-muted-foreground text-center leading-relaxed">
                By placing your order you agree to our{" "}
                <span className="underline cursor-pointer">Terms of Use</span>{" "}
                and{" "}
                <span className="underline cursor-pointer">Returns Policy</span>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
