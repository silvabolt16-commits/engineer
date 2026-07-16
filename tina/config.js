import { defineConfig } from "tinacms";

export default defineConfig({
    branch: "main",
    clientId: process.env.TINA_CLIENT_ID || null,
    token: process.env.TINA_TOKEN || null,
    build: {
        outputFolder: "admin",
        publicFolder: "public",
    },
    media: {
        tina: {
            mediaRoot: "images",
            publicFolder: "public",
        },
    },
    schema: {
        collections: [
            {
                name: "profile",
                label: "Biodata & Kontak",
                path: "src/content/profile",
                format: "json",
                fields: [
                    { type: "string", name: "name", label: "Nama Lengkap" },
                    { type: "string", name: "role", label: "Jabatan / Role" },
                    { type: "image", name: "avatar", label: "Foto Profil" },
                    { type: "string", name: "phone", label: "No HP" },
                    { type: "string", name: "email", label: "Email" },
                    { type: "string", name: "linkedin", label: "URL LinkedIn" },
                    { type: "rich-text", name: "bio", label: "Profil Singkat" },
                ],
            },
            {
                name: "experience",
                label: "Riwayat Kerja",
                path: "src/content/experience",
                fields: [
                    { type: "string", name: "company", label: "Perusahaan" },
                    { type: "string", name: "position", label: "Posisi" },
                    { type: "string", name: "duration", label: "Durasi (Bulan Tahun)" },
                    { type: "rich-text", name: "body", label: "Tugas & Pencapaian", isBody: true },
                ],
            },
            {
                name: "projects",
                label: "Daftar Proyek",
                path: "src/content/projects",
                fields: [
                    { type: "string", name: "title", label: "Judul Proyek" },
                    { type: "string", name: "description", label: "Deskripsi Singkat" },
                    { type: "image", name: "image", label: "Gambar Proyek" },
                    { type: "string", name: "link", label: "Link Proyek / GitHub" },
                ],
            },
            {
                name: "updates",
                label: "Artikel / Status",
                path: "src/content/updates",
                fields: [
                    { type: "string", name: "title", label: "Judul Status" },
                    { type: "datetime", name: "date", label: "Tanggal" },
                    { type: "rich-text", name: "body", label: "Isi Konten", isBody: true },
                ],
            },
        ],
    },
});