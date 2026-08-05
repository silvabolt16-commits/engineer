import type { APIRoute } from "astro";
import { setAdminSession } from "../../../lib/auth";

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json();
    const { password } = body;

    const expectedPassword =
      context.locals.runtime?.env?.ADMIN_PASSWORD ||
      import.meta.env.ADMIN_PASSWORD ||
      "admin123";

    if (password === expectedPassword) {
      setAdminSession(context);
      return new Response(JSON.stringify({ success: true, message: "Login berhasil" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({ success: false, message: "Kata sandi salah!" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: "Format request tidak valid" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
