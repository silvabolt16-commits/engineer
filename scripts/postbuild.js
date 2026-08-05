import fs from 'fs';
import path from 'path';

// Ensure dist/_worker.js exists for Cloudflare Pages SSR routing
const workerContent = `export { default } from './server/entry.mjs';\n`;
fs.writeFileSync(path.join(process.cwd(), 'dist', '_worker.js'), workerContent);
console.log('✓ Successfully generated dist/_worker.js for Cloudflare Pages SSR!');
