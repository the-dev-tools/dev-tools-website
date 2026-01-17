const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true
})

/** @type {import('next').NextConfig} */
module.exports = withNextra({
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // All legacy redirects are handled by Caddy at runtime
  async rewrites() {
    // Serve the static marketing homepage from public/index.html at '/'
    return [{ source: '/', destination: '/index.html' }]
  }
})
