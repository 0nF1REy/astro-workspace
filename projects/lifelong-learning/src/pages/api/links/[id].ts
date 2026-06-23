import type { APIRoute } from "astro";
import sanitize from "sanitize-html";
import { db } from "@lib/db";
import { Links } from "@db/config";
import { eq } from "drizzle-orm";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = params.id ? parseInt(params.id) : null;
    if (!id) throw new Error("ID não informado.");

    const result = await db.select().from(Links).where(eq(Links.id, id));

    if (result.length === 0) {
      throw new Error("Link não encontrado.");
    }

    return new Response(JSON.stringify({ success: true, data: result[0] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro desconhecido.",
      }),
      { status: 404, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const id = params.id ? parseInt(params.id) : null;
    if (!id) throw new Error("ID não informado.");

    await db.delete(Links).where(eq(Links.id, id));

    return new Response(null, { status: 204 });
  } catch (e) {
    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro ao remover link.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id ? parseInt(params.id) : null;
    if (!id) throw new Error("ID não informado.");

    const { isRead } = await request.json();
    if (typeof isRead !== "boolean") throw new Error("Campo isRead inválido.");

    await db.update(Links).set({ isRead }).where(eq(Links.id, id));

    return new Response(null, { status: 204 });
  } catch (e) {
    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro ao atualizar link.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const id = params.id ? parseInt(params.id) : null;
    if (!id) throw new Error("ID não informado.");

    const body = await request.json();
    const { title, description, url, isRead } = body;

    await db
      .update(Links)
      .set({
        title: sanitize(title),
        description: sanitize(description),
        url: sanitize(url),
        isRead,
      })
      .where(eq(Links.id, id));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Link atualizado com sucesso.",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro ao atualizar link.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
