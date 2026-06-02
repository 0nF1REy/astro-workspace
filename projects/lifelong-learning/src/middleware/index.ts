import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url } = context;

  // Informações da aplicação
  const developerName = "Alan Ryan da Silva Domingues";

  // Dados compartilhados com as páginas Astro
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

  // Logs de desenvolvimento
  console.log("[Middleware] Dados adicionados à requisição:", context.locals);

  console.log("[Middleware] Mensagem:", context.locals.userMessage());

  // Redirecionamentos
  const redirects = ["/test"];

  if (redirects.includes(url.pathname)) {
    return Response.redirect(new URL("/redirected", url), 302);
  }

  // Continua o fluxo da requisição
  const response = await next();

  // Lê o HTML gerado pela página
  const html = await response.text();

  // Remove ou substitui informações sensíveis
  const redactedHtml = html.replaceAll("PRIVATE INFO", "REDACTED");

  // Cria uma nova resposta baseada no HTML modificado
  const newResponse = new Response(redactedHtml, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });

  // Header personalizado
  newResponse.headers.set(
    "X-Credits",
    `Crafted with Astro by ${developerName}`,
  );

  return newResponse;
});
