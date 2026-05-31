import type { APIRoute } from "astro";
import sanitize from "sanitize-html";
import {
  devOnlyResponse,
  serverUnavailableResponse,
  isServerUnavailableError,
  jsonResponse,
  getResourceUrl,
} from "@lib/api/dev-server";

export const prerender = false;
const RESOURCE_URL = getResourceUrl("activities");

export const GET: APIRoute = async () => {
  if (!import.meta.env.DEV) return devOnlyResponse();

  try {
    const req = await fetch(RESOURCE_URL);
    if (!req.ok) throw new Error();
    const data = await req.json();
    return jsonResponse({ success: true, data });
  } catch (e) {
    if (isServerUnavailableError(e)) return serverUnavailableResponse();
    return jsonResponse({ success: false }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) return devOnlyResponse();

  try {
    const body = await request.json();
    const { type, distance, duration, notes, isCompleted } = body;

    const req = await fetch(RESOURCE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: sanitize(type),
        distance: sanitize(distance),
        duration: sanitize(duration),
        notes: sanitize(notes),
        isCompleted: Boolean(isCompleted),
      }),
    });

    const data = await req.json();
    return jsonResponse({ success: true, data }, 201);
  } catch (e) {
    if (isServerUnavailableError(e)) return serverUnavailableResponse();
    return jsonResponse({ success: false }, 400);
  }
};
