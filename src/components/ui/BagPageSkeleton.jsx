export default function BagPageSkeleton() {
  return (
    <div className="w-full min-h-screen bg-background animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
        {/* ── PAGE TITLE */}
        <div className="h-7 w-24 bg-[#e8e8e8] rounded mb-8" />

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* ── LEFT — BAG ITEMS */}
          <div className="w-full lg:flex-1 flex flex-col">
            {/* ── Delivery banner */}
            <div className="h-12 w-full bg-[#e8e8e8] rounded-2xl mb-6" />

            {/* ── Items */}
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex gap-4 sm:gap-6 py-6 border-b border-border"
              >
                {/* ── Image */}
                <div
                  className="w-24 sm:w-32 shrink-0 bg-[#e8e8e8] rounded-xl"
                  style={{ aspectRatio: "3/4" }}
                />

                {/* ── Details */}
                <div className="flex flex-col justify-between flex-1 gap-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="h-3 w-16 bg-[#e8e8e8] rounded" />
                      <div className="h-4 w-3/4 bg-[#e8e8e8] rounded" />
                      <div className="h-3 w-20 bg-[#e8e8e8] rounded" />
                    </div>
                    <div className="h-5 w-16 bg-[#e8e8e8] rounded shrink-0" />
                  </div>

                  {/* ── Quantity controls */}
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-28 bg-[#e8e8e8] rounded-xl" />
                    <div className="h-9 w-9 bg-[#e8e8e8] rounded-xl" />
                    <div className="h-9 w-9 bg-[#e8e8e8] rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── RIGHT — ORDER SUMMARY */}
          <div className="w-full lg:w-[380px] flex flex-col gap-0">
            <div className="h-px bg-border" />
            <div className="flex justify-between py-4 border-t border-border">
              <div className="h-4 w-16 bg-[#e8e8e8] rounded" />
              <div className="h-4 w-16 bg-[#e8e8e8] rounded" />
            </div>
            <div className="flex justify-between py-4 border-t border-border">
              <div className="h-4 w-24 bg-[#e8e8e8] rounded" />
              <div className="h-4 w-12 bg-[#e8e8e8] rounded" />
            </div>
            <div className="flex justify-between py-5 border-t border-b border-border">
              <div className="h-5 w-12 bg-[#e8e8e8] rounded" />
              <div className="h-5 w-20 bg-[#e8e8e8] rounded" />
            </div>
            <div className="h-12 w-full bg-[#e8e8e8] rounded-full mt-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
