import type { APIRoute } from "astro";
import { isAuthenticated } from "../../../../lib/auth";
import { getDB, getAllFromTable } from "../../../../lib/d1";

// Mapping allowed tables and their insert parameters
const TABLE_SCHEMA: Record<string, string[]> = {
  experiences: ['slug', 'title', 'title_en', 'company', 'company_en', 'duration', 'details', 'details_en', 'photos', 'body', 'body_en'],
  certificates: ['slug', 'title', 'title_en', 'date', 'issuer', 'issuer_en', 'description', 'description_en', 'link', 'body', 'body_en'],
  achievements: ['slug', 'title', 'title_en', 'date', 'issuer', 'issuer_en', 'description', 'description_en', 'image', 'body', 'body_en'],
  articles: ['slug', 'title', 'title_en', 'date', 'category', 'category_en', 'summary', 'summary_en', 'image', 'body', 'body_en'],
  skills: ['category', 'category_en', 'items', 'items_en'],
  education: ['institution', 'institution_en', 'degree', 'degree_en', 'duration', 'achievements', 'achievements_en'],
  documents: ['title', 'category', 'file_url']
};

export const GET: APIRoute = async (context) => {
  const table = context.params.table as string;
  if (!TABLE_SCHEMA[table]) {
    return new Response(JSON.stringify({ error: "Invalid table" }), { status: 400 });
  }

  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "DB not found" }), { status: 500 });
  }

  const items = await getAllFromTable(db, table);
  return new Response(JSON.stringify(items), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const POST: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const table = context.params.table as string;
  const schema = TABLE_SCHEMA[table];
  if (!schema) {
    return new Response(JSON.stringify({ error: "Invalid table" }), { status: 400 });
  }

  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "DB not found" }), { status: 500 });
  }

  try {
    const data = await context.request.json();
    
    // Prepare dynamic insert
    const columns = schema.join(", ");
    const placeholders = schema.map(() => "?").join(", ");
    const values = schema.map(col => {
      // Serialize arrays/objects to JSON strings if necessary (like details, photos, items)
      if (typeof data[col] === 'object') return JSON.stringify(data[col]);
      return data[col] !== undefined ? data[col] : null;
    });

    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    const result = await db.prepare(query).bind(...values).run();

    if (result.success) {
      return new Response(JSON.stringify({ message: "Created successfully" }), { status: 201 });
    } else {
      return new Response(JSON.stringify({ error: "Failed to create record" }), { status: 500 });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
