import Link from 'next/link'

export const metadata = {
  title: 'Newman Alternative for CI: DevTools CLI (JUnit/JSON, Exit Codes)',
  description:
    'Run YAML API test flows in CI as a faster Newman alternative. Install DevTools CLI, run flows in parallel, output JUnit/JSON, and fail builds with proper exit codes.',
}

export default function GuideNewmanAlternativeCI() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is this a Newman replacement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. DevTools CLI runs YAML API test flows in CI with JUnit/JSON reports and proper exit codes. It replaces Newman with a faster, install-once runner and Git-native workflows.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I get JUnit output?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Add --report junit:results.xml when running devtools flow run. You can emit multiple reports at once, e.g., JUnit and JSON in the same run.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I pass secrets in CI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            "Set CI environment variables from your secret store (e.g., GitHub Secrets), then reference them in flows using #env:, e.g., API_KEY: '#env:SECRET_API_KEY' and BASE_URL: '#env:API_BASE_URL'.",
        },
      },
      {
        '@type': 'Question',
        name: 'What exit code fails the build?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Exit codes: 0 = success, 1 = test failures, 2 = CLI error. CI should fail on non-zero exit codes.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I output both JSON and JUnit?',
        acceptedAnswer: {
          '@type': 'Answer',
          text:
            'Yes. Use multiple --report flags, for example --report json:results.json --report junit:results.xml in the same run.',
        },
      },
    ],
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <article className="prose prose-invert prose-slate max-w-none">
        <header className="mb-10 not-prose">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Newman alternative for CI: DevTools CLI
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            DevTools CLI runs YAML API test flows in CI with parallel execution, multiple report formats (JUnit/JSON),
            and clean exit codes. It replaces Newman by removing npm dependencies, storing tests in Git, and giving
            you production-real test runs that are easy to wire into PRs.
          </p>
          {/* TODO: Micro-video: ci-pass.mp4 (GH Actions run → green check → results.xml artifact) */}
          {/* TODO: Micro-video: reports.mp4 (terminal showing two --report outputs then ls) */}
        </header>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Quickstart (local)</h2>
          <p className="text-slate-300">
            Install, verify, then run a flow with both JUnit and JSON reports. See the{' '}
            <Link href="/docs/reference/cli" className="text-neon hover:underline">CLI reference</Link> for all
            options.
          </p>
          <div className="mt-4 rounded-lg bg-slate-900/60 p-4 text-[13px] leading-relaxed text-slate-200 border border-white/10">
            <div>$ curl -fsSL https://sh.dev.tools/install.sh | bash</div>
            <div>$ devtools version</div>
            <div>
              $ devtools flow run tests.yaml --report json:results.json --report junit:results.xml
            </div>
          </div>

          {/* TODO: Screenshot → /public/media/newman-alternative-ci-install-verify.png
              Alt: Install DevTools CLI and verify version for Newman alternative CI
              Caption: Install and verify the CLI locally. */}
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">GitHub Actions (real pipeline)</h2>
          <p className="text-slate-300">
            Runs on push and pull_request, passes secrets via <code className="bg-slate-900/50 px-1 rounded">env</code>,
            and uploads artifacts even on failure. See templates for more variants:{' '}
            <Link href="/templates/github-actions" className="text-neon hover:underline">GitHub Actions</Link>{' '}
            and{' '}
            <Link href="/templates/gitlab-ci" className="text-neon hover:underline">GitLab CI</Link>.
          </p>

          <pre className="mt-4 bg-slate-900/60 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`name: API tests (DevTools)
on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  api-tests:
    runs-on: ubuntu-latest
    env:
      # Inject CI secrets into the process env
      API_BASE_URL: ${'${{ secrets.API_BASE_URL }}'}
      SECRET_API_KEY: ${'${{ secrets.SECRET_API_KEY }}'}
    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash

      - name: Run API tests (JUnit + JSON)
        run: devtools flow run tests.yaml --report junit:results.xml --report json:results.json

      - name: Upload JUnit results (always)
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: junit-results
          path: results.xml
          if-no-files-found: warn
          retention-days: 7

      - name: Upload JSON results (always)
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: json-results
          path: results.json
          if-no-files-found: warn
          retention-days: 7`}</code></pre>

          {/* TODO: Screenshot → /public/media/newman-alternative-ci-junit-artifact.png
              Alt: GitHub Actions uploading JUnit XML test results from DevTools CLI
              Caption: Upload JUnit XML so PRs show test summaries and history. */}

          {/* TODO: Micro‑video embed placeholder */}
          <div className="not-prose mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300 mb-2">Micro‑video: CI run passing + artifact</p>
            <video src="/media/ci-pass.mp4" className="w-full rounded-lg" muted loop playsInline controls />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Passing secrets and base URLs</h2>
          <p className="text-slate-300">
            Reference CI environment variables using <code className="bg-slate-900/50 px-1 rounded">#env:</code>.
            Keep secrets out of YAML. Full details in{' '}
            <Link href="/docs/how-to/environments-and-variables" className="text-neon hover:underline">environments &amp; variables</Link> and the{' '}
            <Link href="/docs/reference/cli" className="text-neon hover:underline">CLI reference</Link>.
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-900/60 p-4 text-[12px] leading-relaxed text-slate-200 border border-white/10">
              <div className="text-slate-400 mb-2"># tests.yaml (excerpt)</div>
              <code>{`name: Smoke tests
env:
  API_KEY: '#env:SECRET_API_KEY'
  BASE_URL: '#env:API_BASE_URL'

steps:
  - name: Login
    request:
      url: '{{BASE_URL}}/login'
      method: POST
      headers:
        Authorization: 'Bearer {{API_KEY}}'`}</code>
            </div>

            <div className="rounded-lg bg-slate-900/60 p-4 text-[12px] leading-relaxed text-slate-200 border border-white/10">
              <div className="text-slate-400 mb-2"># GitHub Actions env injection</div>
              <code>{`env:
  API_BASE_URL: ${'${{ secrets.API_BASE_URL }}'}
  SECRET_API_KEY: ${'${{ secrets.SECRET_API_KEY }}'}`}</code>
            </div>
          </div>

          {/* TODO: Screenshot → /public/media/newman-alternative-ci-yaml-envvars.png
              Alt: YAML API test flow using #env variables for CI secrets
              Caption: YAML pattern for secrets and base URLs. */}
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Reports + exit codes</h2>
          <ul className="text-slate-300">
            <li>
              <strong>JUnit</strong> for CI test reporting. Add{' '}
              <code className="bg-slate-900/50 px-1 rounded">--report junit:results.xml</code> and upload as an
              artifact.
            </li>
            <li>
              <strong>JSON</strong> for programmatic parsing or dashboards. Add{' '}
              <code className="bg-slate-900/50 px-1 rounded">--report json:results.json</code>.
            </li>
            <li>
              <strong>Multiple reports</strong> at once are supported. Use both flags in a single run.
            </li>
            <li>
              <strong>Exit codes</strong>: 0 = success, 1 = test failures, 2 = CLI error. CI should fail builds on
              non‑zero codes. See full list in the{' '}
              <Link href="/docs/reference/cli" className="text-neon hover:underline">CLI reference</Link>.
            </li>
          </ul>

          {/* TODO: Micro‑video embed placeholder */}
          <div className="not-prose mt-4 rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-300 mb-2">Micro‑video: Local run producing JSON + JUnit</p>
            <video src="/media/reports.mp4" className="w-full rounded-lg" muted loop playsInline controls />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Migration path (Newman users)</h2>
          <ul className="text-slate-300">
            <li>
              If you have Postman collections, migrate/rebuild them as DevTools YAML flows. See the{' '}
              <Link href="/guides/migrate-from-postman" className="text-neon hover:underline">migration guide</Link>.
            </li>
            <li>
              Keep flows in Git next to your code; review with PRs. See supporting pages{' '}
              <Link href="/postman-cli-alternative" className="text-neon hover:underline">Postman CLI alternative</Link>{' '}
              and{' '}
              <Link href="/postman-alternative" className="text-neon hover:underline">Postman alternative</Link>.
            </li>
            <li>
              Run in CI with DevTools CLI. Faster than Newman and no npm install required. Output JUnit/JSON and fail
              on proper exit codes.
            </li>
          </ul>
          <p className="mt-3 text-sm text-slate-400">
            Note: Newman is Node‑based and typically installed via npm, which adds dependency/setup overhead in CI.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Troubleshooting</h2>
          <div className="not-prose space-y-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">Flow file not found</h3>
              <p className="text-sm text-slate-300">Check the path (e.g., <code>tests.yaml</code>) and working directory in CI.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">Variable not resolved</h3>
              <p className="text-sm text-slate-300">
                Missing env var or typo. Define CI secrets and reference with <code>#env:</code> (example above).
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">Request timeout</h3>
              <p className="text-sm text-slate-300">Increase per‑request timeout in the flow or stabilize the upstream service.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white mb-1">Install permissions / custom install dir</h3>
              <p className="text-sm text-slate-300">
                Use the one‑liner installer; on restricted runners, set a custom bin path per the{' '}
                <Link href="/docs/reference/cli" className="text-neon hover:underline">CLI reference</Link>.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <div className="not-prose space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Is this a Newman replacement?</h3>
              <p className="text-sm text-slate-300">
                Yes. DevTools CLI replaces Newman in CI with YAML flows, multi‑format reports, and proper exit codes.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">How do I get JUnit output?</h3>
              <p className="text-sm text-slate-300">
                Add <code>--report junit:results.xml</code> to your run. Upload the file as an artifact in CI.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">How do I pass secrets in CI?</h3>
              <p className="text-sm text-slate-300">
                Map CI secrets to env vars (e.g., GitHub Secrets) and reference them in YAML with
                <code className="ml-1">#env:</code> (e.g., <code>API_KEY: '#env:SECRET_API_KEY'</code>).
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">What exit code fails the build?</h3>
              <p className="text-sm text-slate-300">Non‑zero. 1 indicates test failures; 2 indicates a CLI error.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Can I output both JSON and JUnit?</h3>
              <p className="text-sm text-slate-300">Yes—use multiple <code>--report</code> flags in one run.</p>
            </div>
          </div>

          {/* JSON‑LD (FAQPage) */}
          <script
            type="application/ld+json"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
        </section>

        <section className="not-prose mb-12 rounded-xl border border-neon/30 bg-neon/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to replace Newman?</h2>
          <p className="text-slate-300 mb-6">
            Install the CLI, commit your flows, and wire it into CI. See templates for more examples.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#58D7FF] px-7 py-3 text-base font-semibold text-slate-900 shadow-[0_22px_45px_-22px_rgba(88,215,255,0.55)] transition hover:bg-[#6fe0ff]"
            >
              Download DevTools
            </Link>
            <Link
              href="/docs/reference/cli"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#58D7FF]/60 bg-transparent px-6 py-3 text-base font-semibold text-[#58D7FF] transition hover:bg-[#58D7FF]/10 hover:text-white"
            >
              CLI reference
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            Also see templates: <Link href="/templates/github-actions" className="text-neon hover:underline">GitHub Actions</Link>{' '}
            and <Link href="/templates/gitlab-ci" className="text-neon hover:underline">GitLab CI</Link>.
          </p>
        </section>

        <footer className="not-prose text-sm text-slate-400">
          <p>
            Keep going: <Link href="/guides/migrate-from-postman" className="text-neon hover:underline">Migrate from Postman</Link>,{' '}
            <Link href="/postman-cli-alternative" className="text-neon hover:underline">Postman CLI alternative</Link>,{' '}
            <Link href="/postman-alternative" className="text-neon hover:underline">Postman alternative</Link>.
          </p>
        </footer>
      </article>
    </main>
  )
}
