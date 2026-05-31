import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async () => {
  console.log("Middleware ativo.");
  return new Response(
    JSON.stringify({ success: true, message: "Middleware ativo." }),
  );
});
