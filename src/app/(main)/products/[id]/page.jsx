import ProductDetailPageClient from "@/components/product/ProductDetailPageClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProductDetailPage = async ({ params }) => {
  const { id } = await params;

  console.log("1. PAGE CALLED, id:", id);

  let product = null;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    console.log("2. SESSION:", session ? "EXISTS" : "NULL");

    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });

    console.log("3. TOKEN:", tokenData?.token ? "EXISTS" : "NULL");

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`;
    console.log("4. FETCHING URL:", url);

    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
      cache: "no-store",
    });

    console.log("5. RESPONSE STATUS:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.log("6. ERROR RESPONSE:", text);
    } else {
      product = await res.json();
      console.log("7. PRODUCT:", product ? product.name : "NULL");
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  }

  return (
    <div>
      <ProductDetailPageClient product={product} />
    </div>
  );
};

export default ProductDetailPage;
// const { data: token } = await authClient.token();
