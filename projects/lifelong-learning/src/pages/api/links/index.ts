import type { APIRoute } from "astro";
import sanitize from "sanitize-html";
import { db } from "@lib/db";
import { Links } from "@db/config";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const links = await db.select().from(Links);

    return new Response(
      JSON.stringify({
        success: true,
        data: links,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro ao buscar links.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { title, description, url, isRead } = body;

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof url !== "string" ||
      typeof isRead !== "boolean"
    ) {
      throw new Error("Por favor, forneça todos os campos obrigatórios.");
    }

    const result = await db
      .insert(Links)
      .values({
        title: sanitize(title),
        description: sanitize(description),
        url: sanitize(url),
        isRead,
      })
      .returning();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Link adicionado com sucesso.",
        data: result[0],
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        success: false,
        message: e instanceof Error ? e.message : "Erro ao adicionar link.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
