"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client"; // Import your auth client
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninClient() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // getting callback url to redirect the users
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const router = useRouter();

  // getting user session

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

      toast.success("Welcome back!", {
        description: "You have successfully signed in.",
      });
      const guestId = localStorage.getItem("vestis-guest-id");
      if (guestId && data.user?.id) {
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart/merge", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            guestId,
            userId: data.user?.id,
          }),
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
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  const inputCls =
    "h-11 px-4 rounded-xl bg-accent border-0 text-foreground placeholder:text-muted-foreground font-body text-base focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:bg-accent transition-all";

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-center px-5">
      {/* ── Go back — mobile only */}
      <div className="w-full max-w-sm mb-4">
        <Link
          href="/"
          className="md:hidden inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={2} />
          Back
        </Link>
      </div>

      {/* ── Card */}
      <div className="w-full max-w-sm flex flex-col gap-5">
        {/* ── Brand */}
        <div className="text-center">
          <Link
            href="/"
            className="font-heading text-2xl tracking-[0.25em] uppercase text-foreground"
          >
            Vestis
          </Link>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Sign in to your account
          </p>
        </div>

        {/* ── Form */}
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className={inputCls}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className={`${inputCls} w-full pr-12`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <Link
              href="#"
              className="font-body text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          {/* Terms */}
          <p className="font-body text-xs text-muted-foreground text-center leading-relaxed px-2">
            By continuing you agree to our{" "}
            <a
              href="#"
              className="text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-foreground underline underline-offset-2 hover:text-muted-foreground transition-colors"
            >
              Privacy Policy
            </a>
            .
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full h-11 rounded-xl
              bg-foreground text-background
              font-body text-sm font-semibold
              hover:opacity-80 active:scale-[0.98]
              transition-all duration-200
              disabled:opacity-40
              flex items-center justify-center gap-2
            "
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
            <span className="font-body text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* ── Google */}
          <button
            onClick={handleSigninGoogle}
            type="button"
            className="
              w-full h-11 rounded-xl
              border border-border bg-background
              font-body text-sm font-medium text-foreground
              hover:bg-accent transition-colors duration-200
              flex items-center justify-center gap-2.5
            "
          >
            <FcGoogle size={18} />
            Continue with Google
          </button>

          {/* Sign up link */}
          <p className="font-body text-sm text-center text-muted-foreground">
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
  );
}
