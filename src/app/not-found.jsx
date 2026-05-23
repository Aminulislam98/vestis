import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
      {/* Big 404 */}
      <p
        className="font-heading text-foreground/5 leading-none select-none"
        style={{ fontSize: "clamp(8rem, 25vw, 22rem)" }}
      >
        404
      </p>

      {/* Content */}
      <div className="text-center -mt-8 md:-mt-16">
        <h1
          className="font-heading text-foreground tracking-wide"
          style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)" }}
        >
          PAGE NOT FOUND
        </h1>
        <p
          className="font-body text-muted-foreground mt-4 max-w-md mx-auto"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.1rem)" }}
        >
          The page you are looking for does not exist or has been moved. Let us
          help you find what you need.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/"
            className="font-body font-semibold text-sm tracking-widest uppercase px-10 py-4 bg-foreground text-background hover:opacity-80 transition-opacity duration-200"
          >
            Back to Home
          </Link>
          <Link
            href="/women"
            className="font-body font-semibold text-sm tracking-widest uppercase px-10 py-4 border border-border text-foreground hover:bg-accent transition-colors duration-200"
          >
            Shop Women
          </Link>
          <Link
            href="/men"
            className="font-body font-semibold text-sm tracking-widest uppercase px-10 py-4 border border-border text-foreground hover:bg-accent transition-colors duration-200"
          >
            Shop Men
          </Link>
        </div>

        {/* Logo at bottom */}
        <p
          className="font-heading text-muted-foreground/30 mt-16 tracking-[0.3em]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          VESTIS
        </p>
      </div>
    </main>
  );
}
