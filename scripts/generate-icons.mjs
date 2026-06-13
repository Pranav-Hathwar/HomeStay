// Generates favicon, apple-touch-icon, and the social/OG card from the logo.
// Run: npm run gen:icons   (outputs to /public)
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOGO = join(root, 'src', 'assets', 'mungaru-logo.png');
const PHOTO = join(root, 'src', 'assets', 'mudigere1.jpeg'); // misty-sunrise hero shot
const PUBLIC = join(root, 'public');
const INK = '#0a0f0c';

const out = (f) => join(PUBLIC, f);

// Square icon: logo centered on the ink background with padding.
async function squareIcon(size, pad, file) {
  const logo = await sharp(LOGO)
    .resize({ width: Math.round(size - pad * 2), fit: 'inside' })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: INK } })
    .composite([{ input: logo, gravity: 'center' }])
    .png()
    .toFile(out(file));
  console.log(`${file}  ${size}x${size}`);
}

// 1200x630 OG card: scenery photo, darkening gradient, logo centered.
async function ogCard() {
  const W = 1200;
  const H = 630;
  const bg = await sharp(PHOTO).resize({ width: W, height: H, fit: 'cover' }).toBuffer();
  const gradient = Buffer.from(
    `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#0a0f0c" stop-opacity="0.55"/>
        <stop offset="0.5" stop-color="#0a0f0c" stop-opacity="0.35"/>
        <stop offset="1" stop-color="#0a0f0c" stop-opacity="0.8"/>
      </linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
    </svg>`
  );
  const logo = await sharp(LOGO).resize({ width: 520, fit: 'inside' }).toBuffer();
  await sharp(bg)
    .composite([{ input: gradient, top: 0, left: 0 }, { input: logo, gravity: 'center' }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out('og-image.jpg'));
  console.log(`og-image.jpg  ${W}x${H}`);
}

await squareIcon(512, 56, 'favicon.png');
await squareIcon(180, 22, 'apple-touch-icon.png');
await ogCard();
