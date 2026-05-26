import type { APIRoute } from "astro";
import sanitize from "sanitize-html";
import {
  devOnlyResponse,
  serverUnavailableResponse,
  isServerUnavailableError,
  jsonResponse,
} from "@lib/api/dev-server";

export const prerender = false;

const API_URL = "http://localhost:3000/links";

export const GET: APIRoute = async ({ params }) => {
  if (!import.meta.env.DEV) {
    return devOnlyResponse();
  }

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

    if (isServerUnavailableError(e)) {
      return serverUnavailableResponse();
    }

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
  if (!import.meta.env.DEV) {
    return devOnlyResponse();
  }

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

    if (isServerUnavailableError(e)) {
      return serverUnavailableResponse();
    }

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
  if (!import.meta.env.DEV) {
    return devOnlyResponse();
  }

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

    if (isServerUnavailableError(e)) {
      return serverUnavailableResponse();
    }

    return jsonResponse(
      {
        success: false,
        message: e instanceof Error ? e.message : "Erro desconhecido.",
      },
      500,
    );
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  if (!import.meta.env.DEV) {
    return devOnlyResponse();
  }

  try {
    const id = params.id;

    if (!id) {
      throw new Error("ID não informado.");
    }

    const { isRead } = await request.json();

    if (typeof isRead !== "boolean") {
      throw new Error("Campo isRead inválido.");
    }

    const req = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isRead }),
    });

    if (!req.ok) {
      throw new Error("Erro ao atualizar isRead.");
    }

    return new Response(null, { status: 204 });
  } catch (e) {
    console.error(e);

    if (isServerUnavailableError(e)) {
      return serverUnavailableResponse();
    }

    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro desconhecido.",
      }),
      { status: 500 },
    );
  }
};
