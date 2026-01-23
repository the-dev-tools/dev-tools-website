const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://dev.tools';
const ROOT_DIR = path.join(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'pages', 'docs');
const BLOG_DIR = path.join(ROOT_DIR, 'content', 'blog');
const OUT_DIR = path.join(ROOT_DIR, 'out');
const APP_DIR = path.join(ROOT_DIR, 'app');

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

// Base URLs
const urls = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/docs/', priority: '0.9', changefreq: 'weekly' },
  { loc: '/blog/', priority: '0.8', changefreq: 'weekly' },
  { loc: '/download/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/postman-alternative/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/postman-cli-alternative/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/bruno-alternative/', priority: '0.8', changefreq: 'monthly' },
  { loc: '/compare/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/compare/devtools-vs-postman/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/compare/devtools-vs-bruno/', priority: '0.7', changefreq: 'monthly' },
  { loc: '/flows/', priority: '0.7', changefreq: 'monthly' },
];

const added = new Set(urls.map(u => u.loc));

// Docs: convert pages/docs/**.mdx to /docs/**/
const docFiles = listContentFiles(DOCS_DIR, ['.md', '.mdx']);
for (const file of docFiles) {
  const rel = path.relative(path.join(ROOT_DIR, 'pages'), file).replace(/\\/g, '/');
  let url = '/' + rel.replace(/\.(md|mdx)$/i, '/');
  url = url.replace('/docs/index/', '/docs/');
  if (!added.has(url)) {
    added.add(url);
    urls.push({ loc: url, priority: '0.8', changefreq: 'monthly' });
  }
}

// Blog: content/blog/*.mdx to /blog/slug/
const blogFiles = listContentFiles(BLOG_DIR, ['.mdx']);
for (const file of blogFiles) {
  const slug = path.basename(file, path.extname(file));
  const url = `/blog/${slug}/`;
  if (!added.has(url)) {
    added.add(url);
    urls.push({ loc: url, priority: '0.7', changefreq: 'monthly' });
  }
}

// App Router pages: include /guides/** and /templates/** automatically
function addAppRoutes(root, basePath) {
  const dir = path.join(APP_DIR, root);
  if (!fs.existsSync(dir)) return;
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    const items = fs.readdirSync(cur, { withFileTypes: true });
    let hasPage = false;
    for (const it of items) {
      if (it.isDirectory()) stack.push(path.join(cur, it.name));
      if (it.isFile() && it.name === 'page.tsx') hasPage = true;
    }
    if (hasPage) {
      const rel = path.relative(dir, cur).replace(/\\/g, '/');
      const slug = rel ? `/${rel}` : '';
      const url = `/${basePath}${slug}/`;
      if (!added.has(url)) {
        added.add(url);
        urls.push({ loc: url, priority: '0.7', changefreq: 'monthly' });
      }
    }
  }
}

addAppRoutes('guides', 'guides');
addAppRoutes('templates', 'templates');

// Ensure trailing slash for canonical consistency
function withTrailingSlash(loc) {
  if (!loc.endsWith('/')) return loc + '/';
  return loc;
}

// Generate XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${withTrailingSlash(loc)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
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
