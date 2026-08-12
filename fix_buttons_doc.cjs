const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/pages/admin/documents/index.astro');
if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Top button "Upload Dokumen"
  content = content.replace(
    /<a href="\/admin\/documents\/new" class="px-4 py-2 bg-\[#E9582A\] hover:bg-\[#d04a1f\] text-white font-bold rounded-xl shadow-md transition-all text-\[10px\] uppercase tracking-wider shrink-0 flex items-center justify-center gap-1">\s*<span class="material-symbols-outlined text-\[14px\]">add<\/span>\s*Upload Dokumen\s*<\/a>/g,
    `<a href="/admin/documents/new" title="Upload Dokumen" class="w-10 h-10 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-xl shadow-md transition-all flex items-center justify-center">\n        <span class="material-symbols-outlined text-[20px]">add</span>\n      </a>`
  );

  // Replace empty state "Upload Dokumen Pertama"
  content = content.replace(
    /<a\s*href="\/admin\/documents\/new"\s*class="inline-block px-8 py-4 bg-\[#E9582A\] hover:bg-\[#d04a1f\] text-white font-bold rounded-xl shadow-md transition-all text-sm uppercase tracking-wider"\s*>\s*Upload Dokumen Pertama\s*<\/a>/g,
    `<a href="/admin/documents/new" title="Upload Dokumen Baru" class="inline-flex w-16 h-16 bg-[#E9582A] hover:bg-[#d04a1f] text-white rounded-2xl shadow-md transition-all items-center justify-center">\n          <span class="material-symbols-outlined text-[32px]">add</span>\n        </a>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed document buttons.');
