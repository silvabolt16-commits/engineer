import type { APIContext } from "astro";

export const ADMIN_COOKIE_NAME = "admin_session";

export function isAuthenticated(context: APIContext): boolean {
  const cookie = context.cookies.get(ADMIN_COOKIE_NAME);
  return cookie?.value === "authenticated";
}

export function setAdminSession(context: APIContext) {
  context.cookies.set(ADMIN_COOKIE_NAME, "authenticated", {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });
}

export function clearAdminSession(context: APIContext) {
  context.cookies.delete(ADMIN_COOKIE_NAME, { path: "/" });
}
