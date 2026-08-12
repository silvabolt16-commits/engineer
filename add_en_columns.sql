-- Add _en columns to projects
ALTER TABLE projects ADD COLUMN title_en TEXT;
ALTER TABLE projects ADD COLUMN description_en TEXT;
ALTER TABLE projects ADD COLUMN content_en TEXT;
ALTER TABLE projects ADD COLUMN category_en TEXT;
ALTER TABLE projects ADD COLUMN tags_en TEXT;

-- Add _en columns to experiences
ALTER TABLE experiences ADD COLUMN title_en TEXT;
ALTER TABLE experiences ADD COLUMN company_en TEXT;
ALTER TABLE experiences ADD COLUMN duration_en TEXT;
ALTER TABLE experiences ADD COLUMN details_en TEXT;
ALTER TABLE experiences ADD COLUMN body_en TEXT;

-- Add _en columns to certificates
ALTER TABLE certificates ADD COLUMN title_en TEXT;
ALTER TABLE certificates ADD COLUMN issuer_en TEXT;
ALTER TABLE certificates ADD COLUMN description_en TEXT;
ALTER TABLE certificates ADD COLUMN body_en TEXT;

-- Add _en columns to achievements
ALTER TABLE achievements ADD COLUMN title_en TEXT;
ALTER TABLE achievements ADD COLUMN issuer_en TEXT;
ALTER TABLE achievements ADD COLUMN description_en TEXT;
ALTER TABLE achievements ADD COLUMN body_en TEXT;

-- Add _en columns to articles
ALTER TABLE articles ADD COLUMN title_en TEXT;
ALTER TABLE articles ADD COLUMN category_en TEXT;
ALTER TABLE articles ADD COLUMN summary_en TEXT;
ALTER TABLE articles ADD COLUMN body_en TEXT;

-- Add _en columns to education
ALTER TABLE education ADD COLUMN institution_en TEXT;
ALTER TABLE education ADD COLUMN degree_en TEXT;
ALTER TABLE education ADD COLUMN duration_en TEXT;
ALTER TABLE education ADD COLUMN achievements_en TEXT;

-- Add _en columns to skills
ALTER TABLE skills ADD COLUMN category_en TEXT;
ALTER TABLE skills ADD COLUMN items_en TEXT;

-- Add _en columns to profiles
ALTER TABLE profiles ADD COLUMN role_en TEXT;
ALTER TABLE profiles ADD COLUMN heroBadge_en TEXT;
ALTER TABLE profiles ADD COLUMN tagline_en TEXT;
ALTER TABLE profiles ADD COLUMN availabilityText_en TEXT;
ALTER TABLE profiles ADD COLUMN bio_en TEXT;
ALTER TABLE profiles ADD COLUMN cvSummary_en TEXT;
