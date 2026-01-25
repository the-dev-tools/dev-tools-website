import DownloadButton from '@/components/ui/DownloadButton'
import CodeBlock from '@/components/ui/CodeBlock'
import Link from 'next/link'

export const metadata = {
  title: 'DevTools Studio – Download (macOS, Windows, Linux)',
  description:
    'DevTools Studio is a local‑first API client and flow builder. Download for macOS, Windows, or Linux, and pair with the DevTools CLI for CI (JUnit/JSON).',
  openGraph: {
    title: 'DevTools Studio – Download (macOS, Windows, Linux)',
    description:
      'Download DevTools Studio (macOS, Windows, Linux). Local‑first API client and flow builder. Pair with the DevTools CLI for CI reporting.',
    url: 'https://dev.tools/download/',
    images: [
      { url: '/assets/devtools-main-ss-1400w.webp', width: 1400, height: 919, alt: 'DevTools Studio main workspace screenshot' },
    ],
  },
}

export default function DownloadPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header className="mb-10">
        <h1 className="text-5xl font-bold text-white mb-3">DevTools Studio</h1>
        <p className="text-lg text-slate-300 max-w-3xl">
          Local‑first API client and flow builder. Import HAR, build visual flows, export YAML, and run in CI.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">Studio</h2>
          <p className="text-slate-300 mb-4">Auto‑selects the right binary for your OS and architecture.</p>
          <DownloadButton label="Download Studio" className="rounded-xl px-7 py-3 text-base" directDownload />
          <p className="mt-3 text-xs text-slate-400">Apple Silicon and Intel on macOS. x64 on Windows and Linux.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white mb-3">CLI</h2>
          <p className="text-slate-300 mb-4">Run YAML flows in CI with JUnit/JSON outputs and proper exit codes.</p>
          <CodeBlock code="curl -fsSL https://sh.dev.tools/install.sh | bash" eventLabel="cli_install_download_page" />
          <p className="mt-2 text-sm text-slate-400">
            See the <Link href="/docs/reference/cli" className="underline decoration-dotted underline-offset-2">CLI reference</Link>.
          </p>
        </div>
      </div>

      <section className="mb-12">
        <div className="group relative mx-auto w-full max-w-[900px] overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_35px_60px_-25px_rgba(17,26,56,0.35)]">
          <picture>
            <source
              type="image/webp"
              srcSet="/assets/devtools-main-ss-432w.webp 432w, /assets/devtools-main-ss-800w.webp 800w, /assets/devtools-main-ss-1400w.webp 1400w"
              sizes="(min-width: 768px) 900px, 100vw"
            />
            <img
              src="/assets/devtools-main-ss-800w.webp"
              width={1400}
              height={919}
              loading="lazy"
              decoding="async"
              alt="DevTools Studio workspace screenshot"
              className="block w-full object-cover"
            />
          </picture>
        </div>
        <p className="mt-3 text-center text-sm text-slate-400">Screenshot: DevTools Studio — flows as files, diffs before export.</p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6 mb-12">
        <h2 className="text-xl font-semibold text-white">Install steps</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
          <li>macOS: If Gatekeeper prompts, allow from identified developer in System Settings → Privacy & Security.</li>
          <li>Windows: Installer is signed; run as administrator if required.</li>
          <li>Linux: Make AppImage executable (chmod +x), or use .deb/.rpm if preferred.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold text-white">FAQ</h2>
        <div className="mt-3 space-y-4 text-slate-300">
          <div>
            <h3 className="font-semibold text-white">Is it free?</h3>
            <p>Yes. DevTools Studio and the DevTools CLI are open source under the Apache-2.0 license. <a href="https://github.com/the-dev-tools/dev-tools" target="_blank" rel="noopener noreferrer" className="text-neon underline decoration-dotted underline-offset-2">View on GitHub</a>.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Does it run offline?</h3>
            <p>Yes. DevTools is local‑first and does not require an account.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">What’s the difference vs CLI?</h3>
            <p>Studio is the desktop app for building flows; the CLI runs exported YAML flows in CI with JUnit/JSON outputs.</p>
          </div>
        </div>
      </section>

      {/* SoftwareApplication JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'DevTools Studio',
            operatingSystem: 'macOS, Windows, Linux',
            applicationCategory: 'DeveloperApplication',
            url: 'https://dev.tools/download/',
            image: 'https://dev.tools/assets/devtools-main-ss-1400w.webp',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
          })
        }}
      />
    </main>
  )
}
