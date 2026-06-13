// One-shot image optimizer. Run: npm run optimize:img
// - Logo: resize to display size + emit a tiny WebP (used by the app).
// - Photos: emit WebP siblings (same basename) for optional <picture>/srcset use.
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets');
const PHOTO_EXT = new Set(['.jpg', '.jpeg', '.png']);

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

async function run() {
  const files = await readdir(ASSETS);

  for (const f of files) {
    const ext = extname(f).toLowerCase();
    if (!PHOTO_EXT.has(ext)) continue;
    const src = join(ASSETS, f);
    const before = (await stat(src)).size;
    const name = basename(f, ext);

    // The logo is the one oversized asset — shrink hard, keep alpha, output WebP.
    if (name === 'mungaru-logo') {
      const out = join(ASSETS, 'mungaru-logo.webp');
      await sharp(src).resize({ height: 240, withoutEnlargement: true }).webp({ quality: 90 }).toFile(out);
      console.log(`logo  ${kb(before)} -> ${kb((await stat(out)).size)}  (mungaru-logo.webp)`);
      continue;
    }

    // Photos: cap long edge at 1600px and emit a WebP sibling.
    const out = join(ASSETS, `${name}.webp`);
    await sharp(src).resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(out);
    console.log(`photo ${kb(before)} -> ${kb((await stat(out)).size)}  (${name}.webp)`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
