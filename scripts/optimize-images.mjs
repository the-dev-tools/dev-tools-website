import path from 'path'
import fs from 'fs/promises'
import sharp from 'sharp'

const SRC_DIR = path.join(process.cwd(), 'public', 'docs', 'assets')
const QUALITY = 80
const MAX_WIDTH = 1600

async function optimizeImage(file) {
  const ext = path.extname(file).toLowerCase()
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return null
  const base = path.basename(file, ext)
  const input = path.join(SRC_DIR, file)
  const outWebp = path.join(SRC_DIR, `${base}.webp`)
  try {
    const img = sharp(input)
    const meta = await img.metadata()
    const width = meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined
    await img.resize(width).webp({ quality: QUALITY }).toFile(outWebp)
    // Also recompress PNGs in place
    if (ext === '.png') {
      const tmpPng = path.join(SRC_DIR, `${base}.tmp.png`)
      await img
        .resize(width)
        .png({ compressionLevel: 9, palette: true, quality: QUALITY })
        .toFile(tmpPng)
      try {
        const [orig, comp] = await Promise.all([fs.stat(input), fs.stat(tmpPng)])
        if (comp.size < orig.size * 0.98) {
          await fs.rename(tmpPng, input)
        } else {
          await fs.unlink(tmpPng)
        }
      } catch (_) {
        // ignore
      }
    }
    return { input: file, output: path.basename(outWebp), width: width ?? meta.width }
  } catch (err) {
    console.warn(`[optimize-images] Failed for ${file}:`, err?.message || err)
    return null
  }
}

async function run() {
  const entries = await fs.readdir(SRC_DIR)
  const results = []
  for (const f of entries) {
    const r = await optimizeImage(f)
    if (r) results.push(r)
  }
  console.log('[optimize-images] Created WebP files:')
  for (const r of results) console.log(` - ${r.output}`)
}

run()
