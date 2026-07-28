import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import mime from 'mime-types';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Inisialisasi Firebase Admin
// Pastikan Anda sudah mengunduh file 'serviceAccountKey.json' dari Firebase Console
// (Project Settings > Service Accounts > Generate new private key) dan meletakkannya di folder root.
const serviceAccountPath = path.join(rootDir, 'serviceAccountKey.json');

if (!fs.existsSync(serviceAccountPath)) {
  console.error("❌ File serviceAccountKey.json tidak ditemukan!");
  console.error("Unduh dari Firebase Console (Project Settings > Service Accounts) lalu simpan di folder root.");
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.PUBLIC_FIREBASE_STORAGE_BUCKET || `${serviceAccount.project_id}.appspot.com`
});

const db = getFirestore();
const bucket = getStorage().bucket();

// Helper: Upload file gambar ke Firebase Storage
async function uploadImage(imagePath, destinationFolder) {
  try {
    const fullPath = path.resolve(rootDir, 'public', imagePath.replace(/^\//, ''));
    if (!fs.existsSync(fullPath)) {
      console.warn(`Peringatan: Gambar tidak ditemukan di ${fullPath}`);
      return null;
    }

    const fileName = path.basename(fullPath);
    const destination = `${destinationFolder}/${Date.now()}_${fileName}`;
    const contentType = mime.lookup(fullPath) || 'application/octet-stream';

    await bucket.upload(fullPath, {
      destination: destination,
      metadata: { contentType }
    });

    // Buat file menjadi publik
    const file = bucket.file(destination);
    await file.makePublic();
    
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${destination}`;
    console.log(`✅ Berhasil mengunggah gambar: ${publicUrl}`);
    return publicUrl;
  } catch (error) {
    console.error(`❌ Gagal mengunggah gambar ${imagePath}:`, error);
    return null;
  }
}

// Helper: Proses koleksi Markdown
async function processCollection(collectionName) {
  const collectionDir = path.join(rootDir, 'src', 'content', collectionName);
  
  if (!fs.existsSync(collectionDir)) {
    console.log(`Folder koleksi ${collectionName} tidak ditemukan. Dilewati.`);
    return;
  }

  const files = fs.readdirSync(collectionDir).filter(f => f.endsWith('.md'));
  console.log(`\nMemproses koleksi: [${collectionName}] (${files.length} file)`);

  for (const file of files) {
    const filePath = path.join(collectionDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Proses gambar jika ada field 'photos' (array) atau 'image' (string)
    const newPhotos = [];
    if (data.photos && Array.isArray(data.photos)) {
      for (const photoPath of data.photos) {
        const url = await uploadImage(photoPath, collectionName);
        if (url) newPhotos.push(url);
      }
      data.photos = newPhotos;
    }

    if (data.image) {
      const url = await uploadImage(data.image, collectionName);
      if (url) data.image = url;
    }

    // Siapkan data untuk Firestore
    const documentData = {
      ...data,
      body: content, // Menyimpan isi konten markdown
      createdAt: new Date()
    };

    // Slug / ID dokumen (nama file tanpa .md)
    const docId = file.replace('.md', '');

    try {
      await db.collection(collectionName).doc(docId).set(documentData);
      console.log(`✅ [${collectionName}] Berhasil menyimpan dokumen: ${docId}`);
    } catch (error) {
      console.error(`❌ [${collectionName}] Gagal menyimpan dokumen ${docId}:`, error);
    }
  }
}

async function runMigration() {
  console.log("🚀 Memulai Migrasi ke Firebase...");
  
  // Daftar nama koleksi yang ada di src/content
  const collections = ['projects', 'experiences', 'articles', 'certificates', 'achievements', 'updates'];
  
  for (const col of collections) {
    await processCollection(col);
  }

  console.log("\n🎉 Migrasi selesai!");
}

runMigration().catch(console.error);
