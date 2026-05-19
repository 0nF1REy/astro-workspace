export const prerender = false;

import type { APIRoute } from "astro";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const jsonResponse = (data: unknown, status = 200) => {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};

const getApiKey = () => {
  const key = import.meta.env.API_KEY;

  if (!key) {
    throw new Error("Variável API_KEY não configurada");
  }

  return key;
};

export const GET: APIRoute = async () => {
  try {
    const key = getApiKey();

    console.log("[OK] API_KEY carregada corretamente");

    const req = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!req.ok) {
      throw new Error("Erro ao buscar postagens");
    }

    const posts = await req.json();

    return jsonResponse({
      success: true,
      message: "Postagens carregadas com sucesso",
      count: posts.length,
      data: posts,
    });
  } catch (e) {
    console.error("[ERROR]", e);

    return jsonResponse(
      {
        success: false,
        message: e instanceof Error ? e.message : "Erro interno do servidor",
      },
      500,
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    if (!body.title) {
      return jsonResponse(
        {
          success: false,
          message: "O campo title é obrigatório",
        },
        400,
      );
    }

    const req = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!req.ok) {
      throw new Error("Erro ao criar postagem");
    }

    const post = await req.json();

    return jsonResponse(
      {
        success: true,
        message: "Postagem criada com sucesso",
        data: post,
      },
      201,
    );
  } catch (e) {
    console.error("[ERROR]", e);

    return jsonResponse(
      {
        success: false,
        message: e instanceof Error ? e.message : "Erro interno do servidor",
      },
      500,
    );
  }
};
