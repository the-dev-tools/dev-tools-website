import Link from 'next/link'

export const metadata = {
  title: 'Template: GitHub Actions (YAML flows + JUnit)',
  description: 'Run DevTools YAML flows in GitHub Actions with JUnit output for PR‑visible results.',
  alternates: { canonical: '/templates/github-actions' },
}

export default function TemplateGitHubActions() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">GitHub Actions</h1>
      <p className="text-slate-300 mb-6">
        Run DevTools YAML flows in GitHub Actions and publish JUnit results for PR checks. Great for smoke and
        regression suites that run on pushes and pull requests.
      </p>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Required env vars</h2>
        <p className="text-slate-300 mb-2">Depends on your flows. Common examples:</p>
        <ul className="list-disc pl-5 text-slate-300">
          <li><code className="bg-slate-900/50 px-1 rounded">LOGIN_EMAIL</code>, <code className="bg-slate-900/50 px-1 rounded">LOGIN_PASSWORD</code></li>
          <li>API keys or base URLs (set via repository/environment secrets)</li>
        </ul>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">How to run it</h2>
        <p className="text-slate-300 mb-2">Create <code className="bg-slate-900/50 px-1 rounded">.github/workflows/api-tests.yml</code>:</p>
        <pre className="bg-slate-900/50 border border-white/10 rounded p-3 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`name: API tests
on: [push]`}</code></pre>
        <p className="text-slate-300 mt-3">Commit and push to trigger the workflow.</p>
      </div>

      <div className="rounded-lg border border-white/10 bg-amber-500/10 p-4 mb-8">
        <strong className="text-amber-300">TODO:</strong>
        <ul className="list-disc pl-5 text-amber-200 mt-2">
          <li>Add a screenshot of PR checks showing JUnit summary.</li>
          <li>Short clip of the workflow logs highlighting <code className="bg-slate-900/50 px-1 rounded">devtools</code> output.</li>
        </ul>
      </div>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`name: API tests
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
      <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">What to change</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Path to your YAML flows file (<code className="bg-slate-900/50 px-1 rounded">tests.yaml</code>).</li>
          <li>Triggers (<code className="bg-slate-900/50 px-1 rounded">on</code>), job names, and matrix strategy.</li>
          <li>Additional reports: JSON and console alongside JUnit.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Common variations</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Artifact upload of JUnit/JSON reports.</li>
          <li>Matrix per service or environment.</li>
          <li>Scheduled nightly runs with <code className="bg-slate-900/50 px-1 rounded">cron</code>.</li>
          <li>Fail-fast or continue-on-error for flaky suites.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Links</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><Link className="underline" href="/docs/reference/cli">CLI Tool</Link></li>
          <li><Link className="underline" href="/docs/how-to/ci-integrations">CI/CD integrations</Link></li>
          <li><Link className="underline" href="/guides/api-regression-testing-github-actions">API regression in GitHub Actions</Link></li>
          <li><Link className="underline" href="/guides/newman-alternative-ci">Newman alternative for CI</Link></li>
        </ul>
      </div>
    </main>
  )
}
