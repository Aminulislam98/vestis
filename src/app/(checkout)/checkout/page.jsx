import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CheckoutOptionsClient from "@/components/ClientSidePage/CheckoutOptionsClient";

export default async function CheckoutPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // ── Already logged in → skip options
  if (session?.user) {
    redirect("/checkout/details");
  }

  // ── Not logged in → show options
  return <CheckoutOptionsClient />;
}
