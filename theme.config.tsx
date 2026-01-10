import React from 'react'
import type { DocsThemeConfig } from 'nextra-theme-docs'

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
    return {
      titleTemplate: '%s – DevTools'
    }
  },
  sidebar: {
    defaultMenuCollapseLevel: 2,
    toggleButton: true
  }
}

export default config
