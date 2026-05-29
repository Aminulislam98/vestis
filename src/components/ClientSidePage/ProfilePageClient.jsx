"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LogOut,
  Package,
  Truck,
  Zap,
  Clock,
  ArrowRight,
  X,
} from "lucide-react";

// ── Delivery info
const deliveryInfo = {
  standard: { label: "Standard Delivery", icon: Truck },
  express: { label: "Express Delivery", icon: Zap },
  nextday: { label: "Next Day Delivery", icon: Clock },
};

export default function ProfilePageClient({ user }) {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  // ── Get user initials for avatar fallback
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  // ── Fetch user orders
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch(`http://localhost:4000/orders?userId=${user.id}`);
      const data = await res.json();
      setOrders(data.orders || []);
      setLoadingOrders(false);
    };
    fetchOrders();
  }, [user.id]);

  // ── Sign out
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      {/* ── SIGN OUT MODAL */}
      {showSignOutModal && (
        <>
          {/* ── Overlay */}
          <div
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            onClick={() => setShowSignOutModal(false)}
          />

          {/* ── Modal */}
          <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-sm bg-background rounded-2xl p-6 flex flex-col gap-6">
            {/* ── Close button */}
            <div className="flex items-center justify-between">
              <p className="font-body font-bold text-xl text-foreground">
                Sign Out
              </p>
              <button
                onClick={() => setShowSignOutModal(false)}
                className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-border transition-colors"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* ── Message */}
            <p className="font-body text-base text-muted-foreground">
              Are you sure you want to sign out of your Vestis account?
            </p>

            {/* ── Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSignOut}
                className="w-full py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={() => setShowSignOutModal(false)}
                className="w-full py-3.5 border border-border text-foreground font-body font-semibold text-base hover:bg-accent transition-colors rounded-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── HEADER */}
      <div className="px-4 sm:px-8 h-14 flex items-center justify-between max-w-3xl mx-auto w-full">
        <Link
          href="/"
          className="font-heading text-xl tracking-[0.25em] uppercase text-foreground"
        >
          Vestis
        </Link>
        <button
          onClick={() => setShowSignOutModal(true)}
          className="flex items-center gap-2 font-body text-base text-muted-foreground hover:text-foreground transition-colors"
        >
          <LogOut size={16} strokeWidth={1.75} />
          Sign Out
        </button>
      </div>

      {/* ── MAIN */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-10">
        {/* ── USER INFO */}
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
            {user?.image ? (
              <Image
                src={user.image}
                alt={user.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-foreground flex items-center justify-center">
                <span className="font-body font-bold text-xl text-background">
                  {initials}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-body font-bold text-2xl text-foreground">
              {user?.name}
            </p>
            <p className="font-body text-base text-muted-foreground">
              {user?.email}
            </p>
            <p className="font-body text-base text-muted-foreground">
              Member since{" "}
              {new Date(user?.createdAt || Date.now()).toLocaleDateString(
                "en-GB",
                {
                  month: "long",
                  year: "numeric",
                },
              )}
            </p>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* ── ORDERS SECTION */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-body font-bold text-xl text-foreground">
              Your Orders
            </h2>
            <p className="font-body text-base text-muted-foreground">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>

          {loadingOrders && (
            <p className="font-body text-base text-muted-foreground py-8 text-center">
              Loading orders...
            </p>
          )}

          {!loadingOrders && orders.length === 0 && (
            <div className="flex flex-col items-center gap-5 py-16">
              <Package
                size={48}
                strokeWidth={1}
                className="text-muted-foreground"
              />
              <div className="flex flex-col gap-1 text-center">
                <p className="font-body font-semibold text-foreground text-lg">
                  No orders yet
                </p>
                <p className="font-body text-base text-muted-foreground">
                  When you place an order, it will appear here.
                </p>
              </div>
              <Link
                href="/products"
                className="px-8 py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
              >
                Start Shopping
              </Link>
            </div>
          )}

          {orders.map((order) => {
            const delivery =
              deliveryInfo[order.deliveryMethod] || deliveryInfo.standard;
            const DeliveryIcon = delivery.icon;

            return (
              <div
                key={order.orderId}
                className="flex flex-col rounded-2xl overflow-hidden border border-border"
              >
                {/* ── ORDER HEADER */}
                <div className="flex items-center justify-between px-5 py-4 bg-[#f5f5f5] dark:bg-accent">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-body font-semibold text-base text-foreground">
                      {order.orderId}
                    </p>
                    <p className="font-body text-base text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                      {" · "}
                      {order.items.length}{" "}
                      {order.items.length === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <span className="font-body text-base font-semibold text-foreground bg-background px-4 py-1.5 rounded-full capitalize">
                    {order.status}
                  </span>
                </div>

                {/* ── ITEMS */}
                <div className="p-5 flex flex-col gap-5 bg-background">
                  <div className="flex flex-col gap-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div
                          className="relative shrink-0 rounded-xl overflow-hidden bg-[#f5f5f5]"
                          style={{ width: "90px", aspectRatio: "3/4" }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="90px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-col justify-between flex-1 py-1">
                          <div className="flex flex-col gap-1">
                            <p className="font-body text-base text-muted-foreground uppercase tracking-widest">
                              {item.brand}
                            </p>
                            <p className="font-body font-semibold text-base text-foreground leading-snug">
                              {item.name}
                            </p>
                            <p className="font-body text-base text-muted-foreground">
                              Size: {item.size} · Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-price font-bold text-lg text-foreground">
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
                      <p className="font-body text-base text-muted-foreground">
                        Subtotal
                      </p>
                      <p className="font-price text-base text-foreground">
                        £{order.subtotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <DeliveryIcon
                          size={16}
                          strokeWidth={1.75}
                          className="text-muted-foreground shrink-0"
                        />
                        <p className="font-body text-base text-muted-foreground">
                          {delivery.label}
                        </p>
                      </div>
                      <p className="font-price text-base text-foreground">
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
                      <p className="font-price font-bold text-xl text-foreground">
                        £{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="h-px bg-border" />

        {/* ── QUICK LINKS */}
        <div className="flex flex-col">
          <Link
            href="/track-order"
            className="flex items-center justify-between py-4 border-b border-border hover:opacity-70 transition-opacity group"
          >
            <p className="font-body font-semibold text-base text-foreground">
              Track an Order
            </p>
            <ArrowRight
              size={18}
              strokeWidth={1.75}
              className="text-muted-foreground group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-between py-4 border-b border-border hover:opacity-70 transition-opacity group"
          >
            <p className="font-body font-semibold text-base text-foreground">
              Continue Shopping
            </p>
            <ArrowRight
              size={18}
              strokeWidth={1.75}
              className="text-muted-foreground group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
