export interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string;
  image_url?: string;
  category?: string;
  tags?: string;
  demo_url?: string;
  repo_url?: string;
  featured?: number;
  created_at?: string;
  updated_at?: string;
}

export function getDB(locals: any) {
  return locals?.runtime?.env?.DB;
}

export async function getAllProjects(db: any): Promise<Project[]> {
  if (!db) return [];
  try {
    const { results } = await db.prepare("SELECT * FROM projects ORDER BY created_at DESC").all();
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
