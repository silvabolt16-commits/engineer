import type { APIRoute } from "astro";
import { setAdminSession } from "../../../lib/auth";

export const POST: APIRoute = async (context) => {
  try {
    const body = await context.request.json();
    const { password } = body;

    let expectedPassword = import.meta.env.ADMIN_PASSWORD || "admin123";
    
    try {
      // Compatibility for older Astro versions or if runtime env is provided without throwing
      const runtimeEnv = (context.locals as any).runtime?.env;
      if (runtimeEnv?.ADMIN_PASSWORD) {
        expectedPassword = runtimeEnv.ADMIN_PASSWORD;
      }
    } catch (e) {
      // Ignore Astro v6 getter throw: "Astro.locals.runtime.env has been removed..."
    }

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
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: "Format request tidak valid: " + error?.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};
