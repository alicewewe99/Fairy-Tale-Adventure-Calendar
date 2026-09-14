import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const svgBuffer = fs.readFileSync(path.resolve('./public/icon.svg'));

async function generate() {
  // 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.resolve('./public/pwa-192x192.png'));

  // 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.resolve('./public/pwa-512x512.png'));

  // 256x256
  await sharp(svgBuffer)
    .resize(256, 256)
    .png()
    .toFile(path.resolve('./public/desktop-icon-256.png'));

  // 512x512 maskable (with 10% padding safe zone)
  await sharp(svgBuffer)
    .resize(410, 410)
    .extend({
      top: 51,
      bottom: 51,
      left: 51,
      right: 51,
      background: { r: 252, g: 248, b: 238, alpha: 1 }
    })
    .png()
    .toFile(path.resolve('./public/pwa-maskable-512x512.png'));

  // apple-touch-icon 180x180
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('./public/apple-touch-icon.png'));

  // favicon-32x32.png and favicon-16x16.png
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.resolve('./public/favicon-32x32.png'));
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.resolve('./public/favicon-16x16.png'));

  // Multi-resolution Windows .ICO (16, 32, 48, 64, 128, 256)
  const sizes = [16, 32, 48, 64, 128, 256];
  const pngBuffers = [];
  for (const size of sizes) {
    const buf = await sharp(svgBuffer).resize(size, size).png().toBuffer();
    pngBuffers.push({ size, buf });
  }

  // Header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(sizes.length, 4); // count

  let offset = 6 + sizes.length * 16;
  const dirEntries = [];

  for (const { size, buf } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    dirEntries.push(entry);
    offset += buf.length;
  }

  const icoBuffer = Buffer.concat([header, ...dirEntries, ...pngBuffers.map((p) => p.buf)]);
  fs.writeFileSync(path.resolve('./public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.resolve('./public/desktop-icon.ico'), icoBuffer);

  console.log('PWA and Desktop ICO icons successfully generated!');
}

generate().catch(console.error);
