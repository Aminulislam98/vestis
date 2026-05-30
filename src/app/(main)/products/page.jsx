import ProductsPageClient from "@/components/ClientSidePage/ProductsPageClient";
import React from "react";

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const gender = params?.gender;
  const category = params?.subcategory;

  // ── Title build করো
  let title = "All Products | Vestis";
  if (gender === "mens") title = "Men's Fashion | Vestis";
  if (gender === "womens") title = "Women's Fashion | Vestis";
  if (gender === "mens" && category) title = `Men's ${category} | Vestis`;
  if (gender === "womens" && category) title = `Women's ${category} | Vestis`;

  // ── Description build করো
  let description = "Shop the latest fashion at Vestis.";
  if (gender === "mens")
    description =
      "Shop the latest men's fashion at Vestis. Free UK delivery on orders over £50.";
  if (gender === "womens")
    description =
      "Shop the latest women's fashion at Vestis. Free UK delivery on orders over £50.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://vestis.co.uk/products",
      siteName: "Vestis",
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

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
