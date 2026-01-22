# DevTools Website + Docs + Blog

Modern Next.js site with App Router (homepage + blog) and Pages Router (docs with Nextra).

## Architecture

- **Homepage**: App Router at `/` (`app/page.tsx`)
- **Blog**: App Router at `/blog` with MDX support (`app/blog/`)
- **Docs**: Pages Router with Nextra at `/docs` (`pages/docs/`)
- **Components**: Shared Header/Footer in React components
- **Static Export**: All pages pre-rendered to `/out` directory

## Requirements

- Node.js 18+ (recommend 18.17+ or 20+)
- npm 9+

## Local Development

```bash
# Install dependencies
npm install --cache ./.npm-cache

# Start development server
npm run dev
```

Open:
- Homepage: http://localhost:3030
- Blog: http://localhost:3030/blog
- Docs: http://localhost:3030/docs

If you hit npm cache permission errors, using the local cache flag avoids writing to `~/.npm`.

## Build & Deploy

```bash
# Build static site
npm run build

# Preview build locally
npm run preview
# or
npx serve out -l 3030
```

The build generates static HTML in the `/out` directory ready for deployment.

## Project Structure

```
/app                          # App Router (homepage + blog)
  layout.tsx                  # Root layout with Header/Footer + Google Analytics
  page.tsx                    # Homepage
  globals.css                 # Global styles
  /blog
    page.tsx                  # Blog listing
    /[slug]
      page.tsx                # Blog post renderer

/components
  /site
    Header.tsx                # Shared header (Logo, Nav: Flows/Docs/Blog)
    Footer.tsx                # Shared footer (with Blog links)
  /ui
    MobileNav.tsx             # Mobile navigation (client component)
    DownloadButton.tsx        # OS-detecting download button (client component)
    GitHubStarButton.tsx      # GitHub link
  /home
    Hero.tsx                  # Hero section

/content
  /blog
    *.mdx                     # Blog posts in MDX format

/lib
  blog.ts                     # Blog utilities (getAllPosts, getPost)

/pages
  /docs                       # Docs with Nextra (unchanged)
    ...
  _document.tsx               # Pages Router document

/public
  index.html.backup           # Backup of original static homepage
  /assets                     # Images, fonts, etc.

/scripts
  generate-sitemap.js         # Sitemap generation
```

## Adding Blog Posts

Create MDX files in `content/blog/` with frontmatter:

```mdx
---
title: "Your Post Title"
date: "2026-01-21"
author:
  name: "Author Name"
  avatar: "/path/to/avatar.jpg"
tags: ["tag1", "tag2"]
category: "Category"
summary: "Brief summary of your post"
---

# Your Post Title

Your content here using MDX syntax...

```yaml
# Code blocks supported
flows:
  - name: example
```
```

Posts are automatically:
- Listed at `/blog` sorted by date (newest first)
- Rendered at `/blog/{slug}` with custom styling
- Pre-rendered as static HTML at build time

## Google Analytics

Configured via `@next/third-parties/google` in `app/layout.tsx`:
- Tracking ID: `AW-17895561658`
- Applies to all routes (homepage, blog, docs)
- Loads asynchronously for performance

## Styling

- **Tailwind CSS** 4.1.18 with custom config
- **Neon cyan accent**: `#4de1ff` (CSS variable `--color-neon`)
- **Dark gradients**: Radial gradients in body background
- **Responsive**: Mobile-first with breakpoints

## Key Features

### Header Component
- Logo → `/`
- Navigation: Flows, Docs, Blog
- Desktop: GitHub star button + Download button (OS detection)
- Mobile: Hamburger menu with slide-out panel

### Footer Component
- Blog links in Resources and Product columns
- Social links (Twitter, GitHub, Docs)
- Four columns: Product, Resources, Company, Legal
- Dynamic year display

### Blog Features
- MDX support with syntax highlighting
- Custom styled components (h1, h2, p, code, pre, etc.)
- Author info with avatar
- Tags with neon badges
- Date formatting
- Static generation for all posts

## TypeScript Configuration

Path aliases configured in `tsconfig.json`:
- `@/*` → Root directory
- `@/components/*` → `components/`
- `@/lib/*` → `lib/`
- `@/content/*` → `content/`
- `@/app/*` → `app/`

## Scripts

- `npm run dev` - Start development server (port 3030)
- `npm run build` - Build static site to `/out`
- `npm start` - Start production server
- `npm run preview` - Build and serve locally
- `npm run sitemap` - Generate sitemap

## Router Coexistence

The project uses both App Router and Pages Router:

**App Router** (`/app`):
- Homepage at `/`
- Blog at `/blog` and `/blog/[slug]`
- Server Components by default
- Client Components only when needed

**Pages Router** (`/pages`):
- Docs at `/docs` with Nextra
- Existing setup unchanged
- Works seamlessly alongside App Router

## Deployment

The site is configured for static export (`output: 'export'` in `next.config.js`). Deploy the `/out` directory to any static host:

- Vercel
- Cloudflare Pages
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

No server required - all pages are pre-rendered HTML.

## Development Tips

### Adding Homepage Sections
Extract sections from `public/index.html.backup` into components in `components/home/`, then import in `app/page.tsx`.

### Updating Sitemap
Modify `scripts/generate-sitemap.js` to include blog posts from `content/blog/`.

### Customizing Styles
- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.js`
- Component styles: Tailwind classes in components

### Testing Builds
Always test static export before deploying:
```bash
npm run build
npx serve out -l 3030
```

## Troubleshooting

**Build fails with TypeScript errors:**
- Check `tsconfig.json` has `baseUrl: "."`
- Verify path aliases are correct

**Blog posts not appearing:**
- Check MDX files are in `content/blog/`
- Verify frontmatter format
- Run `npm run build` to regenerate

**Styles not loading:**
- Check `app/globals.css` is imported in `app/layout.tsx`
- Verify Tailwind classes are correct
- Clear `.next` cache: `rm -rf .next && npm run build`

## Migration Notes

The site was migrated from a static HTML homepage to App Router:
- Original homepage backed up to `public/index.html.backup`
- Header/Footer extracted into reusable components
- Google Analytics moved to root layout
- Docs remain unchanged on Pages Router
