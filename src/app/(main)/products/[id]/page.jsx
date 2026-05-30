import ProductDetailPageClient from "@/components/product/ProductDetailPageClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// ── Dynamic metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,
      { next: { revalidate: 3600 } },
    );
    const product = await res.json();

    return {
      title: `${product.name} | Vestis`,
      description:
        product.description ||
        `Shop ${product.name} by ${product.brand} at Vestis.`,
      openGraph: {
        title: `${product.name} | Vestis`,
        description:
          product.description ||
          `Shop ${product.name} by ${product.brand} at Vestis.`,
        images: [{ url: product.images[0].url, alt: product.name }],
      },
    };
  } catch {
    return {
      title: "Product | Vestis",
      description: "Shop premium fashion at Vestis.",
    };
  }
}
// ── Page component
const ProductDetailPage = async ({ params }) => {
  const { id } = await params;
  let product = null;

  try {
    const tokenData = await auth.api.getToken({
      headers: await headers(),
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/product/${id}`,
      {
        headers: {
          authorization: `Bearer ${tokenData?.token}`,
        },
        cache: "no-store",
      },
    );

    if (res.ok) {
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
