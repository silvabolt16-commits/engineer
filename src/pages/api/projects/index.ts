import type { APIRoute } from "astro";
import { getDB, getAllProjects } from "../../../lib/d1";
import { isAuthenticated } from "../../../lib/auth";

export const GET: APIRoute = async (context) => {
  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "Database D1 tidak terhubung" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const projects = await getAllProjects(db);
  return new Response(JSON.stringify({ projects }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "Database D1 tidak terhubung" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await context.request.json();
    const { title, slug, description, content, image_url, category, tags, demo_url, repo_url, featured } = body;

    if (!title || !description) {
      return new Response(JSON.stringify({ error: "Judul dan Deskripsi wajib diisi" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await db.prepare(`
      INSERT INTO projects (title, slug, description, content, image_url, category, tags, demo_url, repo_url, featured, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      title,
      generatedSlug,
      description,
      content || "",
      image_url || "",
      category || "Web",
      tags || "",
      demo_url || "",
      repo_url || "",
      featured ? 1 : 0
    ).run();

    return new Response(JSON.stringify({ success: true, message: "Proyek berhasil ditambahkan!" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Gagal menyimpan proyek ke database" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
