import './globals.css'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import GoogleAnalyticsLoader from '@/components/ui/GoogleAnalyticsLoader'
import CookieConsent from '@/components/ui/CookieConsent'

export const metadata = {
  metadataBase: new URL('https://dev.tools'),
  title: 'DevTools – Open Source API Testing Tool | Multi-Step API Tests in CI',
  description: 'Open-source API testing tool that chains multi-step requests into reusable YAML workflows. Record real traffic, auto-map variables between steps, and run end-to-end API tests in CI with parallel execution and JUnit reports.',
  keywords: 'API testing tool, multi-step API testing, end-to-end API testing, API test automation, YAML API tests, CI CD API testing, open source API testing, HAR import, REST API testing, HTTP client',
  authors: [{ name: 'DevTools' }],
  openGraph: {
    type: 'website',
    url: 'https://dev.tools',
    title: 'DevTools – Open Source API Testing Tool | Multi-Step API Tests in CI',
    description: 'Open-source API testing tool that chains multi-step requests into reusable YAML workflows. Record real traffic, auto-map variables, and run end-to-end API tests in CI.',
    siteName: 'DevTools',
    images: [
      {
        url: 'https://dev.tools/assets/devtools-main-ss-1400w.webp',
        width: 1400,
        height: 900,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevTools – Open Source API Testing Tool | Multi-Step API Tests in CI',
    description: 'Open-source API testing tool that chains multi-step requests into reusable YAML workflows. Record real traffic, auto-map variables, and run end-to-end API tests in CI.',
    images: ['https://dev.tools/assets/devtools-main-ss-1400w.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-slate-950 text-slate-100">
      <head>
        <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
        <link rel="preload" href="/assets/fonts/inter-variable.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/assets/fonts/jetbrains-mono-variable.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'DevTools',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Windows, macOS, Linux',
              description:
                'Open-source API testing tool that chains multi-step requests into reusable YAML workflows. Record real traffic, auto-map variables between steps, and run end-to-end API tests in CI with parallel execution.',
              url: 'https://dev.tools',
              downloadUrl: 'https://dev.tools/download',
              image: 'https://dev.tools/assets/devtools-main-ss-1400w.webp',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              author: {
                '@type': 'Organization',
                name: 'DevTools',
                url: 'https://dev.tools',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-[radial-gradient(circle_at_15%_15%,rgba(77,225,255,0.18),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(143,125,250,0.18),transparent_45%),linear-gradient(120deg,#0C1633_0%,#2A1B4E_100%)]">
        {/* Google Analytics - Only loads after consent */}
        <GoogleAnalyticsLoader />

        <Header />
        {children}
        <Footer />
        <CookieConsent />

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src="https://px.ads.linkedin.com/collect/?pid=9257801&fmt=gif"
          />
        </noscript>
      </body>
    </html>
  )
}
