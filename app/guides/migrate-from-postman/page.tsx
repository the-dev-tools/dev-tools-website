import Link from 'next/link'

export const metadata = {
  title: 'Migrate from Postman to DevTools – Complete Guide',
  description: 'Step-by-step guide to migrating from Postman to DevTools. Learn what to migrate vs rebuild, export collections, map variables, and run flows in CI.',
}

export default function MigrateFromPostmanPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <article className="prose prose-invert prose-slate max-w-none">
        <header className="mb-12 not-prose">
          <h1 className="text-4xl font-bold text-white sm:text-5xl">
            Migrate from Postman to DevTools
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Step-by-step guide to migrating from Postman to DevTools. Learn what to migrate vs rebuild, export collections, map variables, and run flows in CI.
          </p>
        </header>

        {/* TODO: Add hero screenshot showing Postman export → DevTools import */}

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Who This Is For</h2>
          <p className="text-slate-300">
            This guide is for teams currently using Postman for API testing who want to:
          </p>
          <ul className="text-slate-300">
            <li><strong>Move from scripts to flows</strong>: Replace JavaScript test scripts with declarative YAML assertions</li>
            <li><strong>Get CI-native testing</strong>: Run tests with proper exit codes, JUnit/JSON reports, and parallel execution</li>
            <li><strong>Source-control everything</strong>: Store flows as reviewable YAML files in Git instead of cloud-synced collections</li>
            <li><strong>Test from real traffic</strong>: Import HAR files from production/staging to build flows that match reality</li>
          </ul>
          <p className="text-slate-300">
            You don't need to abandon Postman entirely—many teams use DevTools for CI flows while keeping Postman for ad-hoc API exploration.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">What to Migrate vs What to Rebuild</h2>

          <div className="not-prose mb-6 rounded-xl border border-neon/30 bg-neon/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Migrate These</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Environment variables</strong>: Map Postman environments to DevTools <code className="text-neon">{`{{#env:VAR_NAME}}`}</code>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Base URLs</strong>: Convert <code className="text-slate-400">{`{{base_url}}`}</code> to <code className="text-neon">{`{{API_BASE}}`}</code> in environments
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Auth secrets</strong>: Move API keys/tokens to CI secrets, reference as <code className="text-neon">{`{{#env:API_KEY}}`}</code>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-neon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Simple request sequences</strong>: Export Postman collection, import into Studio as reference
                </div>
              </li>
            </ul>
          </div>

          <div className="not-prose mb-6 rounded-xl border border-amber-500/30 bg-amber-500/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Rebuild from HAR Instead</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Script-heavy collections</strong>: Pre-request scripts, test scripts, and pm.* logic don't translate—rebuild with DevTools assertions
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Anything that drifts from reality</strong>: If your Postman collection is outdated vs actual API behavior, record fresh HAR traffic instead
                </div>
              </li>
              <li className="flex items-start gap-2">
                <svg className="mt-1 h-5 w-5 flex-shrink-0 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <strong>Complex chained requests</strong>: Use HAR import to capture real auth flows, token refresh, and request dependencies
                </div>
              </li>
            </ul>
          </div>

          {/* TODO: Add diagram showing Postman collection export vs HAR import paths */}
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Checklist Before You Export Postman</h2>
          <p className="text-slate-300">
            Before exporting collections, prepare your data for CI:
          </p>

          <div className="not-prose space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">1. Identify secrets → move to CI env vars</h3>
              <p className="text-slate-300 text-sm mb-3">
                Scan your Postman environments for API keys, tokens, and passwords. These should never be in YAML files.
              </p>
              <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono text-slate-200">
                <div className="text-slate-400"># GitHub Actions example</div>
                <div>env:</div>
                <div className="ml-4">API_KEY: {'${{ secrets.API_KEY }}'}</div>
                <div className="ml-4">LOGIN_PASSWORD: {'${{ secrets.LOGIN_PASSWORD }}'}</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">2. Identify base URLs → map to API_BASE</h3>
              <p className="text-slate-300 text-sm mb-3">
                Consolidate base URLs into environment variables. DevTools supports <code className="text-neon">{`{{API_BASE}}`}</code> or any custom variable.
              </p>
              <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono text-slate-200">
                <div className="text-slate-400"># DevTools environment YAML</div>
                <div>environments:</div>
                <div className="ml-4">- name: production</div>
                <div className="ml-8">variables:</div>
                <div className="ml-12">api: https://api.production.com</div>
                <div className="ml-4">- name: staging</div>
                <div className="ml-8">variables:</div>
                <div className="ml-12">api: https://api.staging.com</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">3. Identify flaky steps → add assertions at flow level</h3>
              <p className="text-slate-300 text-sm">
                If certain requests timeout or fail intermittently in Postman, add explicit assertions in DevTools:
              </p>
              <ul className="mt-2 text-sm text-slate-300 space-y-1 list-disc list-inside">
                <li><code className="text-neon">response.status == 200</code></li>
                <li><code className="text-neon">response.body.token != null</code></li>
                <li><code className="text-neon">response.time {'<'} 5000</code> (for timeout detection)</li>
              </ul>
            </div>
          </div>

          {/* TODO: Add screenshot of Postman environment variables being mapped */}
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Step-by-Step Migration</h2>

          <div className="not-prose space-y-6">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Export Postman Collection</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    In Postman, click the "..." menu next to your collection → Export → Collection v2.1 (recommended) → Save as JSON.
                  </p>
                  {/* TODO: Add screenshot of Postman export dialog */}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Install DevTools Studio</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Download DevTools Studio for your OS:
                  </p>
                  <div className="rounded-lg bg-slate-900/60 p-4 text-xs">
                    <Link href="/download" className="text-neon hover:underline">
                      https://dev.tools/download
                    </Link>
                  </div>
                  {/* TODO: Add download page screenshot */}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Option A: Import Postman Collection (Reference)</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Use the exported JSON as a reference while building flows. Studio doesn't auto-convert Postman collections, but you can manually recreate requests.
                  </p>
                  <p className="text-slate-300 text-sm mb-3">
                    <strong>Better option:</strong> Record fresh HAR traffic from your app (see Option B).
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">4</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Option B: Record HAR from Real Traffic (Recommended)</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Instead of converting Postman collections, capture real API traffic:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
                    <li>Open Chrome DevTools (F12) → Network tab</li>
                    <li>Perform the API workflow in your app (login, create, fetch, delete)</li>
                    <li>Right-click network panel → Save all as HAR</li>
                    <li>Drag HAR file into DevTools Studio</li>
                  </ol>
                  <p className="mt-3 text-xs text-slate-400">
                    See detailed guide: <Link href="/guides/generate-har-chrome" className="text-neon hover:underline">Generate HAR in Chrome</Link>
                  </p>
                  {/* TODO: Add video/GIF of HAR recording */}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">5</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Map Variables in Studio</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    DevTools auto-detects tokens and IDs. Review the variable mappings and override if needed.
                  </p>
                  <p className="text-slate-300 text-sm">
                    Example: Map <code className="text-neon">Login.response.body.token</code> to subsequent request headers.
                  </p>
                  {/* TODO: Add screenshot of variable mapping panel */}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">6</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Add Assertions</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Convert Postman test scripts to DevTools assertions:
                  </p>
                  <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono space-y-2">
                    <div className="text-slate-400"># Postman script</div>
                    <div className="text-slate-300">pm.test("Status is 200", () =&gt; pm.response.to.have.status(200));</div>
                    <div className="mt-3 text-slate-400"># DevTools assertion</div>
                    <div className="text-neon">assertions:</div>
                    <div className="text-neon ml-4">- response.status == 200</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">7</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Export YAML</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Export the flow to YAML for version control and CI:
                  </p>
                  <p className="text-slate-300 text-sm">
                    Studio → Export → Save as <code className="text-neon">tests.yaml</code>
                  </p>
                  {/* TODO: Add screenshot of export dialog */}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">8</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Install DevTools CLI</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Install the CLI runner for CI:
                  </p>
                  <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono text-slate-200">
                    curl -fsSL https://sh.dev.tools/install.sh | bash
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">9</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">Run Locally First</h3>
                  <p className="text-slate-300 text-sm mb-3">
                    Test the flow locally before adding to CI:
                  </p>
                  <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono text-slate-200">
                    devtools flow run tests.yaml
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Should exit with code 0 (pass) or 1 (fail)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">CI Examples</h2>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">GitHub Actions</h3>
          <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono text-slate-200 overflow-x-auto">
              <pre>{`name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash

      - name: Run API flows
        env:
          API_KEY: \${{ secrets.API_KEY }}
          LOGIN_EMAIL: \${{ secrets.LOGIN_EMAIL }}
          LOGIN_PASSWORD: \${{ secrets.LOGIN_PASSWORD }}
        run: |
          devtools flow run --report junit:test-results.xml tests.yaml

      - name: Publish test results
        if: always()
        uses: EnricoMi/publish-unit-test-result-action@v2
        with:
          files: test-results.xml`}</pre>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Full template: <Link href="/templates/github-actions" className="text-neon hover:underline">GitHub Actions Template</Link>
            </p>
          </div>

          <h3 className="text-2xl font-semibold text-white mt-8 mb-4">GitLab CI</h3>
          <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono text-slate-200 overflow-x-auto">
              <pre>{`api-tests:
  image: ubuntu:latest
  before_script:
    - curl -fsSL https://sh.dev.tools/install.sh | bash
  script:
    - devtools flow run --report junit:test-results.xml tests.yaml
  artifacts:
    reports:
      junit: test-results.xml
  variables:
    API_KEY: $API_KEY
    LOGIN_EMAIL: $LOGIN_EMAIL
    LOGIN_PASSWORD: $LOGIN_PASSWORD`}</pre>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Full template: <Link href="/templates/gitlab-ci" className="text-neon hover:underline">GitLab CI Template</Link>
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Common Problems</h2>

          <div className="not-prose space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                My Postman collection has pre-request scripts. How do I convert them?
              </summary>
              <div className="mt-3 text-sm text-slate-300 space-y-2">
                <p>
                  DevTools doesn't support JavaScript scripts. Instead:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>For variable setting: Use DevTools variable mapping (e.g., <code className="text-neon">{`{{Login.response.body.token}}`}</code>)</li>
                  <li>For auth flows: Capture the real flow in a HAR file and let DevTools auto-map the tokens</li>
                  <li>For complex logic: Move it to your application code or use environment variables</li>
                </ul>
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Variables aren't being replaced in my requests
              </summary>
              <div className="mt-3 text-sm text-slate-300 space-y-2">
                <p>
                  Check these common issues:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Syntax: DevTools uses <code className="text-neon">{`{{varname}}`}</code> not <code className="text-slate-400">{`{{varname}}`}</code></li>
                  <li>Environment secrets: Use <code className="text-neon">{`{{#env:SECRET}}`}</code> for CI variables</li>
                  <li>Response references: Use <code className="text-neon">{`{{StepName.response.body.field}}`}</code></li>
                  <li>Environment not selected: Make sure you're running with the correct environment</li>
                </ul>
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Tests pass in Postman but fail in DevTools CLI
              </summary>
              <div className="mt-3 text-sm text-slate-300 space-y-2">
                <p>
                  Common causes:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Missing environment variables: Make sure all secrets are in CI env vars</li>
                  <li>Parallel execution: DevTools runs flows in parallel by default. Use <code className="text-neon">--sequential</code> if order matters</li>
                  <li>Timing issues: Add explicit waits or retry logic for flaky endpoints</li>
                  <li>Base URL mismatch: Verify <code className="text-neon">{`{{api}}`}</code> points to the right environment</li>
                </ul>
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                How do I handle dynamic data (timestamps, random IDs)?
              </summary>
              <div className="mt-3 text-sm text-slate-300 space-y-2">
                <p>
                  Use assertions that check types instead of exact values:
                </p>
                <div className="rounded-lg bg-slate-900/60 p-4 text-xs font-mono text-slate-200">
                  <div className="text-slate-400"># Instead of exact match</div>
                  <div className="line-through text-slate-500">response.body.id == "12345"</div>
                  <div className="mt-2 text-slate-400"># Check existence/type</div>
                  <div className="text-neon">response.body.id != null</div>
                  <div className="text-neon">response.body.createdAt != null</div>
                </div>
              </div>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-5">
              <summary className="cursor-pointer text-lg font-semibold text-white">
                Can I import Newman test results for comparison?
              </summary>
              <div className="mt-3 text-sm text-slate-300 space-y-2">
                <p>
                  Both Newman and DevTools CLI support JUnit/JSON output. You can:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Run both in parallel initially to compare results</li>
                  <li>Use the same CI test result parsers (JUnit XML)</li>
                  <li>Gradually migrate flows one at a time while keeping Newman for the rest</li>
                </ul>
              </div>
            </details>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>

          <div className="not-prose space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Do I need to stop using Postman entirely?</h3>
              <p className="text-sm text-slate-300">
                No. Many teams use Postman for ad-hoc API exploration and DevTools for CI testing. You can run both in parallel during migration.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Can DevTools import Postman collections directly?</h3>
              <p className="text-sm text-slate-300">
                Not automatically. We recommend recording fresh HAR traffic instead, which ensures your flows match current API behavior. Postman collections often drift from reality over time.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">What happens to my Postman test scripts?</h3>
              <p className="text-sm text-slate-300">
                DevTools uses declarative assertions (<code className="text-neon">response.status == 200</code>) instead of JavaScript. Most Postman scripts can be converted to assertions or variable mappings.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">How long does migration take?</h3>
              <p className="text-sm text-slate-300">
                For simple collections (5-10 requests), expect 30-60 minutes. For complex collections with scripts and environments, allow 2-4 hours. Recording fresh HAR traffic is often faster than converting old collections.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Does DevTools support Postman monitors?</h3>
              <p className="text-sm text-slate-300">
                DevTools doesn't have built-in scheduling. Instead, use CI cron jobs (GitHub Actions scheduled workflows, GitLab CI schedules) to run flows on a schedule.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">Can I share flows with my team like Postman workspaces?</h3>
              <p className="text-sm text-slate-300">
                Yes, but differently. DevTools flows are YAML files in Git. Share them via pull requests, code review, and version control—the same way you share application code.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white mb-2">What about Postman mock servers?</h3>
              <p className="text-sm text-slate-300">
                DevTools focuses on testing real APIs, not mocking. If you need mocks, keep using Postman mock servers or use tools like WireMock/MSW alongside DevTools.
              </p>
            </div>
          </div>
        </section>

        <section className="not-prose mb-12 rounded-xl border border-neon/30 bg-neon/5 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to migrate?</h2>
          <p className="text-slate-300 mb-6">
            Download DevTools Studio and start building flows from real traffic.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/download"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#58D7FF] px-7 py-3 text-base font-semibold text-slate-900 shadow-[0_22px_45px_-22px_rgba(88,215,255,0.55)] transition hover:bg-[#6fe0ff]"
            >
              Download Studio
            </Link>
            <Link
              href="/cli"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#58D7FF]/60 bg-transparent px-6 py-3 text-base font-semibold text-[#58D7FF] transition hover:bg-[#58D7FF]/10 hover:text-white"
            >
              Install CLI
            </Link>
          </div>
        </section>

        <footer className="not-prose text-sm text-slate-400">
          <p>
            Need help? Check the <Link href="/docs" className="text-neon hover:underline">docs</Link> or see more <Link href="/guides" className="text-neon hover:underline">guides</Link>.
          </p>
        </footer>
      </article>
    </main>
  )
}
