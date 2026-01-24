import Link from 'next/link'

export const metadata = {
  title: 'DevTools Studio (macOS/Windows/Linux) – Visual API workflows from HAR to YAML',
  description: 'Build API workflows from real traffic. Import a HAR, get a flow with tokens/IDs mapped automatically, export clean YAML, and hand it to CI with DevTools CLI.',
}

export default function StudioPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-14 sm:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            DevTools Studio
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Build API workflows from real traffic. Import a HAR, get a flow with tokens/IDs mapped automatically, export clean YAML, and hand it to CI with DevTools CLI.
          </p>

          <ul className="mt-6 space-y-3 text-base text-slate-300">
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Import HAR → auto-generate flow tree</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Assertions + variable mapping (rule-based overrides)</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Export YAML for PR review</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Runs locally, no account required</span>
            </li>
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/download"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#58D7FF] px-7 py-3 text-base font-semibold text-slate-900 shadow-[0_22px_45px_-22px_rgba(88,215,255,0.55)] ring-1 ring-white/10 transition duration-200 hover:bg-[#6fe0ff]"
            >
              Download Studio
            </Link>
            <Link
              href="/cli"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#58D7FF]/60 bg-transparent px-6 py-3 text-base font-semibold text-[#58D7FF] transition duration-200 hover:bg-[#58D7FF]/10 hover:text-white"
            >
              Install CLI
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-slate-300 transition duration-200 hover:text-white"
            >
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Screenshot Section */}
      <section className="relative border-y border-white/5 bg-[linear-gradient(160deg,rgba(9,12,31,0.6),rgba(42,27,78,0.45))] py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.8)]">
            <picture>
              <source
                type="image/webp"
                srcSet="/assets/devtools-main-ss-432w.webp 432w, /assets/devtools-main-ss-800w.webp 800w, /assets/devtools-main-ss-1400w.webp 1400w"
                sizes="(min-width: 768px) 1200px, 100vw"
              />
              <img
                src="/assets/devtools-main-ss-800w.webp"
                width="1400"
                height="919"
                alt="DevTools Studio workspace showing flow tree, variable mapping, and YAML export"
                className="block w-full object-cover"
              />
            </picture>
          </div>
          <p className="mt-4 text-center text-sm text-slate-400">
            DevTools Studio: Visual flow builder with automatic variable mapping and YAML export
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">How Studio Works</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Import HAR files</h3>
              <p className="mt-2 text-sm text-slate-300">
                Drag and drop HAR files from Chrome DevTools or any proxy. Studio parses requests, headers, and auth tokens automatically.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Auto-map variables</h3>
              <p className="mt-2 text-sm text-slate-300">
                Studio detects tokens, IDs, and session data, then auto-generates variable mappings. Override with custom rules when needed.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Export clean YAML</h3>
              <p className="mt-2 text-sm text-slate-300">
                Export flows as human-readable YAML files for Git review. Run them in CI with DevTools CLI for JUnit/JSON reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-white/5 bg-[linear-gradient(160deg,rgba(12,22,51,0.55),rgba(42,27,78,0.4))] py-16">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to build API workflows?</h2>
          <p className="mt-4 text-lg text-slate-300">
            Download DevTools Studio for macOS, Windows, or Linux. Free and open source.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#58D7FF] px-7 py-3 text-base font-semibold text-slate-900 shadow-[0_22px_45px_-22px_rgba(88,215,255,0.55)] ring-1 ring-white/10 transition duration-200 hover:bg-[#6fe0ff]"
            >
              Download Studio
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-neon/60 hover:bg-white/10 hover:text-white"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
