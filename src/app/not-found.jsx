import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      {/* ── Content */}
      <div className="text-center flex flex-col items-center gap-6 max-w-lg">
        {/* ── Logo */}
        <p
          className="text-3xl text-foreground"
          style={{ fontFamily: "var(--font-signature)" }}
        >
          Vestis
        </p>

        {/* ── Heading */}
        <div className="flex flex-col gap-3">
          <h1 className="font-body font-bold text-2xl text-foreground">
            We can't find that page
          </h1>
          <p className="font-body text-base text-muted-foreground leading-relaxed">
            The page you're looking for may have been moved or no longer exists.
            Try heading back home or explore our latest collections.
          </p>
        </div>

        {/* ── Divider */}

        {/* ── Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity text-center rounded-full"
          >
            Back to Home
          </Link>
          <Link
            href="/products?gender=womens"
            className="w-full sm:w-auto px-8 py-3.5 border border-border text-foreground font-body font-semibold text-base hover:bg-accent transition-colors text-center rounded-full"
          >
            Shop Women
          </Link>
          <Link
            href="/products?gender=mens"
            className="w-full sm:w-auto px-8 py-3.5 border border-border text-foreground font-body font-semibold text-base hover:bg-accent transition-colors text-center rounded-full"
          >
            Shop Men
          </Link>
        </div>
      </div>
    </main>
  );
}
