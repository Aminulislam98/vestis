import { ImageResponse } from "next/og";

export async function GET(request, { params }) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,
  );
  const product = await res.json();

  const productImage = product?.images?.[0]?.url;
  const productName = product?.name ?? "Product";
  const productBrand = product?.brand ?? "";
  const productPrice = product?.price ?? "";

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#000",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ width: 420, height: 630, display: "flex", flexShrink: 0 }}>
        {productImage && (
          <img
            src={productImage}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 60px",
          gap: 20,
        }}
      >
        <span style={{ color: "#888", fontSize: 22, letterSpacing: 6 }}>
          {productBrand.toUpperCase()}
        </span>
        <span
          style={{
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {productName}
        </span>
        <div style={{ width: 60, height: 1, background: "#444" }} />
        <span style={{ color: "#fff", fontSize: 36 }}>£{productPrice}</span>
        <span
          style={{
            color: "#555",
            fontSize: 18,
            letterSpacing: 4,
            marginTop: 20,
          }}
        >
          VESTIS
        </span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
