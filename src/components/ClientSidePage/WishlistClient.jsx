"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
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

  // ── guestId client side এ নাও
  useEffect(() => {
    const checkingUerId = () => {
      if (!userId) setGuestId(getGuestId());
    };
    checkingUerId();
  }, [userId]);

  // ── Fetch wishlist
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

  // ── Remove from wishlist
  const handleRemove = async (productId) => {
    setItems(items.filter((i) => i.productId !== productId));

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/wishlist/remove`, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId,
        guestId,
        productId,
      }),
    });
  };

  // ── Add to bag
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col gap-1">
            <h1 className="font-body font-bold text-2xl text-foreground">
              My Wishlist
            </h1>
            <p className="font-body text-base text-muted-foreground">
              {items.length} {items.length === 1 ? "item" : "items"}
            </p>
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
          <p className="font-body text-base text-muted-foreground text-center py-20">
            Loading...
          </p>
        )}

        {/* ── EMPTY */}
        {!loading && items.length === 0 && (
          <div className="flex flex-col items-center gap-6 py-24">
            <Heart
              size={56}
              strokeWidth={1}
              className="text-muted-foreground"
            />
            <div className="flex flex-col gap-2 text-center">
              <p className="font-body font-semibold text-xl text-foreground">
                Your wishlist is empty
              </p>
              <p className="font-body text-base text-muted-foreground">
                Save items you love and come back to them later.
              </p>
            </div>
            <Link
              href="/products"
              className="px-8 py-3.5 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full"
            >
              Start Shopping
            </Link>
          </div>
        )}

        {/* ── ITEMS GRID */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <div key={item.productId} className="flex flex-col gap-3">
                {/* ── Image */}
                <div className="relative group">
                  <Link href={`/products/${item.slug}`}>
                    <div
                      className="relative w-full overflow-hidden bg-[#f5f5f5] rounded-2xl"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* ── Remove button */}
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors shadow-sm"
                  >
                    <Trash2
                      size={16}
                      strokeWidth={1.75}
                      className="text-foreground"
                    />
                  </button>
                </div>

                {/* ── Details */}
                <div className="flex flex-col gap-1">
                  <p className="font-body text-sm text-muted-foreground uppercase tracking-widest">
                    {item.brand}
                  </p>
                  <p className="font-body font-semibold text-base text-foreground leading-snug line-clamp-2">
                    {item.name}
                  </p>
                  <p className="font-price font-bold text-base text-foreground">
                    £{item.price.toFixed(2)}
                  </p>
                </div>

                {/* ── Add to Bag */}
                <button
                  onClick={() => handleAddToBag(item)}
                  className="w-full py-3 bg-foreground text-background font-body font-semibold text-base hover:opacity-80 transition-opacity rounded-full flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} strokeWidth={1.75} />
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
