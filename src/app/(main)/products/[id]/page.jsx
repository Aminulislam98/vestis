import ProductDetailPageClient from "@/components/product/ProductDetailPageClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ProductDetailPage = async ({ params }) => {
  const { id } = await params;

  

  let product = null;

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    

    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });

    

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`;
    

    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${tokenData?.token}`,
      },
      cache: "no-store",
    });

    

    if (!res.ok) {
      const text = await res.text();
      
    } else {
      product = await res.json();
      
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
