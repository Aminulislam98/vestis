"use client";
import { useState } from "react";
import { Search, Mail } from "lucide-react";

const inputCls =
  "w-full h-11 px-4 bg-accent border-0 rounded-xl font-body text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-foreground/20 transition-all";

export default function TrackOrderPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.currentTarget.elements["email"].value;
    const orderId = e.currentTarget.elements["orderId"].value;

    // TODO: fetch order from server
    console.log({ email, orderId });

    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* ── HEADER */}
        <div className="flex flex-col gap-2">
          <h1 className="font-body font-bold text-2xl text-foreground">
            Track Your Order
          </h1>
          <p className="font-body text-base text-muted-foreground">
            Enter your email address and order ID to find your order details.
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

          {/* ── Error */}
          {error && <p className="font-body text-sm text-red-500">{error}</p>}

          {/* ── Submit */}
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
              Check your email inbox for your order confirmation. We sent all
              your order details including your Order ID to the email address
              you provided at checkout.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
