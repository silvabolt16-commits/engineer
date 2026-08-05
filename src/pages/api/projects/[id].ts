import type { APIRoute } from "astro";
import { getDB, getProjectById } from "../../../lib/d1";
import { isAuthenticated } from "../../../lib/auth";

export const GET: APIRoute = async (context) => {
  const db = getDB(context.locals);
  const id = Number(context.params.id);

  if (!db || isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID tidak valid atau Database tidak terhubung" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const project = await getProjectById(db, id);
  if (!project) {
    return new Response(JSON.stringify({ error: "Proyek tidak ditemukan" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ project }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const PUT: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const db = getDB(context.locals);
  const id = Number(context.params.id);

  if (!db || isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID tidak valid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const body = await context.request.json();
    const { title, slug, description, content, image_url, category, tags, demo_url, repo_url, featured } = body;

    await db.prepare(`
      UPDATE projects
      SET title = ?, slug = ?, description = ?, content = ?, image_url = ?, category = ?, tags = ?, demo_url = ?, repo_url = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      title,
      slug,
      description,
      content || "",
      image_url || "",
      category || "Web",
      tags || "",
      demo_url || "",
      repo_url || "",
      featured ? 1 : 0,
      id
    ).run();

    return new Response(JSON.stringify({ success: true, message: "Proyek berhasil diperbarui!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Gagal mengupdate proyek" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const db = getDB(context.locals);
  const id = Number(context.params.id);

  if (!db || isNaN(id)) {
    return new Response(JSON.stringify({ error: "ID tidak valid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await db.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();
    return new Response(JSON.stringify({ success: true, message: "Proyek berhasil dihapus" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Gagal menghapus proyek" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
