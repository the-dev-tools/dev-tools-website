import Link from 'next/link'

export const metadata = {
  title: 'API Regression Testing in GitHub Actions (YAML + JUnit)',
  description: 'Run API regression suites in GitHub Actions with YAML flows, parallel execution, and JUnit results.',
  alternates: { canonical: '/guides/api-regression-testing-github-actions' },
}

export default function GuideApiRegressionGitHubActions() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-extrabold text-white mb-6">API regression testing in GitHub Actions</h1>
      <p className="text-slate-300 mb-4">Use DevTools YAML flows and store secrets in repository or environment settings.</p>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] text-slate-200"><code>name: API regression
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash
      - name: Run flows (JUnit)
        run: devtools flow run --report junit:test-results.xml regression.yaml</code></pre>
      <div className="mt-8 text-sm text-slate-400">
        Related: <Link href="/templates/github-actions" className="underline">GitHub Actions template</Link> ·{' '}
        <Link href="/docs/how-to/ci-integrations" className="underline">CI integrations</Link>
      </div>
    </main>
  )
}

