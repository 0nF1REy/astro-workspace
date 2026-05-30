import type { APIRoute } from "astro";
import sanitize from "sanitize-html";
import { db, Links, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const id = params.id ? parseInt(params.id) : null;
    if (!id) throw new Error("ID não informado.");

    const link = await db.select().from(Links).where(eq(Links.id, id));

    if (link.length === 0) {
      throw new Error("Link não encontrado.");
    }

    return new Response(
      JSON.stringify({ success: true, data: link[0] }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
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
    console.error(e);
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
    console.error(e);
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

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof url !== "string" ||
      typeof isRead !== "boolean"
    ) {
      throw new Error("Campos inválidos.");
    }

    await db
      .update(Links)
      .set({
        title: sanitize(title),
        description: sanitize(description),
        url: sanitize(url),
        isRead,
      })
      .where(eq(Links.id, id));

    const updated = await db.select().from(Links).where(eq(Links.id, id));

    return new Response(
      JSON.stringify({
        success: true,
        message: "Link atualizado com sucesso.",
        data: updated[0],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro ao atualizar link.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
