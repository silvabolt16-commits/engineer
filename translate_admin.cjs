const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages', 'admin');
const layoutPath = path.join(__dirname, 'src', 'layouts', 'AdminLayout.astro');

const filesToProcess = [];

function getFiles(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      getFiles(fullPath);
    } else if (entry.name.endsWith('.astro')) {
      filesToProcess.push(fullPath);
    }
  }
}

if (fs.existsSync(dir)) {
  getFiles(dir);
}
if (fs.existsSync(layoutPath)) {
  filesToProcess.push(layoutPath);
}

const replacements = [
  // Layout & General
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
  { match: />\s*Edit\s*</g, replace: '>Edit<' },
  
  // Forms & Fields
  { match: /placeholder="Title"/g, replace: 'placeholder="Judul"' },
  { match: /placeholder="Description"/g, replace: 'placeholder="Deskripsi"' },
  { match: /placeholder="Category"/g, replace: 'placeholder="Kategori"' },
  { match: /placeholder="Duration"/g, replace: 'placeholder="Durasi (misal: 2020 - 2023)"' },
  { match: /placeholder="Company"/g, replace: 'placeholder="Perusahaan"' },
  { match: /placeholder="Link URL"/g, replace: 'placeholder="Tautan URL"' },
  { match: /placeholder="Repo URL"/g, replace: 'placeholder="Tautan Repositori"' },
  { match: /placeholder="Image URL"/g, replace: 'placeholder="Tautan Gambar"' },
  { match: /placeholder="Institution"/g, replace: 'placeholder="Institusi"' },
  { match: /placeholder="Degree"/g, replace: 'placeholder="Gelar"' },
  
  { match: />\s*Title\s*</g, replace: '>Judul<' },
  { match: />\s*Description\s*</g, replace: '>Deskripsi<' },
  { match: />\s*Category\s*</g, replace: '>Kategori<' },
  { match: />\s*Date\s*</g, replace: '>Tanggal<' },
  { match: />\s*Image\s*</g, replace: '>Gambar<' },
  { match: />\s*Image URL\s*</g, replace: '>URL Gambar<' },
  { match: />\s*Duration\s*</g, replace: '>Durasi<' },
  { match: />\s*Company\s*</g, replace: '>Perusahaan<' },
  { match: />\s*Link URL\s*</g, replace: '>URL Tautan<' },
  { match: />\s*Repo URL\s*</g, replace: '>URL Repositori<' },
  { match: />\s*Demo URL\s*</g, replace: '>URL Demo<' },
  { match: />\s*Content\s*</g, replace: '>Konten<' },
  { match: />\s*Institution\s*</g, replace: '>Institusi<' },
  { match: />\s*Degree\s*</g, replace: '>Gelar<' },
  
  { match: />\s*Upload Image\s*</g, replace: '>Unggah Gambar<' },
  { match: />\s*Remove Image\s*</g, replace: '>Hapus Gambar<' },
  { match: />\s*Saving...\s*</g, replace: '>Menyimpan...<' },
  { match: />\s*Save\s*</g, replace: '>Simpan<' },
  
  // Texts
  { match: /Manage your portfolio/g, replace: 'Kelola portofolio Anda' },
  { match: />\s*Skills\s*</g, replace: '>Keahlian<' },
  { match: />\s*Education\s*</g, replace: '>Pendidikan<' },
  { match: />\s*Profile Settings\s*</g, replace: '>Pengaturan Profil<' },
  { match: /Profile updated successfully/g, replace: 'Profil berhasil diperbarui' },
  { match: /Failed to update profile/g, replace: 'Gagal memperbarui profil' },
  { match: /Are you sure you want to delete this/g, replace: 'Apakah Anda yakin ingin menghapus ini' },
  { match: />\s*Yes, Delete\s*</g, replace: '>Ya, Hapus<' },
  { match: />\s*No, Cancel\s*</g, replace: '>Tidak, Batal<' },
  { match: />\s*Content Management\s*</g, replace: '>Manajemen Konten<' },
  { match: />\s*Admin Panel\s*</g, replace: '>Panel Admin<' },
  { match: /Welcome back/g, replace: 'Selamat datang kembali' },
  { match: /Overview of your/g, replace: 'Ringkasan dari' },
  { match: />\s*Total\s*</g, replace: '>Total<' },
  { match: />\s*Recent\s*</g, replace: '>Terbaru<' },
  { match: />\s*View All\s*</g, replace: '>Lihat Semua<' },
  
  // Specific CMS strings
  { match: /List of/g, replace: 'Daftar' },
  { match: /No data yet in/g, replace: 'Belum ada data di' },
  { match: /Create first/g, replace: 'Buat pertama' },
  
  // For document pages
  { match: />\s*File\s*</g, replace: '>Berkas<' },
  { match: />\s*Upload File\s*</g, replace: '>Unggah Berkas<' },
  
  // specific fixes for admin titles
  { match: /Manage/g, replace: 'Kelola' }
];

let filesModified = 0;

for (const filePath of filesToProcess) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const { match, replace } of replacements) {
    content = content.replace(match, replace);
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
    console.log(`Updated ${filePath}`);
  }
}

console.log(`\nFinished! Modified ${filesModified} files.`);
