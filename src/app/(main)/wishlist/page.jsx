import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import WishlistClient from "@/components/ClientSidePage/WishlistClient";

export default async function WishlistPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return <WishlistClient user={session?.user || null} />;
}
