import path from 'path'
import fs from 'fs/promises'

const ASSETS_DIR = path.join(process.cwd(), 'public', 'docs', 'assets')
const DOCS_DIR = path.join(process.cwd(), 'pages', 'docs')

const IMG_RE = /\!\[[^\]]*\]\(([^)]+)\)|<img[^>]+src=\"([^\"]+)\"/g

async function listDocFiles(dir) {
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const ent of entries) {
    if (ent.name.startsWith('.')) continue
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) out.push(...(await listDocFiles(p)))
    else if (/\.(md|mdx)$/i.test(ent.name)) out.push(p)
  }
  return out
}

async function collectUsedAssets() {
  const files = await listDocFiles(DOCS_DIR)
  const used = new Set()
  for (const f of files) {
    const content = await fs.readFile(f, 'utf8')
    let m
    while ((m = IMG_RE.exec(content))) {
      const src = (m[1] || m[2] || '').trim()
      if (src.startsWith('/docs/assets/')) {
        used.add(path.basename(src))
      }
    }
  }
  return used
}

async function prune() {
  const used = await collectUsedAssets()
  const entries = await fs.readdir(ASSETS_DIR)
  let removed = 0
  for (const name of entries) {
    // keep hidden files
    if (name.startsWith('.')) continue
    if (!used.has(name)) {
      await fs.unlink(path.join(ASSETS_DIR, name)).catch(() => {})
      removed++
    }
  }
  console.log(`[prune-doc-assets] Kept ${used.size} files, removed ${removed}`)
}

prune()

