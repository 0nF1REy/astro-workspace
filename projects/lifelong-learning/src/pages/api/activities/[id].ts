import type { APIRoute } from "astro";
import {
  devOnlyResponse,
  serverUnavailableResponse,
  isServerUnavailableError,
  jsonResponse,
  getResourceUrl,
} from "@lib/api/dev-server";

export const prerender = false;
const RESOURCE_URL = getResourceUrl("activities");

export const PATCH: APIRoute = async ({ params, request }) => {
  if (!import.meta.env.DEV) return devOnlyResponse();

  try {
    const { id } = params;
    const idAsNumber = Number(id);

    const body = await request.json();

    const req = await fetch(`${RESOURCE_URL}/${idAsNumber}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await req.json();
    return jsonResponse({ success: true, data });
  } catch (e) {
    if (isServerUnavailableError(e)) return serverUnavailableResponse();
    return jsonResponse({ success: false }, 500);
  }
};

export const DELETE: APIRoute = async ({ params }) => {
  if (!import.meta.env.DEV) return devOnlyResponse();

  try {
    const { id } = params;
    await fetch(`${RESOURCE_URL}/${id}`, { method: "DELETE" });
    return new Response(null, { status: 204 });
  } catch (e) {
    if (isServerUnavailableError(e)) return serverUnavailableResponse();
    return jsonResponse({ success: false }, 500);
  }
};
