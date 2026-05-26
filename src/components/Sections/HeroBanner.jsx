import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <section className="w-full">
      {/* Desktop */}
      <div className="hidden md:flex w-full h-[95vh]">
        <div className="relative flex-1 h-full overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1758738180213-9320972d07eb?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="New Collection"
            fill
            className="object-cover object-center"
            priority
          />

          {/* Dark overlay — heavier at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

          {/* Top-left house mark */}
          <div className="absolute top-10 left-12">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.35em",
              }}
              className="text-white/60 text-[10px] uppercase font-light"
            >
              Est. 2024 &nbsp;·&nbsp; London
            </p>
          </div>

          {/* Top-right season tag */}
          <div className="absolute top-10 right-12">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.3em",
              }}
              className="text-white/50 text-[10px] uppercase font-light"
            >
              Spring — Summer 2025
            </p>
          </div>

          {/* Main content — bottom left */}
          <div className="absolute bottom-0 left-0 right-0 px-12 pb-16">
            {/* Thin rule */}
            <div className="w-8 h-px bg-white/50 mb-8" />

            {/* Collection label */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.45em",
              }}
              className="text-white/60 text-[10px] uppercase mb-5 font-light"
            >
              New Collection
            </p>

            {/* Main headline */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.02em",
                lineHeight: "1.05",
              }}
              className="text-white font-light text-[72px] xl:text-[88px] max-w-3xl mb-8"
            >
              The Art of
              <br />
              <em className="not-italic font-extralight text-white/80">
                Dressing Well.
              </em>
            </h1>

            {/* Divider row */}
            <div className="flex items-center gap-6 mb-10">
              <div className="h-px w-12 bg-white/30" />
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  letterSpacing: "0.15em",
                }}
                className="text-white/55 text-[13px] font-light uppercase"
              >
                Refined essentials, exceptional craft
              </p>
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-10">
              <Link
                href="/products?gender=womens"
                style={{
                  letterSpacing: "0.3em",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
                className="text-white text-[11px] uppercase font-light border-b border-white/60 pb-0.5 hover:border-white hover:text-white/80 transition-all duration-300"
              >
                Shop Women
              </Link>

              <span className="text-white/30 text-xs">·</span>

              <Link
                href="/products?gender=mens"
                style={{
                  letterSpacing: "0.3em",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
                className="text-white text-[11px] uppercase font-light border-b border-white/60 pb-0.5 hover:border-white hover:text-white/80 transition-all duration-300"
              >
                Shop Men
              </Link>

              <span className="text-white/30 text-xs">·</span>

              <Link
                href="/products"
                style={{
                  letterSpacing: "0.3em",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
                className="text-white text-[11px] uppercase font-light border-b border-white/60 pb-0.5 hover:border-white hover:text-white/80 transition-all duration-300"
              >
                All Collections
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden relative w-full h-[60vh]">
        <Image
          src="https://images.unsplash.com/photo-1756451182421-d2a1961638c9?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="New Collection"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-6 left-5 right-5">
          <Link
            href="/products"
            style={{
              letterSpacing: "0.3em",
              fontFamily: "'Cormorant Garamond', serif",
            }}
            className="inline-block text-white text-[11px] uppercase font-light border-b border-white/60 pb-0.5"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
