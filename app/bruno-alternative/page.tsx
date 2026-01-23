import Link from 'next/link'

export const metadata = {
  title: 'Bruno Alternative – DevTools (Flows from HAR, YAML Export, CI)',
  description:
    'DevTools is a Bruno alternative focused on visual flows from HAR, automatic variable mapping, YAML export, and CI reporting.',
  alternates: { canonical: '/bruno-alternative' },
}

export default function BrunoAlternativePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-white mb-3">A practical Bruno alternative</h1>
        <p className="text-lg text-slate-300 max-w-3xl">
          DevTools builds <strong className="text-white">flows</strong> from real traffic (HAR), maps variables automatically, and exports YAML for clean reviews and CI. <a href="/download" className="underline decoration-dotted underline-offset-2">Download DevTools Studio</a>.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 mb-12">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Where DevTools differs</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>Visual flows with dependencies and assertions</li>
            <li>HAR → Flow tree (from your real browser session)</li>
            <li>YAML export for Git review</li>
            <li>Parallel runner with JUnit/JSON outputs</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Bruno strengths</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>Git‑friendly collections and local storage</li>
            <li>Great for request building and manual testing</li>
            <li>Open source, community‑driven</li>
          </ul>
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
                <th className="px-4 py-3 text-left font-semibold">Bruno</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <th className="px-4 py-3 text-slate-100">HAR → Flow</th>
                <td className="px-4 py-3">✅ Yes</td>
                <td className="px-4 py-3">❌ No</td>
              </tr>
              <tr className="bg-white/3">
                <th className="px-4 py-3 text-slate-100">YAML export (reviewable)</th>
                <td className="px-4 py-3">✅ Yes</td>
                <td className="px-4 py-3">✅ Yes (collections)</td>
              </tr>
              <tr>
                <th className="px-4 py-3 text-slate-100">Visual flow builder</th>
                <td className="px-4 py-3">✅ Yes</td>
                <td className="px-4 py-3">❌ No</td>
              </tr>
              <tr className="bg-white/3">
                <th className="px-4 py-3 text-slate-100">Runner (CI)</th>
                <td className="px-4 py-3">✅ Parallel by default; JUnit/JSON</td>
                <td className="px-4 py-3">⚠️ Basic; tends to rely on scripts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer className="text-sm text-slate-400">
        Also see the{' '}
        <Link href="/compare/devtools-vs-bruno" className="underline">DevTools vs Bruno comparison</Link> and{' '}
        <Link href="/download" className="underline">Download DevTools Studio</Link>.
      </footer>

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
              { '@type': 'ListItem', position: 3, name: 'Bruno Alternative', item: 'https://dev.tools/bruno-alternative/' },
            ],
          })
        }}
      />
    </main>
  )
}
