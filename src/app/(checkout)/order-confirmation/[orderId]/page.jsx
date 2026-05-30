import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, Truck, Zap, Clock } from "lucide-react";

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

export default async function OrderConfirmationPage({ params }) {
  const { orderId } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/order/${orderId}`,
  );
  const data = await res.json();
  const order = data?.order;

  if (!order) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground text-base">
          Order not found
        </p>
      </div>
    );
  }

  const delivery = deliveryInfo[order.deliveryMethod] || deliveryInfo.standard;
  const DeliveryIcon = delivery.icon;

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {/* ── HEADER */}
      <div className="px-4 sm:px-8 h-14 flex items-center max-w-7xl mx-auto w-full">
        <p
          style={{ fontFamily: "var(--font-signature)" }}
          className="text-2xl text-foreground"
        >
          Vestis
        </p>
      </div>

      {/* ── MAIN */}
      <div className="flex-1">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
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
                Order Confirmed
              </h1>
              <p className="font-body text-sm text-muted-foreground mt-0.5">
                {order.orderId}
              </p>
            </div>
          </div>

          {/* ── DIVIDER */}
          <div className="h-px bg-border" />

          {/* ── CONTENT */}
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ── LEFT */}
            <div className="flex-1 flex flex-col gap-4">
              {/* ── THANK YOU MESSAGE */}
              <p className="font-body text-base text-foreground">
                Thank you,{" "}
                <span className="font-semibold">
                  {order.deliveryDetails.name}
                </span>
                . Your order is confirmed and will be dispatched soon.
              </p>

              {/* ── DELIVERY METHOD */}
              <div className="bg-[#f5f5f5] dark:bg-accent rounded-2xl p-5 flex flex-col gap-4">
                <p className="font-body font-semibold text-base text-foreground">
                  Delivery
                </p>
                <div className="flex items-center gap-3">
                  <DeliveryIcon
                    size={18}
                    strokeWidth={1.75}
                    className="text-foreground shrink-0"
                  />
                  <div>
                    <p className="font-body font-semibold text-sm text-foreground">
                      {delivery.label}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      Estimated {delivery.days}
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
                    <p className="font-body text-sm text-muted-foreground mt-1">
                      {order.deliveryDetails.email}
                    </p>
                    <p className="font-body text-sm text-muted-foreground">
                      {order.deliveryDetails.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── CONTINUE SHOPPING */}
              <Link
                href="/"
                className="w-full py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity text-center rounded-full block"
              >
                Continue Shopping
              </Link>
            </div>

            {/* ── RIGHT — ORDER SUMMARY */}
            <div className="w-full lg:w-[320px] bg-[#f5f5f5] dark:bg-accent rounded-2xl p-5 flex flex-col gap-4">
              <p className="font-body font-semibold text-base text-foreground">
                Order Summary
              </p>

              {/* ── Items */}
              <div className="flex flex-col gap-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="relative w-14 h-[72px] shrink-0 rounded-lg overflow-hidden bg-background">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
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

              {/* ── Order date */}
              <p className="font-body text-sm text-muted-foreground">
                Ordered on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
