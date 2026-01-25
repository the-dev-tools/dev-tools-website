import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: <img src="/logo.svg" alt="DevTools" style={{ height: '2.25rem' }} />,
  project: {
    link: 'https://github.com/the-dev-tools/dev-tools'
  },
  docsRepositoryBase:
    'https://github.com/the-dev-tools/dev-tools-website/blob/main/pages/docs',
  editLink: {
    text: 'Edit this page on GitHub'
  },
  feedback: {
    content: 'Question? Give us feedback →'
  },
  footer: {
    text: 'DevTools Documentation'
  },
  useNextSeoProps() {
    // Build a clean, trailing-slashed canonical for every docs page
    const { asPath } = useRouter()
    const pathOnly = (asPath || '/').split('#')[0].split('?')[0] || '/'
    const trailing = pathOnly.endsWith('/') ? pathOnly : pathOnly + '/'
    const canonical = `https://dev.tools${trailing}`

    return {
      titleTemplate: '%s – DevTools',
      description:
        'Local-first API testing and flow automation. Record browser traffic, turn it into executable YAML flows, and run at Go speed.',
      canonical,
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: canonical,
        siteName: 'DevTools',
        images: [
          {
            url: 'https://dev.tools/assets/devtools-main-ss-1400w.webp',
            width: 1400,
            height: 917,
            alt: 'DevTools API Testing Interface',
          },
        ],
      },
      twitter: {
        handle: '@devtools',
        cardType: 'summary_large_image',
      },
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="API testing, API client, flow automation, HAR import, YAML flows, API development, local-first, open source" />
      <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
    </>
  ),
  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true
  }
}

export default config
