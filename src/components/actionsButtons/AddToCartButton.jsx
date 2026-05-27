import { getGuestId } from "@/lib/guestId";
import React from "react";
import { toast } from "sonner";

const AddToCartButton = ({ selectedSize, product }) => {
  console.log(product);
  const handleAddToBag = async () => {
    // validating the size
    if (!selectedSize) {
      toast.error("Please select a size", {
        style: {
          borderRadius: "0px",
          background: "#000",
          color: "#fff",
          fontSize: "14px",
        },
      });
      return;
    } else {
      toast.success("Added", {
        style: {
          borderRadius: "0px",
          background: "#000",
          color: "#fff",
          fontSize: "14px",
        },
      });
    }

    const guestId = getGuestId();

    const res = await fetch(`http://localhost:4000/cart/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        guestId,
        productId: product._id,
        name: product.name,
        brand: product.brand,
        image: product.images[0].url,
        price: product.isOnSale ? product.salePrice : product.price,
        size: selectedSize,
        slug: product.slug,
        quantity: 1,
      }),
    });
    if (res.ok) {
      toast.success("added to bag!");
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <button
      onClick={handleAddToBag}
      className="w-full py-4 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity"
    >
      Add to Bag
    </button>
  );
};

export default AddToCartButton;
