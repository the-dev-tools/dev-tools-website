import Link from 'next/link'
import StickyTOC from '@/components/ui/StickyTOC'

export const metadata = {
  title: 'Multi-Step API Testing – Chain Requests, Pass Variables, Validate Flows',
  description:
    'Build multi-step API tests that chain requests with auto-mapped variables. Test login → create → verify → delete workflows end-to-end with DevTools.',
  alternates: { canonical: '/features/multi-step-api-testing/' },
}

const tocItems = [
  { id: 'what-is', label: 'What is multi-step API testing?' },
  { id: 'why-it-matters', label: 'Why it matters' },
  { id: 'how-devtools-works', label: 'How DevTools does it' },
  { id: 'variable-passing', label: 'Variable passing between steps' },
  { id: 'assertions', label: 'Assertions in multi-step flows' },
  { id: 'yaml-export', label: 'YAML export for CI/CD' },
  { id: 'example', label: 'Complete example' },
  { id: 'faq', label: 'FAQ' },
]

export default function MultiStepApiTestingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12">
        <article className="prose prose-invert prose-slate max-w-none min-w-0">
          <header className="mb-12 not-prose">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Multi-Step API Testing</h1>
            <p className="mt-4 text-lg text-slate-300">
              Real APIs don't work in isolation. Authentication flows, resource creation, data validation — they all depend on
              chaining multiple requests together. Multi-step API testing validates these complete workflows end-to-end.
            </p>
            <figure className="mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-[0_25px_45px_-30px_rgba(15,23,42,0.8)]">
              <img
                src="/assets/multistep-flow-create-validate-delete.webp"
                alt="Multi-step API test flow in DevTools: Login, create category and tag, create product, fan out to validate with GET requests, then delete all created resources"
                className="w-full"
                loading="eager"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400">
                A real multi-step flow: Login → create category &amp; tag → create product → fan out to validate → delete resources
              </figcaption>
            </figure>
          </header>

          <section className="mb-12">
            <h2 id="what-is" className="text-3xl font-bold text-white">What is multi-step API testing?</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300 mb-3">
                Multi-step API testing (also called end-to-end API testing or API flow testing) is the practice of testing
                a sequence of API calls that depend on each other — where outputs from one step become inputs for the next.
              </p>
              <p className="text-slate-300 mb-3">
                A typical multi-step test might look like:
              </p>
              <ol className="text-slate-300 list-decimal pl-5 space-y-1">
                <li><strong>Login</strong> — POST to /auth/login, receive an access token</li>
                <li><strong>Create resource</strong> — POST to /api/items using the token</li>
                <li><strong>Verify</strong> — GET the created resource by ID</li>
                <li><strong>Clean up</strong> — DELETE the resource</li>
              </ol>
              <p className="text-slate-300 mt-3">
                Each step depends on data from the previous step. The token from login is used in subsequent requests.
                The ID from creation is used to verify and delete.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="why-it-matters" className="text-3xl font-bold text-white">Why multi-step testing matters</h2>
            <div className="not-prose space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Single-request tests miss real bugs</h3>
                <p className="text-slate-300 text-sm">
                  Testing endpoints in isolation catches basic errors but misses the bugs that happen when requests interact:
                  token expiry between steps, race conditions, incorrect ID references, and state mutation side effects.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Real user workflows are multi-step</h3>
                <p className="text-slate-300 text-sm">
                  Users don't call a single endpoint — they login, browse, create, update, and logout. Multi-step tests
                  mirror these real workflows and catch integration issues before they reach production.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Variable chaining is the hard part</h3>
                <p className="text-slate-300 text-sm">
                  The challenge isn't making API calls — it's passing data between them. Tokens, IDs, timestamps, and
                  session data need to flow from response to request across steps reliably.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="how-devtools-works" className="text-3xl font-bold text-white">How DevTools handles multi-step API testing</h2>
            <div className="not-prose space-y-6">
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Import real traffic</h3>
                    <p className="text-slate-300 text-sm">Record a HAR from Chrome DevTools, import it, and DevTools generates multi-step flows automatically — complete with request ordering and dependency detection.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Auto-map variables between steps</h3>
                    <p className="text-slate-300 text-sm">DevTools detects tokens, IDs, and values that flow between requests and maps them automatically. Override with JSONPath rules when needed.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Add assertions and validation</h3>
                    <p className="text-slate-300 text-sm">Use JavaScript nodes to validate status codes, response bodies, and data integrity between steps. Assertions run inline within the flow.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-neon/10 text-neon font-bold">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Export YAML and run in CI</h3>
                    <p className="text-slate-300 text-sm">Export the flow as human-readable YAML, commit to Git, and run with the DevTools CLI in any CI/CD pipeline. Parallel execution with JUnit/JSON reports.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="variable-passing" className="text-3xl font-bold text-white">Variable passing between steps</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300 mb-4">
                In DevTools, variables flow naturally between steps using double-curly-brace syntax:
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">Variable passing</div>
                <pre className="p-4 text-[13px] leading-relaxed text-slate-200"><code>{`# Login returns an access_token in the response body
- request:
    name: Login
    method: POST
    url: '{{BASE_URL}}/auth/login'
    body:
      email: '{{#env:TEST_EMAIL}}'
      password: '{{#env:TEST_PASSWORD}}'

# Use the token in subsequent requests
- request:
    name: CreateItem
    method: POST
    url: '{{BASE_URL}}/api/items'
    headers:
      Authorization: 'Bearer {{Login.response.body.access_token}}'
    body:
      name: 'Test Item'
    depends_on: Login`}</code></pre>
              </div>
              <p className="text-slate-300 mt-4 text-sm">
                The <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">{'{{Login.response.body.access_token}}'}</code> syntax
                references the <code className="bg-slate-800/50 text-neon px-1.5 py-0.5 rounded text-xs">access_token</code> field from the Login step's response body.
                DevTools auto-detects these mappings when importing from a HAR.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="assertions" className="text-3xl font-bold text-white">Assertions in multi-step flows</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300 mb-4">
                Add JavaScript nodes between steps to validate responses and enforce data integrity:
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">Assertion example</div>
                <pre className="p-4 text-[13px] leading-relaxed text-slate-200"><code>{`- js:
    name: ValidateCreate
    code: |
      export default function(ctx) {
        const status = ctx.CreateItem?.response?.status;
        if (status !== 201) throw new Error(\`Expected 201, got \${status}\`);
        const id = ctx.CreateItem?.response?.body?.id;
        if (!id) throw new Error("Missing item ID in response");
        return { itemId: id };
      }
    depends_on: CreateItem`}</code></pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="yaml-export" className="text-3xl font-bold text-white">YAML export for CI/CD</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300 mb-4">
                Multi-step API tests export as clean YAML that's easy to review in pull requests and run in any CI pipeline:
              </p>
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">GitHub Actions</div>
                <pre className="p-4 text-[13px] leading-relaxed text-slate-200"><code>{`name: API Tests
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash
      - name: Run multi-step API tests
        run: devtools flow run --report junit:results.xml tests.yaml
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: results.xml`}</code></pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="example" className="text-3xl font-bold text-white">Complete multi-step API test example</h2>
            <div className="not-prose rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/50">
                <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-400">Login → Create → Verify → Delete</div>
                <pre className="max-h-[500px] overflow-auto p-4 text-[13px] leading-relaxed text-slate-200"><code>{`workspace_name: E2E Test
env:
  BASE_URL: '{{BASE_URL}}'
run:
  - flow: LoginCreateVerifyDelete
flows:
  - name: LoginCreateVerifyDelete
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

      - js:
          name: CheckLogin
          code: |
            export default function(ctx) {
              if (ctx.Login?.response?.status !== 200)
                throw new Error("Login failed");
              return { token: ctx.Login.response.body.access_token };
            }
          depends_on: Login

      - request:
          name: CreateItem
          method: POST
          url: '{{BASE_URL}}/api/items'
          headers:
            Authorization: 'Bearer {{Login.response.body.access_token}}'
            Content-Type: application/json
          body:
            name: 'Test Item'
            description: 'Created by API test'
          depends_on: Login

      - request:
          name: VerifyItem
          method: GET
          url: '{{BASE_URL}}/api/items/{{CreateItem.response.body.id}}'
          headers:
            Authorization: 'Bearer {{Login.response.body.access_token}}'
          depends_on: CreateItem

      - js:
          name: CheckItem
          code: |
            export default function(ctx) {
              const item = ctx.VerifyItem?.response?.body;
              if (item?.name !== 'Test Item')
                throw new Error("Item name mismatch");
              return { verified: true };
            }
          depends_on: VerifyItem

      - request:
          name: DeleteItem
          method: DELETE
          url: '{{BASE_URL}}/api/items/{{CreateItem.response.body.id}}'
          headers:
            Authorization: 'Bearer {{Login.response.body.access_token}}'
          depends_on: VerifyItem`}</code></pre>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 id="faq" className="text-3xl font-bold text-white">FAQ</h2>
            <div className="not-prose space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">How is this different from Postman collections?</h3>
                <p className="text-slate-300 text-sm">
                  Postman collections require scripts for variable passing and run sequentially. DevTools auto-maps variables between steps,
                  exports clean YAML for Git review, and runs tests in parallel with a Go-based CLI.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Can I import existing API tests?</h3>
                <p className="text-slate-300 text-sm">
                  You can import HAR files from any browser or proxy. DevTools generates multi-step flows from real traffic, which is
                  often faster than rewriting existing collections.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Does it work with GraphQL or gRPC?</h3>
                <p className="text-slate-300 text-sm">
                  DevTools supports HTTP/REST APIs including GraphQL over HTTP. gRPC support is on the roadmap.
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white mb-1">Can I run multi-step tests in parallel?</h3>
                <p className="text-slate-300 text-sm">
                  Yes. The DevTools CLI runs independent flows in parallel by default. Steps within a flow respect dependency ordering via <code className="bg-slate-800/50 text-neon px-1 py-0.5 rounded text-xs">depends_on</code>.
                </p>
              </div>
            </div>
          </section>

          <section className="not-prose mb-12 rounded-xl border border-neon/30 bg-neon/5 p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Get started with multi-step API testing</h2>
            <p className="text-slate-300 mb-4">Download DevTools Studio (free, open source) and build your first multi-step test flow in minutes.</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/download"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
              >
                Download Studio
              </Link>
              <Link
                href="/guides/end-to-end-api-testing"
                className="inline-flex items-center justify-center px-6 py-2.5 border border-neon/60 text-neon font-medium rounded-lg hover:bg-neon/10 transition"
              >
                End-to-End Testing Guide
              </Link>
            </div>
          </section>

          <footer className="not-prose text-sm text-slate-400">
            <p>
              See also: <Link href="/guides/api-testing-ci-cd" className="text-neon hover:underline">API Testing in CI/CD</Link>
              {' '}&middot;{' '}<Link href="/flows" className="text-neon hover:underline">Flows</Link>
              {' '}&middot;{' '}<Link href="/postman-alternative" className="text-neon hover:underline">Postman Alternative</Link>
              {' '}&middot;{' '}<Link href="/docs" className="text-neon hover:underline">Docs</Link>
            </p>
          </footer>
        </article>

        <div className="hidden lg:block">
          <aside className="space-y-6 sticky top-8">
            <StickyTOC items={tocItems} />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <span className="inline-block px-2 py-1 text-xs font-medium rounded mb-3 bg-slate-700 text-slate-300">
                Multi-step testing
              </span>
              <h3 className="text-lg font-semibold text-white mb-3">
                Build your first multi-step API test
              </h3>
              <p className="text-sm text-slate-300 mb-4">
                Record real traffic, chain requests, and run in CI.
              </p>
              <div className="space-y-3">
                <Link
                  href="/download"
                  className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                >
                  Download Studio
                </Link>
                <Link
                  href="/cli"
                  className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                >
                  Install CLI
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
                name: 'How is multi-step API testing different from Postman collections?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Postman collections require scripts for variable passing and run sequentially. DevTools auto-maps variables between steps, exports clean YAML for Git review, and runs tests in parallel with a Go-based CLI.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I import existing API tests?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'You can import HAR files from any browser or proxy. DevTools generates multi-step flows from real traffic, which is often faster than rewriting existing collections.'
                }
              },
              {
                '@type': 'Question',
                name: 'Does DevTools work with GraphQL or gRPC?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'DevTools supports HTTP/REST APIs including GraphQL over HTTP. gRPC support is on the roadmap.'
                }
              },
              {
                '@type': 'Question',
                name: 'Can I run multi-step API tests in parallel?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. The DevTools CLI runs independent flows in parallel by default. Steps within a flow respect dependency ordering via depends_on.'
                }
              }
            ]
          })
        }}
      />
    </main>
  )
}
