import Link from 'next/link'

export const metadata = {
  title: 'Compare DevTools – vs Postman, vs Bruno',
  description: 'Side-by-side comparisons: DevTools vs Postman and DevTools vs Bruno. Flows, HAR import, YAML export, CI reporting.',
}

export default function CompareIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h1 className="text-5xl font-bold text-white mb-4">Compare</h1>
      <p className="text-lg text-slate-400 mb-3">See how DevTools stacks up on the workflows that matter.</p>
      <p className="text-sm text-slate-400 mb-10">Ready to try it? <a href="/download" className="underline">Download DevTools Studio</a>.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/compare/devtools-vs-postman" className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
          <h2 className="text-xl font-semibold text-white mb-1">DevTools vs Postman</h2>
          <p className="text-slate-300 text-sm">HAR → flows → YAML → CI, variable mapping, and runner speed.</p>
        </Link>
        <Link href="/compare/devtools-vs-bruno" className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"> 
          <h2 className="text-xl font-semibold text-white mb-1">DevTools vs Bruno</h2>
          <p className="text-slate-300 text-sm">Visual flows, YAML export, local workflows, and CI reporting.</p>
        </Link>
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
            ],
          })
        }}
      />
    </main>
  )
}
