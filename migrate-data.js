import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'src', 'content');
const sqlFile = path.join(process.cwd(), 'migrate-data.sql');

let sql = '';

// 1. Profile
const profileRaw = fs.readFileSync(path.join(contentDir, 'profile.json'), 'utf-8');
const profile = JSON.parse(profileRaw);

sql += `INSERT INTO profiles (id, name, role, heroBadge, tagline, availabilityText, bio, cvSummary, avatar, location, phone, email, linkedin) VALUES (
  1, 
  '${profile.name.replace(/'/g, "''")}', 
  '${profile.role.replace(/'/g, "''")}', 
  '${profile.heroBadge.replace(/'/g, "''")}', 
  '${profile.tagline.replace(/'/g, "''")}', 
  '${profile.availabilityText.replace(/'/g, "''")}', 
  '${profile.bio.replace(/'/g, "''")}', 
  '${profile.cvSummary.replace(/'/g, "''")}', 
  '${profile.avatar.replace(/'/g, "''")}', 
  '${profile.location.replace(/'/g, "''")}', 
  '${profile.phone.replace(/'/g, "''")}', 
  '${profile.email.replace(/'/g, "''")}', 
  '${profile.linkedin.replace(/'/g, "''")}'
);\n\n`;

// Skills
if (profile.skills) {
  for (const skill of profile.skills) {
    sql += `INSERT INTO skills (category, items) VALUES ('${skill.category.replace(/'/g, "''")}', '${JSON.stringify(skill.items).replace(/'/g, "''")}');\n`;
  }
}

// Education
if (profile.education) {
  for (const edu of profile.education) {
    sql += `INSERT INTO education (institution, degree, duration, achievements) VALUES ('${edu.institution.replace(/'/g, "''")}', '${edu.degree.replace(/'/g, "''")}', '${edu.duration.replace(/'/g, "''")}', '${JSON.stringify(edu.achievements || []).replace(/'/g, "''")}');\n`;
  }
}
sql += '\n';

function processMarkdownDir(dirName, tableName, mapFn) {
  const dirPath = path.join(contentDir, dirName);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(content);
    const slug = file.replace('.md', '');
    mapFn(slug, parsed.data, parsed.content);
  }
}

// Experiences
processMarkdownDir('experiences', 'experiences', (slug, data, body) => {
  sql += `INSERT INTO experiences (slug, title, company, duration, details, photos, body) VALUES (
    '${slug.replace(/'/g, "''")}',
    '${(data.title || '').replace(/'/g, "''")}',
    '${(data.company || '').replace(/'/g, "''")}',
    '${(data.duration || '').replace(/'/g, "''")}',
    '${JSON.stringify(data.details || []).replace(/'/g, "''")}',
    '${JSON.stringify(data.photos || []).replace(/'/g, "''")}',
    '${body.replace(/'/g, "''")}'
  );\n`;
});

// Certificates
processMarkdownDir('certificates', 'certificates', (slug, data, body) => {
  sql += `INSERT INTO certificates (slug, title, date, issuer, description, link, body) VALUES (
    '${slug.replace(/'/g, "''")}',
    '${(data.title || '').replace(/'/g, "''")}',
    '${(data.date || '').replace(/'/g, "''")}',
    '${(data.issuer || '').replace(/'/g, "''")}',
    '${(data.description || '').replace(/'/g, "''")}',
    '${(data.link || '').replace(/'/g, "''")}',
    '${body.replace(/'/g, "''")}'
  );\n`;
});

// Achievements
processMarkdownDir('achievements', 'achievements', (slug, data, body) => {
  sql += `INSERT INTO achievements (slug, title, date, issuer, description, body) VALUES (
    '${slug.replace(/'/g, "''")}',
    '${(data.title || '').replace(/'/g, "''")}',
    '${(data.date || '').replace(/'/g, "''")}',
    '${(data.issuer || '').replace(/'/g, "''")}',
    '${(data.description || '').replace(/'/g, "''")}',
    '${body.replace(/'/g, "''")}'
  );\n`;
});

// Articles
processMarkdownDir('articles', 'articles', (slug, data, body) => {
  sql += `INSERT INTO articles (slug, title, date, category, summary, image, body) VALUES (
    '${slug.replace(/'/g, "''")}',
    '${(data.title || '').replace(/'/g, "''")}',
    '${(data.date || '').replace(/'/g, "''")}',
    '${(data.category || '').replace(/'/g, "''")}',
    '${(data.summary || '').replace(/'/g, "''")}',
    '${(data.image || '').replace(/'/g, "''")}',
    '${body.replace(/'/g, "''")}'
  );\n`;
});

fs.writeFileSync(sqlFile, sql);
console.log('SQL generated: migrate-data.sql');
