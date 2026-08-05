import type { APIRoute } from "astro";
import { clearAdminSession } from "../../../lib/auth";

export const POST: APIRoute = async (context) => {
  clearAdminSession(context);
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
