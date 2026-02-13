import Link from 'next/link'
import StickyTOC from '@/components/ui/StickyTOC'

export const metadata = {
  title: 'API Testing in CI/CD – Run Multi-Step API Tests in Every Pipeline',
  description:
    'Run multi-step API tests in CI/CD pipelines with parallel execution, JUnit/JSON reports, and clean exit codes. Works with GitHub Actions, GitLab CI, Jenkins, and more.',
  alternates: { canonical: '/features/ci-cd-integration/' },
}

const tocItems = [
  { id: 'why-ci', label: 'Why run API tests in CI?' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'github-actions', label: 'GitHub Actions' },
  { id: 'gitlab-ci', label: 'GitLab CI' },
  { id: 'generic-pipeline', label: 'Any pipeline' },
  { id: 'reports', label: 'Reports and exit codes' },
  { id: 'env-secrets', label: 'Environment secrets' },
  { id: 'faq', label: 'FAQ' },
]

export default function CICDIntegrationPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
        <article className="prose prose-invert prose-slate max-w-none min-w-0">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">API Testing in CI/CD Pipelines</h1>
            <p className="mt-4 text-lg text-slate-300">
              Run multi-step API tests on every push with a Go-based CLI that executes flows in parallel,
              produces JUnit/JSON reports, and returns clean exit codes for your pipeline.
            </p>
          </header>

          <section className="mb-12">
            <h2 id="why-ci" className="text-3xl font-bold text-white">Why run API tests in CI/CD?</h2>
            <div className="not-prose space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Catch API regressions before merge</h3>
                <p className="text-slate-300 text-sm">
                  Running multi-step API tests on every pull request catches breaking changes in auth flows,
                  data validation, and cross-service dependencies before they reach production.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">API tests as code</h3>
                <p className="text-slate-300 text-sm">
                  DevTools exports tests as human-readable YAML that lives in your repo alongside the code it tests.
                  Review API test changes in pull requests just like any other code change.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Fast, parallel execution</h3>
                <p className="text-slate-300 text-sm">
                  The DevTools CLI is a Go binary that runs flows in parallel by default — no Node.js runtime,
                  no Docker image pulls, no heavy dependencies. Install and run in seconds.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="how-it-works" className="text-3xl font-bold text-white">How it works</h2>
            <div className="not-prose space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Build flows in DevTools Studio</h3>
                    <p className="text-slate-300 text-sm">Import a HAR, chain requests with auto-mapped variables, and add assertions. Build visually, test locally.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Export YAML and commit to Git</h3>
                    <p className="text-slate-300 text-sm">Export your multi-step test as clean YAML. Commit it to your repo so it's versioned, reviewable, and portable.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Run in CI with the DevTools CLI</h3>
                    <p className="text-slate-300 text-sm">Install the CLI in your pipeline, run the YAML file, and get JUnit/JSON reports. Exit code 0 = pass, 1 = fail.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="github-actions" className="text-3xl font-bold text-white">GitHub Actions</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">.github/workflows/api-tests.yml</div>
                <pre className="p-4 text-[13px] leading-relaxed text-slate-200"><code>{`name: API Tests
on: [push, pull_request]
jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash

      - name: Run API tests
        env:
          BASE_URL: \${{ secrets.API_BASE_URL }}
          TEST_EMAIL: \${{ secrets.TEST_EMAIL }}
          TEST_PASSWORD: \${{ secrets.TEST_PASSWORD }}
        run: devtools flow run --report junit:results.xml tests.yaml

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: api-test-results
          path: results.xml`}</code></pre>
              </div>
              <p className="text-slate-400 text-sm mt-3">
                See the full template: <Link href="/templates/github-actions" className="text-neon hover:underline">GitHub Actions template</Link>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="gitlab-ci" className="text-3xl font-bold text-white">GitLab CI</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">.gitlab-ci.yml</div>
                <pre className="p-4 text-[13px] leading-relaxed text-slate-200"><code>{`api-tests:
  stage: test
  script:
    - curl -fsSL https://sh.dev.tools/install.sh | bash
    - devtools flow run --report junit:results.xml tests.yaml
  artifacts:
    when: always
    reports:
      junit: results.xml`}</code></pre>
              </div>
              <p className="text-slate-400 text-sm mt-3">
                See the full template: <Link href="/templates/gitlab-ci" className="text-neon hover:underline">GitLab CI template</Link>
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="generic-pipeline" className="text-3xl font-bold text-white">Any pipeline (Jenkins, CircleCI, etc.)</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300 mb-4">The DevTools CLI works in any environment that can run a shell command:</p>
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">Shell</div>
                <pre className="p-4 text-[13px] leading-relaxed text-slate-200"><code>{`# Install
curl -fsSL https://sh.dev.tools/install.sh | bash

# Run with JUnit output
devtools flow run --report junit:results.xml tests.yaml

# Run with JSON output
devtools flow run --report json:results.json tests.yaml

# Exit code: 0 = all pass, 1 = any failure`}</code></pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="reports" className="text-3xl font-bold text-white">Reports and exit codes</h2>
            <div className="not-prose grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">JUnit XML</h3>
                <p className="text-slate-300 text-sm">
                  Standard JUnit XML format understood by GitHub Actions, GitLab CI, Jenkins, CircleCI, and every major CI platform.
                  Use <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">--report junit:file.xml</code>.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">JSON report</h3>
                <p className="text-slate-300 text-sm">
                  Machine-readable JSON with detailed request/response data, timings, and assertion results.
                  Use <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">--report json:file.json</code>.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Clean exit codes</h3>
                <p className="text-slate-300 text-sm">
                  Exit code <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">0</code> when all tests pass,
                  <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">1</code> on any failure.
                  Designed for pipelines that need deterministic pass/fail gates.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Parallel execution</h3>
                <p className="text-slate-300 text-sm">
                  Independent flows run in parallel by default. Override with <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">--sequential</code> when needed.
                  Go-based runner keeps CI runs fast.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="env-secrets" className="text-3xl font-bold text-white">Environment secrets</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300 mb-4">
                Reference CI secrets in your YAML flows using the <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">{'{{#env:VAR_NAME}}'}</code> syntax.
                No plaintext credentials in your test files:
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">Environment variable usage</div>
                <pre className="p-4 text-[13px] leading-relaxed text-slate-200"><code>{`env:
  BASE_URL: '{{#env:BASE_URL}}'

# In steps:
- request:
    name: Login
    method: POST
    url: '{{BASE_URL}}/auth/login'
    body:
      email: '{{#env:TEST_EMAIL}}'
      password: '{{#env:TEST_PASSWORD}}'`}</code></pre>
              </div>
              <p className="text-slate-400 text-sm mt-3">
                Set these as CI secrets (GitHub Actions secrets, GitLab CI variables, etc.) and the CLI reads them at runtime.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="faq" className="text-3xl font-bold text-white">FAQ</h2>
            <div className="not-prose space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Do I need Docker to run API tests in CI?</h3>
                <p className="text-slate-300 text-sm">
                  No. The DevTools CLI is a single Go binary. Install with one curl command — no Docker, no Node.js, no heavy runtime needed.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">How fast is the CLI compared to Newman?</h3>
                <p className="text-slate-300 text-sm">
                  The Go-based CLI runs flows in parallel by default and has no runtime overhead. It installs in seconds and executes
                  multi-step tests significantly faster than Node.js-based runners.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Can I run different test suites for different branches?</h3>
                <p className="text-slate-300 text-sm">
                  Yes. Since tests are YAML files in your repo, different branches can have different test files.
                  Use environment variables to point at staging vs production URLs.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Does it support test reporting in pull requests?</h3>
                <p className="text-slate-300 text-sm">
                  Yes. JUnit XML output integrates with GitHub Actions test summaries, GitLab merge request test reports,
                  and Jenkins test result visualization out of the box.
                </p>
              </div>
            </div>
          </section>

          <section className="not-prose mb-12 rounded-xl border border-neon/30 bg-neon/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Start running API tests in CI</h2>
            <p className="text-slate-300 mb-4">Install the DevTools CLI and add multi-step API tests to your pipeline in minutes.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/cli"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
              >
                Install CLI
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-neon/60 text-neon font-medium rounded-lg hover:bg-neon/10 transition"
              >
                View CI Templates
              </Link>
            </div>
          </section>

          <footer className="not-prose text-sm text-slate-400">
            <p>
              See also: <Link href="/features/multi-step-api-testing" className="text-neon hover:underline">Multi-Step API Testing</Link>
              {' '}&middot;{' '}<Link href="/guides/api-testing-ci-cd" className="text-neon hover:underline">API Testing in CI/CD Guide</Link>
              {' '}&middot;{' '}<Link href="/cli" className="text-neon hover:underline">CLI Reference</Link>
              {' '}&middot;{' '}<Link href="/docs" className="text-neon hover:underline">Docs</Link>
            </p>
          </footer>
        </article>

        <div className="hidden lg:block">
          <aside className="space-y-6 sticky top-8">
            <StickyTOC items={tocItems} />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded mb-3 bg-slate-700 text-slate-300">
                CI/CD
              </span>
              <h3 className="text-lg font-semibold text-white mb-3">
                API tests in every pipeline
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Go-based CLI with parallel execution and JUnit reports.
              </p>
              <div className="space-y-3">
                <Link
                  href="/cli"
                  className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                >
                  Install CLI
                </Link>
                <Link
                  href="/templates"
                  className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                >
                  CI Templates
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do I need Docker to run API tests in CI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. The DevTools CLI is a single Go binary. Install with one curl command — no Docker, no Node.js, no heavy runtime needed.'
                }
              },
              {
                '@type': 'Question',
                name: 'How fast is the DevTools CLI compared to Newman?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The Go-based CLI runs flows in parallel by default and has no runtime overhead. It installs in seconds and executes multi-step tests significantly faster than Node.js-based runners.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I run different test suites for different branches?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Since tests are YAML files in your repo, different branches can have different test files. Use environment variables to point at staging vs production URLs.'
                }
              },
              {
                '@type': 'Question',
                name: 'Does DevTools support test reporting in pull requests?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. JUnit XML output integrates with GitHub Actions test summaries, GitLab merge request test reports, and Jenkins test result visualization out of the box.'
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}
