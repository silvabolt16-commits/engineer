const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/admin/cms/[table]/index.astro');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(
    /<a href=\{\`\/admin\/cms\/\$\{table\}\/new\`\} class="px-4 py-2[^>]*>\s*<span[^>]*>add<\/span> Tambah Baru\s*<\/a>/g,
    `<a href={\`/admin/cms/\${table}/new\`} title="Tambah Baru" class="w-10 h-10 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-xl shadow-md transition-all flex items-center justify-center">\n        <span class="material-symbols-outlined text-[20px]">add</span>\n      </a>`
  );

  content = content.replace(
    /<a\s*href=\{\`\/admin\/cms\/\$\{table\}\/new\`\}\s*class="inline-block px-8 py-4 bg-\[#E9582A\] hover:bg-\[#d04a1f\] text-white font-bold rounded-xl shadow-md transition-all text-sm uppercase tracking-wider"\s*>\s*Buat \{tableName\} Pertama\s*<\/a>/g,
    `<a href={\`/admin/cms/\${table}/new\`} title="Buat Baru" class="inline-flex w-16 h-16 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-2xl shadow-md transition-all flex items-center justify-center">\n          <span class="material-symbols-outlined text-[32px]">add</span>\n        </a>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed cms buttons.');
