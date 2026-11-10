# Pixel Portfolio

Pixel-styled bento portfolio built with [Astro](https://astro.build), deployed to GitHub Pages, with [Sveltia CMS](https://sveltiacms.app) for editing content.

## Edit content

All content (profile, bio, skills, projects, experience, links) lives in `src/data/content.json`. Edit it one of two ways:

- **CMS (local only):** run `npm run dev`, open `http://localhost:4321/portfolio/admin/` in Chrome, Edge or another Chromium browser, choose **Work with Local Repository**, and pick this project folder (it must be a git repo — it has a `.git` folder). Saves go straight to your files; commit and push to publish. The admin page is removed from production builds, so it is never deployed.
- **By hand:** edit `src/data/content.json` directly.

The first project gets the big featured tile; the first experience entry shows on the "Currently" tile. Files uploaded in the CMS (e.g. your CV PDF) go to `public/uploads/`.

## Run locally

```sh
npm install
npm run dev      # http://localhost:4321/portfolio/
npm run build    # output in dist/
npm run preview  # serve the built site
```

## Deploy to GitHub Pages

1. In `astro.config.mjs`, set `site` to `https://<your-username>.github.io`.
   - Repo named `<your-username>.github.io`: remove the `base` line, and in `public/admin/config.yml` change `public_folder` to `/uploads`.
   - Any other repo name: set `base` to `'/<repo-name>'` and `public_folder` to `/<repo-name>/uploads`.
2. Push to the `main` branch (commit `package-lock.json` too).
3. On GitHub: **Settings → Pages → Source: GitHub Actions**.

`.github/workflows/deploy.yml` builds and deploys on every push to `main`.

## Credits

Fonts: [Departure Mono](https://departuremono.com) (license in `src/fonts/`) and VT323.
