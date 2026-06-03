import { defineMiddleware } from "astro:middleware";
import { LoggerService } from "@lib/logger";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, locals } = context;

  // Configurações de Contexto (Locals)
  const developerName = "Alan Ryan da Silva Domingues";
  locals.name = developerName;

  locals.userMessage = () => {
    const protectedRoutes = ["/middleware", "/admin"];
    const authStatus = false;

    if (protectedRoutes.includes(url.pathname) && !authStatus) {
      return "Você precisa estar conectado.";
    }
    return "Freedom!";
  };

  // Lógica de Redirecionamento
  const redirects = ["/test"];
  if (redirects.includes(url.pathname)) {
    return Response.redirect(new URL("/redirected", url), 302);
  }

  // Execução da Rota (Geração da Resposta)
  const response = await next();

  // Delegação de Observabilidade (Logger Service)
  await LoggerService.processRequestEvent({
    url: url,
    status: response.status,
    contentType: response.headers.get("content-type"),
  });

  // Manipulação de Resposta e Segurança
  const contentType = response.headers.get("content-type") || "";
  const isHtml = contentType.includes("text/html");

  // Só tentamos ler o corpo da resposta se for HTML (evita corromper imagens/assets)
  if (isHtml) {
    let html = await response.text();

    // Aplica as regras de redação de conteúdo sensível
    html = html.replaceAll("PRIVATE INFO", "REDACTED");

    if (url.pathname === "/middleware") {
      html = html.replaceAll("123.456.789-00", "***.***.***-**");
    }

    // Cria a nova resposta com o HTML modificado
    const newResponse = new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });

    // Injeção de Headers customizados
    newResponse.headers.set(
      "X-Credits",
      `Crafted with Astro by ${developerName}`,
    );

    return newResponse;
  }

  // Para assets (JS, CSS, Imagens), retorna a resposta original sem processamento de texto
  return response;
});
