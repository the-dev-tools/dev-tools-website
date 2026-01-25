import Link from 'next/link'
import type React from 'react'
import { getChangelog } from '@/lib/changelog'

export const metadata = {
  title: 'Changelog - Dev Tools',
  description: 'Product updates, new features, and improvements to Dev Tools.',
}

function parseInlineMarkdown(text: string): (string | React.ReactElement)[] {
  const elements: (string | React.ReactElement)[] = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Match images: ![alt](url)
    const imgMatch = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/)
    if (imgMatch) {
      elements.push(
        <img
          key={`img-${key++}`}
          src={imgMatch[2]}
          alt={imgMatch[1]}
          className="max-w-full h-auto rounded-lg border border-white/10 my-4"
        />
      )
      remaining = remaining.slice(imgMatch[0].length)
      continue
    }

    // Match links: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/)
    if (linkMatch) {
      elements.push(
        <a
          key={`link-${key++}`}
          href={linkMatch[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neon hover:underline"
        >
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.slice(linkMatch[0].length)
      continue
    }

    // Match inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/)
    if (codeMatch) {
      elements.push(
        <code
          key={`code-${key++}`}
          className="px-1.5 py-0.5 bg-white/10 text-neon rounded text-sm font-mono"
        >
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(codeMatch[0].length)
      continue
    }

    // Match bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/)
    if (boldMatch) {
      elements.push(
        <strong key={`bold-${key++}`} className="font-semibold text-white">
          {boldMatch[1]}
        </strong>
      )
      remaining = remaining.slice(boldMatch[0].length)
      continue
    }

    // Match italic: *text* or _text_
    const italicMatch = remaining.match(/^[*_]([^*_]+)[*_]/)
    if (italicMatch) {
      elements.push(
        <em key={`italic-${key++}`} className="italic">
          {italicMatch[1]}
        </em>
      )
      remaining = remaining.slice(italicMatch[0].length)
      continue
    }

    // Regular text - consume until next special character
    const nextSpecial = remaining.search(/[`*_\[]|!\[/)
    if (nextSpecial === -1) {
      elements.push(remaining)
      break
    } else if (nextSpecial > 0) {
      elements.push(remaining.slice(0, nextSpecial))
      remaining = remaining.slice(nextSpecial)
    } else {
      // Unmatched special char, just add it
      elements.push(remaining[0])
      remaining = remaining.slice(1)
    }
  }

  return elements
}

function MarkdownContent({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactElement[] = []
  let currentList: string[] = []
  let currentCodeBlock: string[] = []
  let inCodeBlock = false
  let key = 0

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key++}`} className="list-disc list-inside space-y-2 mb-4 text-slate-300">
          {currentList.map((item, idx) => (
            <li key={idx} className="ml-4">
              {parseInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  const flushCodeBlock = () => {
    if (currentCodeBlock.length > 0) {
      elements.push(
        <pre
          key={`code-${key++}`}
          className="bg-black/30 border border-white/10 rounded-lg p-4 overflow-x-auto mb-4"
        >
          <code className="text-sm text-slate-300 font-mono">
            {currentCodeBlock.join('\n')}
          </code>
        </pre>
      )
      currentCodeBlock = []
    }
  }

  lines.forEach((line, idx) => {
    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock()
        inCodeBlock = false
      } else {
        flushList()
        inCodeBlock = true
      }
      return
    }

    if (inCodeBlock) {
      currentCodeBlock.push(line)
      return
    }

    // Headers
    if (line.startsWith('### ')) {
      flushList()
      elements.push(
        <h3 key={`h3-${idx}`} className="text-lg font-semibold text-white mt-6 mb-3">
          {parseInlineMarkdown(line.replace('### ', ''))}
        </h3>
      )
    } else if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={`h2-${idx}`} className="text-xl font-semibold text-white mt-6 mb-3">
          {parseInlineMarkdown(line.replace('## ', ''))}
        </h2>
      )
    }
    // List items
    else if (line.match(/^[\*\-]\s/)) {
      currentList.push(line.replace(/^[\*\-]\s/, ''))
    }
    // Empty lines
    else if (line.trim() === '') {
      flushList()
    }
    // Standalone images
    else if (line.match(/^!\[/)) {
      flushList()
      const parsed = parseInlineMarkdown(line)
      elements.push(
        <div key={`img-wrapper-${idx}`} className="mb-4">
          {parsed}
        </div>
      )
    }
    // Regular paragraphs
    else if (line.trim()) {
      flushList()
      elements.push(
        <p key={`p-${idx}`} className="text-slate-300 mb-4">
          {parseInlineMarkdown(line)}
        </p>
      )
    }
  })

  flushList()
  flushCodeBlock()

  return <div className="prose-sm">{elements}</div>
}

export default async function ChangelogPage() {
  const changelog = await getChangelog()

  if (changelog.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <h1 className="text-5xl font-bold text-white mb-4">Changelog</h1>
        <p className="text-lg text-slate-400 mb-12">
          Product updates, new features, and improvements.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-slate-300">No releases yet. Check back soon!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Changelog</h1>
        <p className="text-lg text-slate-400">
          Product updates, new features, and improvements to Dev Tools.
        </p>
      </div>

      <div className="space-y-12">
        {changelog.map((entry) => (
          <article
            key={entry.version}
            id={entry.version}
            className="scroll-mt-20"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 transition hover:border-neon/30">
              <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-white">
                      {entry.title}
                    </h2>
                    {entry.isPrerelease && (
                      <span className="px-2 py-1 text-xs bg-yellow-500/10 text-yellow-400 rounded border border-yellow-500/30 font-medium">
                        Pre-release
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <code className="px-2 py-1 bg-neon/10 text-neon rounded border border-neon/30 font-mono text-xs">
                      {entry.version}
                    </code>
                    <time dateTime={entry.date}>
                      {new Date(entry.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>
                <Link
                  href={entry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neon hover:underline flex items-center gap-1 shrink-0"
                >
                  View on GitHub
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </div>

              <div className="border-t border-white/10 pt-6">
                {entry.content ? (
                  <MarkdownContent content={entry.content} />
                ) : (
                  <p className="text-slate-400 italic">No release notes provided.</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-white/10 text-center">
        <Link
          href="https://github.com/the-dev-tools/dev-tools/releases"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-neon transition"
        >
          View all releases on GitHub
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      </div>
    </div>
  )
}
