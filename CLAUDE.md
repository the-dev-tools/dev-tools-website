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
- `content/blog/images/` - Blog image generation script (images themselves are gitignored)
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
slug: "post-slug"
id: "uuid"
image:
  url: "https://dev-tools-blog-images.fly.storage.tigris.dev/blog/post-slug.webp"
  alt: "Post Title"
author:
  name: "DevTools Team"
  avatar: "/logo.svg"
tags: ["tag1", "tag2"]
category: "Guides"
summary: "Brief summary"
cta:
  primary:
    heading: "CTA heading"
    body: "CTA body"
    buttonText: "Button"
    url: "https://dev.tools/..."
    secondaryText: "Secondary"
    secondaryUrl: "https://dev.tools/..."
  secondary:
    heading: "Secondary CTA"
    body: "Body"
    buttonText: "Button"
    url: "https://dev.tools/..."
    secondaryText: "Secondary"
    secondaryUrl: "https://dev.tools/..."
  badge:
    text: "Badge"
    variant: "neutral"
---
```

### YAML Code Blocks in Blog Posts

When writing DevTools YAML flow examples in blog posts, use the **real DevTools format**. Reference docs:
- Variable syntax: `pages/docs/how-to/environments-and-variables.md`
- Flow format: `pages/docs/how-to/working-with-flows.md`

Key rules:
- **Variables**: `{{VARIABLE_NAME}}` (double curly braces) — NOT `${VARIABLE_NAME}`
- **Node output refs**: `{{NodeName.response.body.field}}` for request outputs, `{{JsNodeName.field}}` for JS outputs
- **Environment refs**: `{{#env:VAR_NAME}}` in variable values — NOT bare `#env:VAR_NAME`
- **Built-in functions**: `{{ uuid() }}`, `{{ now() }}`
- **No `extract:`, `capture:`, or `assert:` blocks** — these don't exist in the real format
- **Assertions**: Use `js:` nodes that `throw new Error()` on failure
- **Step types**: `request:`, `js:`, `if:`, `for:`, `for_each:` — each with `name:` inside
- **Execution order**: `depends_on: NodeName` for explicit ordering

Example structure:
```yaml
workspace_name: My Workspace
env:
  BASE_URL: '{{BASE_URL}}'
run:
  - flow: MyFlow
flows:
  - name: MyFlow
    steps:
      - request:
          name: Login
          method: POST
          url: '{{BASE_URL}}/auth/login'
          headers:
            Content-Type: application/json
          body:
            email: 'test@example.com'
      - js:
          name: ValidateLogin
          code: |
            export default function(ctx) {
              if (ctx.Login?.response?.status !== 200) throw new Error("Failed");
              return { validated: true };
            }
          depends_on: Login
      - request:
          name: GetData
          method: GET
          url: '{{BASE_URL}}/data'
          headers:
            Authorization: 'Bearer {{Login.response.body.access_token}}'
          depends_on: Login
```

### Blog Image Generation

Generate and upload blog header images using the Nano Banana (Gemini) API:

```bash
bash content/blog/images/generate.sh <name> "<prompt>"
```

- Generates PNG via Gemini API, converts to optimized webp (cwebp q80, 1456w), uploads to Tigris
- Requires `.env.local` with `GEMINI_API_KEY` and Tigris AWS credentials
- Images are hosted on Tigris: `https://dev-tools-blog-images.fly.storage.tigris.dev/blog/<name>.webp`
- Match existing image style: **photorealistic editorial stock photography** of developers at work (office desks, laptops with relevant screen content, notebooks, coffee mugs, whiteboards, warm natural lighting, 16:9 landscape)

## Nextra Docs

- Config in `theme.config.tsx`
- Navigation controlled by `_meta.json` files in `pages/docs/`
- Docs repository base: `https://github.com/the-dev-tools/dev-tools-website/blob/main/pages/docs`

## Deployment

- Auto-deploys to Fly.io on push to master
- Static files served via Caddy (see `Caddyfile`)
- Docker build defined in `Dockerfile`
- Blog images hosted on Tigris (Fly.io object storage), bucket: `dev-tools-blog-images`

## Secrets

All secrets live in `.env.local` (gitignored). Keys:
- `GEMINI_API_KEY` — Gemini Nano Banana API for image generation
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_ENDPOINT_URL_S3`, `AWS_REGION`, `BUCKET_NAME` — Tigris object storage
