import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ url }, next) => {
  const redirects = ["/"];

  if (redirects.includes(url.pathname)) {
    return Response.redirect(new URL("/redirected", url), 302);
  }

  const response = await next();

  response.headers.set("X-Credits", "Crafted with Astro by Alan Ryan");

  return response;
});
