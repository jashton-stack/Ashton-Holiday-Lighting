#!/usr/bin/env node
/**
 * One-shot image optimizer used during the build of the install page.
 * Reads a source path + dest path, applies EXIF auto-rotation, resizes the
 * long edge to a max dimension, and writes a JPEG at quality 78. Sharp
 * handles MozJPEG-quality output natively.
 *
 * Usage: node scripts/optimize-image.mjs <src> <dest> <maxEdge>
 */
import sharp from 'sharp';

const [, , src, dest, maxEdgeArg] = process.argv;
if (!src || !dest) {
  console.error('Usage: optimize-image.mjs <src> <dest> [maxEdge=1800]');
  process.exit(2);
}
const maxEdge = Number(maxEdgeArg) || 1800;

const input = sharp(src).rotate();
const meta = await input.metadata();
const longEdge = Math.max(meta.width ?? 0, meta.height ?? 0);
const isPortrait = (meta.height ?? 0) > (meta.width ?? 0);

const pipeline = longEdge > maxEdge
  ? input.resize({
      [isPortrait ? 'height' : 'width']: maxEdge,
      withoutEnlargement: true,
    })
  : input;

await pipeline
  .jpeg({ quality: 78, mozjpeg: true, progressive: true })
  .toFile(dest);

const after = await sharp(dest).metadata();
console.log(`${src}\n  -> ${dest}`);
console.log(`     ${meta.width}x${meta.height} -> ${after.width}x${after.height}`);
