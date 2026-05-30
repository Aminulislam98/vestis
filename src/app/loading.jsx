export default function Loading() {
  return (
    <div className="w-full min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* ── Logo */}
        <p
          style={{ fontFamily: "var(--font-signature)" }}
          className="text-3xl text-foreground"
        >
          Vestis
        </p>

        {/* ── Loading bar */}
        <div className="w-32 h-0.5 bg-border overflow-hidden">
          <div className="h-full bg-foreground animate-[loading_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
