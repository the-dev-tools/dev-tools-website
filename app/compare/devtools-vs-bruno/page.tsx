export const metadata = {
  title: 'DevTools vs Bruno – Detailed Comparison',
  description:
    'Compare DevTools vs Bruno across flows, HAR import, YAML export, local workflows, and CI reporting.',
}

export default function CompareVsBrunoPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">DevTools vs Bruno</h1>
      <p className="text-lg text-slate-300 max-w-3xl mb-8">
        Bruno is a git‑friendly API client; DevTools is a git‑friendly <strong className="text-white">flow system</strong>. Here’s how that plays out.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
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
              <th className="px-4 py-4 text-slate-100">HAR → Flow (auto‑build)</th>
              <td className="px-4 py-4">✅ Yes</td>
              <td className="px-4 py-4">❌ No</td>
            </tr>
            <tr className="bg-white/3">
              <th className="px-4 py-4 text-slate-100">Visual flows</th>
              <td className="px-4 py-4">✅ Canvas with assertions + evals</td>
              <td className="px-4 py-4">❌ No</td>
            </tr>
            <tr>
              <th className="px-4 py-4 text-slate-100">YAML export</th>
              <td className="px-4 py-4">✅ Yes (for Git review)</td>
              <td className="px-4 py-4">✅ Yes (collections)</td>
            </tr>
            <tr className="bg-white/3">
              <th className="px-4 py-4 text-slate-100">Runner / CI</th>
              <td className="px-4 py-4">✅ JUnit/JSON, parallel default</td>
              <td className="px-4 py-4">⚠️ Basic; often scripting</td>
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
              { '@type': 'ListItem', position: 3, name: 'DevTools vs Bruno', item: 'https://dev.tools/compare/devtools-vs-bruno/' },
            ],
          })
        }}
      />
    </main>
  )
}
