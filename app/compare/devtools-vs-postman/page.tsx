export const metadata = {
  title: 'DevTools vs Postman – Detailed Comparison',
  description:
    'Compare DevTools vs Postman across flows, HAR import, YAML export, variable mapping, CI reporting, and local‑first workflows.',
}

export default function CompareVsPostmanPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">DevTools vs Postman</h1>
      <p className="text-lg text-slate-300 max-w-3xl mb-8">
        A head‑to‑head look at capabilities that matter for local‑first, CI‑ready API workflows.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
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
              <th className="px-4 py-4 text-slate-100">HAR → Flow (auto‑build)</th>
              <td className="px-4 py-4">✅ Yes</td>
              <td className="px-4 py-4">❌ No</td>
            </tr>
            <tr className="bg-white/3">
              <th className="px-4 py-4 text-slate-100">YAML export (Git‑reviewable)</th>
              <td className="px-4 py-4">✅ Yes (flows as YAML)</td>
              <td className="px-4 py-4">⚠️ Limited</td>
            </tr>
            <tr>
              <th className="px-4 py-4 text-slate-100">Variable mapping</th>
              <td className="px-4 py-4">✅ Automatic + overrides</td>
              <td className="px-4 py-4">⚠️ Often scripts per request</td>
            </tr>
            <tr className="bg-white/3">
              <th className="px-4 py-4 text-slate-100">CI outputs</th>
              <td className="px-4 py-4">✅ JUnit/JSON, parallel by default</td>
              <td className="px-4 py-4">⚠️ Heavier runtime in CI</td>
            </tr>
            <tr>
              <th className="px-4 py-4 text-slate-100">Local‑first / offline</th>
              <td className="px-4 py-4">✅ No account required</td>
              <td className="px-4 py-4">⚠️ Cloud‑first</td>
            </tr>
          </tbody>
        </table>
      </div>

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
              { '@type': 'ListItem', position: 3, name: 'DevTools vs Postman', item: 'https://dev.tools/compare/devtools-vs-postman/' },
            ],
          })
        }}
      />
    </main>
  )
}
