const fs = require('fs');
const path = require('path');
const glob = require('glob');

const SITE_URL = 'https://dev.tools';
const PAGES_DIR = path.join(__dirname, '..', 'pages');
const OUT_DIR = path.join(__dirname, '..', 'out');

// Get all doc pages
const docPages = glob.sync('pages/docs/**/*.{md,mdx}', { cwd: path.join(__dirname, '..') });

// Convert file paths to URLs
const urls = [
  // Homepage
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
];

// Add all doc pages
const addedUrls = new Set(['/']); // Track to avoid duplicates

// Add docs homepage with high priority
urls.push({ loc: '/docs/', priority: '0.9', changefreq: 'weekly' });
addedUrls.add('/docs/');
docPages.forEach(file => {
  // Convert pages/docs/path/to/file.md to /docs/path/to/file/
  let url = file
    .replace('pages/', '/')
    .replace(/\.(md|mdx)$/, '/')
    .replace('/index/', '/');

  // Avoid duplicates
  if (!addedUrls.has(url)) {
    addedUrls.add(url);
    urls.push({
      loc: url,
      priority: '0.8',
      changefreq: 'monthly'
    });
  }
});

// Generate XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(({ loc, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to public directory (for dev) and out directory (for production)
const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
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
