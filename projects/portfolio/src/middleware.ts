import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = async (context, next) => {
  const shouldForce500 =
    import.meta.env.DEV && context.url.searchParams.get("__force500") === "1";

  if (shouldForce500) {
    throw new Error("Forced 500 error for development testing.");
  }

  return next();
};
