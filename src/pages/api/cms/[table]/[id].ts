import type { APIRoute } from "astro";
import { isAuthenticated } from "../../../../lib/auth";
import { getDB, getByIdFromTable, deleteByIdFromTable } from "../../../../lib/d1";
import { deleteFromCloudinary } from "../../../../lib/cloudinary";

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
  const id = parseInt(context.params.id as string);
  
  if (!TABLE_SCHEMA[table] || isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid parameters" }), { status: 400 });
  }

  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "DB not found" }), { status: 500 });
  }

  const item = await getByIdFromTable(db, table, id);
  if (!item) {
    return new Response(JSON.stringify({ error: "Item not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(item), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const PUT: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const table = context.params.table as string;
  const id = parseInt(context.params.id as string);
  const schema = TABLE_SCHEMA[table];
  
  if (!schema || isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid parameters" }), { status: 400 });
  }

  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "DB not found" }), { status: 500 });
  }

  try {
    const oldItem = await getByIdFromTable(db, table, id);
    const data = await context.request.json();
    
    // Cloudinary Auto-Cleanup
    if (oldItem) {
      const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = (import.meta.env.PUBLIC_CLOUDINARY_API_KEY || "").trim(); 
      const apiSecret = (import.meta.env.CLOUDINARY_API_SECRET || "").trim(); 
      
      if (cloudName && apiKey && apiSecret) {
        ['photos', 'image', 'link', 'file_url'].forEach(col => {
          if (schema.includes(col) && oldItem[col]) {
            let oldUrls: string[] = [];
            try {
              oldUrls = JSON.parse(oldItem[col]);
            } catch(e) {
              if (typeof oldItem[col] === 'string' && oldItem[col].includes('\n')) {
                 oldUrls = oldItem[col].split('\n');
              } else {
                 oldUrls = [oldItem[col]];
              }
            }
            if (!Array.isArray(oldUrls)) oldUrls = [oldUrls];
            
            let newUrls: string[] = [];
            if (data[col]) {
               if (Array.isArray(data[col])) newUrls = data[col];
               else if (typeof data[col] === 'string' && data[col].includes('\n')) newUrls = data[col].split('\n');
               else newUrls = [data[col]];
            }
            
            const toDelete = oldUrls.filter(u => typeof u === 'string' && u.includes('cloudinary') && !newUrls.includes(u));
            toDelete.forEach(url => deleteFromCloudinary(url, cloudName, apiKey, apiSecret).catch(() => {}));
          }
        });
      }
    }
    
    // Build update assignments dynamically
    const assignments = schema.map(col => `${col} = ?`).join(", ");
    const values = schema.map(col => {
      if (typeof data[col] === 'object') return JSON.stringify(data[col]);
      return data[col] !== undefined ? data[col] : null;
    });
    
    // Add ID to values array for WHERE clause
    values.push(id);

    const query = `UPDATE ${table} SET ${assignments} WHERE id = ?`;
    const result = await db.prepare(query).bind(...values).run();

    if (result.success) {
      return new Response(JSON.stringify({ message: "Updated successfully" }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Failed to update record" }), { status: 500 });
    }
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};

export const DELETE: APIRoute = async (context) => {
  if (!isAuthenticated(context)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const table = context.params.table as string;
  const id = parseInt(context.params.id as string);
  
  if (!TABLE_SCHEMA[table] || isNaN(id)) {
    return new Response(JSON.stringify({ error: "Invalid parameters" }), { status: 400 });
  }

  const db = getDB(context.locals);
  if (!db) {
    return new Response(JSON.stringify({ error: "DB not found" }), { status: 500 });
  }

  const item = await getByIdFromTable(db, table, id);
  const success = await deleteByIdFromTable(db, table, id);
  
  if (success) {
    // Cloudinary Auto-Cleanup
    if (item) {
      const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = (import.meta.env.PUBLIC_CLOUDINARY_API_KEY || "").trim(); 
      const apiSecret = (import.meta.env.CLOUDINARY_API_SECRET || "").trim(); 
      
      if (cloudName && apiKey && apiSecret) {
        ['photos', 'image', 'link', 'file_url'].forEach(col => {
          if (TABLE_SCHEMA[table].includes(col) && item[col]) {
            let oldUrls: string[] = [];
            try {
              oldUrls = JSON.parse(item[col]);
            } catch(e) {
              if (typeof item[col] === 'string' && item[col].includes('\n')) {
                 oldUrls = item[col].split('\n');
              } else {
                 oldUrls = [item[col]];
              }
            }
            if (!Array.isArray(oldUrls)) oldUrls = [oldUrls];
            oldUrls.filter(u => typeof u === 'string' && u.includes('cloudinary')).forEach(url => {
               deleteFromCloudinary(url, cloudName, apiKey, apiSecret).catch(() => {});
            });
          }
        });
      }
    }

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ error: "Failed to delete record" }), { status: 500 });
  }
};
