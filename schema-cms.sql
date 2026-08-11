-- CMS Tables for Portfolio

CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY,
  name TEXT,
  role TEXT,
  heroBadge TEXT,
  tagline TEXT,
  availabilityText TEXT,
  bio TEXT,
  cvSummary TEXT,
  avatar TEXT,
  location TEXT,
  phone TEXT,
  email TEXT,
  linkedin TEXT
);

CREATE TABLE IF NOT EXISTS skills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  items TEXT
);

CREATE TABLE IF NOT EXISTS education (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  institution TEXT,
  degree TEXT,
  duration TEXT,
  achievements TEXT
);

CREATE TABLE IF NOT EXISTS experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  company TEXT,
  duration TEXT,
  details TEXT,
  photos TEXT,
  body TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certificates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  date TEXT,
  issuer TEXT,
  description TEXT,
  link TEXT,
  body TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS achievements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  date TEXT,
  issuer TEXT,
  description TEXT,
  image TEXT,
  body TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE,
  title TEXT,
  date TEXT,
  category TEXT,
  summary TEXT,
  image TEXT,
  body TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
