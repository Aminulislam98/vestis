"use client";
import Link from "next/link";
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  ArrowRight,
  User,
  UserCheck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CheckoutOptionsClient() {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        {/* ── HEADER */}
        <div className="text-center">
          <h1 className="font-body font-semibold text-2xl sm:text-3xl text-foreground">
            How would you like to checkout?
          </h1>
          <p className="font-body text-muted-foreground text-base mt-2">
            Choose the option that works best for you
          </p>
        </div>

        {/* ── OPTIONS */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* ── LEFT — MEMBER — dark card */}
          <div className="flex-1 flex flex-col gap-6 bg-foreground text-background p-8 rounded-2xl">
            {/* ── Icon + Label */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center">
                <UserCheck
                  size={20}
                  strokeWidth={1.75}
                  className="text-background"
                />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-background/60">
                Vestis Member
              </p>
            </div>

            {/* ── Title */}
            <div className="flex flex-col gap-1">
              <h2 className="font-body font-bold text-2xl text-background">
                Sign in to your account
              </h2>
              <p className="font-body text-base text-background/70">
                Enjoy exclusive member benefits and faster checkout.
              </p>
            </div>

            {/* ── Benefits */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-3">
                <Truck
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-background/70"
                />
                <p className="font-body text-base text-background">
                  Free delivery over £50
                </p>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-background/70"
                />
                <p className="font-body text-base text-background">
                  Free returns within 30 days
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-background/70"
                />
                <p className="font-body text-base text-background">
                  Saved addresses & order history
                </p>
              </div>
            </div>

            {/* ── Buttons */}
            <div className="flex flex-col gap-3 mt-2">
              <Link
                href={`/signin?callbackUrl=${encodeURIComponent("/checkout/details")}`}
                className="w-full py-3.5 bg-background text-foreground font-body font-semibold text-base hover:opacity-80 transition-opacity text-center rounded-full"
              >
                Sign In
              </Link>
              <Link
                href={`/signup?callbackUrl=${encodeURIComponent("/checkout/details")}`}
                className="w-full py-3.5 bg-background/20 text-background font-body font-semibold text-base hover:bg-background/30 transition-colors text-center rounded-full"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* ── DIVIDER */}
          <div className="flex lg:hidden items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="font-body text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="hidden lg:flex flex-col items-center justify-center gap-2">
            <div className="flex-1 w-px bg-border" />
            <span className="font-body text-sm text-muted-foreground">or</span>
            <div className="flex-1 w-px bg-border" />
          </div>

          {/* ── RIGHT — GUEST — light card */}
          <div className="flex-1 flex flex-col gap-6 bg-[#f5f5f5] dark:bg-accent p-8 rounded-2xl border border-black">
            {/* ── Icon + Label */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                <User
                  size={20}
                  strokeWidth={1.75}
                  className="text-foreground"
                />
              </div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Guest Checkout
              </p>
            </div>

            {/* ── Title */}
            <div className="flex flex-col gap-1">
              <h2 className="font-body font-bold text-2xl text-foreground">
                Continue as a guest
              </h2>
              <p className="font-body text-base text-muted-foreground">
                No account needed. Quick and easy.
              </p>
            </div>

            {/* ── Info */}
            <div className="flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-3">
                <ArrowRight
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-muted-foreground"
                />
                <p className="font-body text-base text-foreground">
                  No registration required
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Truck
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-muted-foreground"
                />
                <p className="font-body text-base text-foreground">
                  Standard delivery available
                </p>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={17}
                  strokeWidth={1.75}
                  className="shrink-0 text-muted-foreground"
                />
                <p className="font-body text-base text-foreground">
                  Secure checkout guaranteed
                </p>
              </div>
            </div>

            {/* ── Button */}
            <div className="mt-2">
              <Link
                href="/checkout/details?guest=true"
                className="w-full py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity text-center rounded-full block"
              >
                Continue as Guest
              </Link>
            </div>
          </div>
        </div>

        {/* ── TRUST */}
        <p className="font-body text-sm text-muted-foreground text-center">
          Your payment information is always secure and encrypted.
        </p>
      </div>
    </div>
  );
}
