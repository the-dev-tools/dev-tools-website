import Link from 'next/link'

export const metadata = {
  title: 'Migrate from Postman to DevTools (Collections → YAML)',
  description: 'Move from Postman collections to YAML flows: map environments, import real traffic (HAR), run in CI with JUnit/JSON.',
  alternates: { canonical: '/guides/migrate-from-postman' },
}

export default function GuideMigrateFromPostman() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Migrate from Postman to DevTools</h1>
      <ol className="list-decimal pl-6 space-y-4 text-slate-300">
        <li>
          Export your Postman collection and environments. Identify secrets and variables you’ll keep in CI as <code className="bg-slate-900/50 px-1 rounded">{`{{#env:VAR}}`}</code>.
        </li>
        <li>
          Record a HAR of the workflow in Chrome (DevTools → Network → Save all as HAR).{' '}
          <Link href="/docs/how-to/import-har" className="underline">Import the HAR</Link> into DevTools Studio.
        </li>
        <li>
          Review the generated flow. Variable mapping auto‑extracts tokens/IDs; fine‑tune with JSONPath overrides. See{' '}
          <Link href="/docs/how-to/working-with-flows#variables" className="underline">Variables in flows</Link>.
        </li>
        <li>
          Export YAML. Run in CI with the DevTools CLI and JUnit output.
          <pre className="mt-3 bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] text-slate-200"><code>{`curl -fsSL https://sh.dev.tools/install.sh | bash
devtools flow run --report junit:test-results.xml api-tests.yaml`}</code></pre>
        </li>
      </ol>
      <div className="mt-8 text-sm text-slate-400">
        Related: <Link href="/download" className="underline">Download</Link>
      </div>
    </main>
  )
}
