import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="w-full mx-auto min-h-screen bg-background">
      {/* ── TOP BAR skeleton */}
      <div className="sticky top-0 z-30 w-full px-4 py-3 bg-background flex items-center justify-between border-b border-border">
        <div className="h-5 w-28 bg-[#e8e8e8] rounded animate-pulse" />
        <div className="h-5 w-24 bg-[#e8e8e8] rounded animate-pulse" />
      </div>

      {/* ── GRID skeleton */}
      <div className="w-full sm:px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-x-4 gap-y-8">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
