import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// Read service account key
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'engineer-portofolio.appspot.com'
});

const bucket = admin.storage().bucket();

const corsConfiguration = [
  {
    origin: ["*"],
    method: ["GET", "PUT", "POST", "DELETE", "HEAD", "OPTIONS"],
    responseHeader: ["*"],
    maxAgeSeconds: 3600
  }
];

async function setCors() {
  try {
    console.log('Setting CORS rules for bucket: engineer-portofolio.appspot.com...');
    await bucket.setCorsConfiguration(corsConfiguration);
    console.log('✅ CORS rules successfully updated!');
  } catch (error) {
    console.error('❌ Failed to update CORS rules:', error);
  }
}

setCors();
