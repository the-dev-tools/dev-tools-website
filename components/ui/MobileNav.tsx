'use client'

import { useState } from 'react'
import Link from 'next/link'
import DownloadButton from './DownloadButton'
import GitHubStarButton from './GitHubStarButton'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-white/15 bg-white/5 p-2 text-slate-200 transition hover:border-neon/60 hover:bg-white/10 hover:text-white min-[900px]:hidden"
        onClick={toggleMenu}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
      >
        <span className="sr-only">Toggle navigation</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isOpen ? 'hidden' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isOpen ? '' : 'hidden'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
        </svg>
      </button>

      {/* Mobile Navigation Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm min-[900px]:hidden"
          aria-hidden="true"
          onClick={closeMenu}
        ></div>
      )}

      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div
          id="mobile-nav-panel"
          className="fixed inset-x-4 top-24 z-50 max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/95 p-6 shadow-[0_40px_90px_-45px_rgba(6,12,32,0.95)] min-[900px]:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav className="space-y-3 text-base font-semibold text-white">
            <Link href="/docs" className="block rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10" onClick={closeMenu}>Docs</Link>
            <Link href="/guides" className="block rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10" onClick={closeMenu}>Guides</Link>
            <Link href="/templates" className="block rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10" onClick={closeMenu}>Templates</Link>
            <Link href="/compare" className="block rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10" onClick={closeMenu}>Compare</Link>
            <Link href="/pricing" className="block rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10" onClick={closeMenu}>Pricing</Link>
            <Link href="/blog" className="block rounded-lg px-4 py-2.5 text-slate-200 transition hover:bg-white/10" onClick={closeMenu}>Blog</Link>
          </nav>

          <div className="mt-6 grid gap-3">
            <DownloadButton fullWidth label="Download" className="rounded-xl px-7 py-3 text-base" />
            <GitHubStarButton />
          </div>
        </div>
      )}
    </>
  )
}
