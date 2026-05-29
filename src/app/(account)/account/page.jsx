import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfilePageClient from "@/components/ClientSidePage/ProfilePageClient";

export default async function AccountPage() {
  // ── Server side session check
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // ── Not logged in → redirect to signin
  if (!session?.user) {
    redirect("/signin?callbackUrl=/account");
  }

  return <ProfilePageClient user={session.user} />;
}
