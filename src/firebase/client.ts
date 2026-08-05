// Firebase disabled for Cloudflare D1 migration
const apiKey = import.meta.env.PUBLIC_FIREBASE_API_KEY;

export const isFirebaseConfigured = false;
const app = null;

export const db = null as any;
export const auth = null as any;
export const storage = null as any;
export default app;
