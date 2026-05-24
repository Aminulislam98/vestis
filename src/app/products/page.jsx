import ProductsPageClient from "@/components/ClientSidePage/ProductsPageClient";
import React from "react";

const Products = async () => {
  const res = await fetch("http://localhost:4000/products");
  const data = await res.json();
  const products = data.data;
  return (
    <div>
      <ProductsPageClient products={products}></ProductsPageClient>
    </div>
  );
};

export default Products;
