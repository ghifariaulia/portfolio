import type { APIRoute } from 'astro';
import { avatar, AVATAR_BG, AVATAR_FG } from '../data/avatar';

// The identicon is a 7x7 grid (5x5 cells plus a 1-cell border). Each size
// scales a grid cell to a whole number of pixels so edges stay sharp, and
// centres it with a transparent margin.
const SIZES = [16, 32, 48];
const GRID = 7;

function rgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const filled = new Set(avatar.map(([x, y]) => `${x + 1},${y + 1}`));
const bg = rgb(AVATAR_BG);
const fg = rgb(AVATAR_FG);

// One icon image: a 32-bit BMP (BGRA, rows bottom-up) without the file header,
// followed by the 1-bit AND mask that ICO requires (all zero: alpha decides).
function bitmap(size: number): Uint8Array {
  const cell = Math.floor(size / GRID);
  const margin = Math.floor((size - cell * GRID) / 2);
  const maskRow = Math.ceil(size / 32) * 4;
  const out = new Uint8Array(40 + size * size * 4 + maskRow * size);
  const view = new DataView(out.buffer);

  view.setUint32(0, 40, true); // header size
  view.setInt32(4, size, true); // width
  view.setInt32(8, size * 2, true); // height: image + mask
  view.setUint16(12, 1, true); // planes
  view.setUint16(14, 32, true); // bits per pixel

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const gx = Math.floor((px - margin) / cell);
      const gy = Math.floor((py - margin) / cell);
      if (px < margin || py < margin || gx >= GRID || gy >= GRID) continue;
      const [r, g, b] = filled.has(`${gx},${gy}`) ? fg : bg;
      const i = 40 + ((size - 1 - py) * size + px) * 4;
      out.set([b, g, r, 255], i);
    }
  }
  return out;
}

export const GET: APIRoute = () => {
  const images = SIZES.map(bitmap);
  const dirSize = 6 + 16 * images.length;
  const total = dirSize + images.reduce((n, img) => n + img.length, 0);
  const ico = new Uint8Array(total);
  const view = new DataView(ico.buffer);

  view.setUint16(2, 1, true); // type: icon
  view.setUint16(4, images.length, true);

  let offset = dirSize;
  images.forEach((img, k) => {
    const entry = 6 + 16 * k;
    ico[entry] = SIZES[k];
    ico[entry + 1] = SIZES[k];
    view.setUint16(entry + 4, 1, true); // planes
    view.setUint16(entry + 6, 32, true); // bits per pixel
    view.setUint32(entry + 8, img.length, true);
    view.setUint32(entry + 12, offset, true);
    ico.set(img, offset);
    offset += img.length;
  });

  return new Response(ico, { headers: { 'Content-Type': 'image/x-icon' } });
};
