import { db } from './client';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
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
      items = localDocs.map((doc: any) => ({
        id: doc.slug || doc.id,
        data: doc.data,
        body: doc.body || ''
      }));
    } catch (e) {
      console.error(`Error fetching local collection ${collectionName}:`, e);
    }
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

import profileData from '../content/profile.json';

export async function getProfile() {
  let profile = { ...profileData };
  try {
    const docRef = doc(db, 'settings', 'profile');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      profile = { ...profile, ...docSnap.data() } as any;
    }

    const skillsSnap = await getDocs(collection(db, 'skills'));
    if (!skillsSnap.empty) {
      profile.skills = skillsSnap.docs.map(doc => doc.data() as any);
    }

    const eduSnap = await getDocs(collection(db, 'education'));
    if (!eduSnap.empty) {
      profile.education = eduSnap.docs.map(doc => doc.data() as any);
    }
  } catch (error) {
    console.error('Error fetching profile from Firestore:', error);
  }
  return profile;
}
