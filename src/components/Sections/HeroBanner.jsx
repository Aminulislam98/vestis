import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <>
      {/* Load fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');
      `}</style>

      <section className="w-full">
        {/* Desktop */}
        <div className="hidden md:flex w-full h-[95vh]">
          <div className="relative flex-1 h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1635351002746-5813e205e1de?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="New Collection"
              fill
              className="object-cover object-center"
              priority
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            {/* Top label */}
            <div className="absolute top-10 left-12">
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.25em",
                }}
                className="text-white/60 text-[11px] uppercase font-700"
              >
                Spring / Summer 2025
              </p>
            </div>

            {/* Main content */}
            <div className="absolute bottom-0 left-0 right-0 px-12 pb-16">
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.3em",
                }}
                className="text-white/70 text-[11px] uppercase mb-4 font-bold"
              >
                New Collection
              </p>

              <h1
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  lineHeight: "0.92",
                  letterSpacing: "-0.01em",
                }}
                className="text-white font-black text-[96px] xl:text-[120px] uppercase max-w-4xl mb-8"
              >
                Just
                <br />
                <span className="text-white/90">Wear It.</span>
              </h1>

              <p
                style={{ fontFamily: "'Barlow', sans-serif" }}
                className="text-white/65 text-[15px] font-medium max-w-sm mb-10 leading-relaxed tracking-wide"
              >
                Premium streetwear built for every move. Designed to last, made
                to impress.
              </p>

              <div className="flex items-center gap-5">
                <Link
                  href="/products?gender=womens"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                  className="bg-white text-black font-bold text-base uppercase px-10 py-4 hover:bg-black hover:text-white transition-all duration-200"
                >
                  Shop Women
                </Link>
                <Link
                  href="/products?gender=mens"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                  className="bg-transparent border-2 border-white text-white font-bold text-base uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-200"
                >
                  Shop Men
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden relative w-full h-[80vh]">
          <Image
            src="https://images.unsplash.com/photo-1648322032206-888c91d99616?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="New Collection"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-12">
            <p
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                letterSpacing: "0.4em",
              }}
              className="text-white/70 text-[11px] uppercase mb-3 font-bold"
            >
              New Collection
            </p>

            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                lineHeight: "0.92",
                letterSpacing: "-0.01em",
              }}
              className="text-white font-black text-[65px] uppercase mb-5"
            >
              Just
              <br />
              <span className="text-white/90">Wear It.</span>
            </h1>

            <p
              style={{ fontFamily: "'Barlow', sans-serif" }}
              className="text-white text-base font-medium max-w-xs mb-8 leading-relaxed"
            >
              Premium streetwear built for every move.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/products?gender=womens"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.15em",
                }}
                className="bg-white text-black font-bold text-base uppercase px-6 py-3 text-center hover:bg-black hover:text-white transition-all duration-200"
              >
                Shop Women
              </Link>
              <Link
                href="/products?gender=mens"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.15em",
                }}
                className="bg-transparent border-2 border-white text-white font-bold text-base uppercase px-6 py-3 text-center hover:bg-white hover:text-black transition-all duration-200"
              >
                Shop Men
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
