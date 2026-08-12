const fs = require('fs');
const path = require('path');

const filesToProcess = [
  'src/pages/admin/index.astro',
  'src/pages/admin/projects/index.astro',
  'src/pages/admin/cms/[table]/index.astro'
];

for (const relPath of filesToProcess) {
  const filePath = path.join(__dirname, relPath);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Logout Button
  content = content.replace(
    /<button id="logoutBtn"[^>]*>\s*Keluar\s*<\/button>/g,
    `<button id="logoutBtn" title="Keluar" class="w-10 h-10 neu-pressed rounded-xl text-red-500 hover:text-red-600 transition-all flex items-center justify-center">\n          <span class="material-symbols-outlined text-[20px]">logout</span>\n        </button>`
  );

  // Replace "Tambah Proyek" button in admin/projects/index.astro
  content = content.replace(
    /<a href="\/admin\/projects\/new" class="px-5 py-3[^>]*>\s*<span[^>]*>add<\/span> Tambah Proyek\s*<\/a>/g,
    `<a href="/admin/projects/new" title="Tambah Proyek" class="w-10 h-10 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-xl shadow-md transition-all flex items-center justify-center">\n          <span class="material-symbols-outlined text-[20px]">add</span>\n        </a>`
  );

  // Replace smaller "Tambah Proyek" button in admin/projects/index.astro
  content = content.replace(
    /<a href="\/admin\/projects\/new" class="px-4 py-2[^>]*>\s*<span[^>]*>add<\/span> Tambah Proyek\s*<\/a>/g,
    `<a href="/admin/projects/new" title="Tambah Proyek" class="w-8 h-8 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-lg shadow-md transition-all flex items-center justify-center">\n        <span class="material-symbols-outlined text-[16px]">add</span>\n      </a>`
  );

  // Replace "Tambah Baru" button in cms/[table]/index.astro
  content = content.replace(
    /<a href="\{\`\/admin\/cms\/\$\{table\}\/new\`\}" class="px-4 py-2[^>]*>\s*<span[^>]*>add<\/span> Tambah Baru\s*<\/a>/g,
    `<a href={\`/admin/cms/\${table}/new\`} title="Tambah Baru" class="w-10 h-10 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-xl shadow-md transition-all flex items-center justify-center">\n        <span class="material-symbols-outlined text-[20px]">add</span>\n      </a>`
  );

  // Replace "Buat {tableName} Pertama"
  content = content.replace(
    /<a\s*href="\{\`\/admin\/cms\/\$\{table\}\/new\`\}"\s*class="inline-block px-8 py-4 bg-\[#E9582A\] hover:bg-\[#d04a1f\] text-white font-bold rounded-xl shadow-md transition-all text-sm uppercase tracking-wider"\s*>\s*Buat \{tableName\} Pertama\s*<\/a>/g,
    `<a href={\`/admin/cms/\${table}/new\`} title="Buat Baru" class="inline-flex w-16 h-16 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-2xl shadow-md transition-all items-center justify-center">\n          <span class="material-symbols-outlined text-[32px]">add</span>\n        </a>`
  );

  // Replace "Buat Proyek Pertama"
  content = content.replace(
    /<a\s*href="\/admin\/projects\/new"\s*class="inline-block px-8 py-4 bg-\[#E9582A\] hover:bg-\[#d04a1f\] text-white font-bold rounded-xl shadow-md transition-all text-sm uppercase tracking-wider"\s*>\s*Buat Proyek Pertama\s*<\/a>/g,
    `<a href="/admin/projects/new" title="Buat Proyek Baru" class="inline-flex w-16 h-16 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-2xl shadow-md transition-all items-center justify-center">\n          <span class="material-symbols-outlined text-[32px]">add</span>\n        </a>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log('Fixed buttons to icons.');
