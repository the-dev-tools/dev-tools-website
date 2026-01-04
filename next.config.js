const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true
})

/** @type {import('next').NextConfig} */
module.exports = withNextra({
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    // Serve the static marketing homepage from public/index.html at '/'
    return [{ source: '/', destination: '/index.html' }]
  }
})

