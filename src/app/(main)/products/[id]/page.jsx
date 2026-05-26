import ProductDetailPageClient from "@/components/product/ProductDetailPageClient";
import React from "react";

const ProductDetailPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:4000/product/${id}`);
  const product = await res.json();

  return (
    <div>
      <ProductDetailPageClient product={product} />
    </div>
  );
};

export default ProductDetailPage;
