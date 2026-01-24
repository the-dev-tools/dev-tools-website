const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SITE_URL = 'https://dev.tools';
const ROOT_DIR = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'pages', 'docs');
const BLOG_DIR = path.join(ROOT_DIR, 'content', 'blog');
const OUT_DIR = path.join(ROOT_DIR, 'out');
const APP_DIR = path.join(ROOT_DIR, 'app');

// Get last modified date for a file using git, with file mtime as fallback
function getLastModified(filePath) {
  try {
    const gitDate = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    if (gitDate) {
      return gitDate.split('T')[0];
    }
  } catch (e) {
    // Git not available or file not tracked
  }

  // Fallback to file mtime
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString().split('T')[0];
  } catch (e) {
    return new Date().toISOString().split('T')[0];
  }
}

function listContentFiles(dir, extensions) {
  const entries = [];
  if (!fs.existsSync(dir)) return entries;
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    const items = fs.readdirSync(current, { withFileTypes: true });
    for (const it of items) {
      const full = path.join(current, it.name);
      if (it.isDirectory()) {
        stack.push(full);
      } else if (extensions.some(ext => it.name.toLowerCase().endsWith(ext))) {
        entries.push(full);
      }
    }
  }
  return entries;
}

// Auto-discover all App Router pages
function discoverAppPages() {
  const pages = [];
  const stack = [APP_DIR];

  while (stack.length) {
    const cur = stack.pop();
    const items = fs.readdirSync(cur, { withFileTypes: true });

    for (const it of items) {
      const fullPath = path.join(cur, it.name);

      if (it.isDirectory()) {
        // Skip dynamic routes like [slug], [...path], etc.
        if (!it.name.startsWith('[')) {
          stack.push(fullPath);
        }
      } else if (it.isFile() && (it.name === 'page.tsx' || it.name === 'page.jsx')) {
        const rel = path.relative(APP_DIR, cur).replace(/\\/g, '/');
        const url = rel ? `/${rel}/` : '/';
        const depth = rel ? rel.split('/').length : 0;

        // Priority based on depth: home=1.0, top-level=0.8, nested=0.7
        const priority = depth === 0 ? '1.0' : depth === 1 ? '0.8' : '0.7';

        pages.push({
          loc: url,
          priority,
          changefreq: 'monthly',
          sourceFile: fullPath,
        });
      }
    }
  }

  return pages;
}

const urls = discoverAppPages();
const added = new Set(urls.map(u => u.loc));

// Add docs index with higher priority
if (!added.has('/docs/')) {
  added.add('/docs/');
  urls.push({ loc: '/docs/', priority: '0.9', changefreq: 'weekly', sourceFile: path.join(DOCS_DIR, 'index.mdx') });
}

// Docs: convert pages/docs/**.mdx to /docs/**/
const docFiles = listContentFiles(DOCS_DIR, ['.md', '.mdx']);
for (const file of docFiles) {
  const rel = path.relative(path.join(ROOT_DIR, 'pages'), file).replace(/\\/g, '/');
  let url = '/' + rel.replace(/\.(md|mdx)$/i, '/');
  url = url.replace('/docs/index/', '/docs/');
  if (!added.has(url)) {
    added.add(url);
    urls.push({ loc: url, priority: '0.8', changefreq: 'monthly', sourceFile: file });
  }
}

// Blog: content/blog/*.mdx to /blog/slug/
const blogFiles = listContentFiles(BLOG_DIR, ['.mdx']);
for (const file of blogFiles) {
  const slug = path.basename(file, path.extname(file));
  const url = `/blog/${slug}/`;
  if (!added.has(url)) {
    added.add(url);
    urls.push({ loc: url, priority: '0.7', changefreq: 'monthly', sourceFile: file });
  }
}

// Ensure trailing slash for canonical consistency
function withTrailingSlash(loc) {
  if (!loc.endsWith('/')) return loc + '/';
  return loc;
}

// Generate XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority, changefreq, sourceFile }) => `  <url>
    <loc>${SITE_URL}${withTrailingSlash(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${sourceFile ? getLastModified(sourceFile) : new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to public directory (for dev) and out directory (for production)
const publicPath = path.join(ROOT_DIR, 'public', 'sitemap.xml');
fs.writeFileSync(publicPath, sitemap);
console.log(`✅ Sitemap generated: ${publicPath}`);
console.log(`   ${urls.length} URLs included`);

// Also write to out directory if it exists (after build)
if (fs.existsSync(OUT_DIR)) {
  const outPath = path.join(OUT_DIR, 'sitemap.xml');
  fs.writeFileSync(outPath, sitemap);
  console.log(`✅ Sitemap copied to: ${outPath}`);
}

// Generate a readable URL list for verification
const urlList = urls.map(u => `${SITE_URL}${u.loc}`).join('\n');
fs.writeFileSync(path.join(__dirname, '..', 'sitemap-urls.txt'), urlList);
console.log(`✅ URL list saved: sitemap-urls.txt`);
