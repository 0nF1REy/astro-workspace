import type { APIRoute } from "astro";
import sanitize from "sanitize-html";

export const prerender = false;

const API_URL = "http://localhost:3000/links";

const jsonResponse = (data: unknown, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,

    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      throw new Error("ID não informado.");
    }

    const req = await fetch(`${API_URL}/${id}`);

    if (!req.ok) {
      throw new Error("Link não encontrado.");
    }

    const data = await req.json();

    return jsonResponse({
      success: true,
      data,
    });
  } catch (e) {
    console.error(e);

    return jsonResponse(
      {
        success: false,
        message: e instanceof Error ? e.message : "Erro desconhecido.",
      },
      404,
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id;

    if (!id) {
      throw new Error("ID não informado.");
    }

    const req = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (!req.ok) {
      throw new Error("Erro ao remover link.");
    }

    return new Response(null, {
      status: 204,
    });
  } catch (e) {
    console.error(e);

    return jsonResponse(
      {
        success: false,
        message: e instanceof Error ? e.message : "Erro desconhecido.",
      },
      500,
    );
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id;

    if (!id) {
      throw new Error("ID não informado.");
    }

    const body = await request.json();

    const { title, description, url, isRead } = body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof url !== "string" ||
      typeof isRead !== "boolean"
    ) {
      throw new Error("Campos inválidos.");
    }

    const req = await fetch(`${API_URL}/${id}`, {
      method: "PUT",

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
      throw new Error("Erro ao atualizar link.");
    }

    const data = await req.json();

    return jsonResponse({
      success: true,
      message: "Link atualizado com sucesso.",
      data,
    });
  } catch (e) {
    console.error(e);

    return jsonResponse(
      {
        success: false,
        message: e instanceof Error ? e.message : "Erro desconhecido.",
      },
      500,
    );
  }
};
