import './globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'

export const metadata = {
  title: 'DevTools – Local-First API Testing & Flow Automation',
  description: 'Free, open-source API client and flow runner. Record browser traffic, turn it into executable YAML flows with auto-mapped variables, and run at multithreaded Go speed locally or in CI.',
  keywords: 'API testing, API client, flow automation, HAR import, YAML flows, API development, local-first, open source, CI/CD, REST API, HTTP client',
  authors: [{ name: 'DevTools' }],
  openGraph: {
    type: 'website',
    url: 'https://dev.tools',
    title: 'DevTools – Local-First API Testing & Flow Automation',
    description: 'Free, open-source API client and flow runner. Record browser traffic, turn it into executable YAML flows, and run at Go speed locally or in CI.',
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
    title: 'DevTools – Local-First API Testing & Flow Automation',
    description: 'Free, open-source API client and flow runner. Record browser traffic, turn it into executable YAML flows, and run at Go speed locally or in CI.',
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
      </head>
      <body className="min-h-full bg-[radial-gradient(circle_at_15%_15%,rgba(77,225,255,0.18),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(143,125,250,0.18),transparent_45%),linear-gradient(120deg,#0C1633_0%,#2A1B4E_100%)]">
        {/* Google Analytics */}
        <GoogleAnalytics gaId="AW-17895561658" />

        <Header />
        {children}
        <Footer />

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
