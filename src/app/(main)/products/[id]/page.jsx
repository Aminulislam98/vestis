import ProductDetailPageClient from "@/components/product/ProductDetailPageClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProductDetailPage = async ({ params }) => {
  const { id } = await params;

  let product = null;

  try {
    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });
    const payload = JSON.parse(
      Buffer.from(tokenData.token.split(".")[1], "base64").toString(),
    );
    console.log("JWT PAYLOAD:", payload);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,
      {
        headers: {
          authorization: `Bearer ${tokenData.token}`,
        },
        cache: "no-store",
      },
    );
    if (!res.ok) {
      console.error("fetch failed:", res.status, await res.text());
    } else {
      product = await res.json();
    }
  } catch (err) {
    console.error("ProductDetailPage error:", err);
  }

  return (
    <div>
      <ProductDetailPageClient product={product} />
    </div>
  );
};

export default ProductDetailPage;
// const { data: token } = await authClient.token();
