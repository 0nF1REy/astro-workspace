import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;

  const developerName = "Alan Ryan da Silva Domingues";

  context.locals.name = developerName;

  context.locals.userMessage = () => {
    const pathname = url.pathname;

    const authStatus = false;

    if (pathname === "/" && !authStatus) {
      return "Você precisa estar conectado.";
    }

    if (pathname !== "/") {
      return "Freedom!";
    }

    return "";
  };

  console.log("[Middleware] Dados adicionados à requisição:", context.locals);
  console.log("[Middleware] Mensagem:", context.locals.userMessage());

  const redirects = ["/test"];

  if (redirects.includes(url.pathname)) {
    return Response.redirect(new URL("/redirected", url), 302);
  }

  const response = await next();

  response.headers.set("X-Credits", `Crafted with Astro by ${developerName}`);

  return response;
});
