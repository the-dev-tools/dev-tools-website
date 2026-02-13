import Link from 'next/link'
import type { Metadata } from 'next'
import StickyTOC from '@/components/ui/StickyTOC'

export const metadata: Metadata = {
  title: 'API Testing in CI/CD: From Manual Clicks to Automated Pipelines',
  description:
    'Move API testing from GUI tools into CI/CD pipelines. Learn how to structure test suites, configure GitHub Actions, handle secrets, parallelize runs, and report failures.',
  alternates: { canonical: '/guides/api-testing-ci-cd/' },
  openGraph: {
    title: 'API Testing in CI/CD: From Manual Clicks to Automated Pipelines',
    description:
      'Move API testing from GUI tools into CI/CD pipelines. Learn how to structure test suites, configure GitHub Actions, handle secrets, parallelize runs, and report failures.',
    url: 'https://dev.tools/guides/api-testing-ci-cd/',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Testing in CI/CD: From Manual Clicks to Automated Pipelines',
    description:
      'Move API testing from GUI tools into CI/CD pipelines. Learn how to structure test suites, configure GitHub Actions, handle secrets, parallelize runs, and report failures.',
  },
}

const tocItems = [
  { id: 'why-pipeline-native', label: 'Why pipeline-native testing' },
  { id: 'click-vs-pipeline', label: 'Click-based vs pipeline-native' },
  { id: 'structuring-suites', label: 'Structuring test suites' },
  { id: 'pipeline-config', label: 'Pipeline configuration' },
  { id: 'secrets-and-reporting', label: 'Secrets and reporting' },
  { id: 'faq', label: 'FAQ' },
]

const clusterPosts = [
  {
    href: '/blog/github-actions-for-yaml-api-tests-parallel-runs-caching-copy-paste-workflow/',
    title: 'GitHub Actions for YAML API Tests: Parallel Runs + Caching',
    summary:
      'Copy-paste workflow with matrix sharding, CLI caching, cancel-in-progress, and JUnit artifact uploads.',
  },
  {
    href: '/blog/api-testing-in-github-actions-secrets-auth-retries-rate-limits/',
    title: 'API Testing in GitHub Actions: Secrets, Auth, Retries, Rate Limits',
    summary:
      'Practical patterns for injecting secrets, handling auth, controlling retries, and respecting rate limits in CI.',
  },
  {
    href: '/blog/junit-reports-for-api-tests-make-github-actions-show-failures-cleanly/',
    title: 'JUnit Reports for API Tests: Make GitHub Actions Show Failures Cleanly',
    summary:
      'Structure JUnit output so GitHub renders actionable failures with stable step names and PR annotations.',
  },
  {
    href: '/blog/github-flow-explained-for-api-testing-teams/',
    title: 'GitHub Flow Explained for API Testing Teams',
    summary:
      'Branching, PR checks, CI, and reviewable YAML workflows for API testing teams using GitHub Flow.',
  },
]

const faqData = [
  {
    question: 'Can I run Postman collections in CI without changing anything?',
    answer:
      'You can run Postman collections via Newman in CI, but you inherit the problems: collection JSON produces noisy diffs, test logic is embedded in scripts, and parallelization requires manual slicing. It works for existing suites, but new tests benefit from a pipeline-native format like YAML that is reviewable and shardable by default.',
  },
  {
    question: 'What CI platforms support YAML-based API testing?',
    answer:
      'Any CI platform that can run a CLI command supports YAML API tests. GitHub Actions, GitLab CI, Jenkins, CircleCI, Azure Pipelines, and Buildkite all work. The test runner is a CLI binary — the YAML files are the test definitions, and the CI platform provides the execution environment and secret injection.',
  },
  {
    question: 'How do I handle flaky API tests in CI?',
    answer:
      'First, classify the flakiness: transient network issues (retry with backoff), eventual consistency (poll with timeout), or non-deterministic test data (fix the data). Retry only idempotent requests. Never retry write operations blindly. Use JUnit failure types to separate real failures from infrastructure noise.',
  },
  {
    question: 'Should API tests run on every PR or only on merge?',
    answer:
      'Run smoke tests and critical auth flows on every PR for fast feedback. Run the full regression suite after merge to main or on a schedule. This balances CI cost with coverage. The PR check catches breaking changes early; the post-merge run catches edge cases.',
  },
  {
    question: 'How do I migrate from Postman to pipeline-native testing incrementally?',
    answer:
      'Start by writing new tests as YAML flows and running them alongside your existing Newman suite. Migrate critical flows first: auth, core CRUD, and smoke tests. Keep both suites running until the YAML coverage matches. The DevTools migration guide covers tactical steps for converting collections to YAML.',
  },
]

function jsonLd() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'API Testing in CI/CD: From Manual Clicks to Automated Pipelines',
    description:
      'Move API testing from GUI tools into CI/CD pipelines. Learn how to structure test suites, configure GitHub Actions, handle secrets, parallelize runs, and report failures.',
    author: { '@type': 'Organization', name: 'DevTools Team' },
    publisher: { '@type': 'Organization', name: 'DevTools' },
    datePublished: '2026-02-14',
    dateModified: '2026-02-14',
  }

  return [faqSchema, articleSchema]
}

export default function ApiTestingCiCdPage() {
  const schemas = jsonLd()

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
          {/* Main content */}
          <article className="min-w-0 prose prose-invert prose-slate max-w-none">
            {/* Header */}
            <div className="not-prose mb-12">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-neon transition mb-6"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Guides
              </Link>
              <h1 className="text-4xl font-bold text-white sm:text-5xl mb-4">
                API Testing in CI/CD: From Manual Clicks to Automated Pipelines
              </h1>
              <p className="text-lg text-slate-300 max-w-3xl">
                API tests that only run when someone clicks &quot;Send&quot; in a GUI are not CI. Pipeline-native
                API testing means your tests are code: stored in Git, triggered by commits, executed by runners,
                and reported as structured results. This guide covers the shift from manual tools to automated
                pipelines.
              </p>
            </div>
            {/* TODO: Add hero screenshot showing a GitHub Actions run with parallel API test shards and JUnit results */}

            {/* Intro */}
            <p className="text-slate-300 leading-relaxed">
              Most teams start API testing with a GUI tool. Postman, Insomnia, or a browser extension. You
              build requests, click Send, eyeball the response, maybe write a test script. It works for
              exploration. It does not work for regression, because nobody clicks Send on 200 requests before
              every deploy.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The shift to CI/CD for API testing is not about switching tools. It is about changing where tests
              live (Git, not a cloud workspace), how they run (automated, not manual), and how failures surface
              (structured reports, not &quot;I think it was working yesterday&quot;).
            </p>
            <p className="text-slate-300 leading-relaxed">
              This guide covers the full picture: why pipeline-native testing matters, how to structure suites
              for CI, pipeline configurations with parallelization and caching, secrets and auth handling,
              reporting patterns, and the common pitfalls that make teams give up on CI testing and go back to
              clicking.
            </p>

            {/* Cluster post cards */}
            <div className="not-prose my-10 grid gap-4 sm:grid-cols-2">
              {clusterPosts.map((post) => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10"
                >
                  <h3 className="text-sm font-semibold text-white mb-1">{post.title}</h3>
                  <p className="text-xs text-slate-400">{post.summary}</p>
                </Link>
              ))}
            </div>

            {/* Section 1 */}
            <h2 id="why-pipeline-native" className="text-3xl font-semibold text-white mb-4 mt-12">
              Why API testing belongs in pipelines, not GUIs
            </h2>
            <p className="text-slate-300 leading-relaxed">
              A GUI-based API testing workflow has a specific failure mode: the test exists, but nobody runs it.
              The collection sits in Postman, the team lead runs it before releases, and it catches bugs after
              they have already been merged. That is not testing. That is auditing.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Pipeline-native testing inverts this. Tests run on every commit, every PR, every merge. Failures
              block the merge. The question changes from &quot;did someone remember to test?&quot; to &quot;did
              the test pass?&quot;
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">What pipeline-native actually means</h3>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Tests are files in Git</strong>, not state in a cloud workspace. They get the same
                review, branching, and versioning as application code.
              </li>
              <li>
                <strong>Execution is automated</strong>. A CI runner triggers tests on push, PR, merge, or
                schedule. No human clicks &quot;Run.&quot;
              </li>
              <li>
                <strong>Results are structured</strong>. JUnit XML, JSON reports, exit codes. Not a green
                checkmark in a GUI that nobody else can see.
              </li>
              <li>
                <strong>Failures block merges</strong>. Required checks mean a broken API test prevents the
                deploy, not just generates a notification.
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              This is not theoretical. Teams that move API tests into CI consistently report fewer
              production incidents from contract breakage, faster PR cycles, and less &quot;works on my
              machine&quot; debugging.
            </p>

            {/* Section 2 */}
            <h2 id="click-vs-pipeline" className="text-3xl font-semibold text-white mb-4 mt-12">
              Click-based vs pipeline-native testing
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The comparison is not &quot;Postman bad, CI good.&quot; Postman is excellent for exploration and
              ad-hoc debugging. The problem is when exploration tools become the only testing tool, and tests
              that should run automatically only run when someone remembers to open the app.
            </p>

            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Dimension</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Click-based (Postman, Insomnia)</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Pipeline-native (YAML + CI)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Test storage</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Cloud workspace or exported JSON</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Git repository, reviewed in PRs</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Execution trigger</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Manual click or scheduled Collection Runner</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Git push, PR, merge, cron</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>PR reviewability</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Collection JSON diffs are noisy</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">YAML diffs show exactly what changed</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Parallelization</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Manual folder slicing in Newman</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">File-based sharding in CI matrix</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Secret management</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Postman vault or env exports</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">CI platform secrets (GitHub Secrets, etc.)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Failure reporting</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Collection Runner UI or Newman console</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">JUnit reports, PR annotations, artifacts</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Cost at scale</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Per-seat pricing for team features</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">CI minutes (shared with all other CI)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-slate-300 leading-relaxed">
              The critical difference is not features. It is the default behavior. In a click-based workflow,
              the default is &quot;test does not run.&quot; In a pipeline, the default is &quot;test runs on
              every change.&quot; That inversion is what makes CI testing reliable.
            </p>

            {/* TODO: Add screenshot comparing a Postman Collection Runner view with a GitHub Actions parallel matrix run */}

            {/* Section 3 */}
            <h2 id="structuring-suites" className="text-3xl font-semibold text-white mb-4 mt-12">
              Structuring test suites for CI
            </h2>
            <p className="text-slate-300 leading-relaxed">
              A CI test suite needs structure that supports two things: fast PR feedback and thorough
              post-merge coverage. The common mistake is treating the suite as a monolith, either you run
              everything or nothing.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Smoke vs regression separation</h3>
            <p className="text-slate-300 leading-relaxed">
              Split your suite into at least two tiers:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Smoke</strong>: 5-15 flows that cover auth, core CRUD, and critical business paths.
                Runs on every PR. Target: under 2 minutes.
              </li>
              <li>
                <strong>Regression</strong>: full suite covering edge cases, error handling, pagination,
                rate limits. Runs after merge or on a schedule. Can take 5-15 minutes with parallelization.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Repository layout</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`tests/
  smoke/
    auth-flow.yaml
    create-order.yaml
    health-check.yaml
  regression/
    crud-lifecycle.yaml
    pagination-cursors.yaml
    error-handling.yaml
    rate-limit-behavior.yaml
    webhook-delivery.yaml
  env/
    staging.env.template
    production.env.template
.github/
  workflows/
    api-tests.yaml`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Keeping flows independent</h3>
            <p className="text-slate-300 leading-relaxed">
              Each YAML flow file should be self-contained: it handles its own auth, creates its own test
              data, and cleans up after itself. This is what makes file-based sharding work. If flow A depends
              on flow B having run first, you cannot parallelize them.
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Each flow is self-contained: auth → action → verify → cleanup
workspace_name: Order Lifecycle

env:
  BASE_URL: '{{BASE_URL}}'

flows:
  - name: OrderCRUD
    steps:
      - request:
          name: Login
          method: POST
          url: '{{BASE_URL}}/auth/login'
          headers:
            Content-Type: application/json
          body:
            email: '{{#env:TEST_EMAIL}}'
            password: '{{#env:TEST_PASSWORD}}'

      - request:
          name: CreateOrder
          method: POST
          url: '{{BASE_URL}}/api/orders'
          headers:
            Authorization: 'Bearer {{Login.response.body.access_token}}'
            Content-Type: application/json
          body:
            items:
              - sku: 'TEST-001'
                qty: 1
          depends_on: Login

      - js:
          name: ValidateCreate
          code: |
            export default function(ctx) {
              if (ctx.CreateOrder?.response?.status !== 201) throw new Error("Expected 201");
              if (!ctx.CreateOrder?.response?.body?.id) throw new Error("Missing order ID");
              return { orderId: ctx.CreateOrder.response.body.id };
            }
          depends_on: CreateOrder

      - request:
          name: GetOrder
          method: GET
          url: '{{BASE_URL}}/api/orders/{{ValidateCreate.orderId}}'
          headers:
            Authorization: 'Bearer {{Login.response.body.access_token}}'
          depends_on: ValidateCreate

      - request:
          name: DeleteOrder
          method: DELETE
          url: '{{BASE_URL}}/api/orders/{{ValidateCreate.orderId}}'
          headers:
            Authorization: 'Bearer {{Login.response.body.access_token}}'
          depends_on: GetOrder`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              This pattern, login, act, verify, cleanup, keeps each flow independent. Sharding assigns flows
              to matrix jobs by file, so parallel runners never collide.
            </p>

            {/* Section 4 */}
            <h2 id="pipeline-config" className="text-3xl font-semibold text-white mb-4 mt-12">
              Pipeline configuration: GitHub Actions
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The most common CI platform for API testing is GitHub Actions. The patterns below apply to any
              CI system (GitLab CI, Jenkins, CircleCI), but the YAML examples target GitHub Actions because
              that is where most YAML API test suites run today.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Minimal workflow: run on every PR</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`name: API Tests
on:
  pull_request:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: api-tests-\${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

jobs:
  smoke:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://dev.tools/install.sh | sh

      - name: Run smoke tests
        run: devtools flow run tests/smoke/*.yaml --report junit
        env:
          BASE_URL: \${{ vars.STAGING_URL }}
          TEST_EMAIL: \${{ secrets.TEST_EMAIL }}
          TEST_PASSWORD: \${{ secrets.TEST_PASSWORD }}

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: smoke-results
          path: reports/`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Parallel matrix: shard regression tests</h3>
            <p className="text-slate-300 leading-relaxed">
              When your regression suite grows past 2 minutes, shard it across parallel runners. The
              matrix strategy distributes YAML flow files across jobs by index modulo:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`jobs:
  regression:
    name: regression-\${{ matrix.shard }}
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        include:
          - shard: 1
            shard_total: 3
          - shard: 2
            shard_total: 3
          - shard: 3
            shard_total: 3

    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://dev.tools/install.sh | sh

      - name: Select flows for this shard
        id: shard
        run: |
          mapfile -t ALL < <(ls tests/regression/*.yaml | sort)
          SELECTED=()
          for i in "\$\{!ALL[@]}"; do
            if [ $(((i + 1 - \${{ matrix.shard }}) % \${{ matrix.shard_total }})) -eq 0 ]; then
              SELECTED+=("\$\{ALL[$i]}")
            fi
          done
          printf "%s\\n" "\$\{SELECTED[@]}" > .shard-flows.txt

      - name: Run regression shard
        run: |
          while IFS= read -r flow; do
            devtools flow run "$flow" --report junit
          done < .shard-flows.txt
        env:
          BASE_URL: \${{ vars.STAGING_URL }}
          TEST_EMAIL: \${{ secrets.TEST_EMAIL }}
          TEST_PASSWORD: \${{ secrets.TEST_PASSWORD }}

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: regression-\${{ matrix.shard }}
          path: reports/`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              Three shards typically cut a 6-minute suite to 2 minutes. The <code>fail-fast: false</code>{' '}
              setting ensures all shards complete even if one fails, so you get the full failure picture.
            </p>

            {/* TODO: Add screenshot showing a GitHub Actions matrix run with 3 parallel regression shards */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Caching the CLI install</h3>
            <p className="text-slate-300 leading-relaxed">
              Every matrix job downloads the CLI binary. Cache it to save 10-30 seconds per job:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`- name: Cache DevTools CLI
  id: cache-cli
  uses: actions/cache@v4
  with:
    path: ~/.local/bin/devtools
    key: devtools-cli-\${{ runner.os }}-v0.1.0

- name: Install DevTools CLI
  if: steps.cache-cli.outputs.cache-hit != 'true'
  run: curl -fsSL https://dev.tools/install.sh | sh`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              For deeper CI determinism, pin your GitHub Actions versions and runner images. See:{' '}
              <Link href="/blog/pinning-github-actions-tool-versions-stop-ci-breakage-devtools-included/" className="text-neon hover:underline">
                Pinning GitHub Actions + Tool Versions
              </Link>.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Concurrency: cancel redundant runs</h3>
            <p className="text-slate-300 leading-relaxed">
              When someone pushes to a PR branch while a test run is in progress, the old run wastes CI
              minutes. The <code>concurrency</code> block cancels it:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`concurrency:
  group: api-tests-\${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              This is especially important with parallel shards. Canceling 4 redundant jobs early saves more
              time than any cache.
            </p>

            {/* Section 5 */}
            <h2 id="secrets-and-reporting" className="text-3xl font-semibold text-white mb-4 mt-12">
              Secrets, auth, and failure reporting
            </h2>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Secrets management in CI</h3>
            <p className="text-slate-300 leading-relaxed">
              API tests need credentials: API keys, test user passwords, OAuth client secrets. The rules are
              simple but frequently violated:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Never commit secrets</strong> to YAML files, env files, or test data
              </li>
              <li>
                <strong>Inject at runtime</strong> via CI platform secrets (GitHub Secrets, GitLab CI variables)
              </li>
              <li>
                <strong>Scope narrowly</strong>: give each environment its own secret set, use least-privilege tokens
              </li>
              <li>
                <strong>Avoid printing</strong>: do not log request headers or response bodies that contain tokens
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              In YAML flows, use environment references to inject secrets at runtime:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# YAML flow — secrets stay out of the file
env:
  BASE_URL: '{{BASE_URL}}'

flows:
  - name: AuthTest
    variables:
      - name: api_key
        value: '{{#env:SECRET_API_KEY}}'
    steps:
      - request:
          name: Login
          method: POST
          url: '{{BASE_URL}}/auth/login'
          headers:
            Content-Type: application/json
          body:
            email: '{{#env:TEST_EMAIL}}'
            password: '{{#env:TEST_PASSWORD}}'`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              The <code>{'{{#env:}}'}</code> syntax reads from OS environment variables at runtime. In GitHub Actions,
              those come from <code>{'${{ secrets.* }}'}</code>.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Auth patterns for CI</h3>
            <p className="text-slate-300 leading-relaxed">
              Three auth patterns cover most CI scenarios:
            </p>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Pattern</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">How it works</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Static API key</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Inject via CI secret, pass as header</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Internal APIs, service-to-service</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Login in flow</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">First step authenticates, token chains to subsequent requests</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">OAuth password flow, session tokens</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>OIDC federation</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">CI mints a short-lived token via cloud IAM</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">AWS/GCP/Azure APIs behind IAM</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300 leading-relaxed">
              For detailed auth patterns including OIDC setup and rate limit handling, see:{' '}
              <Link href="/blog/api-testing-in-github-actions-secrets-auth-retries-rate-limits/" className="text-neon hover:underline">
                API Testing in GitHub Actions: Secrets, Auth, Retries, Rate Limits
              </Link>.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Retries: explicit, scoped, safe</h3>
            <p className="text-slate-300 leading-relaxed">
              Retries are an engineering tool, not a sign of weakness. But blind retries are dangerous:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Retry transient failures</strong>: connection resets, DNS hiccups, 502 gateway errors.
                Use backoff.
              </li>
              <li>
                <strong>Poll for eventual consistency</strong>: read-after-write lag, async processing. Use a
                timeout, not infinite retries.
              </li>
              <li>
                <strong>Never retry non-idempotent writes</strong>: POST to create a resource, charge a payment.
                You will create duplicates.
              </li>
              <li>
                <strong>Never retry assertion failures</strong>: a 400 validation error is a real bug, not a
                transient issue.
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">JUnit reporting in CI</h3>
            <p className="text-slate-300 leading-relaxed">
              JUnit XML is the universal format for CI test results. It gives you structured failures that
              GitHub Actions (and every other CI platform) can render as PR annotations, check run summaries,
              and downloadable artifacts.
            </p>
            <p className="text-slate-300 leading-relaxed">
              The key to useful JUnit output is stable test names. When your YAML flow steps have explicit{' '}
              <code>name:</code> values, the JUnit testcase names match what reviewers see in Git. A failure
              in &quot;Login&quot; or &quot;CreateOrder&quot; is immediately actionable. A failure in
              &quot;Iteration 1 / Request 3&quot; is not.
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`<!-- JUnit output with stable step names -->
<testsuite name="tests/smoke/auth-flow.yaml" tests="4" failures="1">
  <testcase classname="AuthFlow" name="Login" time="0.412" />
  <testcase classname="AuthFlow" name="GetProfile" time="0.234">
    <failure type="assertion" message="Expected 200, got 401">
Request: GET /api/me
Hint: check TEST_PASSWORD secret in CI
    </failure>
  </testcase>
  <testcase classname="AuthFlow" name="UpdateProfile" time="0.0">
    <error type="skipped" message="Skipped: depends on GetProfile" />
  </testcase>
  <testcase classname="AuthFlow" name="Cleanup" time="0.0">
    <error type="skipped" message="Skipped: depends on GetProfile" />
  </testcase>
</testsuite>`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              For the full JUnit reporting workflow including PR annotations and artifact management, see:{' '}
              <Link href="/blog/junit-reports-for-api-tests-make-github-actions-show-failures-cleanly/" className="text-neon hover:underline">
                JUnit Reports for API Tests: Make GitHub Actions Show Failures Cleanly
              </Link>.
            </p>

            {/* TODO: Add screenshot showing JUnit test results rendered as PR annotations in GitHub */}

            {/* Common Pitfalls */}
            <h2 className="text-3xl font-semibold text-white mb-4 mt-12">
              Common pitfalls
            </h2>
            <p className="text-slate-300 leading-relaxed">
              These are the patterns that make teams abandon CI testing and go back to manual clicking:
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Running everything on every PR</h3>
            <p className="text-slate-300 leading-relaxed">
              A 15-minute regression suite on every PR creates developer resentment. Split into smoke (fast,
              every PR) and regression (thorough, post-merge or scheduled). The PR check should take under
              2 minutes.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Shared mutable state between flows</h3>
            <p className="text-slate-300 leading-relaxed">
              If flow A creates a test user that flow B depends on, parallelization breaks. Each flow should
              create its own test data. Use unique identifiers (include the shard index or a UUID in resource
              names) so parallel runners never collide.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Ignoring flaky tests</h3>
            <p className="text-slate-300 leading-relaxed">
              A flaky required check trains developers to re-run CI until it passes. That is worse than no CI
              because it teaches everyone to ignore failures. Fix flakiness immediately: stabilize test data,
              add appropriate waits for eventual consistency, and classify transient vs real failures in your
              JUnit output.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Secrets in committed files</h3>
            <p className="text-slate-300 leading-relaxed">
              Once a secret is committed to Git, it is in the history forever (or until you force-push and
              rotate). Use <code>#env:</code> references in YAML and inject from CI secrets. Commit
              environment templates with placeholder values, not real credentials.
            </p>

            {/* FAQ */}
            <h2 id="faq" className="text-3xl font-semibold text-white mb-4 mt-12">
              FAQ
            </h2>
            <div className="not-prose space-y-6">
              {faqData.map((faq, i) => (
                <div key={i} className="border-b border-white/10 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Closing CTA */}
            <h2 className="text-3xl font-semibold text-white mb-4 mt-12">
              Move API tests into your pipeline
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The gap between &quot;we have API tests&quot; and &quot;our API tests run on every commit&quot;
              is the gap between knowing about bugs and preventing them. Pipeline-native testing closes that
              gap: tests stored in Git, executed by CI, reported as structured results, blocking merges when
              they fail.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Start with your most critical flow: auth + one core action + verification. Put it in a YAML
              file, wire it into GitHub Actions, and make it a required check. That single flow running on
              every PR catches more regressions than a 500-request Postman collection that nobody remembers
              to run.
            </p>
            <p className="text-slate-300 leading-relaxed">
              DevTools is built for this workflow: build flows visually or from HAR traffic, export to YAML,
              run in CI with JUnit output.{' '}
              <Link href="https://dev.tools" className="text-neon hover:underline">
                Try it at dev.tools
              </Link>
              .
            </p>
          </article>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <aside className="space-y-6 sticky top-8">
              <StickyTOC items={tocItems} />

              {/* Primary CTA */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <span className="inline-block px-2 py-1 text-xs font-medium rounded mb-3 bg-slate-700 text-slate-300">
                  Pipeline-native testing
                </span>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Run YAML API tests in CI
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Wire DevTools YAML flows into GitHub Actions with parallel shards, caching, JUnit reports,
                  and required PR checks.
                </p>
                <div className="space-y-3">
                  <Link
                    href="https://dev.tools/docs/how-to/ci-integrations/"
                    className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                  >
                    Set Up CI
                  </Link>
                  <Link
                    href="https://dev.tools/docs/start-here/install/"
                    className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                  >
                    Install DevTools
                  </Link>
                </div>
              </div>

              {/* Secondary CTA */}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Replace Newman with YAML flows
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Faster CI runs, reviewable diffs, and file-based parallelization. No collection exports
                  required.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/guides/newman-alternative-ci"
                    className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                  >
                    Newman Alternative Guide
                  </Link>
                  <Link
                    href="/guides/migrate-from-postman"
                    className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                  >
                    Migrate from Postman
                  </Link>
                </div>
              </div>

              {/* Templates CTA */}
              <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Copy-paste CI workflow
                </h4>
                <p className="text-xs text-slate-300 mb-3">
                  GitHub Actions template with matrix sharding, caching, and JUnit artifacts.
                </p>
                <Link
                  href="/templates"
                  className="block w-full text-center px-4 py-2 border border-neon/30 text-neon font-medium rounded-lg hover:bg-neon/10 transition text-sm"
                >
                  Browse Templates
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}
