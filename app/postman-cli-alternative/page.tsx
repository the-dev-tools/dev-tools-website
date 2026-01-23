import Link from 'next/link'

export const metadata = {
  title: 'Postman CLI / Newman Alternative – DevTools CLI (Fast, JUnit/JSON)',
  description:
    'A faster Newman alternative: DevTools CLI runs YAML flows in parallel with clear exit codes and JUnit/JSON outputs.',
  alternates: { canonical: '/postman-cli-alternative' },
}

export default function NewmanAlternativePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-3">Newman alternative for CI</h1>
        <p className="text-lg text-slate-300 max-w-3xl">
          DevTools CLI executes YAML flows in parallel, with machine‑readable outputs and exit codes designed for pipelines.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Why teams move off Newman</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>Slow runs and heavy scripting</li>
            <li>Mixed reporting; brittle CI plumbing</li>
            <li>Hard to track variable mappings at scale</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">DevTools CLI</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>Parallel by default; multithreaded Go runner</li>
            <li>JUnit/JSON reports, clean exit codes</li>
            <li>Flows exported as human‑readable YAML</li>
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white">Install</h2>
        <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] text-slate-200"><code>curl -fsSL https://sh.dev.tools/install.sh | bash</code></pre>
        <p className="mt-2 text-sm text-slate-400">
          See the <Link href="/docs/reference/cli" className="underline">CLI reference</Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-white">Example (GitHub Actions)</h2>
        <pre className="max-h-80 overflow-auto p-4 text-[13px] leading-relaxed text-slate-200 bg-slate-900/50 border border-white/10 rounded-lg"><code>name: API tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash
      - name: Run flows (JUnit)
        run: devtools flow run --report junit:test-results.xml tests.yaml
</code></pre>
      </section>

      <section className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Deep dive guide</h2>
          <p className="mt-2 text-slate-300">
            For a step‑by‑step walkthrough and CI tips, see the{' '}
            <Link href="/guides/newman-alternative-ci" className="underline">Newman alternative CI guide</Link>.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://dev.tools/' },
              { '@type': 'ListItem', position: 2, name: 'Compare', item: 'https://dev.tools/compare/' },
              { '@type': 'ListItem', position: 3, name: 'Postman CLI / Newman Alternative', item: 'https://dev.tools/postman-cli-alternative/' },
            ],
          })
        }}
      />
    </main>
  )
}
