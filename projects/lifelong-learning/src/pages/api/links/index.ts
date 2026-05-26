import type { APIRoute } from "astro";
import sanitize from "sanitize-html";

export const prerender = false;

const devOnlyResponse = () =>
  new Response(
    JSON.stringify({
      success: false,
      message: "json-server disponível apenas em desenvolvimento.",
    }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

const serverUnavailableResponse = () =>
  new Response(
    JSON.stringify({
      success: false,
      message:
        "json-server não está rodando. Execute npm run server em desenvolvimento.",
    }),
    {
      status: 503,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

const isServerUnavailableError = (error: unknown) => {
  if (!(error instanceof Error)) {
    return false;
  }

  const cause = error.cause as { code?: string } | undefined;

  return (
    error.message.includes("fetch failed") || cause?.code === "ECONNREFUSED"
  );
};

export const GET: APIRoute = async () => {
  if (!import.meta.env.DEV) {
    return devOnlyResponse();
  }

  try {
    const req = await fetch("http://localhost:3000/links");

    if (!req.ok) {
      throw new Error("Erro ao buscar links.");
    }

    const data = await req.json();

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        status: 200,

        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    console.error(e);

    if (isServerUnavailableError(e)) {
      return serverUnavailableResponse();
    }

    return new Response(
      JSON.stringify({
        success: false,
        message:
          e instanceof Error ? e.message : "Ocorreu um erro desconhecido.",
      }),
      {
        status: 500,

        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) {
    return devOnlyResponse();
  }

  const body = await request.json();

  try {
    const { title, description, url, isRead } = body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof url !== "string" ||
      typeof isRead !== "boolean"
    ) {
      throw new Error("Por favor, forneça todos os campos obrigatórios.");
    }

    const req = await fetch("http://localhost:3000/links", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        title: sanitize(title),
        description: sanitize(description),
        url: sanitize(url),
        isRead,
      }),
    });

    if (!req.ok) {
      throw new Error("Ocorreu um problema com a requisição ao servidor.");
    }

    const data = await req.json();

    return new Response(
      JSON.stringify({
        message: "Link adicionado com sucesso.",
        success: true,
        data,
      }),
      {
        status: 201,

        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    console.error(e);

    if (isServerUnavailableError(e)) {
      return serverUnavailableResponse();
    }

    if (e instanceof Error) {
      return new Response(
        JSON.stringify({
          message: e.message,
          success: false,
        }),
        {
          status: 400,

          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Ocorreu um erro desconhecido.",
        success: false,
      }),
      {
        status: 500,

        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
