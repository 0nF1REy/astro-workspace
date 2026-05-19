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

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      return jsonResponse(
        {
          success: false,
          message: "ID não informado",
        },
        400,
      );
    }

    const req = await fetch(`${API_URL}/${id}`);

    if (!req.ok) {
      throw new Error("Postagem não encontrada");
    }

    const post = await req.json();

    return jsonResponse({
      success: true,
      data: post,
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

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      return jsonResponse(
        {
          success: false,
          message: "ID não informado",
        },
        400,
      );
    }

    const req = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!req.ok) {
      throw new Error("Erro ao remover postagem");
    }

    return jsonResponse({
      success: true,
      message: "Postagem removida com sucesso",
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
