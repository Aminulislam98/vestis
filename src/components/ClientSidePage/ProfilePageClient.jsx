"use client";
import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Package, MapPin, Truck, Zap, Clock } from "lucide-react";

// ── Delivery info
const deliveryInfo = {
  standard: { label: "Standard Delivery", icon: Truck },
  express: { label: "Express Delivery", icon: Zap },
  nextday: { label: "Next Day Delivery", icon: Clock },
};

// ── Tabs
const tabs = ["Orders", "Address Book"];

export default function ProfilePageClient({ user }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Orders");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // ── Get user initials
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
      {/* ── HEADER */}
      <div className="px-4 sm:px-8 h-14 flex items-center max-w-3xl mx-auto w-full">
        <Link
          href="/"
          className="font-heading text-xl tracking-[0.25em] uppercase text-foreground"
        >
          Vestis
        </Link>
      </div>

      {/* ── MAIN */}
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-8">
        {/* ── USER INFO */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* ── Avatar */}
            <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center shrink-0">
              <span className="font-body font-bold text-lg text-background">
                {initials}
              </span>
            </div>

            {/* ── Name + Email */}
            <div className="flex flex-col gap-0.5">
              <p className="font-body font-bold text-xl text-foreground">
                {user?.name}
              </p>
              <p className="font-body text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>

          {/* ── Sign out */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Sign Out
          </button>
        </div>

        {/* ── TABS */}
        <div className="flex gap-0 border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-body font-semibold text-base pb-3 pr-8 transition-all border-b-2 -mb-px
                ${
                  activeTab === tab
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── ORDERS TAB */}
        {activeTab === "Orders" && (
          <div className="flex flex-col gap-4">
            {/* ── Loading */}
            {loadingOrders && (
              <p className="font-body text-base text-muted-foreground py-8 text-center">
                Loading orders...
              </p>
            )}

            {/* ── No orders */}
            {!loadingOrders && orders.length === 0 && (
              <div className="flex flex-col items-center gap-4 py-16">
                <Package
                  size={40}
                  strokeWidth={1}
                  className="text-muted-foreground"
                />
                <p className="font-body text-base text-muted-foreground">
                  You have no orders yet
                </p>
                <Link
                  href="/products"
                  className="px-6 py-3 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
                >
                  Start Shopping
                </Link>
              </div>
            )}

            {/* ── ORDER CARDS — always expanded */}
            {orders.map((order) => {
              const delivery =
                deliveryInfo[order.deliveryMethod] || deliveryInfo.standard;
              const DeliveryIcon = delivery.icon;

              return (
                <div
                  key={order.orderId}
                  className="bg-[#f5f5f5] dark:bg-accent rounded-2xl overflow-hidden"
                >
                  {/* ── ORDER HEADER */}
                  <div className="flex items-center justify-between p-5">
                    <div className="flex flex-col gap-1">
                      <p className="font-body font-semibold text-base text-foreground">
                        {order.orderId}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
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

                    {/* ── Status badge */}
                    <span className="font-body text-sm font-semibold text-foreground bg-background px-3 py-1 rounded-full capitalize">
                      {order.status}
                    </span>
                  </div>

                  {/* ── ORDER DETAILS — always visible */}
                  <div className="px-5 pb-5 flex flex-col gap-4">
                    <div className="h-px bg-border" />

                    {/* ── Items */}
                    <div className="flex flex-col gap-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="relative w-14 h-[72px] shrink-0 rounded-xl overflow-hidden bg-background">
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

                    {/* ── Delivery + Total */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DeliveryIcon
                          size={16}
                          strokeWidth={1.75}
                          className="text-muted-foreground"
                        />
                        <p className="font-body text-sm text-muted-foreground">
                          {delivery.label}
                        </p>
                      </div>
                      <p className="font-price font-bold text-base text-foreground">
                        £{order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── ADDRESS BOOK TAB */}
        {activeTab === "Address Book" && (
          <div className="flex flex-col items-center gap-4 py-16">
            <MapPin
              size={40}
              strokeWidth={1}
              className="text-muted-foreground"
            />
            <p className="font-body text-base text-muted-foreground">
              No saved addresses yet
            </p>
            <button className="px-6 py-3 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full">
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
