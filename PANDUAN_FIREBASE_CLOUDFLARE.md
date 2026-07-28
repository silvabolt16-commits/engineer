# Panduan Integrasi Firebase & Deployment ke Cloudflare Pages

Panduan ini berisi langkah-langkah lengkap untuk menghubungkan aplikasi portofolio Astro Anda dengan backend Firebase dan cara memublikasikannya secara online menggunakan Cloudflare Pages.

---

## 1. Persiapan Firebase (Mendapatkan Kredensial)

Jika Anda belum memiliki *project* di Firebase, ikuti langkah ini:

1. Buka [Firebase Console](https://console.firebase.google.com/).
2. Klik tombol **Create a project** (Buat proyek) dan ikuti panduannya hingga selesai.
3. Di halaman beranda *project* Firebase Anda, klik ikon web `</>` (di bawah tulisan "Get started by adding Firebase to your app").
4. Beri nama aplikasi Anda (misal: "Portofolio Web") dan klik **Register app**.
5. Anda akan melihat sekumpulan kode konfigurasi Firebase (berisi `apiKey`, `authDomain`, dll). Biarkan halaman ini terbuka untuk disalin pada langkah berikutnya.

---

## 2. Mengatur Variabel Lingkungan (.env) Secara Lokal

Agar kode Astro bisa membaca konfigurasi Firebase Anda dengan aman:

1. Di dalam folder proyek lokal Anda (selevel dengan `package.json`), buatlah sebuah file baru bernama `.env`. (Anda bisa menduplikat/meng-copy isi dari `.env.example`).
2. Masukkan data konfigurasi dari Firebase Console tadi ke dalam format berikut. **Penting:** Pastikan menggunakan awalan `PUBLIC_` agar terbaca di *client-side* (browser):

```env
PUBLIC_FIREBASE_API_KEY="ISI_DENGAN_API_KEY_ANDA"
PUBLIC_FIREBASE_AUTH_DOMAIN="ISI_DENGAN_AUTH_DOMAIN_ANDA"
PUBLIC_FIREBASE_PROJECT_ID="ISI_DENGAN_PROJECT_ID_ANDA"
PUBLIC_FIREBASE_STORAGE_BUCKET="ISI_DENGAN_STORAGE_BUCKET_ANDA"
PUBLIC_FIREBASE_MESSAGING_SENDER_ID="ISI_DENGAN_SENDER_ID_ANDA"
PUBLIC_FIREBASE_APP_ID="ISI_DENGAN_APP_ID_ANDA"
```

> **Catatan:** File `.env` ini **tidak boleh** di-upload ke GitHub demi keamanan kredensial Anda. File ini biasanya sudah secara otomatis diabaikan oleh `.gitignore`.

---

## 3. Cara Menggunakan Firebase di Komponen Astro

Sistem inisialisasi Firebase sudah disiapkan di dalam file `src/firebase/client.ts`. Anda bisa memanggilnya di halaman/komponen apa saja.

### Contoh Menarik Data (Firestore)

Misalnya Anda ingin menampilkan data proyek yang disimpan di koleksi Firestore bernama `projects`. Tambahkan kode berikut di file halaman Anda (misal `src/pages/index.astro`):

```astro
---
// Bagian Frontmatter (dijalankan di Server karena SSR aktif)
import { db } from '../firebase/client';
import { collection, getDocs } from 'firebase/firestore';

let projects = [];

try {
  const querySnapshot = await getDocs(collection(db, "projects"));
  projects = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
} catch (error) {
  console.error("Gagal mengambil data dari Firebase:", error);
}
---

<!-- HTML Render -->
<section>
  <h2>Daftar Proyek Saya</h2>
  <ul>
    {projects.length > 0 ? (
      projects.map((project) => (
        <li>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </li>
      ))
    ) : (
      <p>Belum ada proyek yang ditambahkan atau gagal memuat data.</p>
    )}
  </ul>
</section>
```

---

## 4. Persiapan Deployment (Git)

Sebelum menghubungkan ke Cloudflare, pastikan Anda telah menyimpan perubahan dan mengunggah kode ke GitHub/GitLab Anda:

```bash
git add .
git commit -m "feat: integrasi firebase dan cloudflare adapter"
git push origin main
```

---

## 5. Deployment ke Cloudflare Pages

Ini adalah tahap akhir untuk membuat situs Anda online.

1. Buka dan *login* ke dashboard [Cloudflare](https://dash.cloudflare.com/).
2. Di menu sebelah kiri, pilih **Workers & Pages**.
3. Klik tombol **Create application**, lalu pilih tab **Pages**.
4. Klik **Connect to Git**.
5. Beri izin Cloudflare untuk mengakses akun GitHub/GitLab Anda, lalu pilih repository proyek portofolio Anda dan klik **Begin setup**.
6. Pada bagian **Set up builds and deployments**, atur sesuai ini:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
7. **SANGAT PENTING (Environment Variables):**
   - *Scroll* ke bawah dan temukan bagian **Environment variables (advanced)**.
   - Klik **Add variable** dan salin satu-persatu variabel dari file `.env` lokal Anda ke Cloudflare.
   - Contoh:
     - Variable name: `PUBLIC_FIREBASE_API_KEY` | Value: `ISI_API_KEY_ANDA`
     - Lakukan ini untuk ke-6 variabel Firebase.
8. Jika sudah lengkap, klik **Save and Deploy**.

Cloudflare akan mulai menjalankan proses build (mengunduh dependensi dan me-compile web Anda). Setelah sukses, Anda akan mendapatkan URL publik (misal: `https://my-portfolio-xxx.pages.dev`).

Selesai! Aplikasi web Anda sudah ter-deploy dan tersambung dengan Firebase.
