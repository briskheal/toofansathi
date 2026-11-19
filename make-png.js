import fs from 'fs';
import zlib from 'zlib';

function createPNG(width, height, drawPixelFn) {
  // 1. PNG Header
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // 2. IHDR Chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // 8-bit depth
  ihdrData.writeUInt8(6, 9); // RGBA color type
  ihdrData.writeUInt8(0, 10); // Compression method
  ihdrData.writeUInt8(0, 11); // Filter method
  ihdrData.writeUInt8(0, 12); // Interlace method
  const ihdr = makeChunk('IHDR', ihdrData);

  // 3. Raw Scanlines (Filter 0 + RGBA for each pixel)
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData.writeUInt8(0, rowOffset); // filter 0 (None)
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = drawPixelFn(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData.writeUInt8(r, pixelOffset);
      rawData.writeUInt8(g, pixelOffset + 1);
      rawData.writeUInt8(b, pixelOffset + 2);
      rawData.writeUInt8(a, pixelOffset + 3);
    }
  }

  // Deflate raw scanlines
  const compressed = zlib.deflateSync(rawData);
  const idat = makeChunk('IDAT', compressed);

  // 4. IEND Chunk
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([header, ihdr, idat, iend]);
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(4 + 4 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const crc = crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

// CRC32 table
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) c = 0xedb88320 ^ (c >>> 1);
    else c = c >>> 1;
  }
  crcTable[n] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Generate Cyclone & Radar Artwork
function drawCycloneIcon(x, y, w, h) {
  // Normalize to -1 to +1
  const nx = (x / w) * 2 - 1;
  const ny = (y / h) * 2 - 1;
  const dist = Math.sqrt(nx * nx + ny * ny);
  const angle = Math.atan2(ny, nx); // -PI to PI

  // Rounded squircle background for PWA icon
  const cornerR = Math.pow(Math.abs(nx), 4) + Math.pow(Math.abs(ny), 4);
  if (cornerR > 1.25) {
    return [0, 0, 0, 0]; // Transparent outer padding
  }

  // Base background: Deep rich dark slate gradient
  const bgGrad = 0.5 - (ny * 0.3);
  let r = Math.round(11 * bgGrad);
  let g = Math.round(17 * bgGrad + 5);
  let b = Math.round(32 * bgGrad + 15);
  let a = 255;

  // Concentric Radar Rings
  if (Math.abs(dist - 0.82) < 0.02) {
    r = 30; g = 50; b = 80;
  }
  if (Math.abs(dist - 0.6) < 0.015) {
    r = 2; g = 132; b = 199; // Cyan ring
  }
  if (Math.abs(dist - 0.4) < 0.015) {
    r = 14; g = 165; b = 233;
  }

  // Cyclone Spiral Arms Formula: r(theta) = a * exp(b * theta)
  // Arm 1: Cyan / Sky Blue
  const spiral1 = (angle + 4 * Math.PI) % (2 * Math.PI);
  const targetDist1 = 0.2 + (spiral1 / (2 * Math.PI)) * 0.6;
  const diff1 = Math.abs(dist - targetDist1);
  if (diff1 < 0.12 && dist > 0.18 && dist < 0.85) {
    const intensity = 1 - (diff1 / 0.12);
    r = Math.round(r * (1 - intensity) + 56 * intensity);
    g = Math.round(g * (1 - intensity) + 189 * intensity);
    b = Math.round(b * (1 - intensity) + 248 * intensity);
  }

  // Arm 2: Coral / Amber Red (Opposite side)
  const spiral2 = (angle + Math.PI + 4 * Math.PI) % (2 * Math.PI);
  const targetDist2 = 0.2 + (spiral2 / (2 * Math.PI)) * 0.6;
  const diff2 = Math.abs(dist - targetDist2);
  if (diff2 < 0.12 && dist > 0.18 && dist < 0.85) {
    const intensity = 1 - (diff2 / 0.12);
    r = Math.round(r * (1 - intensity) + 239 * intensity);
    g = Math.round(g * (1 - intensity) + 68 * intensity);
    b = Math.round(b * (1 - intensity) + 68 * intensity);
  }

  // Cyclone Eyewall Ring (Amber gold)
  if (Math.abs(dist - 0.16) < 0.025) {
    r = 245; g = 158; b = 11;
  }

  // Glowing Storm Eye Center (Golden beacon)
  if (dist < 0.13) {
    const eyeInt = 1 - (dist / 0.13);
    r = Math.round(251 * eyeInt + 245 * (1 - eyeInt));
    g = Math.round(191 * eyeInt + 158 * (1 - eyeInt));
    b = Math.round(36 * eyeInt);
  }
  // High contrast white pinpoint center
  if (dist < 0.04) {
    r = 255; g = 255; b = 255;
  }

  return [r, g, b, a];
}

console.log('Generating 512x512 icon...');
const png512 = createPNG(512, 512, drawCycloneIcon);
fs.writeFileSync('public/icon-512.png', png512);
fs.writeFileSync('public/pwa-512x512.png', png512);

console.log('Generating 192x192 icon...');
const png192 = createPNG(192, 192, drawCycloneIcon);
fs.writeFileSync('public/icon-192.png', png192);
fs.writeFileSync('public/pwa-192x192.png', png192);

console.log('Generating 180x180 Apple touch icon...');
const png180 = createPNG(180, 180, drawCycloneIcon);
fs.writeFileSync('public/apple-touch-icon.png', png180);

console.log('Generating 64x64 favicon...');
const png64 = createPNG(64, 64, drawCycloneIcon);
fs.writeFileSync('public/favicon.png', png64);

console.log('All icons successfully created in public/ directory!');
