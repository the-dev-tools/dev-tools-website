import Link from 'next/link'

export default function Flows() {
  return (
    <section id="flows" className="relative border-b border-white/5 bg-[linear-gradient(160deg,rgba(9,12,31,0.6),rgba(42,27,78,0.45))] py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-wide text-slate-300">How it works</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Record → Flow → YAML → CI</h2>
          <p className="mt-3 text-base text-slate-300">
            Quick mental model: visual API workflows with Git‑native YAML export. Flows you can review and run in CI.
          </p>
        </div>

        <div className="space-y-24">
          {/* Row 1: Image left, text right */}
          <div className="grid items-center gap-8 md:grid-cols-12">
            <figure className="order-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.8)] md:col-span-8">
              <div className="w-full" style={{ aspectRatio: '16 / 10' }}>
                <img
                  src="/docs/assets/import-dialog-select-har-339w.webp"
                  srcSet="/docs/assets/import-dialog-select-har-339w.webp 339w, /docs/assets/import-dialog-select-har-800w.webp 800w"
                  sizes="(min-width: 768px) 600px, 100vw"
                  alt="Import a HAR file into DevTools"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full bg-slate-950/60 object-contain"
                />
              </div>
            </figure>
            <div className="order-2 md:col-span-4">
              <h3 className="text-2xl font-semibold text-white">Record real traffic</h3>
              <p className="mt-3 text-slate-300">Capture a HAR from your browser or proxy and drag it into DevTools. We’ll parse requests and auth headers automatically.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Chrome DevTools → Save all as HAR</li>
                <li>• Sensitive data safe: process happens locally</li>
              </ul>
              <div className="mt-4 text-sm">
                <Link href="/docs/how-to/import-har#recording-har-files" className="underline decoration-dotted underline-offset-2 hover:text-white">How to record a HAR</Link>
                <span className="mx-2 opacity-50">•</span>
                <Link href="/docs/how-to/import-har#importing-har-files" className="underline decoration-dotted underline-offset-2 hover:text-white">Importing HAR files</Link>
              </div>
            </div>
          </div>

          {/* Row 2: Text left, image right */}
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="order-2 md:order-1 md:col-span-4">
              <h3 className="text-2xl font-semibold text-white">Map variables across steps</h3>
              <p className="mt-3 text-slate-300">Extract tokens and IDs from responses and map them to subsequent requests. Fine‑tune with JSONPath‑based overrides.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Auto‑mapped variables from responses</li>
                <li>• Override rules per step</li>
              </ul>
              <div className="mt-4 text-sm">
                <Link href="/docs/how-to/working-with-flows#variables" className="underline decoration-dotted underline-offset-2 hover:text-white">Variables in flows</Link>
              </div>
            </div>
            <figure className="order-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.8)] md:order-2 md:col-span-8">
              <div className="w-full" style={{ aspectRatio: '16 / 10' }}>
                <img
                  src="/docs/assets/used-variables-tab.webp"
                  sizes="(min-width: 768px) 600px, 100vw"
                  alt="Variables mapped and used in flow"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full bg-slate-950/60 object-contain"
                />
              </div>
            </figure>
          </div>

          {/* Row 3: Image left, text right */}
          <div className="grid items-center gap-8 md:grid-cols-12">
            <figure className="order-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.8)] md:col-span-8">
              <div className="w-full" style={{ aspectRatio: '16 / 10' }}>
                <img
                  src="/docs/assets/flow-canvas-overview-800w.webp"
                  sizes="(min-width: 768px) 600px, 100vw"
                  alt="Flow canvas visual overview"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full bg-slate-950/60 object-contain"
                />
              </div>
            </figure>
            <div className="order-2 md:col-span-4">
              <h3 className="text-2xl font-semibold text-white">Build and refine flows</h3>
              <p className="mt-3 text-slate-300">Use a visual canvas to organize requests, set assertions, and add flow‑level logic. Keep reviews clean with YAML export.</p>
              <div className="mt-4 text-sm">
                <Link href="/docs/how-to/working-with-flows" className="underline decoration-dotted underline-offset-2 hover:text-white">Learn how flows work</Link>
              </div>
            </div>
          </div>

          {/* Row 4: Text left, image right */}
          <div className="grid items-center gap-8 md:grid-cols-12">
            <div className="order-2 md:order-1 md:col-span-4">
              <h3 className="text-2xl font-semibold text-white">Export to YAML and run in CI</h3>
              <p className="mt-3 text-slate-300">YAML‑native by design: export human‑readable flows for Git review, then run locally or in CI with clear exit codes and reports.</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                <li>• Git‑reviewable flow definitions</li>
                <li>• CLI reports (JUnit/JSON, exit codes)</li>
              </ul>
              <div className="mt-4 text-sm">
                <Link href="/docs/how-to/import-har#export-to-yaml-flow" className="underline decoration-dotted underline-offset-2 hover:text-white">How to export YAML</Link>
                <span className="mx-2 opacity-50">•</span>
                <Link href="/docs/how-to/working-with-flows#yaml-flow-format" className="underline decoration-dotted underline-offset-2 hover:text-white">YAML flow format</Link>
              </div>
            </div>
            <figure className="order-1 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.8)] md:order-2 md:col-span-8">
              <div className="w-full" style={{ aspectRatio: '16 / 10' }}>
                <img
                  src="/docs/assets/cli-json-report-view-337w.webp"
                  srcSet="/docs/assets/cli-json-report-view-337w.webp 337w, /docs/assets/cli-json-report-view-800w.webp 800w"
                  sizes="(min-width: 768px) 600px, 100vw"
                  alt="CLI JSON report and CI‑friendly output"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full bg-slate-950/60 object-contain"
                />
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

