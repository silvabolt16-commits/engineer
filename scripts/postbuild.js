import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const clientDir = path.join(distDir, 'client');
const serverDir = path.join(distDir, 'server');

// Copy _worker.js (entrypoint) ke dalam dist/client agar Cloudflare Pages SSR bekerja
// Cloudflare Pages expects: static assets AND _worker.js to be in the SAME directory
const workerSrc = path.join(serverDir, 'entry.mjs');
const workerDest = path.join(clientDir, '_worker.js');

// _worker.js harus import dari ./server/entry.mjs (relative path dalam client folder)
// Karena kita copy server ke dalam client/server juga
const serverDestDir = path.join(clientDir, 'server');

// Copy seluruh folder server ke dalam client/server
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(serverDir, serverDestDir);
console.log('✓ Copied server/ into client/server/');

// Buat _worker.js yang mengarah ke ./server/entry.mjs
const workerContent = `export { default } from './server/entry.mjs';\n`;
fs.writeFileSync(workerDest, workerContent);
console.log('✓ Generated client/_worker.js');

// Salin _headers jika ada di dist root
const headersSrc = path.join(distDir, '_headers');
if (fs.existsSync(headersSrc)) {
  // sudah ada di client/_headers dari astro build, tidak perlu copy
}

console.log('\n✅ Deploy folder ready: dist/client/');
console.log('   Run: npx wrangler pages deploy dist/client --project-name engineer --branch main');
