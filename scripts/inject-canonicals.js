const fs = require('fs');
const path = require('path');

// Config
const SITE_URL = 'https://dev.tools';
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'out');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function relativizeToOut(file) {
  return path.relative(OUT_DIR, file).replace(/\\/g, '/');
}

function canonicalPathFromRel(relHtmlPath) {
  // Skip 404/500 special pages
  const baseName = path.basename(relHtmlPath);
  if (baseName === '404.html' || baseName === '500.html') return null;

  // If it's .../index.html → "/.../"
  if (relHtmlPath.endsWith('/index.html')) {
    const dir = relHtmlPath.slice(0, -('index.html'.length));
    const clean = '/' + dir.replace(/(^\/?|\/+$)/g, '');
    return clean === '/' ? '/' : clean + '/';
  }

  // Root index.html → "/"
  if (relHtmlPath === 'index.html') return '/';

  // Otherwise strip .html and add trailing slash
  const withoutHtml = '/' + relHtmlPath.replace(/\.html$/i, '');
  return withoutHtml.endsWith('/') ? withoutHtml : withoutHtml + '/';
}

function injectCanonicalIntoHtml(html, canonicalUrl) {
  if (!html || !canonicalUrl) return html;
  // If canonical already present, skip
  if (/rel=["']canonical["']/i.test(html)) return html;

  // Try to insert before </head>
  const linkTag = `\n    <link rel="canonical" href="${canonicalUrl}" />`;
  const headCloseIdx = html.search(/<\/head>/i);
  if (headCloseIdx !== -1) {
    return html.slice(0, headCloseIdx) + linkTag + html.slice(headCloseIdx);
  }
  // Fallback: prepend
  return linkTag + '\n' + html;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.log(`ℹ️  No out/ directory found. Skipping canonical injection.`);
    process.exit(0);
  }

  const files = walk(OUT_DIR);
  let injected = 0;
  let skipped = 0;

  for (const file of files) {
    const rel = relativizeToOut(file);
    const canonPath = canonicalPathFromRel(rel);
    if (!canonPath) { skipped++; continue; }
    const canonicalUrl = `${SITE_URL}${canonPath}`;

    let html = fs.readFileSync(file, 'utf8');
    const before = html;
    html = injectCanonicalIntoHtml(html, canonicalUrl);
    if (html !== before) {
      fs.writeFileSync(file, html);
      injected++;
    } else {
      skipped++;
    }
  }

  console.log(`✅ Canonical injection complete. Updated: ${injected}, skipped: ${skipped}`);
}

main();

