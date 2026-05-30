import Link from "next/link";
import Image from "next/image";

export default function HeroBanner() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500&display=swap');
      `}</style>

      <section className="w-full">
        {/* ── DESKTOP */}
        <div className="hidden md:flex w-full h-[95vh]">
          <div className="relative flex-1 h-full overflow-hidden group">
            <Image
              src="https://images.unsplash.com/photo-1635269854520-6e3ab978c85f?q=80&w=5340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Beyond the Basics — New Collection"
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />

            {/* ── Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* ── Top label */}
            <div className="absolute top-10 left-12 flex items-center gap-3">
              <div className="w-8 h-px bg-white/40" />
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.3em",
                }}
                className="text-white/50 text-xs uppercase font-bold"
              >
                New Collection
              </p>
            </div>

            {/* ── Main content */}
            <div className="absolute bottom-0 left-0 right-0 px-12 pb-16">
              {/* ── Label */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-px bg-white/50" />
                <p
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.35em",
                  }}
                  className="text-white/60 text-xs uppercase font-bold"
                >
                  Vestis 2025
                </p>
              </div>

              {/* ── Heading */}
              <h1
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  lineHeight: "0.88",
                  letterSpacing: "-0.02em",
                }}
                className="text-white font-black text-[100px] xl:text-[130px] uppercase max-w-5xl mb-6"
              >
                Beyond
                <br />
                <span className="text-white/80 italic">the Basics.</span>
              </h1>

              {/* ── Description */}
              <p
                style={{ fontFamily: "'Barlow', sans-serif" }}
                className="text-white/55 text-base font-medium max-w-sm mb-10 leading-relaxed tracking-wide"
              >
                Elevate your everyday. Premium fashion
                <br />
                for those who refuse to blend in.
              </p>

              {/* ── CTAs */}
              <div className="flex items-center gap-4">
                <Link
                  href="/products?gender=womens"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                  className="bg-white text-black font-bold text-base uppercase px-10 py-4 hover:bg-black hover:text-white transition-all duration-300"
                >
                  Shop Women
                </Link>
                <Link
                  href="/products?gender=mens"
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    letterSpacing: "0.15em",
                  }}
                  className="bg-transparent border border-white/60 text-white font-bold text-base uppercase px-10 py-4 hover:bg-white hover:text-black transition-all duration-300"
                >
                  Shop Men
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE */}
        <div className="md:hidden relative w-full h-[92vh]">
          <Image
            src="https://images.unsplash.com/photo-1759725608366-ea7a6e64dbe3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Beyond the Basics — New Collection"
            fill
            className="object-cover object-center"
            priority
          />

          {/* ── Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 px-6 pb-14">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-5 h-px bg-white/40" />
              <p
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.35em",
                }}
                className="text-white/55 text-xs uppercase font-bold"
              >
                Vestis 2025
              </p>
            </div>

            <h1
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                lineHeight: "0.88",
                letterSpacing: "-0.02em",
              }}
              className="text-white font-black text-[72px] uppercase mb-5"
            >
              Beyond
              <br />
              <span className="text-white/80 italic">the Basics.</span>
            </h1>

            <p
              style={{ fontFamily: "'Barlow', sans-serif" }}
              className="text-white/60 text-base font-medium max-w-xs mb-8 leading-relaxed"
            >
              Elevate your everyday. Premium fashion for those who refuse to
              blend in.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/products?gender=womens"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.15em",
                }}
                className="bg-white text-black font-bold text-base uppercase px-6 py-3.5 text-center hover:bg-black hover:text-white transition-all duration-300 rounded"
              >
                Shop Women
              </Link>
              <Link
                href="/products?gender=mens"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.15em",
                }}
                className="bg-transparent border border-white/60 text-white font-bold text-base uppercase px-6 py-3.5 text-center hover:bg-white hover:text-black transition-all duration-300 rounded"
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
