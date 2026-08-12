-- CMS Tables for Portfolio

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY,
  name TEXT,
  role TEXT,
  role_en TEXT,
  heroBadge TEXT,
  heroBadge_en TEXT,
  tagline TEXT,
  tagline_en TEXT,
  availabilityText TEXT,
  availabilityText_en TEXT,
  bio TEXT,
  bio_en TEXT,
  cvSummary TEXT,
  cvSummary_en TEXT,
  avatar TEXT,
  location TEXT,
  phone TEXT,
  email TEXT,
  linkedin TEXT
);

CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  category_en TEXT,
  items TEXT,
  items_en TEXT
);

CREATE TABLE IF NOT EXISTS education (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  institution TEXT,
  institution_en TEXT,
  degree TEXT,
  degree_en TEXT,
  duration TEXT,
  duration_en TEXT,
  achievements TEXT,
  achievements_en TEXT
);

CREATE TABLE IF NOT EXISTS experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  title_en TEXT,
  company TEXT,
  company_en TEXT,
  duration TEXT,
  duration_en TEXT,
  details TEXT,
  details_en TEXT,
  photos TEXT,
  body TEXT,
  body_en TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  title_en TEXT,
  date TEXT,
  issuer TEXT,
  issuer_en TEXT,
  description TEXT,
  description_en TEXT,
  link TEXT,
  body TEXT,
  body_en TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  title_en TEXT,
  date TEXT,
  issuer TEXT,
  issuer_en TEXT,
  description TEXT,
  description_en TEXT,
  image TEXT,
  body TEXT,
  body_en TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  title_en TEXT,
  date TEXT,
  category TEXT,
  category_en TEXT,
  summary TEXT,
  summary_en TEXT,
  image TEXT,
  body TEXT,
  body_en TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  title_en TEXT,
  slug TEXT NOT NULL,
  date TEXT,
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

CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  category TEXT,
  file_url TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
