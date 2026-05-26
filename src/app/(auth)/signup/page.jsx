"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const signupSchema = z
  .object({
    firstName: z.string().min(2, "Min 2 characters").max(50),
    lastName: z.string().min(2, "Min 2 characters").max(50),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(8, "Min 8 characters").max(64),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = useCallback(
    async (values) => {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1400));
        toast.success("Account created!", {
          description: `Welcome to Vestis, ${values.firstName}.`,
        });
        form.reset();
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [form],
  );

  // ── Apple style input class
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
            Create your account
          </p>
        </div>

        {/* ── Form */}
        <Form {...form}>
          <div className="flex flex-col gap-3">
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First name"
                        className={inputCls}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-body text-xs px-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last name"
                        className={inputCls}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="font-body text-xs px-1" />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email address"
                      className={inputCls}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="font-body text-xs px-1" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`${inputCls} pr-12`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={15} />
                        ) : (
                          <Eye size={15} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="font-body text-xs px-1" />
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirm ? "text" : "password"}
                        placeholder="Confirm password"
                        className={`${inputCls} pr-12`}
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="font-body text-xs px-1" />
                </FormItem>
              )}
            />

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
              type="button"
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
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
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* ── Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="font-body text-xs text-muted-foreground">
                or
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* ── Google */}
            <button
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

            {/* Sign in */}
            <p className="font-body text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-foreground font-semibold hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}
