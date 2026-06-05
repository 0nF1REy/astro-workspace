import { defineMiddleware } from "astro:middleware";
import { auth } from "@lib/firebase/server";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect, locals } = context;

  const protectedRoutes = ["/dashboard"];
  const authRoutes = ["/signin", "/register"];

  const sessionCookie = cookies.get("__session")?.value;

  if (sessionCookie) {
    try {
      const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

      locals.user = {
        uid: decodedClaims.uid,
        email: decodedClaims.email || "",
      };

      if (authRoutes.includes(url.pathname)) {
        return redirect("/dashboard");
      }
    } catch (error) {
      cookies.delete("__session", { path: "/" });
    }
  }

  if (!locals.user && protectedRoutes.includes(url.pathname)) {
    return redirect("/signin");
  }

  return next();
});
