"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      setIsLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (error) {
        toast.error(error.message || "Sign in failed");
        return;
      }

      toast.success("Welcome back!");

      const guestId = localStorage.getItem("vestis-guest-id");
      if (guestId && data.user?.id) {
        // ── Cart merge
        await fetch("http://localhost:4000/cart/merge", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ guestId, userId: data.user.id }),
        });

        // ── Wishlist merge
        await fetch("http://localhost:4000/wishlist/merge", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ guestId, userId: data.user.id }),
        });

        localStorage.removeItem("vestis-guest-id");
      }

      const safeUrl = callbackUrl.startsWith("/") ? callbackUrl : "/";
      router.push(safeUrl);
      e.target.reset();
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSigninGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  const inputCls =
    "w-full h-11 px-4 rounded-xl bg-accent border-0 text-foreground placeholder:text-muted-foreground font-body text-base outline-none focus:ring-2 focus:ring-foreground/20 transition-all";

  return (
    <div className="min-h-screen w-full bg-background flex flex-col">
      {/* ── HEADER — logo top */}
      <div className="w-full px-6 h-14 flex items-center justify-center border-b border-border">
        <Link
          href="/"
          className="font-heading text-xl tracking-[0.25em] uppercase text-foreground"
        >
          Vestis
        </Link>
      </div>

      {/* ── MAIN — centered */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-sm flex flex-col gap-6">
          {/* ── Title */}
          <div className="flex flex-col gap-1">
            <h1 className="font-body font-bold text-2xl text-foreground">
              Sign In
            </h1>
            <p className="font-body text-base text-muted-foreground">
              Welcome back to Vestis
            </p>
          </div>

          {/* ── Form */}
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            {/* ── Email */}
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              className={inputCls}
            />

            {/* ── Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
                className={`${inputCls} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* ── Forgot password */}
            <div className="text-right -mt-1">
              <Link
                href="#"
                className="font-body text-base text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* ── Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-full bg-foreground text-background font-body font-semibold text-base hover:opacity-80 active:scale-[0.98] transition-all disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* ── Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="font-body text-base text-muted-foreground">
                or
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── Google */}
            <button
              onClick={handleSigninGoogle}
              type="button"
              className="w-full h-11 rounded-full border border-border bg-background font-body text-base font-medium text-foreground hover:bg-accent transition-colors flex items-center justify-center gap-2.5"
            >
              <FcGoogle size={18} />
              Continue with Google
            </button>

            {/* ── Terms */}
            <p className="font-body text-base text-muted-foreground text-center leading-relaxed">
              By continuing you agree to our{" "}
              <a
                href="#"
                className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Privacy Policy
              </a>
            </p>

            {/* ── Sign up link */}
            <p className="font-body text-base text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link
                href={`/signup?callbackUrl=${callbackUrl}`}
                className="text-foreground font-semibold hover:underline transition-colors"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
