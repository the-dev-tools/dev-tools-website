// Cache headers configuration for Next.js
// Add this to your next.config.js under async headers() function

module.exports = [
  // Cache static assets for 1 year
  {
    source: '/assets/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  // Cache docs assets for 1 year
  {
    source: '/docs/assets/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=31536000, immutable',
      },
    ],
  },
  // HTML - cache for 1 hour, revalidate
  {
    source: '/:path*.html',
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, max-age=3600, must-revalidate',
      },
    ],
  },
];
