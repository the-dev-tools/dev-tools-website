const sharp = require('sharp');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

async function optimizeImages() {
  console.log('Optimizing images...');

  const assetsDir = path.join(publicDir, 'assets');
  const docsAssetsDir = path.join(publicDir, 'docs', 'assets');

  // 1. Create responsive versions of devtools-main-ss-1400.jpg
  await sharp(path.join(assetsDir, 'devtools-main-ss-1400.jpg'))
    .resize(432, 283, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(assetsDir, 'devtools-main-ss-432w.webp'));
  console.log('Created devtools-main-ss-432w.webp');

  await sharp(path.join(assetsDir, 'devtools-main-ss-1400.jpg'))
    .resize(800, 524, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(assetsDir, 'devtools-main-ss-800w.webp'));
  console.log('Created devtools-main-ss-800w.webp');

  await sharp(path.join(assetsDir, 'devtools-main-ss-1400.jpg'))
    .resize(1400, 917, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(assetsDir, 'devtools-main-ss-1400w.webp'));
  console.log('Created devtools-main-ss-1400w.webp');

  // 2. Create responsive versions of flow-canvas-overview.webp
  await sharp(path.join(docsAssetsDir, 'flow-canvas-overview.webp'))
    .resize(368, 270, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(docsAssetsDir, 'flow-canvas-overview-368w.webp'));
  console.log('Created flow-canvas-overview-368w.webp');

  await sharp(path.join(docsAssetsDir, 'flow-canvas-overview.webp'))
    .resize(800, 587, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(docsAssetsDir, 'flow-canvas-overview-800w.webp'));
  console.log('Created flow-canvas-overview-800w.webp');

  // 3. Create responsive versions of import-dialog-select-har.webp
  await sharp(path.join(docsAssetsDir, 'import-dialog-select-har.webp'))
    .resize(339, 270, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(docsAssetsDir, 'import-dialog-select-har-339w.webp'));
  console.log('Created import-dialog-select-har-339w.webp');

  await sharp(path.join(docsAssetsDir, 'import-dialog-select-har.webp'))
    .resize(800, 636, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(docsAssetsDir, 'import-dialog-select-har-800w.webp'));
  console.log('Created import-dialog-select-har-800w.webp');

  // 4. Create responsive versions of cli-json-report-view.webp
  await sharp(path.join(docsAssetsDir, 'cli-json-report-view.webp'))
    .resize(337, 270, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(docsAssetsDir, 'cli-json-report-view-337w.webp'));
  console.log('Created cli-json-report-view-337w.webp');

  await sharp(path.join(docsAssetsDir, 'cli-json-report-view.webp'))
    .resize(800, 641, { fit: 'cover' })
    .webp({ quality: 85 })
    .toFile(path.join(docsAssetsDir, 'cli-json-report-view-800w.webp'));
  console.log('Created cli-json-report-view-800w.webp');

  console.log('Image optimization complete!');
}

optimizeImages().catch(console.error);
