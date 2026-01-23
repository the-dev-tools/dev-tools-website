const path = require('path')
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
  // Ensure TSX/TS and MDX/MD are recognized in both Pages and App Router
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  // Ensure path aliases like '@/components/*' work in all environments
  webpack: (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname),
      '@/components': path.resolve(__dirname, 'components'),
      '@/lib': path.resolve(__dirname, 'lib'),
      '@/content': path.resolve(__dirname, 'content'),
      '@/app': path.resolve(__dirname, 'app'),
    }
    return config
  }
  // Homepage now served from app/page.tsx (App Router)
  // Docs continue to use pages/docs/ (Pages Router with Nextra)
})
