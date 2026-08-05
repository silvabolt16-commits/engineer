import { db as _db, isFirebaseConfigured as _isFirebaseConfigured } from './client';
import { getCollection as getLocalCollection } from 'astro:content';
import { marked } from 'marked';
import profileData from '../content/profile.json';

// Firebase is disabled, always use local content
export const isFirebaseConfigured = false;
export const db = null;

// Mengambil seluruh dokumen dari suatu koleksi dari file lokal di src/content
export async function getCollection(collectionName: string) {
  let items: any[] = [];
  try {
    const localDocs = await getLocalCollection(collectionName as any);
    items = localDocs.map((doc: any) => ({
      id: doc.slug || doc.id,
      data: doc.data,
      body: doc.body || ''
    }));
  } catch (e) {
    console.error(`Error fetching local collection ${collectionName}:`, e);
  }
  return items;
}

// Render markdown string ke HTML secara aman
export async function render(entry: any) {
  if (!entry) return { Content: '' };
  const bodyText = entry.body || entry.data?.body || entry.data?.description || '';
  const html = marked.parse(bodyText);
  return { Content: html };
}

export async function getProfile() {
  return { ...profileData };
}
