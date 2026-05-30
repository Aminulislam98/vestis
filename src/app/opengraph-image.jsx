import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      {/* ── Logo */}
      <span
        style={{
          color: "#fff",
          fontSize: 96,
          fontFamily: "serif",
          letterSpacing: 24,
        }}
      >
        VESTIS
      </span>

      {/* ── Divider */}
      <div
        style={{
          width: 80,
          height: 1,
          background: "#444",
        }}
      />

      {/* ── Tagline */}
      <span
        style={{
          color: "#888",
          fontSize: 24,
          fontFamily: "sans-serif",
          letterSpacing: 6,
        }}
      >
        PREMIUM FASHION STORE
      </span>
    </div>,
    { ...size },
  );
}
