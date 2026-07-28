import { db } from './client';
import { collection, getDocs } from 'firebase/firestore';
import { marked } from 'marked';
import { getCollection as getLocalCollection } from 'astro:content';

// Mengambil seluruh dokumen dari suatu koleksi di Firestore, atau fallback ke file lokal di src/content
export async function getCollection(collectionName: string) {
  let items: any[] = [];
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    items = snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data(),
      body: doc.data().body || ''
    }));
  } catch (error) {
    console.error(`Error fetching collection ${collectionName} from Firestore:`, error);
  }

  // Jika data di Firestore kosong, gunakan data lokal dari folder src/content
  if (items.length === 0) {
    try {
      const localDocs = await getLocalCollection(collectionName as any);
      items = localDocs.map(doc => ({
        id: doc.id,
        data: doc.data,
        body: doc.body || ''
      }));
    } catch (e) {
      console.error(`Error fetching local collection ${collectionName}:`, e);
    }
  }

  return items;
}

// Render markdown string ke HTML
export async function render(entry: any) {
  const html = marked.parse(entry.body || '');
  return { Content: html };
}
