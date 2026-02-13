import Link from 'next/link'
import type { Metadata } from 'next'
import StickyTOC from '@/components/ui/StickyTOC'

export const metadata: Metadata = {
  title: 'YAML-Native API Testing: Define, Version, and Run Tests as Code',
  description:
    'YAML-native API testing lets you define, version, and run API tests as declarative YAML files. Learn syntax patterns, variable passing, assertions, environment configs, and Git workflows.',
  alternates: { canonical: '/guides/yaml-native-api-testing/' },
  openGraph: {
    title: 'YAML-Native API Testing: Define, Version, and Run Tests as Code',
    description:
      'YAML-native API testing lets you define, version, and run API tests as declarative YAML files. Learn syntax patterns, variable passing, assertions, environment configs, and Git workflows.',
    url: 'https://dev.tools/guides/yaml-native-api-testing/',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YAML-Native API Testing: Define, Version, and Run Tests as Code',
    description:
      'YAML-native API testing lets you define, version, and run API tests as declarative YAML files. Learn syntax patterns, variable passing, assertions, environment configs, and Git workflows.',
  },
}

const tocItems = [
  { id: 'what-is-yaml-native-api-testing', label: 'What is YAML-native testing?' },
  { id: 'anatomy-of-a-yaml-test', label: 'Anatomy of a YAML test' },
  { id: 'variable-passing', label: 'Variables and assertions' },
  { id: 'browser-to-test', label: 'Browser to YAML pipeline' },
  { id: 'git-workflows', label: 'Git workflows and CI' },
  { id: 'faq', label: 'FAQ' },
]

const clusterPosts = [
  {
    href: '/blog/api-assertions-in-yaml-status-json-paths-headers-timing-thresholds/',
    title: 'API Assertions in YAML: Status, JSON Paths, Headers, Timing Thresholds',
    summary:
      'Four high-signal assertion categories for YAML API tests: status codes, JSONPath checks, headers, and timing budgets.',
  },
  {
    href: '/blog/chrome-web-developer-tools-record-requests-for-replayable-tests/',
    title: 'Chrome Web Developer Tools: Record Requests for Replayable Tests',
    summary:
      'Capture real browser traffic and convert it into deterministic, Git-reviewed YAML flows with request chaining.',
  },
  {
    href: '/blog/har-yaml-api-test-flow-auto-extract-variables-chain-requests/',
    title: 'HAR to YAML API Test Flow: Auto-Extract Variables + Chain Requests',
    summary:
      'Auto-map tokens and IDs from HAR captures into explicit YAML variable references and request chains.',
  },
]

const faqData = [
  {
    question: 'How is YAML-native testing different from Postman or Bruno?',
    answer:
      'Postman stores tests in collection JSON with embedded JavaScript. Bruno uses a custom .bru format. YAML-native tests are plain YAML files that any editor, linter, or CI system already understands. The key difference is reviewability: YAML diffs are clean and meaningful in pull requests.',
  },
  {
    question: 'Do I need to write YAML by hand?',
    answer:
      'No. You can build flows visually in DevTools Studio, import a HAR file from browser traffic, or write YAML directly. The visual editor and YAML are two views of the same test. Edit either one.',
  },
  {
    question: 'Can YAML tests handle complex logic like retries and conditions?',
    answer:
      'Yes. YAML flows support if conditions, for loops, and for_each iteration as first-class step types. JS nodes handle any logic that requires computation. The declarative structure keeps the flow readable while JS nodes handle the edge cases.',
  },
  {
    question: 'How do I manage secrets in YAML test files?',
    answer:
      'Never commit secrets. Use environment references ({{#env:VAR_NAME}}) in your YAML to read from OS environment variables at runtime. In CI, inject secrets via your platform secret store (GitHub Actions secrets, GitLab CI variables, etc.).',
  },
  {
    question: 'What if my team already uses Postman collections?',
    answer:
      'You can migrate incrementally. Start by building new tests as YAML flows and running them alongside your existing Postman suite. DevTools provides a migration guide for converting collections to YAML flows.',
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
    headline: 'YAML-Native API Testing: Define, Version, and Run Tests as Code',
    description:
      'YAML-native API testing lets you define, version, and run API tests as declarative YAML files. Learn syntax patterns, variable passing, assertions, environment configs, and Git workflows.',
    author: { '@type': 'Organization', name: 'DevTools Team' },
    publisher: { '@type': 'Organization', name: 'DevTools' },
    datePublished: '2026-02-14',
    dateModified: '2026-02-14',
  }

  return [faqSchema, articleSchema]
}

export default function YamlNativeApiTestingPage() {
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
        {/* 2-column layout — sidebar starts at page top */}
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
                YAML-Native API Testing: Define, Version, and Run Tests as Code
              </h1>
              <p className="text-lg text-slate-300 max-w-3xl">
                YAML-native API testing means your test definitions are declarative YAML files, not scripts
                hidden in a GUI or code buried in a test framework. Define requests, chain variables, assert
                contracts, and run everything in CI, all from files you can review in a pull request.
              </p>
            </div>
            {/* TODO: Add hero screenshot showing a YAML flow file open in an editor alongside the visual flow graph */}

            {/* Intro */}
            <p className="text-slate-300 leading-relaxed">
              Most API testing tools store test definitions in a proprietary format: Postman uses collection
              JSON with embedded JavaScript, Bruno uses a custom <code>.bru</code> DSL, and coded frameworks
              like RestAssured or SuperTest couple tests to a specific programming language. All of these work.
              None of them are natively reviewable in a pull request, diffable in Git, or runnable without
              their specific runtime.
            </p>
            <p className="text-slate-300 leading-relaxed">
              YAML-native API testing is a different approach: your tests are plain YAML files. Requests,
              variables, assertions, and execution order are all declared in a format that every engineer
              already knows how to read, every editor already highlights, and every CI system already handles.
              The test file <em>is</em> the test, no compilation or export step required.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This guide covers the full approach: what YAML-native testing is, why it matters, the syntax
              patterns, variable passing, assertions, environment management, and how YAML tests integrate
              with Git and CI workflows.
            </p>

            {/* Cluster post cards */}
            <div className="not-prose my-10 grid gap-4 sm:grid-cols-3">
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
            <h2 id="what-is-yaml-native-api-testing" className="text-3xl font-semibold text-white mb-4 mt-12">
              What is YAML-native API testing?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              YAML-native API testing means your API test definitions are stored, versioned, reviewed, and
              executed as plain YAML files. The YAML file is the single source of truth for what the test does.
              There is no separate UI state, no exported collection, and no compiled artifact.
            </p>
            <p className="text-slate-300 leading-relaxed">A YAML test file defines:</p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Requests</strong> with method, URL, headers, and body
              </li>
              <li>
                <strong>Variables</strong> that flow between steps via explicit references
              </li>
              <li>
                <strong>Assertions</strong> via JavaScript nodes that validate contracts
              </li>
              <li>
                <strong>Execution order</strong> via <code>depends_on</code> declarations
              </li>
              <li>
                <strong>Control flow</strong> via conditions, loops, and for-each iteration
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              The result is a test that reads like a specification. A reviewer can open the YAML file and
              understand the entire workflow without running anything or opening a GUI.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              How it compares to other approaches
            </h3>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Approach</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Format</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">PR reviewable</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">CI-native</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Editor support</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Postman + Newman</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Collection JSON + JS scripts</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Noisy diffs</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Via Newman CLI</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Postman UI</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Bruno</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Custom .bru DSL</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Readable, but custom syntax</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Via Bruno CLI</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Bruno app</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Coded (RestAssured, SuperTest)</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Java / JS / Python</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Code review, but verbose</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Native</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Any IDE</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>YAML-native (DevTools)</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Plain YAML</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Clean, line-oriented diffs</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">CLI + any CI</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Any editor + visual Studio</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 2 */}
            <h2 id="why-yaml-over-code-or-gui" className="text-3xl font-semibold text-white mb-4 mt-12">
              Why YAML over code or GUI
            </h2>
            <p className="text-slate-300 leading-relaxed">
              The argument for YAML is not that it is better at expressing logic than Python or JavaScript. It
              is that API tests are mostly <em>declarations</em>, not logic. A test says: send this request
              with these headers, expect this status, check these fields, then use this value in the next
              request. That is a data structure, not an algorithm.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Declarations are easier to review</h3>
            <p className="text-slate-300 leading-relaxed">
              A YAML file that defines a request with headers, body, and expected status is immediately
              readable. A Java method that builds an HTTP client, sets headers, sends a request, extracts a
              response, and asserts on fields buries the same information in boilerplate. In a pull request,
              the YAML diff shows exactly what changed. The code diff requires context.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">One format for human and machine</h3>
            <p className="text-slate-300 leading-relaxed">
              YAML files can be generated from browser traffic (HAR imports), edited by hand, modified by a
              visual editor, linted by CI, and executed by a CLI runner. The same file serves all these roles
              because YAML is a data format, not a program. You do not need a build step, a compilation
              target, or a UI session to understand what the test does.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Logic lives in JS nodes, not everywhere</h3>
            <p className="text-slate-300 leading-relaxed">
              When you do need logic (conditional assertions, value transformations, complex validation), it
              goes in explicit <code>js:</code> nodes. This keeps the declarative parts clean and the
              imperative parts contained. A reviewer knows that the request definition is data and the JS node
              is logic. In coded frameworks, both are interleaved.
            </p>

            {/* Section 3 */}
            <h2 id="anatomy-of-a-yaml-test" className="text-3xl font-semibold text-white mb-4 mt-12">
              Anatomy of a YAML test file
            </h2>
            <p className="text-slate-300 leading-relaxed">
              A YAML test file in DevTools has a consistent structure. Here is a minimal example that
              authenticates, creates a resource, and verifies it:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`workspace_name: Bookmarks API

env:
  BASE_URL: '{{BASE_URL}}'

run:
  - flow: BookmarkTest

flows:
  - name: BookmarkTest
    variables:
      - name: run_id
        value: 'ci-001'
    steps:
      - request:
          name: Login
          method: POST
          url: '{{BASE_URL}}/auth/login'
          headers:
            Content-Type: application/json
          body:
            email: 'test@example.com'
            password: 'password123'

      - js:
          name: Auth
          code: |
            export default function(ctx) {
              if (ctx.Login?.response?.status !== 200) throw new Error("Login failed");
              return { token: ctx.Login.response.body.access_token };
            }
          depends_on: Login

      - request:
          name: CreateBookmark
          method: POST
          url: '{{BASE_URL}}/api/bookmarks'
          headers:
            Authorization: 'Bearer {{Auth.token}}'
            Content-Type: application/json
          body:
            url: 'https://example.com/test-{{run_id}}'
            title: 'Test Bookmark'
          depends_on: Auth

      - js:
          name: ValidateCreate
          code: |
            export default function(ctx) {
              const resp = ctx.CreateBookmark?.response;
              if (resp?.status !== 201) throw new Error("Expected 201");
              if (!resp?.body?.id) throw new Error("Missing ID");
              return { id: resp.body.id };
            }
          depends_on: CreateBookmark

      - request:
          name: GetBookmark
          method: GET
          url: '{{BASE_URL}}/api/bookmarks/{{ValidateCreate.id}}'
          headers:
            Authorization: 'Bearer {{Auth.token}}'
          depends_on: ValidateCreate

      - js:
          name: VerifyRead
          code: |
            export default function(ctx) {
              if (ctx.GetBookmark?.response?.status !== 200) throw new Error("Expected 200");
              if (ctx.GetBookmark?.response?.body?.title !== "Test Bookmark") throw new Error("Mismatch");
              return { verified: true };
            }
          depends_on: GetBookmark`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Key structural elements</h3>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Element</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Purpose</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>workspace_name</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Labels the file for reporting</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>Bookmarks API</code></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>env</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Environment variable declarations</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>{'BASE_URL: \'{{BASE_URL}}\''}</code></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>run</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Which flows to execute and in what order</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>- flow: BookmarkTest</code></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>flows[].steps</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">The sequence of requests, JS nodes, conditions, loops</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>- request:</code>, <code>- js:</code>, <code>- if:</code></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>depends_on</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Explicit execution order between steps</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>depends_on: Login</code></td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>variables</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Flow-scoped variables for test data</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>{'- name: run_id\\n  value: \'ci-001\''}</code></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Step types</h3>
            <p className="text-slate-300 leading-relaxed">
              YAML flows support five step types, each a first-class node:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong><code>request:</code></strong> — HTTP request with method, URL, headers, body
              </li>
              <li>
                <strong><code>js:</code></strong> — JavaScript node for validation, extraction, or transformation
              </li>
              <li>
                <strong><code>if:</code></strong> — Conditional branching based on a previous step&apos;s output
              </li>
              <li>
                <strong><code>for:</code></strong> — Loop a step N times (polling, retries)
              </li>
              <li>
                <strong><code>for_each:</code></strong> — Iterate over a list of items
              </li>
            </ul>

            {/* Section 4 */}
            <h2 id="variable-passing" className="text-3xl font-semibold text-white mb-4 mt-12">
              Variable passing and references
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Variable passing is what turns a list of independent requests into a connected test flow. In
              YAML-native testing, variables flow between steps through explicit references that are visible in
              the file.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Reference syntax</h3>
            <p className="text-slate-300 leading-relaxed">
              There are three types of references in YAML flows:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Request output</strong>: <code>{'{{NodeName.response.body.field}}'}</code> — references a
                field from a previous request&apos;s response
              </li>
              <li>
                <strong>JS node output</strong>: <code>{'{{JsNodeName.field}}'}</code> — references a value returned
                by a JS node
              </li>
              <li>
                <strong>Environment variable</strong>: <code>{'{{#env:VAR_NAME}}'}</code> — reads from OS environment at
                runtime
              </li>
            </ul>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Direct request output reference
- request:
    name: GetProfile
    url: '{{BASE_URL}}/api/me'
    headers:
      Authorization: 'Bearer {{Login.response.body.access_token}}'
    depends_on: Login

# JS node extraction + downstream reference
- js:
    name: Auth
    code: |
      export default function(ctx) {
        return { token: ctx.Login.response.body.access_token };
      }
    depends_on: Login

- request:
    name: CreateItem
    url: '{{BASE_URL}}/api/items'
    headers:
      Authorization: 'Bearer {{Auth.token}}'
    depends_on: Auth`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              Both patterns work. Direct references (<code>{'{{Login.response.body.access_token}}'}</code>) are
              simpler. JS extraction nodes (<code>{'{{Auth.token}}'}</code>) are better when you need to validate
              the value before passing it downstream or when the reference path is deeply nested.
            </p>

            {/* TODO: Add screenshot showing auto-variable-mapping in the visual flow editor */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Auto-mapping from HAR imports</h3>
            <p className="text-slate-300 leading-relaxed">
              When you import a HAR file into DevTools, the tool auto-detects values that appear in one
              response and reappear in a subsequent request (tokens, IDs, CSRF values). It converts these into
              explicit <code>{'{{NodeName.response.body.field}}'}</code> references. You review and adjust the
              mapping rather than wiring everything by hand.
            </p>
            <p className="text-slate-300 leading-relaxed">
              For the full HAR-to-YAML pipeline, see:{' '}
              <Link href="/blog/har-yaml-api-test-flow-auto-extract-variables-chain-requests/" className="text-neon hover:underline">
                HAR to YAML API Test Flow: Auto-Extract Variables + Chain Requests
              </Link>.
            </p>

            {/* Section 5 */}
            <h2 id="assertions" className="text-3xl font-semibold text-white mb-4 mt-12">
              Assertions in YAML
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Assertions in YAML flows are written as <code>js:</code> nodes that throw on failure. This keeps
              assertions explicit, reviewable, and flexible, you can check anything JavaScript can express.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Four assertion categories</h3>
            <p className="text-slate-300 leading-relaxed">
              Most API assertions fall into four categories, each with different determinism trade-offs:
            </p>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">What to check</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Determinism</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Status code</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Exact code or set of allowed codes</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">High</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>JSON body</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Field presence, types, stable values</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">High if you avoid timestamps and UUIDs</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Headers</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Content-Type, Cache-Control, Location</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">High</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Timing</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Response time budget (ceiling, not benchmark)</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Medium, needs headroom for CI variance</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Assertion examples</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Status + body contract
- js:
    name: ValidateWidget
    code: |
      export default function(ctx) {
        const resp = ctx.GetWidget?.response;
        if (resp?.status !== 200) throw new Error("Expected 200, got " + resp?.status);
        if (!resp?.body?.id) throw new Error("Missing id");
        if (typeof resp?.body?.name !== 'string') throw new Error("name not a string");
        if (!resp?.body?.tags?.includes("public")) throw new Error("Missing 'public' tag");
        return { validated: true };
      }
    depends_on: GetWidget

# Header assertion
- js:
    name: ValidateHeaders
    code: |
      export default function(ctx) {
        const ct = ctx.DownloadPdf?.response?.headers?.["content-type"];
        if (!/^application\\/pdf/.test(ct)) throw new Error("Bad content-type: " + ct);
        return { validated: true };
      }
    depends_on: DownloadPdf

# Timing budget
- js:
    name: CheckTiming
    code: |
      export default function(ctx) {
        const ms = ctx.Search?.response?.duration;
        if (ms > 500) throw new Error("Too slow: " + ms + "ms, budget 500ms");
        return { duration: ms };
      }
    depends_on: Search`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              For a comprehensive treatment of assertion patterns, see:{' '}
              <Link href="/blog/api-assertions-in-yaml-status-json-paths-headers-timing-thresholds/" className="text-neon hover:underline">
                API Assertions in YAML: Status, JSON Paths, Headers, Timing Thresholds
              </Link>.
            </p>

            {/* Section 6 */}
            <h2 id="environments-and-secrets" className="text-3xl font-semibold text-white mb-4 mt-12">
              Environments and secrets
            </h2>
            <p className="text-slate-300 leading-relaxed">
              YAML test files need to run against different environments (local, staging, production) without
              hardcoding URLs or credentials. The pattern is environment references that resolve at runtime.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Environment variables in YAML</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Top-level env block maps flow variables to OS environment
env:
  BASE_URL: '{{BASE_URL}}'

# Flow-level variables for test data
flows:
  - name: MyFlow
    variables:
      - name: api_key
        value: '{{#env:SECRET_API_KEY}}'
      - name: run_id
        value: 'ci-20260214'
      - name: test_email
        value: 'test@example.com'`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              The <code>{'{{#env:VAR_NAME}}'}</code> syntax reads from OS environment variables at runtime. In CI,
              inject secrets via your platform&apos;s secret store:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# GitHub Actions — inject secrets as env vars
- name: Run API tests
  run: devtools flow run tests/*.yaml --report junit
  env:
    BASE_URL: https://staging.example.com
    SECRET_API_KEY: \${{ secrets.API_KEY }}`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">What to never commit</h3>
            <ul className="text-slate-300 space-y-2">
              <li>API keys, tokens, passwords (use <code>#env:</code> references)</li>
              <li>Raw HAR files (they contain session cookies and tokens)</li>
              <li>Environment files with real credentials (<code>.env</code> should be gitignored)</li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              What to commit: the YAML flow files, environment templates with placeholder values, and CI
              workflow definitions.
            </p>

            {/* Section 7 */}
            <h2 id="browser-to-test" className="text-3xl font-semibold text-white mb-4 mt-12">
              From browser traffic to YAML test
            </h2>
            <p className="text-slate-300 leading-relaxed">
              One of the strongest advantages of YAML-native testing is the HAR-to-YAML pipeline: capture a
              real user workflow in the browser, convert it to a YAML test, then refine it into a deterministic,
              reviewable flow.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">The pipeline</h3>
            <ol className="text-slate-300 space-y-2">
              <li>
                <strong>Record</strong> a focused workflow in Chrome DevTools Network panel (login, create,
                verify)
              </li>
              <li>
                <strong>Export</strong> the capture as a HAR file (&quot;Save all as HAR with content&quot;)
              </li>
              <li>
                <strong>Import</strong> the HAR into DevTools Studio, which generates a YAML flow
              </li>
              <li>
                <strong>Refine</strong>: delete noise (preflights, analytics), replace secrets with env refs,
                review auto-mapped variables
              </li>
              <li>
                <strong>Commit</strong> the YAML file to Git for PR review and CI execution
              </li>
            </ol>

            {/* TODO: Add screenshot showing the HAR import flow in DevTools Studio */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">What gets auto-mapped</h3>
            <p className="text-slate-300 leading-relaxed">
              When DevTools imports a HAR, it detects values that appear in one response and reappear in a
              subsequent request. These become variable references:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Auth tokens</strong> from login responses → <code>Authorization</code> headers
              </li>
              <li>
                <strong>Resource IDs</strong> from create responses → URL path parameters
              </li>
              <li>
                <strong>CSRF tokens</strong> from bootstrap responses → mutation headers
              </li>
              <li>
                <strong>Pagination cursors</strong> from list responses → next-page query params
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              For the full browser-to-test workflow, see:{' '}
              <Link href="/blog/chrome-web-developer-tools-record-requests-for-replayable-tests/" className="text-neon hover:underline">
                Chrome Web Developer Tools: Record Requests for Replayable Tests
              </Link>.
            </p>

            {/* Section 8 */}
            <h2 id="request-chaining" className="text-3xl font-semibold text-white mb-4 mt-12">
              Request chaining patterns
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Request chaining is what makes YAML tests useful for real workflows. Every multi-step test
              relies on data flowing between requests. Here are the patterns that scale.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Pattern 1: Login → use token</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`- request:
    name: Login
    method: POST
    url: '{{BASE_URL}}/auth/login'
    headers:
      Content-Type: application/json
    body:
      email: '{{USERNAME}}'
      password: '{{PASSWORD}}'

- request:
    name: ListProjects
    method: GET
    url: '{{BASE_URL}}/api/projects'
    headers:
      Authorization: 'Bearer {{Login.response.body.access_token}}'
    depends_on: Login`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Pattern 2: Create → capture ID → fetch</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`- request:
    name: CreateWidget
    method: POST
    url: '{{BASE_URL}}/api/widgets'
    headers:
      Authorization: 'Bearer {{Auth.token}}'
      Content-Type: application/json
    body:
      name: 'ci-{{run_id}}'
    depends_on: Auth

- request:
    name: GetWidget
    method: GET
    url: '{{BASE_URL}}/api/widgets/{{CreateWidget.response.body.id}}'
    headers:
      Authorization: 'Bearer {{Auth.token}}'
    depends_on: CreateWidget`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Pattern 3: Conditional handling</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Handle idempotent create (201 vs 409)
- if:
    name: CheckExists
    condition: CreateItem.response.status == 409
    then: GetExisting
    else: UseCreated
    depends_on: CreateItem`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Pattern 4: Polling with a loop</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Poll a status endpoint until a job completes
- for:
    name: PollStatus
    iter_count: 10
    loop: CheckJobStatus
    depends_on: StartJob`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              The key principle: every dependency is visible in the YAML via <code>depends_on</code> and
              variable references. A reviewer can trace the data flow by reading the file.
            </p>

            {/* Section 9 */}
            <h2 id="git-workflows" className="text-3xl font-semibold text-white mb-4 mt-12">
              Git workflows for YAML tests
            </h2>
            <p className="text-slate-300 leading-relaxed">
              YAML tests are code. They belong in Git, get reviewed in PRs, and run in CI. Here is how to
              structure the workflow.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Repository layout</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`tests/
  api/
    auth-flow.yaml
    crud-lifecycle.yaml
    search-pagination.yaml
  env/
    staging.env.template    # BASE_URL, placeholder credentials
    production.env.template
.github/
  workflows/
    api-tests.yaml          # CI workflow`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">PR workflow</h3>
            <ol className="text-slate-300 space-y-2">
              <li>
                <strong>Branch</strong>: create or modify a YAML test file
              </li>
              <li>
                <strong>Review</strong>: the diff shows exactly what changed — new request, updated assertion,
                modified variable reference
              </li>
              <li>
                <strong>CI check</strong>: the test runs automatically on the PR and reports pass/fail
              </li>
              <li>
                <strong>Merge</strong>: the test becomes part of the main suite
              </li>
            </ol>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Keeping diffs clean</h3>
            <p className="text-slate-300 leading-relaxed">
              YAML tests are only reviewable if the diffs are meaningful. Conventions that help:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Stable step names</strong>: treat <code>name:</code> values as a public API — do not
                rename without reason
              </li>
              <li>
                <strong>Consistent key ordering</strong>: always <code>name</code>, <code>method</code>,{' '}
                <code>url</code>, <code>headers</code>, <code>body</code>, <code>depends_on</code>
              </li>
              <li>
                <strong>Sorted headers</strong>: alphabetical header keys prevent reorder-only diffs
              </li>
              <li>
                <strong>Quote ambiguous values</strong>: <code>{`'on'`}</code>, <code>{`'yes'`}</code>,{' '}
                <code>{`'3.0'`}</code> to prevent YAML type coercion surprises
              </li>
              <li>
                <strong>Block scalars</strong> for large JSON bodies so diffs are line-oriented
              </li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">CI integration</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`name: API Tests
on:
  pull_request:
    branches: [main]

jobs:
  api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://dev.tools/install.sh | sh

      - name: Run YAML flows
        run: devtools flow run tests/api/*.yaml --report junit
        env:
          BASE_URL: \${{ vars.STAGING_URL }}
          SECRET_API_KEY: \${{ secrets.API_KEY }}

      - name: Upload results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: api-test-results
          path: reports/`}</code>
            </pre>

            {/* TODO: Add screenshot showing a GitHub Actions PR check with YAML test results */}

            {/* FAQ Section */}
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
              Start defining API tests as YAML
            </h2>
            <p className="text-slate-300 leading-relaxed">
              YAML-native API testing is not a framework to learn. It is a format you already know applied to
              a problem you already have. Your tests become reviewable files in Git, not opaque exports from a
              GUI or boilerplate-heavy code in a test framework.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Start with one workflow: record it in the browser, convert to YAML, add assertions, and run it
              in CI. The test file is the test. Review it like code, version it like code, run it like code.
            </p>
            <p className="text-slate-300 leading-relaxed">
              DevTools is built for this workflow: visual editor, HAR import, YAML export, CLI runner. Try it
              at{' '}
              <Link href="https://dev.tools" className="text-neon hover:underline">
                dev.tools
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
                  YAML-first testing
                </span>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Build YAML API tests visually
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Define requests, chain variables, and add assertions in a visual editor. Export to YAML for
                  Git and CI.
                </p>
                <div className="space-y-3">
                  <Link
                    href="https://dev.tools/docs/how-to/working-with-flows/"
                    className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                  >
                    Try Flows
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
                  Import a HAR, get a YAML flow
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Turn real browser traffic into a deterministic YAML test with auto-mapped variables and
                  explicit request chaining.
                </p>
                <div className="space-y-3">
                  <Link
                    href="https://dev.tools/docs/how-to/import-har/"
                    className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                  >
                    Import HAR
                  </Link>
                  <Link
                    href="/guides/generate-har-chrome"
                    className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                  >
                    Generate HAR safely
                  </Link>
                </div>
              </div>

              {/* Templates CTA */}
              <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Get the copy-paste templates
                </h4>
                <p className="text-xs text-slate-300 mb-3">
                  JWT auth, OAuth client credentials, CRUD flow, GitHub Actions.
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
