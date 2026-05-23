export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-6">
      {/* Animated logo */}
      <p
        className="font-heading text-foreground tracking-[0.3em] animate-pulse"
        style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
      >
        VESTIS
      </p>

      {/* Loading bar */}
      <div className="w-32 h-0.5 bg-border overflow-hidden rounded-full">
        <div className="h-full bg-foreground rounded-full animate-[loading_1.2s_ease-in-out_infinite]" />
      </div>
    </div>
  );
}
