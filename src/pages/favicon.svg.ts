import type { APIRoute } from 'astro';
import { avatar, AVATAR_BG, AVATAR_FG } from '../data/avatar';

export const GET: APIRoute = () => {
  const cells = avatar.map(([x, y]) => `M${x} ${y}h1v1h-1z`).join('');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 7 7" shape-rendering="crispEdges">` +
    `<rect x="-1" y="-1" width="7" height="7" fill="${AVATAR_BG}"/>` +
    `<path fill="${AVATAR_FG}" d="${cells}"/>` +
    `</svg>`;
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
