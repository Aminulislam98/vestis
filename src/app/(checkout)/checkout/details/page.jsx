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
  "w-full h-11 px-4 bg-accent border-0 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition-all";

export default function CheckoutDetailsClient() {
  const router = useRouter();
  // ── Delivery method state
  const [selectedDelivery, setSelectedDelivery] = useState("standard");

  // ── Cart items state
  const [items, setItems] = useState([]);

  // ── Form ref — to get form data on submit
  const formRef = useRef(null);

  // ── Session
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id || null;

  // ── Fetch cart items
  useEffect(() => {
    const guestId = userId ? null : getGuestId();
    if (isPending) return;

    const fetchCart = async () => {
      let url;
      if (userId) {
        url = `http://localhost:4000/cart?userId=${userId}`;
      } else {
        url = `http://localhost:4000/cart?guestId=${guestId}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
    };

    fetchCart();
  }, [isPending, session?.user?.id]);

  // getting logged in user data to fullfil input
  useEffect(() => {
    if (session?.user && formRef.current) {
      formRef.current.elements["name"].value = session?.user.name;
      formRef.current.elements["email"].value = session?.user.email;
    }
  }, [session]);

  // ── Calculate totals
  const subtotal = items.reduce((acc, item) => item.price * item.quantity, 0);

  // const deliveryCharge =
  //   deliveryOptions.find((d) => d.id === selectedDelivery)?.price || 0;
  // const isFreeDelivery = subtotal >= 50 && selectedDelivery === "standard";
  // const actualDeliveryCharge = isFreeDelivery ? 0 : deliveryCharge;
  // const total = subtotal + actualDeliveryCharge;

  const deliveryCharge =
    deliveryOptions.find((d) => d.id === selectedDelivery)?.price || 0;
  const isFreeDelivery =
    subtotal >= deliveryCharge && selectedDelivery === "standard";
  const actualDeliveryCharge = isFreeDelivery ? 0 : deliveryCharge;
  const total = subtotal + actualDeliveryCharge;
  // ── Handle form submit
  const handleSubmit = async (e) => {
    const guestId = userId ? null : getGuestId();
    e.preventDefault();

    // ── Get form data from e.currentTarget
    // const form = e.currentTarget;
    // const name = form.elements["name"].value;
    // const email = form.elements["email"].value;
    // const phone = form.elements["phone"].value;
    // const address1 = form.elements["address1"].value;
    // const address2 = form.elements["address2"].value;
    // const city = form.elements["city"].value;
    // const postcode = form.elements["postcode"].value;

    const form = e.currentTarget;
    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const phone = form.elements["phone"].value;
    const address1 = form.elements["address1"].value;
    const address2 = form.elements["address2"].value;
    const city = form.elements["city"].value;
    const postcode = form.elements["postcode"].value;

    // ── Order data to send to server
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
    const res = await fetch(`http://localhost:4000/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
    const data = await res.json();
    console.log("orderID:", data.orderId);
    if (res.ok) {
      router.push(`/order-confirmation/${data.orderId}`);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {/* ── HEADER */}
      <div className="px-4 sm:px-8 h-14 flex items-center justify-between max-w-7xl mx-auto w-full">
        <p className="font-heading text-xl tracking-[0.25em] uppercase text-foreground">
          Vestis
        </p>
        <p className="font-body text-sm text-muted-foreground">
          Secure Checkout
        </p>
      </div>

      {/* ── MAIN */}
      <div className="flex-1 flex items-start lg:items-center">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* ── FORM — wraps left side only */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row gap-8 items-start"
          >
            {/* ── LEFT — DELIVERY DETAILS + METHOD */}
            <div className="w-full lg:flex-1 flex flex-col gap-6">
              {/* ── DELIVERY DETAILS */}
              <div className="flex flex-col gap-3">
                <h2 className="font-body font-semibold text-lg text-foreground">
                  Delivery Details
                </h2>
                <div className="flex flex-col gap-2.5">
                  {/* ── Full name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    required
                    className={inputCls}
                  />

                  {/* ── Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                    className={inputCls}
                  />

                  {/* ── Phone */}
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    required
                    className={inputCls}
                  />

                  {/* ── Address line 1 */}
                  <input
                    type="text"
                    name="address1"
                    placeholder="Address line 1"
                    required
                    className={inputCls}
                  />

                  {/* ── Address line 2 optional */}
                  <input
                    type="text"
                    name="address2"
                    placeholder="Address line 2 (optional)"
                    className={inputCls}
                  />

                  {/* ── City + Postcode */}
                  <div className="grid grid-cols-2 gap-2.5">
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

              {/* ── DELIVERY METHOD */}
              <div className="flex flex-col gap-3">
                <h2 className="font-body font-semibold text-lg text-foreground">
                  Delivery Method
                </h2>
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
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                          ${
                            isSelected
                              ? "bg-foreground text-background"
                              : "bg-accent hover:bg-accent/80"
                          }`}
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.75}
                          className={`shrink-0 ${isSelected ? "text-background" : "text-foreground"}`}
                        />
                        <div className="flex flex-col flex-1">
                          <p
                            className={`font-body font-semibold text-sm ${isSelected ? "text-background" : "text-foreground"}`}
                          >
                            {option.label}
                          </p>
                          <p
                            className={`font-body text-sm ${isSelected ? "text-background/70" : "text-muted-foreground"}`}
                          >
                            {option.description}
                          </p>
                        </div>
                        <p
                          className={`font-price font-semibold text-sm shrink-0 ${isSelected ? "text-background" : "text-foreground"}`}
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
            <div className="w-full lg:w-[340px] lg:sticky lg:top-8 flex flex-col gap-5 bg-[#f5f5f5] dark:bg-accent p-6 rounded-2xl">
              <h2 className="font-body font-semibold text-lg text-foreground">
                Order Summary
              </h2>

              {/* ── Items */}
              <div className="flex flex-col gap-3">
                {items.length === 0 && (
                  <p className="font-body text-sm text-muted-foreground">
                    Your bag is empty
                  </p>
                )}
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex gap-3"
                  >
                    {/* ── Product image */}
                    <div className="relative w-14 h-[72px] shrink-0 rounded-lg overflow-hidden bg-background">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>

                    {/* ── Product details */}
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p className="font-body font-semibold text-foreground text-sm">
                          {item.brand}
                        </p>
                        <p className="font-body text-foreground text-sm leading-snug">
                          {item.name}
                        </p>
                        <p className="font-body text-muted-foreground text-sm mt-0.5">
                          Size: {item.size} · Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-price font-semibold text-foreground text-sm">
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
                  <p className="font-body text-sm text-foreground">Subtotal</p>
                  <p className="font-price text-sm text-foreground">
                    £{subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-body text-sm text-foreground">Delivery</p>
                  <p className="font-price text-sm text-foreground">
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
                  <p className="font-price font-bold text-lg text-foreground">
                    £{total.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ── Place Order button — submits the form */}
              <button
                type="submit"
                className="w-full py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
              >
                Place Order
              </button>

              <p className="font-body text-sm text-muted-foreground text-center leading-relaxed">
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
