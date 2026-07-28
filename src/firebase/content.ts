import { db } from './client';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { marked } from 'marked';

// Mengambil seluruh dokumen dari suatu koleksi di Firestore
export async function getCollection(collectionName: string) {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
      body: doc.data().body || ''
    }));
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    return [];
  }
}

// Render markdown string ke HTML
export async function render(entry: any) {
  const html = marked.parse(entry.body || '');
  return { Content: html };
}
