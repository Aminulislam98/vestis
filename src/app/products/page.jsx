import ProductsPageClient from "@/components/ClientSidePage/ProductsPageClient";
import React from "react";

const getProducts = async (gender = "", category = "") => {
  const res = await fetch(
    `http://localhost:4000/products?gender=${gender}&category=${category}`,
  );
  const data = await res.json();
  return data.data;
};

const Products = async ({ searchParams }) => {
  const sp = await searchParams;
  const gender = sp.gender;
  const category = sp.category;
  const products = await getProducts(gender, category);

  return (
    <div>
      <ProductsPageClient
        products={products}
        gender={gender}
        category={category}
      ></ProductsPageClient>
    </div>
  );
};

export default Products;
