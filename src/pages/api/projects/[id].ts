import type { APIRoute } from "astro";
import { getDB, getProjectById } from "../../../lib/d1";
import { isAuthenticated } from "../../../lib/auth";
import { deleteFromCloudinary } from "../../../lib/cloudinary";

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
    const oldProject = await getProjectById(db, id);
    const body = await context.request.json();
    const { title, title_en, slug, date, description, description_en, content, content_en, image_url, category, category_en, tags, tags_en, demo_url, repo_url, featured } = body;

    // Cloudinary Auto-Cleanup
    if (oldProject && oldProject.image_url && typeof oldProject.image_url === 'string' && oldProject.image_url.includes('cloudinary') && oldProject.image_url !== image_url) {
      const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = (import.meta.env.PUBLIC_CLOUDINARY_API_KEY || "").trim(); 
      const apiSecret = (import.meta.env.CLOUDINARY_API_SECRET || "").trim(); 
      if (cloudName && apiKey && apiSecret) {
        deleteFromCloudinary(oldProject.image_url, cloudName, apiKey, apiSecret).catch(() => {});
      }
    }

    await db.prepare(`
      UPDATE projects
      SET title = ?, title_en = ?, slug = ?, date = ?, description = ?, description_en = ?, content = ?, content_en = ?, image_url = ?, category = ?, category_en = ?, tags = ?, tags_en = ?, demo_url = ?, repo_url = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      title,
      title_en || "",
      slug,
      date || "",
      description,
      description_en || "",
      content || "",
      content_en || "",
      image_url || "",
      category || "Web",
      category_en || "",
      tags || "",
      tags_en || "",
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
    const oldProject = await getProjectById(db, id);
    await db.prepare("DELETE FROM projects WHERE id = ?").bind(id).run();

    // Cloudinary Auto-Cleanup
    if (oldProject && oldProject.image_url && typeof oldProject.image_url === 'string' && oldProject.image_url.includes('cloudinary')) {
      const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = (import.meta.env.PUBLIC_CLOUDINARY_API_KEY || "").trim(); 
      const apiSecret = (import.meta.env.CLOUDINARY_API_SECRET || "").trim(); 
      if (cloudName && apiKey && apiSecret) {
        deleteFromCloudinary(oldProject.image_url, cloudName, apiKey, apiSecret).catch(() => {});
      }
    }

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
