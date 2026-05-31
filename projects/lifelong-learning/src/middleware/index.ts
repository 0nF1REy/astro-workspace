import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  console.log("Antes da página");

  const response = await next();

  console.log("Depois da página");

  return response;
});
