import ProductDetailPageClient from "@/components/product/ProductDetailPageClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const ProductDetailPage = async ({ params }) => {
  const { id } = await params;
  const token = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,
    {
      headers: {
        authorization: `Bearer ${token.token}`,
      },
    },
  );
  const product = await res.json();

  return (
    <div>
      <ProductDetailPageClient product={product} />
    </div>
  );
};

export default ProductDetailPage;
// const { data: token } = await authClient.token();
