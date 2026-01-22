"use client"

import { useEffect, useState } from 'react'
import DownloadButton from '../ui/DownloadButton'
import Link from 'next/link'

export default function Hero() {
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDemoOpen(false)
    }
    if (demoOpen) {
      document.addEventListener('keydown', onKey)
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
    return () => document.removeEventListener('keydown', onKey)
  }, [demoOpen])

  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-14 sm:px-8 md:flex-row md:items-center">
      {/* Left: Text content */}
      <div className="relative flex-1">
        <div className="mb-6 flex justify-center md:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-wide text-slate-200 shadow-[0_10px_40px_rgba(77,225,255,0.15)]">
            Deployable API workflows from real traffic.
          </span>
        </div>

        <h1 className="text-center text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-left md:text-6xl">
          Deployable API workflows from real traffic.
        </h1>

        <p className="mt-6 max-w-xl text-center text-lg text-slate-300 md:text-left">
          Import a HAR → generate a flow → export YAML → run in CI.
        </p>

        <p className="mt-3 max-w-xl text-center text-base text-slate-300 md:text-left">
          Local-first. Git-reviewable. CI-ready.
        </p>

        <ul className="mt-4 max-w-xl list-disc space-y-1 pl-5 text-sm text-slate-300 md:text-base md:pl-6">
          <li>HAR → flow steps + mapping</li>
          <li>YAML export for PR review</li>
          <li>CLI reports (JUnit/JSON, exit codes)</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <DownloadButton label="Download Studio" className="rounded-xl px-7 py-3 text-base" />

          <Link
            href="/docs/reference/cli"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#58D7FF]/60 bg-transparent px-6 py-3 text-base font-semibold text-[#58D7FF] transition hover:bg-[#58D7FF]/10 hover:text-white"
          >
            Install CLI
          </Link>

          <Link
            href="/docs/cookbook/examples-and-best-practices"
            className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-slate-300 transition hover:text-white"
          >
            View examples
          </Link>
        </div>

        <p className="mt-4 font-mono text-xs text-slate-400">
          <span className="text-slate-300">CLI:</span>{' '}
          <code className="rounded bg-slate-900/60 px-2 py-1 text-[11px] text-slate-200">
            curl -fsSL https://sh.dev.tools/install.sh | bash
          </code>
        </p>

        <dl className="mt-10 grid grid-cols-3 gap-6 text-center md:max-w-md">
          <div className="flex flex-col items-center text-center">
            <dd className="mt-2 text-white">
              <span className="block text-2xl font-extrabold text-[#58D7FF]">Parallel</span>
              <span className="mt-1 block text-sm font-semibold uppercase tracking-wide">By default</span>
            </dd>
          </div>
          <div className="flex flex-col items-center text-center">
            <dd className="mt-2 text-white">
              <span className="block text-2xl font-extrabold text-[#58D7FF]">CI outputs</span>
              <span className="mt-1 block text-sm font-semibold uppercase tracking-wide">JUnit/JSON</span>
            </dd>
          </div>
          <div className="flex flex-col items-center text-center">
            <dd className="mt-2 text-white">
              <span className="block text-2xl font-extrabold text-[#58D7FF]">Local-first</span>
              <span className="mt-1 block text-sm font-semibold uppercase tracking-wide">No cloud</span>
            </dd>
          </div>
        </dl>
      </div>

      {/* Right: Screenshot */}
      <div className="relative flex-1 md:flex-[1.35] overflow-hidden md:overflow-visible">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[150%] w-[125%] max-w-[840px] -translate-x-1/2 -translate-y-1/2 rounded-[46px] bg-slate-950/60 blur-[120px] opacity-80"></div>
          <div className="absolute left-1/2 top-1/2 h-[135%] w-[118%] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[50px] bg-[radial-gradient(circle_at_25%_25%,rgba(88,215,255,0.20),transparent_65%),radial-gradient(circle_at_75%_75%,rgba(201,125,255,0.25),transparent_68%)] opacity-60"></div>
          <div className="absolute left-1/2 bottom-[-18%] h-[55%] w-[70%] -translate-x-1/2 rounded-full bg-[#090c1f] opacity-60 blur-[68px]"></div>
        </div>
        <div className="group relative mx-auto w-full max-w-[580px] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_35px_60px_-25px_rgba(17,26,56,0.35)] backdrop-blur md:-mr-24 md:w-[135%] md:max-w-none md:rounded-xl md:shadow-[0_55px_90px_-35px_rgba(17,26,56,0.45)]">
          <picture>
            <source
              type="image/webp"
              srcSet="/assets/devtools-main-ss-432w.webp 432w, /assets/devtools-main-ss-800w.webp 800w, /assets/devtools-main-ss-1400w.webp 1400w"
              sizes="(min-width: 768px) 600px, 100vw"
            />
            <img
              src="/assets/devtools-main-ss-800w.webp"
              width={1400}
              height={919}
              loading="lazy"
              decoding="async"
              alt="DevTools main workspace screenshot"
              className="block w-full object-cover object-left md:w-full"
            />
          </picture>
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon group-hover:bg-slate-950/25"
            aria-label="Play demo"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-950/65 backdrop-blur-lg text-white opacity-0 shadow-[0_22px_44px_-22px_rgba(5,10,26,0.85)] transition duration-300 group-hover:scale-105 group-hover:bg-slate-950/80 group-hover:opacity-100 md:h-20 md:w-20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-10 w-10 opacity-90">
                <path d="M8.25 5.75v12.5a.75.75 0 0 0 1.142.642l9-6.25a.75.75 0 0 0 0-1.284l-9-6.25A.75.75 0 0 0 8.25 5.75Z" />
              </svg>
            </span>
          </button>
        </div>

        {/* Captions below screenshot */}
        <p className="mt-4 text-center text-sm text-slate-300 md:text-left md:pl-4">
          A real workspace: flows as files, tabs for runs, diffs before export.
        </p>
        <p className="mt-2 text-center text-sm text-slate-300 md:text-left md:pl-4">
          Start from real browser traffic: import a HAR file, DevTools turns it into a replayable API flow with tokens and IDs automatically mapped to variables.
        </p>
        <ol className="mt-3 list-decimal pl-8 text-left text-sm text-slate-400 md:pl-12">
          <li>Generated flow</li>
          <li>Variables mapped</li>
          <li>Export YAML</li>
        </ol>
      </div>

      {/* Demo Modal */}
      {demoOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-modal-title"
          onClick={() => setDemoOpen(false)}
        >
          <div className="flex h-full w-full items-center justify-center px-4" onClick={e => e.stopPropagation()}>
            <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-[0_40px_80px_-30px_rgba(8,12,32,0.85)]">
              <button
                type="button"
                onClick={() => setDemoOpen(false)}
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-white/30 hover:bg-white/10"
                aria-label="Close demo"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m7 7 10 10M7 17 17 7" />
                </svg>
              </button>
              <div className="aspect-video w-full bg-slate-900">
                <iframe
                  className="h-full w-full"
                  title="DevTools flow demo"
                  src={demoOpen ? 'https://www.youtube.com/embed/Xa36ssjErB8?autoplay=1&rel=0' : ''}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
