import Link from 'next/link'

export const metadata = {
  title: 'Template: GitLab CI (YAML flows + JUnit)',
  description: 'Run DevTools YAML flows in GitLab CI with JUnit output.',
}

export default function TemplateGitLabCI() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">GitLab CI</h1>
      <p className="text-slate-300 mb-2">
        Run DevTools YAML flows in GitLab CI and emit JUnit reports. Useful for merge request checks and scheduled
        pipelines across environments.
      </p>
      <p className="text-slate-400 text-sm mb-6">
        For the full setup (PR checks, artifacts, caching, smoke vs regression), see the{' '}
        <Link className="underline" href="/guides/api-regression-testing-github-actions">API regression testing guide</Link>.
      </p>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Required env vars</h2>
        <p className="text-slate-300 mb-2">Depends on your flows. Common examples:</p>
        <ul className="list-disc pl-5 text-slate-300">
          <li><code className="bg-slate-900/50 px-1 rounded">LOGIN_EMAIL</code>, <code className="bg-slate-900/50 px-1 rounded">LOGIN_PASSWORD</code></li>
          <li>API keys or base URLs via GitLab CI variables</li>
        </ul>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">How to run it</h2>
        <p className="text-slate-300 mb-2">Add a job in <code className="bg-slate-900/50 px-1 rounded">.gitlab-ci.yml</code>:</p>
        <pre className="bg-slate-900/50 border border-white/10 rounded p-3 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`stages: [test]

api_tests:
  stage: test`}</code></pre>
        <p className="text-slate-300 mt-3">Commit and push to run in GitLab pipelines.</p>
      </div>

      <div className="rounded-lg border border-white/10 bg-amber-500/10 p-4 mb-8">
        <strong className="text-amber-300">TODO:</strong>
        <ul className="list-disc pl-5 text-amber-200 mt-2">
          <li>Add a screenshot of pipeline summary with test results.</li>
          <li>Clip of job log showing <code className="bg-slate-900/50 px-1 rounded">devtools</code> output.</li>
        </ul>
      </div>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`stages: [test]

api_tests:
  stage: test
  image: ubuntu:latest
  script:
    - apt-get update && apt-get install -y curl
    - curl -fsSL https://sh.dev.tools/install.sh | bash
    - devtools flow run --report junit:test-results.xml tests.yaml`}</code></pre>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">What to change</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Path to your YAML flows file (<code className="bg-slate-900/50 px-1 rounded">tests.yaml</code>).</li>
          <li>Stages/jobs structure and caching strategy.</li>
          <li>Reports and artifacts for visibility.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Common variations</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Parallel jobs per service or environment.</li>
          <li>Manual gates for production deploys.</li>
          <li>Scheduled nightly runs with <code className="bg-slate-900/50 px-1 rounded">only: [schedules]</code>.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Links</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><Link className="underline" href="/docs/reference/cli">CLI Tool</Link></li>
          <li><Link className="underline" href="/docs/how-to/ci-integrations">CI/CD integrations</Link></li>
          <li><Link className="underline" href="/guides/newman-alternative-ci">Newman alternative for CI</Link></li>
        </ul>
      </div>
    </main>
  )
}
