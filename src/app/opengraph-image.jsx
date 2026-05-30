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
      <span
        style={{
          color: "#fff",
          fontSize: 96,
          letterSpacing: 24,
        }}
      >
        VESTIS
      </span>

      <div style={{ width: 80, height: 1, background: "#444" }} />

      <span
        style={{
          color: "#888",
          fontSize: 24,
          letterSpacing: 6,
        }}
      >
        PREMIUM FASHION STORE
      </span>
    </div>,
    { ...size },
  );
}
