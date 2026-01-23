export const metadata = {
  title: 'Template: GitHub Actions (YAML flows + JUnit)',
  description: 'Run DevTools YAML flows in GitHub Actions with JUnit output for PR‑visible results.',
  alternates: { canonical: '/templates/github-actions' },
}

export default function TemplateGitHubActions() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">GitHub Actions</h1>
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
    </main>
  )
}
