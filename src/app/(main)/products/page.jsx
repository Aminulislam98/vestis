import ProductsPageClient from "@/components/ClientSidePage/ProductsPageClient";
import React from "react";

const getProducts = async (
  gender = "",
  category = "",
  search = "",
  subcategory = "",
  sort = "",
) => {
  const params = new URLSearchParams();
  if (gender) params.set("gender", gender);
  if (category) params.set("category", category);
  if (search) params.set("search", search);
  if (subcategory) params.set("subcategory", subcategory);
  if (sort) params.set("sort", sort);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products?${params.toString()}`,
  );
  const data = await res.json();
  return data.data ?? [];
};

const Products = async ({ searchParams }) => {
  const sp = await searchParams;
  const gender = sp.gender;
  const category = sp.category;
  const search = sp.search;
  const subcategory = sp.subcategory;
  const sort = sp.sort;
  const products = await getProducts(
    gender,
    category,
    search,
    subcategory,
    sort,
  );

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
