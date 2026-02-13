import Link from 'next/link'
import type { Metadata } from 'next'
import StickyTOC from '@/components/ui/StickyTOC'

export const metadata: Metadata = {
  title: 'End-to-End API Testing: The Complete Guide',
  description:
    'End-to-end API testing validates complete workflows, not isolated endpoints. Learn how to chain requests, pass variables, handle auth, and run multi-step API tests in CI.',
  alternates: { canonical: '/guides/end-to-end-api-testing/' },
  openGraph: {
    title: 'End-to-End API Testing: The Complete Guide',
    description:
      'End-to-end API testing validates complete workflows, not isolated endpoints. Learn how to chain requests, pass variables, handle auth, and run multi-step API tests in CI.',
    url: 'https://dev.tools/guides/end-to-end-api-testing/',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'End-to-End API Testing: The Complete Guide',
    description:
      'End-to-end API testing validates complete workflows, not isolated endpoints. Learn how to chain requests, pass variables, handle auth, and run multi-step API tests in CI.',
  },
}

const tocItems = [
  { id: 'what-is-end-to-end-api-testing', label: 'What is e2e API testing?' },
  { id: 'anatomy-of-a-real-test', label: 'Anatomy of a real test' },
  { id: 'variable-passing', label: 'Variables and validation' },
  { id: 'running-in-ci', label: 'Running in CI' },
  { id: 'building-with-flows', label: 'Building with Flows' },
  { id: 'faq', label: 'FAQ' },
]

const clusterPosts = [
  {
    href: '/blog/why-single-request-api-tests-miss-real-bugs/',
    title: 'Why Single-Request API Tests Miss Real Bugs',
    summary:
      'Single-request tests give false confidence. Real bugs hide in the gaps between endpoints: stale tokens, broken chains, side effects that never fire.',
  },
  {
    href: '/blog/how-to-build-end-to-end-api-test-login-create-verify-delete/',
    title: 'How to Build an End-to-End API Test: Login, Create, Verify, Delete',
    summary:
      'Step-by-step tutorial: build a six-step flow that authenticates, creates a resource, verifies it, updates it, deletes it, and confirms deletion.',
  },
  {
    href: '/blog/end-to-end-api-testing-the-complete-guide/',
    title: 'End-to-End API Testing: The Complete Guide (Blog)',
    summary:
      'The original blog post version of this guide with the same content in MDX format.',
  },
]

const faqData = [
  {
    question: 'How many end-to-end API tests should I have?',
    answer:
      'Fewer than you think. Cover the critical user journeys: authentication, the core CRUD workflow, payment (if applicable), and the most common multi-step paths. Five to ten well-designed e2e flows catch more bugs than fifty isolated endpoint tests.',
  },
  {
    question: 'Should end-to-end tests hit real services or mocks?',
    answer:
      'Real services. The whole point is testing the integration. If you mock the dependencies, you are writing integration tests, not end-to-end tests. Use a dedicated test environment instead.',
  },
  {
    question: 'How do I handle async operations (webhooks, queues)?',
    answer:
      'Add polling steps using a for loop. Make a request, then use a for node to poll a status endpoint with a timeout. This is more reliable than fixed-duration sleeps and more realistic than skipping the async part entirely.',
  },
  {
    question: 'What if my API changes frequently?',
    answer:
      'Validate contracts (status codes, field presence, types) in JS nodes instead of exact body snapshots. End-to-end tests should verify behavior, not exact payloads. If a new optional field appears, your tests should not break.',
  },
  {
    question: 'Can I generate end-to-end tests from browser traffic?',
    answer:
      'Yes. Record a browser session, export the HAR, import it into DevTools, and the auto-generated flow gives you a starting point. You then refine the variable mapping and add validation.',
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
    headline: 'End-to-End API Testing: The Complete Guide',
    description:
      'End-to-end API testing validates complete workflows, not isolated endpoints. Learn how to chain requests, pass variables, handle auth, and run multi-step API tests in CI.',
    author: { '@type': 'Organization', name: 'DevTools Team' },
    publisher: { '@type': 'Organization', name: 'DevTools' },
    datePublished: '2026-02-14',
    dateModified: '2026-02-14',
  }

  return [faqSchema, articleSchema]
}

export default function EndToEndApiTestingPage() {
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
                End-to-End API Testing: The Complete Guide
              </h1>
              <p className="text-lg text-slate-300 max-w-3xl">
                End-to-end API testing validates complete workflows, not isolated endpoints. Learn how to
                chain requests, pass variables, handle auth, and run multi-step API tests in CI.
              </p>
            </div>
            {/* TODO: Add hero screenshot showing a multi-step flow graph in DevTools Studio */}

            {/* Intro */}
            <p className="text-slate-300 leading-relaxed">
              Testing a single endpoint tells you that one endpoint works. It does not tell you that your
              login flow issues a token, your create endpoint accepts that token, and your read endpoint
              returns the thing you just created. That is the gap end-to-end API testing fills.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This guide covers the full picture: what end-to-end API testing is, why isolated tests miss
              real bugs, how to structure multi-step test flows, and how to run them in CI without
              flakiness.
            </p>

            {/* Cluster post cards */}
            <div className="not-prose my-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 id="what-is-end-to-end-api-testing" className="text-3xl font-semibold text-white mb-4 mt-12">
              What is end-to-end API testing?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              End-to-end API testing validates a complete workflow by executing a sequence of dependent API
              calls, where the output of one request feeds into the next. The goal is to verify that the
              system works as a whole, not just one piece at a time.
            </p>
            <p className="text-slate-300 leading-relaxed">A typical end-to-end API test looks like this:</p>
            <ol className="text-slate-300 space-y-2">
              <li>
                <strong>Authenticate</strong> (POST <code>/auth/login</code>) and capture the token
              </li>
              <li>
                <strong>Create a resource</strong> (POST <code>/items</code>) using the token, capture the ID
              </li>
              <li>
                <strong>Read the resource</strong> (GET <code>/items/:id</code>) and assert the body matches
              </li>
              <li>
                <strong>Update the resource</strong> (PUT <code>/items/:id</code>) and verify changes
              </li>
              <li>
                <strong>Delete the resource</strong> (DELETE <code>/items/:id</code>)
              </li>
              <li>
                <strong>Confirm deletion</strong> (GET <code>/items/:id</code>) and assert 404
              </li>
            </ol>
            <p className="text-slate-300 leading-relaxed">
              Every step depends on data from a previous step: the token, the ID, the state of the resource.
              This chain of dependencies is exactly what isolated endpoint tests skip.
            </p>

            {/* TODO: Add screenshot showing a simple 6-step linear flow (Login→Create→Read→Update→Delete→Verify) */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              How it differs from other API test types
            </h3>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Test type</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Scope</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Dependencies</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">When to run</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Unit / contract</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Single endpoint shape</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">None</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Every commit</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Integration</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Two services talking</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Mocked or real, one hop</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Every commit</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>End-to-end</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Full multi-step workflow</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Real services, real data flow</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">PRs and merge to main</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300 leading-relaxed">
              End-to-end tests are slower and more complex than unit tests. That is the point. They catch the
              bugs that only appear when real services interact across a real workflow.
            </p>

            {/* Section 2 */}
            <h2 id="why-isolated-tests-miss-bugs" className="text-3xl font-semibold text-white mb-4 mt-12">
              Why isolated endpoint tests miss real bugs
            </h2>
            <p className="text-slate-300 leading-relaxed">
              An API can pass every single-endpoint test and still break in production. Here are the failure
              modes that only surface when you test the full chain.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Stale or invalid tokens</h3>
            <p className="text-slate-300 leading-relaxed">
              Your <code>/login</code> endpoint returns a valid token. Your <code>/items</code> endpoint
              accepts any well-formed token. Both pass individual tests. But in production, the token format
              changed last sprint and the items service rejects it. An end-to-end test that chains login into
              items catches this immediately.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Resource lifecycle bugs</h3>
            <p className="text-slate-300 leading-relaxed">
              Your create endpoint returns 201. Your read endpoint returns 200 for a known ID. Both pass. But
              the create endpoint writes to a cache that the read endpoint does not check, so freshly created
              resources return 404 for 30 seconds. Only the chained create-then-read test reveals this.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Side effects across services</h3>
            <p className="text-slate-300 leading-relaxed">
              Your payment endpoint charges the card and returns 200. Your order endpoint marks orders as
              paid. Both pass individually. But the payment service emits an event that the order service
              mishandles, leaving orders in a stuck state. The end-to-end flow (create order, pay, verify
              order status) is the only test that catches this.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">State assumptions</h3>
            <p className="text-slate-300 leading-relaxed">
              Endpoints that assume prior state, such as &quot;user has completed onboarding&quot; or &quot;cart is
              non-empty&quot;, work fine when you set up the state manually in each test. End-to-end tests force
              you to create that state through the actual API, which is how real users do it.
            </p>

            {/* Section 3 */}
            <h2 id="anatomy-of-a-real-test" className="text-3xl font-semibold text-white mb-4 mt-12">
              Anatomy of a real end-to-end API test
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Let us walk through a concrete example: testing a task management API.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">The workflow</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6">
              <code>{`Login → Create Project → Create Task → Assign Task → Complete Task → Verify Project Stats`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              Six requests. Each one depends on data from a previous step.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">The YAML flow</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`workspace_name: Task Management E2E

run:
  - flow: TaskLifecycle

flows:
  - name: TaskLifecycle
    variables:
      - name: run_id
        value: 'ci-001'
    steps:
      - request:
          name: Login
          method: POST
          url: {{BASE_URL}}/auth/login
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
              return {
                token: ctx.Login.response.body.access_token,
                user_id: ctx.Login.response.body.user.id
              };
            }
          depends_on: Login
      - request:
          name: CreateProject
          method: POST
          url: {{BASE_URL}}/api/projects
          headers:
            Authorization: Bearer {{Auth.token}}
            Content-Type: application/json
          body:
            name: 'CI Test Project {{run_id}}'
          depends_on: Auth
      - js:
          name: Project
          code: |
            export default function(ctx) {
              if (ctx.CreateProject?.response?.status !== 201) throw new Error("Create project failed");
              return { id: ctx.CreateProject.response.body.id };
            }
          depends_on: CreateProject
      - request:
          name: CreateTask
          method: POST
          url: {{BASE_URL}}/api/projects/{{Project.id}}/tasks
          headers:
            Authorization: Bearer {{Auth.token}}
            Content-Type: application/json
          body:
            title: 'Verify deployment'
            priority: 'high'
          depends_on: Project
      - js:
          name: Task
          code: |
            export default function(ctx) {
              if (ctx.CreateTask?.response?.status !== 201) throw new Error("Create task failed");
              return { id: ctx.CreateTask.response.body.id };
            }
          depends_on: CreateTask
      - request:
          name: AssignTask
          method: PUT
          url: {{BASE_URL}}/api/tasks/{{Task.id}}/assign
          headers:
            Authorization: Bearer {{Auth.token}}
            Content-Type: application/json
          body:
            assignee_id: '{{Auth.user_id}}'
          depends_on: Task
      - js:
          name: VerifyAssignment
          code: |
            export default function(ctx) {
              const body = ctx.AssignTask?.response?.body;
              if (body?.assignee?.id !== ctx.Auth?.user_id) throw new Error("Assignee mismatch");
              return { verified: true };
            }
          depends_on: AssignTask
      - request:
          name: CompleteTask
          method: PUT
          url: {{BASE_URL}}/api/tasks/{{Task.id}}/status
          headers:
            Authorization: Bearer {{Auth.token}}
            Content-Type: application/json
          body:
            status: 'completed'
          depends_on: VerifyAssignment
      - request:
          name: VerifyProjectStats
          method: GET
          url: {{BASE_URL}}/api/projects/{{Project.id}}/stats
          headers:
            Authorization: Bearer {{Auth.token}}
          depends_on: CompleteTask
      - js:
          name: ValidateStats
          code: |
            export default function(ctx) {
              const stats = ctx.VerifyProjectStats?.response?.body;
              if (stats?.total_tasks !== 1) throw new Error("Expected 1 total task");
              if (stats?.completed_tasks !== 1) throw new Error("Expected 1 completed task");
              return { passed: true };
            }
          depends_on: VerifyProjectStats`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              Every JS node serves a dual purpose: it extracts values for downstream steps (referenced as{' '}
              <code>{'{{Auth.token}}'}</code>, <code>{'{{Project.id}}'}</code>,{' '}
              <code>{'{{Task.id}}'}</code>) and validates the response at that point in the workflow. If any
              step throws, the flow stops with a clear error message.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">What to extract vs. what to validate</h3>
            <p className="text-slate-300 leading-relaxed">
              <strong>Extract</strong> (via JS nodes) the values you need downstream: tokens, IDs, cursors.
              Keep extraction minimal. If you extract 20 values but only use 3, the flow is harder to read.
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong>Validate</strong> the contract at each step, not the full response body. Status codes,
              the presence of key fields, and business invariants (assignee matches, counts are correct).
              Avoid asserting on timestamps, generated IDs, or other non-deterministic values.
            </p>

            {/* Section 4 */}
            <h2 id="variable-passing" className="text-3xl font-semibold text-white mb-4 mt-12">
              Variable passing between steps
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Variable passing is the core mechanic of end-to-end API testing. Every chain depends on it, and
              most flakiness comes from getting it wrong.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Common variable types</h3>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Variable</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Source</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Used by</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Pitfall</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Auth token</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Login response body</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Every subsequent request header</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Token expiration during long test suites</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Resource ID</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Create response body or Location header</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Read, update, delete requests</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Nested IDs vs. top-level IDs</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Pagination cursor</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">List response body</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Next page request query param</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Cursor depends on sort order</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">CSRF token</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Bootstrap response header or body</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Mutation request header</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Token rotates per session</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Upload URL</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Presigned URL response</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">File upload request</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">URL expires quickly</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              How passing works in DevTools YAML flows
            </h3>
            <p className="text-slate-300 leading-relaxed">
              In tools like Postman, variable passing happens through <code>pm.environment.set()</code> in
              pre-request scripts, which is a side effect hidden inside a JavaScript tab. In DevTools YAML
              flows, the pattern is explicit: a JS node extracts values and subsequent steps reference them:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# JS node extracts the token from the login response
- js:
    name: Auth
    code: |
      export default function(ctx) {
        return { token: ctx.Login?.response?.body?.access_token };
      }
    depends_on: Login

# Subsequent request references the extracted value
- request:
    name: GetProfile
    method: GET
    url: {{BASE_URL}}/api/me
    headers:
      Authorization: Bearer {{Auth.token}}
    depends_on: Auth`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              The extraction (JS node) and consumption (<code>{'{{Auth.token}}'}</code> in the header) are
              both visible in the YAML. A reviewer can trace the data flow without opening a UI.
            </p>

            {/* TODO: Add screenshot showing variable auto-mapping UI in DevTools Flows */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Auto-mapping with Flows</h3>
            <p className="text-slate-300 leading-relaxed">
              DevTools Flows auto-detects when a value from one response appears in a subsequent request. When
              you import a HAR or build a flow visually, the variable references are created automatically
              using the <code>{'{{ NodeName.response.body.field }}'}</code> syntax. You review and adjust them
              rather than wiring everything by hand.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This matters most for complex workflows with 10+ steps, where manual wiring is error-prone and
              time-consuming.
            </p>

            {/* Section 5 */}
            <h2 id="validation" className="text-3xl font-semibold text-white mb-4 mt-12">
              Validation in end-to-end flows
            </h2>
            <p className="text-slate-300 leading-relaxed">
              End-to-end tests need validation at multiple points, not just at the end.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Validate at every step</h3>
            <p className="text-slate-300 leading-relaxed">
              Do not wait until the last step to check if things worked. If step 3 of 6 silently returns an
              error, steps 4-6 will fail with confusing messages. Use JS nodes or <code>if</code> conditions
              to validate the basics at every step:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`- js:
    name: ValidateCreate
    code: |
      export default function(ctx) {
        const resp = ctx.CreateTask?.response;
        if (resp?.status !== 201) throw new Error("Expected 201, got " + resp?.status);
        if (!resp?.body?.id) throw new Error("Missing task ID in response");
        if (resp?.body?.title !== "Verify deployment") throw new Error("Title mismatch");
        return { task_id: resp.body.id };
      }
    depends_on: CreateTask`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              Or use an <code>if</code> node for simple status checks:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`- if:
    name: CheckCreate
    condition: CreateTask.response.status == 201
    then: AssignTask
    else: HandleError
    depends_on: CreateTask`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Contract validation vs. snapshot validation
            </h3>
            <p className="text-slate-300 leading-relaxed">
              <strong>Contract validation</strong> checks structure and invariants: status code, field
              presence, types, business rules. It survives minor API changes (new optional fields, reordered
              keys).
            </p>
            <p className="text-slate-300 leading-relaxed">
              <strong>Snapshot validation</strong> checks the exact response body. It breaks on every change,
              which is useful for detecting unintended regressions but noisy for evolving APIs.
            </p>
            <p className="text-slate-300 leading-relaxed">
              For end-to-end tests, prefer contract validation. You want to catch broken workflows, not fail
              because someone added an optional <code>updated_at</code> field.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Timing validation</h3>
            <p className="text-slate-300 leading-relaxed">
              End-to-end flows are a natural place to add performance budgets via JS nodes:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`- js:
    name: CheckSearchTiming
    code: |
      export default function(ctx) {
        const elapsed = ctx.Search?.response?.elapsed_ms;
        if (elapsed > 500) throw new Error("Search took " + elapsed + "ms, budget is 500ms");
        return { elapsed };
      }
    depends_on: Search`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              If the search step takes longer than 500ms, the flow fails. This catches performance regressions
              that single-endpoint tests might miss because the endpoint is fast in isolation but slow when
              preceded by auth and data setup.
            </p>

            {/* Section 6 */}
            <h2 id="running-in-ci" className="text-3xl font-semibold text-white mb-4 mt-12">
              Running end-to-end API tests in CI
            </h2>
            <p className="text-slate-300 leading-relaxed">
              End-to-end tests belong in CI, but they need more care than unit tests.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">When to run them</h3>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>On every PR</strong>: Run the core end-to-end flows. Catch regressions before merge.
              </li>
              <li>
                <strong>On merge to main</strong>: Run the full suite. Gate deployments on passing results.
              </li>
              <li>
                <strong>On schedule (optional)</strong>: Run against staging or production to catch environment
                drift.
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Do not run end-to-end tests on every commit to a feature branch. They are slower than unit tests
              and you do not want them blocking rapid iteration.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Environment setup</h3>
            <p className="text-slate-300 leading-relaxed">
              End-to-end tests need a real (or realistic) backend. Options:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Dedicated test environment</strong>: A staging instance that resets nightly. Simplest
                option.
              </li>
              <li>
                <strong>Ephemeral environment</strong>: Spun up per PR via Docker Compose or similar. Most
                isolated.
              </li>
              <li>
                <strong>Shared staging</strong>: Works if tests use unique data (run IDs, timestamps) to
                avoid conflicts.
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">
              Inject environment-specific values through environment references in your flow variables. Use{' '}
              <code>{'{{#env:VAR_NAME}}'}</code> to read from OS environment variables at runtime:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`flows:
  - name: MyFlow
    variables:
      - name: api_key
        value: '{{#env:SECRET_API_KEY}}'
      - name: run_id
        value: 'ci-20260214'
      - name: test_email
        value: 'test@example.com'`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">GitHub Actions example</h3>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`name: End-to-End API Tests
on:
  pull_request:
    branches: [main]

jobs:
  e2e-api-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://dev.tools/install.sh | sh

      - name: Run end-to-end flows
        run: devtools flow run tests/e2e/*.yaml --report junit

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: e2e-results
          path: reports/`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Dealing with flakiness</h3>
            <p className="text-slate-300 leading-relaxed">
              End-to-end tests are more flaky than unit tests because they touch real services. Common causes
              and fixes:
            </p>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Cause</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Fix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Token expiration during long suites</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Refresh tokens between flows, or use short-lived test credentials</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Shared data conflicts</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Use unique identifiers per run (RUN_ID in resource names)</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Race conditions</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Add explicit waits or polling steps for async operations</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Environment drift</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Pin dependency versions, use consistent seed data</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Network timeouts</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Set reasonable timeouts per step, not just globally</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The goal is not zero flakiness. The goal is that every failure maps to a real bug or a fixable
              environmental issue.
            </p>

            {/* Section 7 */}
            <h2 id="building-with-flows" className="text-3xl font-semibold text-white mb-4 mt-12">
              Building end-to-end tests with Flows
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Flows are visual, graph-based API test workflows. Instead of writing YAML by hand or scripting
              pre-request hooks, you build the workflow visually and let the tool handle variable wiring.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Why graphs work for end-to-end testing
            </h3>
            <p className="text-slate-300 leading-relaxed">
              A multi-step API test is a directed acyclic graph (DAG): some steps depend on others, some can
              run in parallel, and data flows from producers to consumers. A list of requests with scripts is
              an approximation. A graph is the actual structure.
            </p>
            <p className="text-slate-300 leading-relaxed">In DevTools Flows:</p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Nodes</strong> are steps: HTTP requests, conditions, loops, JavaScript transforms
              </li>
              <li>
                <strong>Edges</strong> are dependencies: explicit connections showing execution order via{' '}
                <code>depends_on</code>
              </li>
              <li>
                <strong>Variables</strong> are auto-mapped: when you reference{' '}
                <code>{'{{ Login.response.body.token }}'}</code> in a request header, the dependency edge is
                created automatically
              </li>
            </ul>

            {/* TODO: Add screenshot showing the visual flow graph with nodes, edges, and pass/fail status */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">What this looks like in practice</h3>
            <ol className="text-slate-300 space-y-2">
              <li>
                <strong>Import a HAR</strong> from a real browser session, or build from scratch
              </li>
              <li>
                <strong>The flow graph appears</strong> with requests as nodes and dependencies as edges
              </li>
              <li>
                <strong>Auto-mapped variables</strong> show which values flow between requests
              </li>
              <li>
                <strong>Add validation</strong> via JS nodes or <code>if</code> conditions at each step
              </li>
              <li>
                <strong>Add conditions or loops</strong> for retry logic, pagination, or error handling
              </li>
              <li>
                <strong>Export to YAML</strong> for Git review and CI execution
              </li>
              <li>
                <strong>Run locally or in CI</strong> with the DevTools CLI
              </li>
            </ol>
            <p className="text-slate-300 leading-relaxed">
              The visual graph and the YAML file are two views of the same test. Edit either one.
            </p>

            {/* TODO: Add screenshot showing parallel branches in a flow graph (Login → two parallel paths) */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Parallel execution</h3>
            <p className="text-slate-300 leading-relaxed">
              Flows analyze the dependency graph and automatically parallelize independent branches. If your
              auth flow produces a token, and then you need to test both the &quot;create project&quot; and
              &quot;list templates&quot; endpoints (which do not depend on each other), Flows runs them concurrently:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`Login
  ├── Create Project (parallel)
  └── List Templates (parallel)
        └── Verify Project Stats (waits for Create Project)`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              This cuts execution time without manual parallelization logic.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Conditions and loops</h3>
            <p className="text-slate-300 leading-relaxed">
              Real workflows are not always linear. DevTools YAML flows support these as first-class step
              types:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Conditions</strong> (<code>if</code>): If the create endpoint returns 409 (already
                exists), skip to the read step instead of failing
              </li>
              <li>
                <strong>Loops</strong> (<code>for</code>): Repeat a step N times, such as polling a status
                endpoint until the job completes
              </li>
              <li>
                <strong>For-each</strong> (<code>for_each</code>): Iterate over a list of items and validate
                each one
              </li>
            </ul>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`- if:
    name: CheckExists
    condition: CreateItem.response.status == 409
    then: GetItem
    else: HandleNew
    depends_on: CreateItem

- for:
    name: PollStatus
    iter_count: 10
    loop: CheckStatus
    depends_on: StartJob

- for_each:
    name: ValidateItems
    items: '[1, 2, 3, 4, 5]'
    loop: FetchItem
    depends_on: ListItems`}</code>
            </pre>

            {/* Section 8 */}
            <h2 id="common-pitfalls" className="text-3xl font-semibold text-white mb-4 mt-12">
              Common pitfalls in end-to-end API testing
            </h2>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Testing too much in one flow</h3>
            <p className="text-slate-300 leading-relaxed">
              A 30-step flow that covers login, CRUD, search, admin operations, and cleanup is hard to debug
              when it fails. Split workflows by business domain and use <code>run</code> with{' '}
              <code>depends_on</code> to orchestrate them:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`run:
  - flow: AuthFlow
  - flow: CrudFlow
    depends_on: AuthFlow
  - flow: SearchFlow
    depends_on: CrudFlow`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              Each flow should be independently runnable and independently debuggable.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Hardcoding test data</h3>
            <p className="text-slate-300 leading-relaxed">
              Hardcoded IDs, emails, and names will collide when tests run in parallel or on shared
              environments. Use:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                Run-specific identifiers: <code>{`'CI Test {{run_id}}'`}</code>
              </li>
              <li>Environment variables for credentials</li>
              <li>Setup steps that create fresh data and teardown steps that clean up</li>
            </ul>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Skipping cleanup</h3>
            <p className="text-slate-300 leading-relaxed">
              If your test creates resources and does not delete them, the test environment accumulates
              garbage. Eventually, list endpoints slow down, unique constraints fail, and tests break for
              reasons unrelated to code changes.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Add teardown steps. Include delete requests at the end of each flow that remove the resources
              created during the test.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Validating non-deterministic values
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Timestamps, auto-incremented IDs, and random UUIDs will differ on every run. Validate in JS
              nodes using:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                Presence and type:{' '}
                <code>{`if (!body?.created_at) throw new Error("missing created_at")`}</code>
              </li>
              <li>
                Pattern matching:{' '}
                <code>{`if (!/^[0-9a-f-]{36}$/.test(body?.id)) throw new Error("invalid UUID")`}</code>
              </li>
              <li>
                Relative values: compare <code>updated_at</code> is after <code>created_at</code>
              </li>
            </ul>
            <p className="text-slate-300 leading-relaxed">Not exact values.</p>

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
              Start testing workflows, not just endpoints
            </h2>
            <p className="text-slate-300 leading-relaxed">
              If your API tests pass but your users still hit bugs, the gap is almost always in the spaces
              between endpoints: the token that expires, the ID that does not carry over, the side effect that
              never fires.
            </p>
            <p className="text-slate-300 leading-relaxed">
              End-to-end API testing closes that gap. Chain requests, pass real data between steps, validate
              at every point, and run the whole workflow in CI.
            </p>
            <p className="text-slate-300 leading-relaxed">
              DevTools Flows makes this visual: build the graph, auto-map the variables, export to YAML, run
              in CI. Try it at{' '}
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
                  End-to-End Testing
                </span>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Build end-to-end API tests visually
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Turn multi-step API workflows into visual Flows with auto-mapped variables. Export to YAML,
                  run in CI.
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
                  Run end-to-end flows in CI
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Export your flow to YAML and run it in GitHub Actions with JUnit reports and parallel
                  execution.
                </p>
                <div className="space-y-3">
                  <Link
                    href="https://dev.tools/docs/how-to/ci-integrations/"
                    className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                  >
                    CI integrations
                  </Link>
                  <Link
                    href="https://dev.tools/templates/github-actions/"
                    className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                  >
                    GitHub Actions template
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
