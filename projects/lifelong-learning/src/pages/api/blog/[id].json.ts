import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

const json = <T>(body: ApiResponse<T>, status = 200) => {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return json(
      {
        success: false,
        message: "ID não informado",
        data: null,
      },
      400,
    );
  }

  const post = await getEntry("posts", id);

  if (!post || post.data.isDraft) {
    return json(
      {
        success: false,
        message: "Post não encontrado",
        data: null,
      },
      404,
    );
  }

  return json(
    {
      success: true,
      message: "Post carregado com sucesso",
      data: post.data,
    },
    200,
  );
};

export async function getStaticPaths() {
  const posts = await getCollection("posts", ({ data }) => !data.isDraft);

  return posts.map((post) => ({
    params: { id: post.id },
  }));
}
