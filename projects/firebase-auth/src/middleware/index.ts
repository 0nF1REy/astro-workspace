import { defineMiddleware } from "astro:middleware";
import { auth } from "@lib/firebase/server";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect, locals } = context;

  const isAuthRoute =
    url.pathname.startsWith("/signin") || url.pathname.startsWith("/register");
  const isProtectedRoute = url.pathname.startsWith("/dashboard");

  const sessionCookie = cookies.get("__session")?.value;

  if (sessionCookie) {
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

      locals.user = {
        uid: decodedClaims.uid,
        email: decodedClaims.email || "",
      };

      if (isAuthRoute) {
        return redirect("/dashboard");
      }
    } catch {
      cookies.delete("__session", { path: "/" });
    }
  }

  if (!locals.user && isProtectedRoute) {
    return redirect("/signin");
  }

  return next();
});
