import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

// for protected pages. not logged in -> go to sign in, then come back here
export async function requireSession(backTo: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?next=${encodeURIComponent(backTo)}&auth=required`);
  }
  return session;
}
