import { rm } from 'node:fs/promises';
import { defineConfig } from 'astro/config';

// The CMS at /admin is for local editing only: `npm run dev` serves it,
// but it is removed from the production build so it never gets deployed.
const localOnlyAdmin = {
  name: 'local-only-admin',
  hooks: {
    // Dev server doesn't map folders in public/ to their index.html, so do it for /admin.
    'astro:server:setup': ({ server }) => {
      server.middlewares.use((req, _res, next) => {
        if (req.url && /\/admin\/?(\?.*)?$/.test(req.url)) {
          req.url = req.url.replace(/\/admin\/?/, '/admin/index.html');
        }
        next();
      });
    },
    'astro:build:done': async ({ dir }) => {
      await rm(new URL('admin/', dir), { recursive: true, force: true });
    },
  },
};

// GitHub Pages setup:
// - Repo named "<username>.github.io": set `site` and remove `base`.
// - Any other repo name: keep `base: '/<repo-name>'`.
export default defineConfig({
  site: 'https://ghifariaulia.github.io',
  base: '/portfolio',
  integrations: [localOnlyAdmin],
});
