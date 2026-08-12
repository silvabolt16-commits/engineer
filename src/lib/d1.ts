export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image_url?: string;
  category?: string;
  tags?: string;
  date?: string;
  demo_url?: string;
  repo_url?: string;
  featured?: number;
  created_at?: string;
  updated_at?: string;
  title_en?: string;
  description_en?: string;
  category_en?: string;
  content_en?: string;
}

// @ts-ignore
import { env } from "cloudflare:workers";

export function getDB(locals?: any) {
  try {
    return env.DB;
  } catch (error) {
    console.error("Failed to access cloudflare:workers env", error);
    return null;
  }
}

export async function getAllProjects(db: any): Promise<Project[]> {
  if (!db) return [];
  try {
    const { results } = await db.prepare("SELECT * FROM projects ORDER BY featured DESC, date DESC, created_at DESC, id DESC").all();
    return (results as Project[]) || [];
  } catch (error) {
    console.error("Error fetching projects from D1:", error);
    return [];
  }
}

export async function getProjectById(db: any, id: number): Promise<Project | null> {
  if (!db) return null;
  try {
    const project = await db.prepare("SELECT * FROM projects WHERE id = ?").bind(id).first();
    return (project as Project) || null;
  } catch (error) {
    console.error(`Error fetching project id ${id} from D1:`, error);
    return null;
  }
}

export async function getProjectBySlug(db: any, slug: string): Promise<Project | null> {
  if (!db) return null;
  try {
    const project = await db.prepare("SELECT * FROM projects WHERE slug = ?").bind(slug).first();
    return (project as Project) || null;
  } catch (error) {
    console.error(`Error fetching project slug ${slug} from D1:`, error);
    return null;
  }
}

// --- CMS Functions ---

export async function getProfile(db: any) {
  if (!db) return null;
  try {
    const profile = await db.prepare("SELECT * FROM profiles WHERE id = 1").first();
    if (!profile) return null;
    
    // Also fetch skills and education to compose the full profile object if needed
    const { results: skillsRows } = await db.prepare("SELECT * FROM skills").all();
    const skills = skillsRows.map((s: any) => ({
      category: s.category,
      category_en: s.category_en,
      items: JSON.parse(s.items || '[]'),
      items_en: JSON.parse(s.items_en || '[]')
    }));

    const { results: educationRows } = await db.prepare("SELECT * FROM education").all();
    const education = educationRows.map((e: any) => ({
      institution: e.institution,
      institution_en: e.institution_en,
      degree: e.degree,
      degree_en: e.degree_en,
      duration: e.duration,
      duration_en: e.duration_en,
      achievements: JSON.parse(e.achievements || '[]'),
      achievements_en: JSON.parse(e.achievements_en || '[]')
    }));

    return { ...profile, skills, education };
  } catch (error) {
    console.error("Error fetching profile from D1:", error);
    return null;
  }
}

export async function updateProfile(db: any, data: any) {
  if (!db) return false;
  try {
    await db.prepare(`
      UPDATE profiles 
      SET name = ?, role = ?, role_en = ?, heroBadge = ?, heroBadge_en = ?, tagline = ?, tagline_en = ?, availabilityText = ?, availabilityText_en = ?, bio = ?, bio_en = ?, cvSummary = ?, cvSummary_en = ?, avatar = ?, location = ?, phone = ?, email = ?, linkedin = ?
      WHERE id = 1
    `).bind(
      data.name || '', data.role || '', data.role_en || '', data.heroBadge || '', data.heroBadge_en || '', data.tagline || '', data.tagline_en || '', data.availabilityText || '', data.availabilityText_en || '',
      data.bio || '', data.bio_en || '', data.cvSummary || '', data.cvSummary_en || '', data.avatar || '', data.location || '', data.phone || '', data.email || '', data.linkedin || ''
    ).run();
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
}

export async function getAllFromTable(db: any, table: string) {
  if (!db) return [];
  try {
    let query = `SELECT * FROM ${table}`;
    if (['experiences', 'education'].includes(table)) {
      query += ` ORDER BY duration DESC, created_at DESC, id DESC`;
    } else if (['certificates', 'achievements', 'articles'].includes(table)) {
      query += ` ORDER BY date DESC, created_at DESC, id DESC`;
    }
    const { results } = await db.prepare(query).all();
    return results || [];
  } catch (error) {
    console.error(`Error fetching from ${table}:`, error);
    return [];
  }
}

export async function getBySlugFromTable(db: any, table: string, slug: string) {
  if (!db) return null;
  try {
    return await db.prepare(`SELECT * FROM ${table} WHERE slug = ?`).bind(slug).first();
  } catch (error) {
    console.error(`Error fetching slug from ${table}:`, error);
    return null;
  }
}

export async function getByIdFromTable(db: any, table: string, id: number) {
  if (!db) return null;
  try {
    return await db.prepare(`SELECT * FROM ${table} WHERE id = ?`).bind(id).first();
  } catch (error) {
    console.error(`Error fetching id from ${table}:`, error);
    return null;
  }
}

export async function deleteByIdFromTable(db: any, table: string, id: number) {
  if (!db) return false;
  try {
    await db.prepare(`DELETE FROM ${table} WHERE id = ?`).bind(id).run();
    return true;
  } catch (error) {
    console.error(`Error deleting id from ${table}:`, error);
    return false;
  }
}
