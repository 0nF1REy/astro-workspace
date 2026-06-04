import { defineMiddleware } from "astro:middleware";
import { LoggerService } from "@lib/logger";

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, locals, request } = context;

  // Configurações de Contexto (Locals)
  const developerName = "Alan Ryan da Silva Domingues";

  locals.name = developerName;

  const protectedRoutes = ["/middleware", "/admin"];

  locals.userMessage = () => {
    if (protectedRoutes.includes(url.pathname)) {
      return "Você precisa estar conectado.";
    }

    return "Freedom!";
  };

  // Autenticação HTTP Basic (apenas para rotas protegidas)
  if (protectedRoutes.includes(url.pathname)) {
    const authHeader = request.headers.get("authorization");

    if (authHeader) {
      const authValue = authHeader.split(" ")[1] ?? "";

      const [username, password] = atob(authValue).split(":");

      console.log({
        username,
        password,
      });

      if (username === "Alan" && password === "13062004") {
        return await continueRequest();
      }
    }

    return new Response("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
      },
    });
  }

  return await continueRequest();

  async function continueRequest() {
    // Lógica de Redirecionamento
    const redirects = ["/test"];

    if (redirects.includes(url.pathname)) {
      return Response.redirect(new URL("/redirected", url), 302);
    }

    // Execução da Rota
    const response = await next();

    // Delegação de Observabilidade
    await LoggerService.processRequestEvent({
      url,
      status: response.status,
      contentType: response.headers.get("content-type"),
    });

    // Manipulação da Resposta
    const contentType = response.headers.get("content-type") || "";
    const isHtml = contentType.includes("text/html");

    if (isHtml) {
      let html = await response.text();

      html = html.replaceAll("PRIVATE INFO", "REDACTED");

      if (url.pathname === "/middleware") {
        html = html.replaceAll("123.456.789-00", "***.***.***-**");
      }

      const newResponse = new Response(html, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      });

      newResponse.headers.set(
        "X-Credits",
        `Crafted with Astro by ${developerName}`,
      );

      return newResponse;
    }

    return response;
  }
});
