import Link from 'next/link'

export const metadata = {
  title: 'CI with DevTools CLI (Newman compatibility)',
  description: 'Run YAML flows in parallel with DevTools CLI and JUnit/JSON outputs. Compatible with Newman concepts but faster and simpler.',
  alternates: { canonical: '/guides/newman-alternative-ci' },
}

export default function GuideNewmanAlternativeCI() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">Faster CI with DevTools CLI</h1>
      <p className="text-slate-300 mb-4">Install the DevTools CLI and run YAML flows in parallel.</p>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] text-slate-200"><code>{`curl -fsSL https://sh.dev.tools/install.sh | bash
devtools flow run --report junit:test-results.xml api-tests.yaml`}</code></pre>
      <p className="mt-4 text-slate-300">GitHub Actions example:</p>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] text-slate-200"><code>{`name: API tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash
      - name: Run flows (JUnit)
        run: devtools flow run --report junit:test-results.xml tests.yaml`}</code></pre>
      <div className="mt-8 text-sm text-slate-400">
        Related: <Link href="/docs/reference/cli" className="underline">CLI reference</Link>
      </div>
    </main>
  )
}
