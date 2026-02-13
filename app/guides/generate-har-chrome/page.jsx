import React from 'react'
import Link from 'next/link'
import StickyTOC from '@/components/ui/StickyTOC'

export const metadata = {
  title: 'Generate a HAR file in Chrome (Safely) for API testing',
  description:
    'Record real browser traffic as a HAR in Chrome, capture request bodies, and import into DevTools Studio to generate a runnable Flow and export YAML.',
}

const tocItems = [
  { id: 'what-har-contains', label: 'What a HAR contains' },
  { id: 'before-you-start', label: 'Before you start' },
  { id: 'record-har', label: 'Record the HAR' },
  { id: 'sanity-check', label: 'Sanity check' },
  { id: 'import-studio', label: 'Import into Studio' },
  { id: 'reusable-test', label: 'Turn into a test' },
  { id: 'troubleshooting', label: 'Troubleshooting' },
]

export default function GuideGenerateHarChrome() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
        <article className="prose prose-invert prose-slate max-w-none min-w-0">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Generate a HAR file in Chrome (Safely)</h1>
            <p className="mt-4 text-lg text-slate-300">
              A HAR file is a JSON archive of your browser's HTTP requests and responses. It's the fastest way to turn a
              real user workflow into a runnable API Flow in DevTools.
            </p>
            <p className="text-slate-300">Follow these steps to avoid empty files, missing bodies, or noisy domains.</p>
          </header>

          <section className="mb-12">
            <h2 id="what-har-contains" className="text-3xl font-bold text-white">What a HAR contains (and why to be careful)</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300 mb-2">HAR files can include:</p>
              <ul className="text-slate-300 list-disc pl-5">
                <li>URLs, methods, headers, bodies</li>
                <li>Responses, cookies, timing data</li>
              </ul>
              <p className="text-slate-300 mt-3">
                This can contain secrets and personal data. Use a test account and a safe environment; only capture what
                you need.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="before-you-start" className="text-3xl font-bold text-white">Before you start</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <ul className="text-slate-300 list-disc pl-5">
                <li>
                  Use a <strong>staging environment</strong> or a throwaway account
                </li>
                <li>Close unrelated tabs (reduce noise)</li>
                <li>
                  Need request bodies? Enable "HAR with sensitive data" and export "with content" (steps below)
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="record-har" className="text-3xl font-bold text-white">Record the HAR in Chrome</h2>

            <div className="not-prose space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">1</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Open Chrome DevTools → Network</h3>
                    <ul className="text-slate-300 text-sm list-disc pl-5">
                      <li>Right click → Inspect</li>
                      <li>Open the Network panel</li>
                    </ul>
                    <img
                      src="/docs/assets/chrome-devtools-open-settings-gear.webp"
                      alt="Open DevTools settings from the Network panel toolbar"
                      className="mt-4 rounded-lg border border-white/10"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">2</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Enable export with sensitive data (if you need bodies)</h3>
                    <ul className="text-slate-300 text-sm list-disc pl-5">
                      <li>Network toolbar → gear icon</li>
                      <li>Preferences → Network → Allow to generate HAR with sensitive data</li>
                    </ul>
                    <img
                      src="/docs/assets/chrome-devtools-allow-har-with-sensitive-data.webp"
                      alt="Enable 'Allow to generate HAR with sensitive data' in Chrome DevTools preferences"
                      className="mt-4 rounded-lg border border-white/10"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">3</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Capture the workflow</h3>
                    <ul className="text-slate-300 text-sm list-disc pl-5">
                      <li>Check Preserve log (keeps requests across navigation)</li>
                      <li>Optional: Disable cache</li>
                      <li>Click the clear icon to start clean</li>
                      <li>Perform the workflow (login, click, submit, etc.)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">4</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">Export the HAR with content</h3>
                    <ul className="text-slate-300 text-sm list-disc pl-5">
                      <li>Toolbar download icon → Export HAR (with sensitive data)</li>
                      <li>Or right‑click request list → Save all as HAR with content</li>
                    </ul>
                    <p className="text-slate-400 text-sm mt-2">Suggested names: login-create-order.har, checkout-flow.har</p>
                    <img
                      src="/docs/assets/chrome-devtools-export-har-button-menu.webp"
                      alt="Export HAR from the Network tab toolbar — choose 'with sensitive data'"
                      className="mt-4 rounded-lg border border-white/10"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="sanity-check" className="text-3xl font-bold text-white">Sanity check your HAR</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300">Open the file and confirm:</p>
              <ul className="text-slate-300 list-disc pl-5">
                <li>File size isn't 0 bytes</li>
                <li>Includes <code>log</code> and <code>entries</code></li>
              </ul>
              <p className="text-slate-300 mt-2">If it's empty or missing bodies, re‑export with content/sensitive data enabled.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="import-studio" className="text-3xl font-bold text-white">Import into DevTools Studio</h2>
            <div className="not-prose space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Import the HAR</h3>
                <ol className="text-slate-300 list-decimal list-inside text-sm">
                  <li>Open DevTools Studio → Import → HAR File</li>
                  <li>Select your <code>.har</code></li>
                </ol>
                <img
                  src="/docs/assets/import-dialog-select-har.webp"
                  alt="Import dialog selecting HAR file in DevTools Studio"
                  className="mt-4 rounded-lg border border-white/10"
                  loading="lazy"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Filter and map domains</h3>
                <p className="text-slate-300 text-sm">Remove analytics/fonts/CDNs; map domains to variables (e.g., BASE_URL).</p>
                <img
                  src="/docs/assets/import-map-domain-to-base-url.webp"
                  alt="Map domain to {{BASE_URL}} variable in DevTools"
                  className="mt-4 rounded-lg border border-white/10"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="reusable-test" className="text-3xl font-bold text-white">Turn traffic into a reusable test</h2>
            <div className="not-prose space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Review flow + dependencies</h3>
                <p className="text-slate-300 text-sm">Check the generated sequence and auto‑detected variable chaining.</p>
                <img
                  src="/docs/assets/flow-canvas-overview.webp"
                  alt="Flow canvas overview showing request sequence and dependencies"
                  className="mt-4 rounded-lg border border-white/10"
                  loading="lazy"
                />
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Replace secrets with env vars</h3>
                <p className="text-slate-300 text-sm">
                  Use environment variables like <code>{'{{#env:API_TOKEN}}'}</code> and <code>{'{{#env:LOGIN_PASSWORD}}'}</code>.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Export YAML and commit</h3>
                <p className="text-slate-300 text-sm">Run once locally, then export to YAML and commit to your repo.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="troubleshooting" className="text-3xl font-bold text-white">Troubleshooting</h2>
            <div className="not-prose space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">My HAR is empty / missing request bodies</h3>
                <ul className="text-slate-300 text-sm list-disc pl-5">
                  <li>Enable "Allow to generate HAR with sensitive data"</li>
                  <li>Export via "Save all as HAR with content"</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">My HAR has 1000+ requests</h3>
                <ul className="text-slate-300 text-sm list-disc pl-5">
                  <li>Clear the log before recording; close other tabs</li>
                  <li>Filter domains during import</li>
                </ul>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">No dependencies were detected</h3>
                <ul className="text-slate-300 text-sm list-disc pl-5">
                  <li>Detection is strongest when responses are JSON and values are reused later</li>
                  <li>For opaque tokens, map a variable once manually</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="not-prose mb-12 rounded-xl border border-neon/30 bg-neon/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Next steps</h2>
            <ul className="list-disc pl-5 text-slate-300">
              <li>
                Importing HAR files (full guide):{' '}
                <Link href="/docs/how-to/import-har" className="text-neon hover:underline">/docs/how-to/import-har/</Link>
              </li>
              <li>
                Flows overview: <Link href="/flows" className="text-neon hover:underline">/flows/</Link>
              </li>
            </ul>
          </section>

          <footer className="not-prose text-sm text-slate-400">
            <p>
              Need help? Check the <Link href="/docs" className="text-neon hover:underline">docs</Link> or see more <Link href="/guides" className="text-neon hover:underline">guides</Link>.
            </p>
          </footer>
        </article>

        <div className="hidden lg:block">
          <aside className="space-y-6 sticky top-8">
            <StickyTOC items={tocItems} />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded mb-3 bg-slate-700 text-slate-300">
                HAR capture
              </span>
              <h3 className="text-lg font-semibold text-white mb-3">
                Turn browser traffic into tests
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Record a HAR, import into Studio, export YAML, run in CI.
              </p>
              <div className="space-y-3">
                <Link
                  href="/download"
                  className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                >
                  Download Studio
                </Link>
                <Link
                  href="/docs/how-to/import-har"
                  className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                >
                  Import HAR docs
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
