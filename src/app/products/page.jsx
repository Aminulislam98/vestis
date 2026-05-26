import ProductsPageClient from "@/components/ClientSidePage/ProductsPageClient";
import React from "react";

const getProducts = async (gender = "", category = "", search = "") => {
  const params = new URLSearchParams();
  if (gender) params.set("gender", gender);
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  const res = await fetch(
    `http://localhost:4000/products?${params.toString()}`,
  );
  const data = await res.json();
  return data.data;
};

const Products = async ({ searchParams }) => {
  const sp = await searchParams;
  const gender = sp.gender;
  const category = sp.category;
  const search = sp.search;
  const products = await getProducts(gender, category, search);

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
