import { profile } from './profile';

// Pixel avatar: 5x5 mirrored identicon derived from the profile name.
// Used by the intro tile and the favicons, so they always match.
let hash = 0;
for (const ch of profile.name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;

export const avatar: [number, number][] = [];
for (let y = 0; y < 5; y++) {
  for (let x = 0; x < 3; x++) {
    if ((hash >> (y * 3 + x)) & 1) {
      avatar.push([x, y]);
      if (x < 2) avatar.push([4 - x, y]);
    }
  }
}

// Light-theme values of --accent and --accent-ink in global.css.
export const AVATAR_BG = '#b84514';
export const AVATAR_FG = '#fdf6e2';
