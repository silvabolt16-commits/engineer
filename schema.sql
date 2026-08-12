-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS admin_users;

-- Table for Portfolio Projects
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    title_en TEXT,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    description_en TEXT,
    content TEXT,
    content_en TEXT,
    image_url TEXT,
    category TEXT DEFAULT 'Web',
    category_en TEXT,
    tags TEXT,
    tags_en TEXT,
    demo_url TEXT,
    repo_url TEXT,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table for Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data Insertion
INSERT INTO projects (title, slug, description, content, image_url, category, tags, demo_url, repo_url, featured)
VALUES (
    'Portofolio EI Engineer',
    'portofolio-ei-engineer',
    'Aplikasi portofolio modern menggunakan Astro SSR, Cloudflare D1 Database, dan Cloudinary.',
    'Portofolio personal yang dibangun dengan performa tinggi di edge network Cloudflare.',
    'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    'Web Engineering',
    'Astro, Cloudflare D1, Cloudinary, TailwindCSS',
    'https://fajri.web.id',
    'https://github.com/silvabolt16-commits/engineer',
    1
);
