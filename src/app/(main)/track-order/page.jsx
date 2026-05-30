"use client";
import { useState } from "react";
import {
  Search,
  Mail,
  Package,
  MapPin,
  Truck,
  Zap,
  Clock,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

const inputCls =
  "w-full h-11 px-4 bg-accent border-0 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition-all";

// ── Delivery method info
const deliveryInfo = {
  standard: {
    label: "Standard Delivery",
    days: "3-5 working days",
    icon: Truck,
  },
  express: { label: "Express Delivery", days: "1-2 working days", icon: Zap },
  nextday: {
    label: "Next Day Delivery",
    days: "Next working day",
    icon: Clock,
  },
};

export default function TrackOrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ── Order state — null means not found yet
  const [order, setOrder] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.currentTarget.elements["email"].value;
    const orderId = e.currentTarget.elements["orderId"].value;

    // ── Fetch order from server
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/track-order?orderId=${orderId}&email=${email}`,
    );
    const data = await res.json();

    if (res.ok) {
      // ── Order found → show order details
      setOrder(data.order);
    } else {
      // ── Order not found → show error
      setError("No order found. Please check your email and Order ID.");
    }

    setLoading(false);
  };

  // ── Get delivery info based on order's delivery method
  const delivery = order
    ? deliveryInfo[order.deliveryMethod] || deliveryInfo.standard
    : null;
  const DeliveryIcon = delivery?.icon;

  return (
    <div className="w-full min-h-screen bg-background px-4 py-12">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-8">
        {/* ── Show form only if no order found yet */}
        {!order && (
          <>
            {/* ── HEADER */}
            <div className="flex flex-col gap-2">
              <h1 className="font-body font-bold text-2xl text-foreground">
                Track Your Order
              </h1>
              <p className="font-body text-base text-muted-foreground">
                Enter your email address and order ID to find your order
                details.
              </p>
            </div>

            {/* ── FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* ── Email */}
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className={inputCls}
              />

              {/* ── Order ID */}
              <input
                type="text"
                name="orderId"
                placeholder="Order ID (e.g. ORD-ABC123)"
                required
                className={inputCls}
              />

              {/* ── Error message */}
              {error && (
                <p className="font-body text-sm text-red-500">{error}</p>
              )}

              {/* ── Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full flex items-center justify-center gap-2 disabled:opacity-40 mt-2"
              >
                <Search size={18} strokeWidth={1.75} />
                {loading ? "Searching..." : "Find My Order"}
              </button>
            </form>

            {/* ── HELP — email reminder */}
            <div className="bg-[#f5f5f5] dark:bg-accent rounded-2xl p-5 flex gap-3">
              <Mail
                size={18}
                strokeWidth={1.75}
                className="text-muted-foreground shrink-0 mt-0.5"
              />
              <div className="flex flex-col gap-1">
                <p className="font-body font-semibold text-sm text-foreground">
                  Can't find your Order ID?
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Check your email inbox for your order confirmation. We sent
                  all your order details including your Order ID to the email
                  address you provided at checkout.
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── Show order details if order found */}
        {order && (
          <div className="flex flex-col gap-6">
            {/* ── SUCCESS HEADER */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-foreground flex items-center justify-center shrink-0">
                <CheckCircle
                  size={24}
                  strokeWidth={1.75}
                  className="text-background"
                />
              </div>
              <div>
                <h1 className="font-body font-bold text-2xl text-foreground">
                  Order Found
                </h1>
                <p className="font-body text-sm text-muted-foreground mt-0.5 break-all">
                  {order.orderId}
                </p>
              </div>
            </div>

            <div className="h-px bg-border" />

            {/* ── DELIVERY METHOD */}
            <div className="bg-[#f5f5f5] dark:bg-accent rounded-2xl p-5 flex flex-col gap-3">
              <p className="font-body font-semibold text-base text-foreground">
                Delivery
              </p>
              <div className="flex items-center gap-3">
                {DeliveryIcon && (
                  <DeliveryIcon
                    size={18}
                    strokeWidth={1.75}
                    className="text-foreground shrink-0"
                  />
                )}
                <div>
                  <p className="font-body font-semibold text-sm text-foreground">
                    {delivery?.label}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    Estimated {delivery?.days}
                  </p>
                </div>
              </div>
            </div>

            {/* ── DELIVERY ADDRESS */}
            <div className="bg-[#f5f5f5] dark:bg-accent rounded-2xl p-5 flex flex-col gap-3">
              <p className="font-body font-semibold text-base text-foreground">
                Delivery Address
              </p>
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.75}
                  className="text-muted-foreground shrink-0 mt-0.5"
                />
                <div className="flex flex-col gap-0.5">
                  <p className="font-body font-semibold text-sm text-foreground">
                    {order.deliveryDetails.name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {order.deliveryDetails.address1}
                  </p>
                  {order.deliveryDetails.address2 && (
                    <p className="font-body text-sm text-muted-foreground">
                      {order.deliveryDetails.address2}
                    </p>
                  )}
                  <p className="font-body text-sm text-muted-foreground">
                    {order.deliveryDetails.city},{" "}
                    {order.deliveryDetails.postcode}
                  </p>
                </div>
              </div>
            </div>

            {/* ── ORDER ITEMS */}
            <div className="bg-[#f5f5f5] dark:bg-accent rounded-2xl p-5 flex flex-col gap-4">
              <p className="font-body font-semibold text-base text-foreground">
                Items Ordered
              </p>

              {/* ── Items list */}
              <div className="flex flex-col gap-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
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
                        <p className="font-body text-muted-foreground text-sm">
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
                    £{order.subtotal.toFixed(2)}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-body text-sm text-foreground">Delivery</p>
                  <p className="font-price text-sm text-foreground">
                    {order.deliveryCharge === 0
                      ? "Free"
                      : `£${order.deliveryCharge.toFixed(2)}`}
                  </p>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <p className="font-body font-semibold text-base text-foreground">
                    Total
                  </p>
                  <p className="font-price font-bold text-lg text-foreground">
                    £{order.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* ── Order date + status */}
            <div className="flex items-center justify-between">
              <p className="font-body text-sm text-muted-foreground">
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <span className="font-body text-sm font-semibold text-foreground capitalize px-3 py-1 bg-[#f5f5f5] dark:bg-accent rounded-full">
                {order.status}
              </span>
            </div>

            {/* ── Search again button */}
            <button
              onClick={() => setOrder(null)}
              className="w-full py-3.5 border border-foreground text-foreground font-body font-semibold text-base hover:bg-accent transition-colors rounded-full"
            >
              Track Another Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
