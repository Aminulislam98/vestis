export default function ProductCardSkeleton() {
  return (
    <div className="block animate-pulse">
      {/* ── Image skeleton */}
      <div
        className="w-full bg-[#e8e8e8] max-h-100 md:max-h-105 2xl:max-h-150"
        style={{ aspectRatio: "3/4" }}
      />

      {/* ── Info skeleton */}
      <div className="sm:px-0 px-3.5 pb-1 mt-2 flex flex-col gap-2">
        <div className="h-4 w-20 bg-[#e8e8e8] rounded" />
        <div className="h-4 w-3/4 bg-[#e8e8e8] rounded" />
        <div className="h-4 w-16 bg-[#e8e8e8] rounded" />
      </div>
    </div>
  );
}
