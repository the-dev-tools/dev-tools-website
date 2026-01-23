import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'Generate a HAR file in Chrome (Safely)',
  description: 'Record a HAR in Chrome DevTools and import it into DevTools Studio. Keep sensitive data local.',
  alternates: { canonical: '/guides/generate-har-chrome' },
}

export default function GuideGenerateHarChrome() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Generate a HAR file (Chrome)</h1>
      <ol className="list-decimal pl-6 space-y-3 text-slate-300">
        <li>Open Chrome DevTools → Network tab.</li>
        <li>Check “Preserve log”. Perform your workflow.</li>
        <li>Right‑click request list → “Save all as HAR”.</li>
        <li>Import the HAR into DevTools Studio.</li>
      </ol>
      <p className="mt-4 text-slate-300">Sensitive data handling tips:</p>
      <ul className="list-disc pl-6 space-y-2 text-slate-300">
        <li>Work in a safe environment; data never leaves your machine.</li>
        <li>Use environment variables for secrets: <code className="bg-slate-900/50 px-1 rounded">{`{{#env:API_TOKEN}}`}</code>.</li>
      </ul>
      <div className="mt-8 text-sm text-slate-400">
        Related: <Link href="/docs/how-to/import-har" className="underline">How to import a HAR</Link> ·{' '}
        <Link href="/flows" className="underline">Flows overview</Link>
      </div>
    </main>
  )
}
