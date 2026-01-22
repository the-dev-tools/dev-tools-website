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
  }
  // Homepage now served from app/page.tsx (App Router)
  // Docs continue to use pages/docs/ (Pages Router with Nextra)
})
