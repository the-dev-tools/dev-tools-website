"use client"

import { useEffect, useState } from 'react'

export default function GitHubStarButton() {
  const [starsText, setStarsText] = useState<string | null>(null)
  const [releasesText, setReleasesText] = useState<string | null>(null)

  useEffect(() => {
    const repo = 'the-dev-tools/dev-tools'
    const repoUrl = `https://api.github.com/repos/${repo}`
    const releasesUrl = `https://api.github.com/repos/${repo}/releases?per_page=100`

    const fmtStars = (n: number | null | undefined) => {
      if (typeof n !== 'number' || !isFinite(n)) return null
      if (n < 1000) return `${n}`
      const k = n / 1000
      const digits = n >= 100000 ? 0 : 1
      return `${k.toFixed(digits)}k`
    }

    Promise.all([
      fetch(repoUrl).then(r => (r.ok ? r.json() : null)).catch(() => null),
      fetch(releasesUrl).then(r => (r.ok ? r.json() : null)).catch(() => null),
    ]).then(([repoData, releases]) => {
      const stars = repoData && typeof repoData.stargazers_count === 'number' ? repoData.stargazers_count : null
      const starsTxt = fmtStars(stars)
      const rels = Array.isArray(releases) ? releases.length : null
      const relsTxt = typeof rels === 'number' ? `${rels}` : null
      if (starsTxt) setStarsText(`${starsTxt}★`)
      if (relsTxt) setReleasesText(`${relsTxt} releases`)
    })
  }, [])

  return (
    <a
      href="https://github.com/the-dev-tools/dev-tools"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-neon/60 hover:bg-white/10 hover:text-white"
    >
      <img
        src="/assets/github.svg"
        alt="GitHub"
        className="h-4 w-4 opacity-90 transition group-hover:opacity-100 filter invert"
      />
      Star on GitHub
      <span className="hidden text-xs font-normal text-slate-400 sm:inline">
        {starsText || '★'} • {releasesText || 'releases'}
      </span>
    </a>
  )
}
