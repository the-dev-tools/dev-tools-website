# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start dev server on port 3030
npm run build        # Build static site to /out (includes sitemap generation)
npm run preview      # Build and serve locally
```

## Architecture

This is a Next.js 14 site using **both App Router and Pages Router** simultaneously:

- **App Router** (`/app`): Homepage, blog, landing pages, guides, templates
- **Pages Router** (`/pages/docs`): Documentation powered by Nextra

The site uses static export (`output: 'export'`) - all pages pre-render to `/out`.

### Key Directories

- `app/` - App Router pages (homepage at `page.tsx`, blog at `blog/[slug]/`)
- `pages/docs/` - Nextra documentation (MDX files with `_meta.json` for navigation)
- `components/site/` - Shared Header/Footer
- `components/ui/` - Client components (MobileNav, DownloadButton)
- `content/blog/` - Blog posts in MDX format
- `lib/` - Utilities (blog.ts for post loading)

### Path Aliases

TypeScript path aliases configured in `tsconfig.json`:
- `@/*` → root
- `@/components/*`, `@/lib/*`, `@/content/*`, `@/app/*`

## Styling

- Tailwind CSS 4.x with custom config
- Neon cyan accent: `#4de1ff` (CSS variable `--color-neon`)
- Global styles in `app/globals.css`

## Blog Posts

Create MDX files in `content/blog/` with frontmatter:
```yaml
---
title: "Post Title"
date: "2026-01-21"
author:
  name: "Author Name"
  avatar: "/path/to/avatar.jpg"
tags: ["tag1", "tag2"]
summary: "Brief summary"
---
```

## Nextra Docs

- Config in `theme.config.tsx`
- Navigation controlled by `_meta.json` files in `pages/docs/`
- Docs repository base: `https://github.com/the-dev-tools/dev-tools-website/blob/main/pages/docs`

## Deployment

- Auto-deploys to Fly.io on push to master
- Static files served via Caddy (see `Caddyfile`)
- Docker build defined in `Dockerfile`
