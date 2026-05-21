#!/usr/bin/env node
/**
 * Rasterizes public/favicon.svg into the PNG + ICO variants the site references
 * from index.html. Re-run after any tweak to favicon.svg.
 *
 * Outputs (all into public/):
 *   - favicon-96.png        (96x96, standard high-DPI tab icon)
 *   - apple-touch-icon.png  (180x180, iOS home screen)
 *   - icon-192.png          (192x192, Android home screen / PWA)
 *   - icon-512.png          (512x512, splash / large PWA)
 *   - favicon.ico           (multi-size: 16, 32, 48)
 *
 * Usage: node scripts/generate-favicons.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import toIco from 'to-ico';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'public', 'favicon.svg');
const outDir = path.join(root, 'public');

async function pngFromSvg(svg, size) {
  return sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  const svg = await readFile(src);

  const variants = [
    { name: 'favicon-96.png',       size: 96 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png',         size: 192 },
    { name: 'icon-512.png',         size: 512 },
  ];

  for (const v of variants) {
    const buf = await pngFromSvg(svg, v.size);
    await writeFile(path.join(outDir, v.name), buf);
    console.log(`✓ ${v.name} (${v.size}x${v.size}, ${buf.length} bytes)`);
  }

  const icoPngs = await Promise.all([16, 32, 48].map((s) => pngFromSvg(svg, s)));
  const ico = await toIco(icoPngs);
  await writeFile(path.join(outDir, 'favicon.ico'), ico);
  console.log(`✓ favicon.ico (16+32+48, ${ico.length} bytes)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
