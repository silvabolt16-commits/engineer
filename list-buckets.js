import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: 'engineer-portofolio',
  keyFilename: './serviceAccountKey.json'
});

async function listBuckets() {
  try {
    const [buckets] = await storage.getBuckets();
    console.log('Total Buckets:', buckets.length);
    buckets.forEach(b => console.log('Found Bucket:', b.name));
  } catch (err) {
    console.error(err);
  }
}
listBuckets();
