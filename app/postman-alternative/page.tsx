import Link from 'next/link'

export const metadata = {
  title: 'Postman Alternative – DevTools (Local‑First, YAML Flows, CI‑Ready)',
  description:
    'DevTools is a local‑first Postman alternative: import HAR → generate visual flows → export YAML → run in CI with JUnit/JSON.',
}

export default function PostmanAlternativePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-3">A local‑first Postman alternative</h1>
        <p className="text-lg text-slate-300 max-w-3xl">
          DevTools turns real traffic (HAR) into visual API flows you can export as YAML and run in CI. <a href="/download" className="underline decoration-dotted underline-offset-2">Download DevTools Studio</a>.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Why teams switch from Postman</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>Cloud friction for simple local workflows</li>
            <li>Script‑heavy collections that are hard to review</li>
            <li>Painful or slow CI runs, flaky exit codes</li>
            <li>Team drift between exported collections and reality</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">What DevTools does differently</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>HAR → flow → YAML → CI (reviewable and portable)</li>
            <li>Automatic variable mapping with JSONPath overrides</li>
            <li>Go‑based runner: parallel by default, JUnit/JSON reports</li>
            <li>Local‑first, no account required</li>
          </ul>
        </div>
      </section>

      <section className="mt-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Deep dive guide</h2>
          <p className="mt-2 text-slate-300">
            Ready to migrate collections and environments? See the{' '}
            <Link href="/guides/migrate-from-postman" className="underline">Migrate from Postman guide</Link>.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white">Head‑to‑head</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Capability</th>
                <th className="px-4 py-3 text-left font-semibold text-white">DevTools</th>
                <th className="px-4 py-3 text-left font-semibold">Postman</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <th className="px-4 py-3 text-slate-100">HAR → Flow</th>
                <td className="px-4 py-3">✅ Yes</td>
                <td className="px-4 py-3">❌ No</td>
              </tr>
              <tr className="bg-white/3">
                <th className="px-4 py-3 text-slate-100">YAML export (Git‑reviewable)</th>
                <td className="px-4 py-3">✅ Yes</td>
                <td className="px-4 py-3">⚠️ Limited</td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-slate-100">Variable mapping</th>
                <td className="px-4 py-3">✅ Automatic, rule‑based</td>
                <td className="px-4 py-3">⚠️ Often script‑heavy</td>
              </tr>
              <tr className="bg-white/3">
                <th className="px-4 py-3 text-slate-100">Runner speed</th>
                <td className="px-4 py-3">✅ Go‑based, parallel default</td>
                <td className="px-4 py-3">⚠️ Heavier runtime in CI</td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-slate-100">Local‑first / offline</th>
                <td className="px-4 py-3">✅ 100% local; no account</td>
                <td className="px-4 py-3">⚠️ Cloud‑first defaults</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-slate-400">
          Want a deeper breakdown? See the{' '}
          <Link href="/compare/devtools-vs-postman" className="underline decoration-dotted underline-offset-2">
            DevTools vs Postman comparison
          </Link>
          .
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white">Migration: Postman → DevTools</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-300">
          <li>Export your Postman collection and environments.</li>
          <li>Import the HAR of your real workflow <span className="opacity-70">(Chrome → Save all as HAR)</span>.</li>
          <li>Map secrets via <code className="bg-slate-900/50 px-1 rounded">{`{{#env:VAR}}`}</code> and variable rules.</li>
          <li>Export YAML and run in CI with JUnit output.</li>
        </ol>
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">GitHub Actions</div>
          <pre className="max-h-80 overflow-auto p-4 text-[13px] leading-relaxed text-slate-200"><code>name: API tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash
      - name: Run flow (JUnit)
        run: devtools flow run --report junit:test-results.xml api-tests.yaml
</code></pre>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-white">FAQ</h2>
        <div className="mt-3 space-y-4 text-slate-300">
          <div>
            <h3 className="font-semibold text-white">Is DevTools open source?</h3>
            <p>Yes — desktop and CLI are open source on GitHub.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Does it work offline?</h3>
            <p>Yes. DevTools is local‑first and does not require an account.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Can I run it in CI?</h3>
            <p>Yes. The CLI outputs JUnit/JSON with clear exit codes for pipelines.</p>
          </div>
          <div>
            <h3 className="font-semibold text-white">Can I import Postman collections?</h3>
            <p>Collections can be migrated; we recommend starting from a HAR to capture real workflows with fewer scripts.</p>
          </div>
        </div>
      </section>

      <footer className="text-sm text-slate-400">
        See also: <Link href="/postman-cli-alternative" className="underline">Newman alternative</Link> and <Link href="/download" className="underline">Download DevTools Studio</Link>.
      </footer>

      {/* FAQ Schema for rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is DevTools open source?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes — desktop and CLI are open source on GitHub.'
                }
              },
              {
                '@type': 'Question',
                name: 'Does it work offline?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. DevTools is local‑first and does not require an account.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I run it in CI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The CLI outputs JUnit/JSON with clear exit codes for pipelines.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I import Postman collections?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Collections can be migrated; we recommend starting from a HAR to capture real workflows with fewer scripts.'
                }
              }
            ]
          })
        }}
      />

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
              { '@type': 'ListItem', position: 3, name: 'Postman Alternative', item: 'https://dev.tools/postman-alternative/' },
            ],
          })
        }}
      />
    </main>
  )
}
