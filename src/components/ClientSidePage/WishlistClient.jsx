"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { getGuestId } from "@/lib/guestId";
import useCartStore from "@/store/cartStore";

export default function WishlistClient({ user }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { incrementCart } = useCartStore();
  const { data: session, isPending } = authClient.useSession();
  const userId = session?.user?.id || null;
  const [guestId, setGuestId] = useState(null);

  useEffect(() => {
    if (!userId) setGuestId(getGuestId());
  }, [userId]);

  useEffect(() => {
    if (isPending) return;
    const fetchWishlist = async () => {
      let url;
      if (userId) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist?userId=${userId}`;
      } else if (guestId) {
        url = `${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist?guestId=${guestId}`;
      } else return;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
      setLoading(false);
    };
    fetchWishlist();
  }, [isPending, userId, guestId]);

  const handleRemove = async (productId) => {
    setItems(items.filter((i) => i.productId !== productId));
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist/remove`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, guestId, productId }),
    });
  };

  const handleAddToBag = async (item) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cart/add`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId,
        guestId,
        productId: item.productId,
        name: item.name,
        brand: item.brand,
        image: item.image,
        price: item.price,
        slug: item.slug,
        size: "M",
        quantity: 1,
      }),
    });
    incrementCart();
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-12 py-10">
        {/* ── HEADER */}
        <div className="flex items-end justify-between pb-6  mb-6 px-3 sm:px-0">
          <div>
            <h1 className="font-body font-bold text-2xl text-foreground">
              Saved Items
            </h1>
            {!loading && (
              <p className="font-body text-base text-muted-foreground mt-1">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            )}
          </div>
          <Link
            href="/products"
            className="font-body text-base text-foreground hover:opacity-60 transition-opacity underline underline-offset-4"
          >
            Continue Shopping
          </Link>
        </div>

        {/* ── LOADING */}
        {loading && (
          <p className="font-body text-base text-muted-foreground py-20 text-center">
            Loading...
          </p>
        )}

        {/* ── EMPTY */}
        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center gap-5 py-24 text-center">
            <div className="w-16 h-16 bg-[#f5f5f5] flex items-center justify-center">
              <Heart
                size={28}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-body font-bold text-lg text-foreground">
                No saved items yet
              </p>
              <p className="font-body text-base text-muted-foreground">
                Items you save will appear here.
              </p>
            </div>
            <Link
              href="/products"
              className="px-6 py-3 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity"
            >
              Shop Now
            </Link>
          </div>
        )}

        {/* ── ITEMS GRID */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4 gap-y-8">
            {items.map((item) => (
              <div key={item.productId} className="flex flex-col gap-3">
                {/* ── Image + Remove button */}
                <div className="relative group">
                  <Link href={`/products/${item.slug}`}>
                    <div
                      className="relative w-full overflow-hidden bg-[#f5f5f5]"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* ── Remove button — top right */}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="absolute top-2 right-2 w-7 h-7 bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                  >
                    <X size={14} strokeWidth={2} className="text-foreground" />
                  </button>
                </div>

                {/* ── Details */}
                <div className="flex flex-col gap-1 px-2 sm:px-0">
                  <p className="font-body text-sm text-muted-foreground">
                    {item.brand}
                  </p>
                  <Link href={`/products/${item.slug}`}>
                    <p className="font-body font-semibold text-base text-foreground leading-snug line-clamp-2 hover:underline">
                      {item.name}
                    </p>
                  </Link>
                  <p className="font-price font-bold text-base text-foreground">
                    £{item.price.toFixed(2)}
                  </p>
                </div>

                {/* ── Add to Bag */}
                <button
                  onClick={() => handleAddToBag(item)}
                  className="w-full py-2.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity"
                >
                  Add to Bag
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
