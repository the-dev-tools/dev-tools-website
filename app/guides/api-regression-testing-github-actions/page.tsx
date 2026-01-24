import Link from 'next/link'

export const metadata = {
  title: 'API Regression Testing in GitHub Actions (YAML + JUnit)',
  description:
    'Run DevTools YAML flows in GitHub Actions as regression tests. PR-visible JUnit results, JSON reports, caching, timeouts, and artifact uploads.',
  alternates: { canonical: '/guides/api-regression-testing-github-actions' },
}

export default function GuideApiRegressionGitHubActions() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does this show results in pull requests?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Emit JUnit and publish a test summary with a PR reporter so checks show pass/fail in the PR UI.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I upload test artifacts even when tests fail?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use if: always() on artifact upload and reporting steps.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I run smoke tests separately?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Gate the full regression suite behind a fast smoke job for early failure signals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I run nightly regressions too?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Nightly runs catch drift and third‑party changes even when PR cadence is low.',
        },
      },
    ],
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <article className="prose prose-invert prose-slate max-w-none">
        <header className="mb-10 not-prose">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">API regression testing in GitHub Actions</h1>
          <p className="mt-4 text-lg text-slate-300">
            API regression tests catch “it worked yesterday” bugs before they ship. Use DevTools YAML flows with JUnit +
            JSON outputs, PR‑visible summaries, caching, and artifacts to debug failures quickly.
          </p>
          <p className="mt-2 text-slate-300">
            Jump to: <a href="#copy-paste-github-actions-workflow" className="text-neon hover:underline">Copy‑paste workflow</a>
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Deep reference: <Link href="/docs/how-to/ci-integrations" className="text-neon hover:underline">CI/CD integrations</Link> ·
            Template: <Link href="/templates/github-actions" className="text-neon hover:underline">GitHub Actions</Link> ·
            Related: <Link href="/guides/newman-alternative-ci" className="text-neon hover:underline">Newman alternative for CI</Link>
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-white">What “API regression testing” means (in practice)</h2>
          <p className="text-slate-300">A repeatable suite that verifies your API still behaves after code changes:</p>
          <ul className="text-slate-300">
            <li>Same endpoints, same auth, same workflow paths</li>
            <li>Assertions on status codes and critical fields</li>
            <li>Run on every PR so failures block merges</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-white">Prerequisites</h2>
          <ol className="text-slate-300 list-decimal list-inside">
            <li>A YAML flow file committed to your repo (see layout below)</li>
            <li>Secrets configured in GitHub (API keys, login creds, base URL)</li>
            <li>DevTools CLI installed in the workflow</li>
          </ol>
          <div className="mt-3 rounded-lg bg-slate-900/60 p-4 text-[13px] border border-white/10 text-slate-200">
            <div className="text-slate-400 mb-1">Install CLI</div>
            <div>$ curl -fsSL https://sh.dev.tools/install.sh | bash</div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-white">Recommended repo layout</h2>
          <p className="text-slate-300">Split tests by intent so your pipeline stays fast:</p>
          <pre className="bg-slate-900/60 border border-white/10 rounded p-4 overflow-x-auto text-[13px] text-slate-200"><code>{`tests/
  smoke-tests.yaml        # 1–2 minutes, critical endpoints only
  regression-tests.yaml   # 10–15 minutes, fuller coverage`}</code></pre>
          <p className="mt-2 text-slate-400 text-sm">Why it matters: smoke fails fast; regression runs only after smoke passes.</p>
        </section>

        <section className="mb-10">
          <h2 id="copy-paste-github-actions-workflow" className="text-3xl font-bold text-white">Copy‑paste GitHub Actions workflow</h2>
          <p className="text-slate-300">Create <code className="bg-slate-900/50 px-1 rounded">.github/workflows/api-regression.yml</code>:</p>
          <pre className="bg-slate-900/60 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`name: API Regression Tests

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]
  schedule:
    - cron: "0 2 * * *" # nightly at 02:00 UTC

jobs:
  smoke:
    name: Smoke (fast gate)
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Cache DevTools CLI
        id: cache
        uses: actions/cache@v4
        with:
          path: /usr/local/bin/devtools
          key: devtools-cli-${'${{ runner.os }}'}-v0.5.1

      - name: Install DevTools CLI
        if: steps.cache.outputs.cache-hit != 'true'
        run: curl -fsSL https://sh.dev.tools/install.sh | bash

      - name: Run smoke tests (JUnit + JSON)
        timeout-minutes: 10
        env:
          API_BASE_URL: ${'${{ secrets.API_BASE_URL }}'}
          API_KEY: ${'${{ secrets.API_KEY }}'}
          LOGIN_EMAIL: ${'${{ secrets.LOGIN_EMAIL }}'}
          LOGIN_PASSWORD: ${'${{ secrets.LOGIN_PASSWORD }}'}
        run: |
          devtools flow run tests/smoke-tests.yaml \
            --report junit:smoke-results.xml \
            --report json:smoke-results.json

      - name: Upload smoke artifacts
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: smoke-results
          path: |
            smoke-results.xml
            smoke-results.json

      - name: Publish smoke report to PR
        uses: dorny/test-reporter@v1
        if: always()
        with:
          name: Smoke API Test Results
          path: smoke-results.xml
          reporter: java-junit

  regression:
    name: Regression (full suite)
    runs-on: ubuntu-latest
    needs: smoke

    steps:
      - uses: actions/checkout@v4

      - name: Cache DevTools CLI
        id: cache
        uses: actions/cache@v4
        with:
          path: /usr/local/bin/devtools
          key: devtools-cli-${'${{ runner.os }}'}-v0.5.1

      - name: Install DevTools CLI
        if: steps.cache.outputs.cache-hit != 'true'
        run: curl -fsSL https://sh.dev.tools/install.sh | bash

      - name: Run regression tests (JUnit + JSON)
        timeout-minutes: 20
        env:
          API_BASE_URL: ${'${{ secrets.API_BASE_URL }}'}
          API_KEY: ${'${{ secrets.API_KEY }}'}
          LOGIN_EMAIL: ${'${{ secrets.LOGIN_EMAIL }}'}
          LOGIN_PASSWORD: ${'${{ secrets.LOGIN_PASSWORD }}'}
        run: |
          devtools flow run tests/regression-tests.yaml \
            --report junit:regression-results.xml \
            --report json:regression-results.json

      - name: Upload regression artifacts
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: regression-results
          path: |
            regression-results.xml
            regression-results.json

      - name: Publish regression report to PR
        uses: dorny/test-reporter@v1
        if: always()
        with:
          name: Regression API Test Results
          path: regression-results.xml
          reporter: java-junit`}</code></pre>

          <h3 className="text-xl font-semibold text-white mt-6">What you must change</h3>
          <ul className="text-slate-300">
            <li>Flow paths: <code>tests/smoke-tests.yaml</code>, <code>tests/regression-tests.yaml</code></li>
            <li>Secrets: match your environment variable names</li>
            <li>Cache key version: bump <code>v0.5.1</code> when updating the CLI</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-white">Optional: matrix testing (staging + production)</h2>
          <p className="text-slate-300">Test multiple environments using a matrix and pass the URL into your flow:</p>
          <pre className="bg-slate-900/60 border border-white/10 rounded p-4 overflow-x-auto text-[13px] text-slate-200"><code>{`strategy:
  matrix:
    environment:
      - name: Staging
        url: ${'${{ secrets.STAGING_API_BASE_URL }}'}
      - name: Production
        url: ${'${{ secrets.PROD_API_BASE_URL }}'}`}</code></pre>
          <p className="text-slate-300 mt-2">
            Then pass into the job env: <code className="bg-slate-900/50 px-1 rounded">API_BASE_URL: {`$`}{'{'}{`{{ matrix.environment.url }}`}{'}'}</code>
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-white">Flake control (don’t ignore this)</h2>
          <p className="text-slate-300">
            Not everything is deterministic in API testing. Your engine can be deterministic, but traffic reality isn’t.
            Use these rules and see{' '}
            <Link href="/docs/concepts/determinism-claims" className="text-neon hover:underline">Determinism</Link>
            :
          </p>
          <ul className="text-slate-300">
            <li>Prefer explicit selectors for critical values</li>
            <li>Add assertions at step boundaries</li>
            <li>Use retries or soft gates for non‑critical steps</li>
            <li>Keep tokens/credentials in CI secrets, not in YAML</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
          <div className="not-prose space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">Tests pass locally but fail in CI</h3>
              <p className="text-sm text-slate-300">Missing secrets or different base URL; rate limits; timeouts too low.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">CLI not found</h3>
              <p className="text-sm text-slate-300">Install step didn’t run due to cache logic; confirm PATH on runner.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">Workflow hangs</h3>
              <p className="text-sm text-slate-300">Add job <code>timeout-minutes</code>; add per‑request timeouts in flows.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">Secrets not loading</h3>
              <p className="text-sm text-slate-300">Confirm secrets exist and job has access. Fork PRs won’t get secrets.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">FAQ</h2>
          <div className="not-prose space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Does this show results in pull requests?</h3>
              <p className="text-sm text-slate-300">Yes. JUnit + a PR reporter surfaces pass/fail in PR checks.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Can I upload test artifacts even when tests fail?</h3>
              <p className="text-sm text-slate-300">Yes. Use <code>if: always()</code> on upload and reporting steps.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Should I run smoke tests separately?</h3>
              <p className="text-sm text-slate-300">Yes. Use a fast gate to catch failures early.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Should I run nightly regressions too?</h3>
              <p className="text-sm text-slate-300">Yes. Nightly runs catch drift independent of PR cadence.</p>
            </div>
          </div>

          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </section>

        <footer className="not-prose text-sm text-slate-400">
          <p>
            See also: <Link href="/docs/how-to/ci-integrations" className="text-neon hover:underline">CI/CD integrations</Link>,{' '}
            <Link href="/templates/github-actions" className="text-neon hover:underline">GitHub Actions template</Link>,{' '}
            <Link href="/guides/newman-alternative-ci" className="text-neon hover:underline">Newman alternative guide</Link>.
          </p>
        </footer>
      </article>
    </main>
  )
}

