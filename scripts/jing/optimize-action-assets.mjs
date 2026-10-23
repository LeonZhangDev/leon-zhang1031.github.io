import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

// Preserve source PNGs. Full-size lossless derivatives keep dimensions, alpha, and every
// visible color value; RGB under fully transparent pixels has no visual effect.
const root = resolve('public/jing/generated');
const sources = ['strike-sequence', 'incense-burner', 'candle', 'prayer-beads']
  .map((name) => resolve(root, `muyu/${name}.png`));
for (const collection of ['guanyin', 'luzu', 'guandi']) {
  const directory = resolve(root, 'lot/frames-safe', collection);
  for (const name of (await readdir(directory)).filter((name) => name.endsWith('.png')).sort()) {
    sources.push(resolve(directory, name));
  }
}
let sourceBytes = 0;
let optimizedBytes = 0;
for (const source of sources) {
  const target = source.replace(/\.png$/, '.webp');
  const input = await readFile(source);
  const output = process.argv.includes('--check')
    ? await readFile(target)
    : await sharp(input).webp({ lossless: true, effort: 6 }).toBuffer();
  const before = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = await sharp(output).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (before.info.width !== after.info.width || before.info.height !== after.info.height) {
    throw new Error(`Dimensions changed: ${source}`);
  }
  for (let pixel = 0; pixel < before.data.length; pixel += 4) {
    const alpha = before.data[pixel + 3];
    if (alpha !== after.data[pixel + 3]
      || (alpha && !before.data.subarray(pixel, pixel + 3).equals(after.data.subarray(pixel, pixel + 3)))) {
      throw new Error(`Visible pixel changed: ${source} at ${pixel / 4}`);
    }
  }
  if (!process.argv.includes('--check')) await writeFile(target, output);
  sourceBytes += input.length;
  optimizedBytes += output.length;
}
console.log(JSON.stringify({ files: sources.length, sourceBytes, optimizedBytes,
  savedPercent: (1 - optimizedBytes / sourceBytes) * 100, visiblePixelsIdentical: true }));

// Props render at 66–190 CSS pixels. Keep full-size fallbacks and select enough
// source pixels for each device; the six-frame strike atlas is never resized.
const responsive = [];
for (const [name, widths] of [['incense-burner', [192, 384]], ['candle', [96, 192, 384]], ['prayer-beads', [192, 384]]]) {
  const input = await readFile(resolve(root, `muyu/${name}.png`));
  for (const width of widths) {
    const target = resolve(root, `muyu/${name}-${width}.webp`);
    const resized = await sharp(input).resize({ width, withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const output = process.argv.includes('--check') ? await readFile(target)
      : await sharp(resized.data, { raw: { width: resized.info.width, height: resized.info.height, channels: 4 } }).webp({ lossless: true, effort: 6 }).toBuffer();
    const decoded = await sharp(output).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    if (decoded.info.width !== resized.info.width || decoded.info.height !== resized.info.height) throw new Error(`Responsive dimensions changed: ${target}`);
    for (let pixel = 0; pixel < resized.data.length; pixel += 4) {
      const alpha = resized.data[pixel + 3];
      if (alpha !== decoded.data[pixel + 3] || (alpha && !resized.data.subarray(pixel, pixel + 3).equals(decoded.data.subarray(pixel, pixel + 3)))) throw new Error(`Responsive encoding changed a visible pixel: ${target}`);
    }
    if (!process.argv.includes('--check')) await writeFile(target, output);
    responsive.push({ name, width, height: decoded.info.height, bytes: output.length });
  }
}
console.log(JSON.stringify({ responsive, encoding: 'lossless-after-resize', fullSizeFallbacksRetained: true, originalStrikeAtlasUnchanged: true }));

// Reduce atlas transfer while retaining all six frames at their original size.
// Near-lossless quality controls the preprocessing bound, not lossy WebP quality.
// Validate composited colors: RGB hidden by near-zero alpha is not visible.
const atlasSource = await readFile(resolve(root, 'muyu/strike-sequence.png'));
const atlasTarget = resolve(root, 'muyu/strike-sequence-optimized.webp');
const atlasOutput = process.argv.includes('--check') ? await readFile(atlasTarget)
  : await sharp(atlasSource).webp({ nearLossless: true, quality: 60, effort: 6 }).toBuffer();
const atlasBefore = await sharp(atlasSource).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const atlasAfter = await sharp(atlasOutput).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
if (atlasBefore.info.width !== atlasAfter.info.width || atlasBefore.info.height !== atlasAfter.info.height) throw new Error('Optimized atlas dimensions changed');
let maximumAlphaDifference = 0;
let maximumCompositeDifference = 0;
for (let pixel = 0; pixel < atlasBefore.data.length; pixel += 4) {
  const a = atlasBefore.data[pixel + 3], b = atlasAfter.data[pixel + 3];
  maximumAlphaDifference = Math.max(maximumAlphaDifference, Math.abs(a - b));
  for (const background of [0, 32, 128, 255]) for (let channel = 0; channel < 3; channel++) {
    const before = Math.round(atlasBefore.data[pixel + channel] * a / 255 + background * (1 - a / 255));
    const after = Math.round(atlasAfter.data[pixel + channel] * b / 255 + background * (1 - b / 255));
    maximumCompositeDifference = Math.max(maximumCompositeDifference, Math.abs(before - after));
  }
}
if (maximumAlphaDifference > 2 || maximumCompositeDifference > 4) throw new Error('Optimized atlas exceeds the visual error budget');
if (!process.argv.includes('--check')) await writeFile(atlasTarget, atlasOutput);
console.log(JSON.stringify({ optimizedAtlasBytes: atlasOutput.length, width: atlasAfter.info.width, height: atlasAfter.info.height,
  maximumAlphaDifference, maximumCompositeDifference, originalPngAndLosslessWebpRetained: true }));
