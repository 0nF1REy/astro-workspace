export const prerender = false;

import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const key = import.meta.env.API_KEY;

    if (!key) {
      console.error("[ERRO] API_KEY não foi configurada no arquivo .env");

      return new Response(
        JSON.stringify(
          {
            sucesso: false,
            mensagem: "Variável API_KEY não configurada",
          },
          null,
          2,
        ),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        },
      );
    }

    console.log("[OK] API_KEY carregada corretamente");

    const req = await fetch("https://jsonplaceholder.typicode.com/posts", {
      headers: {
        Authorization: `Bearer ${key}`,
      },
    });

    if (!req.ok) {
      throw new Error("Ocorreu um problema ao buscar as postagens");
    }

    const posts = await req.json();

    return new Response(
      JSON.stringify(
        {
          sucesso: true,
          mensagem: "Postagens carregadas com sucesso",
          quantidade: posts.length,
          dados: posts,
        },
        null,
        2,
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  } catch (e) {
    console.error("[ERRO]", e);

    return new Response(
      JSON.stringify(
        {
          sucesso: false,
          mensagem: e instanceof Error ? e.message : "Erro interno do servidor",
        },
        null,
        2,
      ),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      },
    );
  }
};
