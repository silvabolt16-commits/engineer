const fs = require('fs');

let content = fs.readFileSync('src/layouts/AdminLayout.astro', 'utf8');

// Replace standard admin strings
const replacements = [
  { match: /Dashboard/g, replace: 'Dasbor' },
  { match: /Projects/g, replace: 'Proyek' },
  { match: /Articles/g, replace: 'Artikel' },
  { match: /Experiences/g, replace: 'Pengalaman' },
  { match: /Certificates/g, replace: 'Sertifikat' },
  { match: /Achievements/g, replace: 'Pencapaian' },
  { match: /Documents/g, replace: 'Dokumen' },
  { match: /Logout/g, replace: 'Keluar' },
  { match: />\s*Save Changes\s*</g, replace: '>Simpan Perubahan<' },
  { match: />\s*Add New\s*</g, replace: '>Tambah Baru<' },
  { match: />\s*Create\s*</g, replace: '>Buat<' },
  { match: />\s*Update\s*</g, replace: '>Perbarui<' },
  { match: />\s*Delete\s*</g, replace: '>Hapus<' },
  { match: />\s*Cancel\s*</g, replace: '>Batal<' },
  { match: />\s*Actions\s*</g, replace: '>Aksi<' },
  { match: />\s*Back to Dasbor\s*</g, replace: '>Kembali ke Dasbor<' },
  { match: />\s*Back to\s*/g, replace: '>Kembali ke ' },
  { match: />\s*Edit\s*</g, replace: '>Edit<' }
];

for (const { match, replace } of replacements) {
  content = content.replace(match, replace);
}

// Remove "Portofolio Manager" or "Portofolio Kelolar" paragraph
content = content.replace(/<p class="text-\[10px\][^>]*>Portofolio[^<]*<\/p>/g, '');

fs.writeFileSync('src/layouts/AdminLayout.astro', content, 'utf8');
console.log('Fixed AdminLayout');
