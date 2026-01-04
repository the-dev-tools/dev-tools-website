# DevTools Website + Docs

Unified Next.js app serving the marketing homepage and Nextra docs.

- Homepage: `public/index.html` (served at `/` via Next rewrites)
- Docs: Nextra at `/docs` (content under `pages/docs/`)

## Requirements
- Node.js 18+ (recommend 18.17+ or 20+)
- npm 9+

## Local Development
```bash
# from repo root
npm install --cache ./.npm-cache
npm run dev
```
Open http://localhost:3030 for the homepage and http://localhost:3030/docs for docs.

If you hit npm cache permission errors, using the local cache flag above avoids writing to `~/.npm`.

## Build
```bash
npm run build
npm start
```

## Structure
- `public/index.html` — existing static marketing page (unchanged)
- `pages/docs/**` — docs pages (MDX)
- `theme.config.tsx` — Nextra theme configuration
- `next.config.js` — Next + Nextra config, with rewrite for `/`

