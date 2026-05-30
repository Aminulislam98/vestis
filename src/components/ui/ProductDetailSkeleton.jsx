export default function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="max-w-7xl sm:max-w-[1100px] 2xl:max-w-[1700px] mx-auto min-h-screen bg-background">
        <div className="flex flex-col lg:flex-row items-start lg:py-6 gap-4">
          {/* ── LEFT — Gallery */}
          <div className="w-full lg:w-[60%]">
            {/* ── Main image */}
            <div
              className="w-full bg-[#e8e8e8] sm:rounded-xl"
              style={{ aspectRatio: "3/4" }}
            />

            {/* ── Mobile — details under image */}
            <div className="lg:hidden py-2 flex flex-col gap-2 px-3 mt-2">
              <div className="h-4 w-16 bg-[#e8e8e8] rounded" />
              <div className="h-6 w-3/4 bg-[#e8e8e8] rounded" />
              <div className="h-4 w-1/3 bg-[#e8e8e8] rounded" />
              <div className="h-7 w-24 bg-[#e8e8e8] rounded mt-1" />
            </div>
          </div>

          {/* ── RIGHT — Details */}
          <div className="w-full flex flex-col gap-5 lg:pt-2 px-3">
            {/* ── Desktop — Brand, Name, Price */}
            <div className="hidden lg:flex flex-col gap-2">
              <div className="h-4 w-16 bg-[#e8e8e8] rounded" />
              <div className="h-6 w-3/4 bg-[#e8e8e8] rounded" />
              <div className="h-4 w-1/3 bg-[#e8e8e8] rounded" />
              <div className="h-8 w-28 bg-[#e8e8e8] rounded mt-1" />
            </div>

            {/* ── Size Selector */}
            <div className="flex flex-col gap-3">
              <div className="h-4 w-24 bg-[#e8e8e8] rounded" />
              <div className="flex gap-2 flex-wrap">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-10 w-16 bg-[#e8e8e8] rounded-xl" />
                ))}
              </div>
            </div>

            {/* ── Action Buttons */}
            <div className="flex flex-col gap-3">
              <div className="h-14 w-full bg-[#e8e8e8] rounded-full" />
              <div className="h-14 w-full bg-[#e8e8e8] rounded-full" />
            </div>

            {/* ── Product Info accordion */}
            <div className="flex flex-col gap-0 border-t border-border mt-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-12 w-full bg-[#e8e8e8] rounded my-1"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
