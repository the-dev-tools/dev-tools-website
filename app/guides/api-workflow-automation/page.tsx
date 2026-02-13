import Link from 'next/link'
import type { Metadata } from 'next'
import StickyTOC from '@/components/ui/StickyTOC'

export const metadata: Metadata = {
  title: 'API Workflow Automation: Testing Multi-Step Business Logic',
  description:
    'Test multi-step API workflows: auth, CRUD lifecycles, conditional branching, data passing, error handling, and cleanup. Build flows visually or as YAML, run in CI.',
  alternates: { canonical: '/guides/api-workflow-automation/' },
  openGraph: {
    title: 'API Workflow Automation: Testing Multi-Step Business Logic',
    description:
      'Test multi-step API workflows: auth, CRUD lifecycles, conditional branching, data passing, error handling, and cleanup. Build flows visually or as YAML, run in CI.',
    url: 'https://dev.tools/guides/api-workflow-automation/',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Workflow Automation: Testing Multi-Step Business Logic',
    description:
      'Test multi-step API workflows: auth, CRUD lifecycles, conditional branching, data passing, error handling, and cleanup. Build flows visually or as YAML, run in CI.',
  },
}

const tocItems = [
  { id: 'what-is-workflow-testing', label: 'What is workflow testing' },
  { id: 'workflow-patterns', label: 'Real-world workflow patterns' },
  { id: 'data-passing', label: 'Data passing between steps' },
  { id: 'branching-and-errors', label: 'Branching and error handling' },
  { id: 'building-visually', label: 'Building workflows visually' },
  { id: 'faq', label: 'FAQ' },
]

const clusterPosts = [
  {
    href: '/blog/how-to-build-end-to-end-api-test-login-create-verify-delete/',
    title: 'How to Build an End-to-End API Test: Login, Create, Verify, Delete',
    summary:
      'Step-by-step tutorial building a 6-step flow with auth, CRUD, validation, and cleanup. Full YAML and visual examples.',
  },
  {
    href: '/blog/har-yaml-api-test-flow-auto-extract-variables-chain-requests/',
    title: 'HAR to YAML API Test Flow: Auto-Extract Variables + Chain Requests',
    summary:
      'Turn real browser traffic into a deterministic YAML flow with auto-mapped tokens, IDs, and explicit request chaining.',
  },
]

const faqData = [
  {
    question: 'What is the difference between a workflow test and an end-to-end test?',
    answer:
      'They overlap significantly. An end-to-end API test validates a complete user journey (login, action, verify). A workflow test is the same concept but emphasizes the multi-step structure: data passing, branching, error handling, and cleanup as first-class concerns. In DevTools, both are built as Flows.',
  },
  {
    question: 'How many steps should a workflow have?',
    answer:
      'Most useful workflows have 4-12 steps. Fewer than 4 means you are probably testing a single endpoint, not a workflow. More than 15-20 becomes hard to debug when something fails. Split large workflows into focused flows that test one business path each.',
  },
  {
    question: 'Can workflows handle async operations like webhooks?',
    answer:
      'Yes, using polling patterns. After triggering an async operation, add a for loop that polls a status endpoint until the expected state appears or a timeout is reached. For webhook testing, poll the webhook delivery log or use a test endpoint that records deliveries.',
  },
  {
    question: 'Should I build workflows visually or write YAML by hand?',
    answer:
      'Both work. The visual editor is faster for initial flow creation and for complex branching. YAML editing is faster for small tweaks and refactoring. The visual graph and YAML are two views of the same flow — edit either one. Many teams build visually and refine in YAML.',
  },
  {
    question: 'How do I test the same workflow against different environments?',
    answer:
      'Parameterize the base URL and credentials using environment variables. In YAML, use {{#env:VAR_NAME}} to read from OS environment. In CI, inject different values per environment via your platform secret store. The workflow definition stays the same; only the environment changes.',
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
    headline: 'API Workflow Automation: Testing Multi-Step Business Logic',
    description:
      'Test multi-step API workflows: auth, CRUD lifecycles, conditional branching, data passing, error handling, and cleanup. Build flows visually or as YAML, run in CI.',
    author: { '@type': 'Organization', name: 'DevTools Team' },
    publisher: { '@type': 'Organization', name: 'DevTools' },
    datePublished: '2026-02-14',
    dateModified: '2026-02-14',
  }

  return [faqSchema, articleSchema]
}

export default function ApiWorkflowAutomationPage() {
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
                API Workflow Automation: Testing Multi-Step Business Logic
              </h1>
              <p className="text-lg text-slate-300 max-w-3xl">
                Real API behavior is not a single request and response. It is a workflow: authenticate,
                create a resource, verify it exists, update it, delete it, confirm it is gone. Each step
                depends on the last. A <strong>Flow</strong> is the structure that makes these multi-step
                workflows testable, repeatable, and automatable.
              </p>
            </div>
            {/* TODO: Add hero screenshot showing a visual Flow graph with connected request nodes and data passing arrows */}

            {/* Intro */}
            <p className="text-slate-300 leading-relaxed">
              Single-endpoint API tests verify that one request returns the right response. That catches
              syntax errors and basic contract violations. It does not catch the bugs that matter most:
              broken authentication chains, create-then-read inconsistencies, failed cascading deletes,
              or race conditions between dependent operations.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Workflow testing is the practice of testing <em>sequences</em> of API calls where each step
              produces data that the next step consumes. The test validates the entire business path, not
              just individual endpoints. In DevTools, this is called a <strong>Flow</strong>: a directed
              graph of requests, validations, conditions, and loops that execute in dependency order.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This guide covers what workflow testing is, the common patterns that cover most real-world
              APIs, how data passes between steps, how to handle branching and errors, and how to build
              workflows both visually and as YAML.
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
            <h2 id="what-is-workflow-testing" className="text-3xl font-semibold text-white mb-4 mt-12">
              What is workflow testing?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Workflow testing validates a complete business operation across multiple API calls. The key
              distinction from single-endpoint testing: <strong>data flows between steps</strong>. The
              response from step 1 feeds the request in step 2. If any link in the chain breaks, the
              workflow fails.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Single-endpoint vs workflow testing
            </h3>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Dimension</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Single-endpoint test</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Workflow test (Flow)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Scope</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">One request, one response</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Multiple requests, chained data</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Auth</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Hardcoded token or pre-configured</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Login step produces token, downstream steps use it</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Data</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Static fixture</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Generated IDs, tokens, cursors flow between steps</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Cleanup</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Manual or external</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Delete step at the end of the flow</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Bugs caught</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Contract violations, status codes</td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Chain breaks, auth failures, consistency bugs, cascade errors</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">What a Flow looks like</h3>
            <p className="text-slate-300 leading-relaxed">
              A Flow is a directed graph where each node is either a request, a JavaScript validation, a
              condition, or a loop. Edges between nodes represent data dependencies: &quot;this step needs
              the output of that step.&quot; In YAML, this is expressed with <code>depends_on</code> and
              variable references like <code>{'{{Auth.token}}'}</code> or{' '}
              <code>{'{{CreateOrder.response.body.id}}'}</code>.
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# A minimal workflow: authenticate → create → verify → cleanup
Login → Auth (extract token)
           ↓
  CreateOrder (uses Auth.token)
     → ValidateCreate (extract orderId)
           ↓
  GetOrder (uses Auth.token, orderId)
     → VerifyRead (validate response)
           ↓
  DeleteOrder (uses Auth.token, orderId)
     → ConfirmGone (verify 404)`}</code>
            </pre>

            {/* Section 2 */}
            <h2 id="workflow-patterns" className="text-3xl font-semibold text-white mb-4 mt-12">
              Real-world workflow patterns
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Most API workflows fall into a handful of patterns. Each pattern has a consistent structure:
              authenticate, act, validate, and clean up. The differences are in what happens between auth
              and cleanup.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Pattern 1: CRUD lifecycle (the foundation)
            </h3>
            <p className="text-slate-300 leading-relaxed">
              The most common workflow: create a resource, read it back, update it, delete it, confirm
              it is gone. This covers 80% of API testing needs.
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`workspace_name: Order Lifecycle

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

      - js:
          name: Auth
          code: |
            export default function(ctx) {
              if (ctx.Login?.response?.status !== 200) throw new Error("Login failed");
              return { token: ctx.Login.response.body.access_token };
            }
          depends_on: Login

      - request:
          name: CreateOrder
          method: POST
          url: '{{BASE_URL}}/api/orders'
          headers:
            Authorization: 'Bearer {{Auth.token}}'
            Content-Type: application/json
          body:
            items:
              - sku: 'WIDGET-001'
                qty: 2
          depends_on: Auth

      - js:
          name: Order
          code: |
            export default function(ctx) {
              const resp = ctx.CreateOrder?.response;
              if (resp?.status !== 201) throw new Error("Expected 201");
              if (!resp?.body?.id) throw new Error("Missing order ID");
              return { id: resp.body.id };
            }
          depends_on: CreateOrder

      - request:
          name: GetOrder
          method: GET
          url: '{{BASE_URL}}/api/orders/{{Order.id}}'
          headers:
            Authorization: 'Bearer {{Auth.token}}'
          depends_on: Order

      - js:
          name: VerifyRead
          code: |
            export default function(ctx) {
              if (ctx.GetOrder?.response?.status !== 200) throw new Error("Read failed");
              if (ctx.GetOrder?.response?.body?.items?.length !== 1) throw new Error("Items mismatch");
              return { verified: true };
            }
          depends_on: GetOrder

      - request:
          name: DeleteOrder
          method: DELETE
          url: '{{BASE_URL}}/api/orders/{{Order.id}}'
          headers:
            Authorization: 'Bearer {{Auth.token}}'
          depends_on: VerifyRead

      - request:
          name: VerifyGone
          method: GET
          url: '{{BASE_URL}}/api/orders/{{Order.id}}'
          headers:
            Authorization: 'Bearer {{Auth.token}}'
          depends_on: DeleteOrder

      - js:
          name: ConfirmDeleted
          code: |
            export default function(ctx) {
              if (ctx.VerifyGone?.response?.status !== 404) throw new Error("Still exists");
              return { deleted: true };
            }
          depends_on: VerifyGone`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              Two variables flow through the entire chain: <code>{'{{Auth.token}}'}</code> for
              authorization and <code>{'{{Order.id}}'}</code> for the resource. Every step validates its
              response before the next step runs. The delete + verify-gone ensures cleanup.
            </p>
            <p className="text-slate-300 leading-relaxed">
              For a detailed walkthrough of each step, see:{' '}
              <Link href="/blog/how-to-build-end-to-end-api-test-login-create-verify-delete/" className="text-neon hover:underline">
                How to Build an End-to-End API Test: Login, Create, Verify, Delete
              </Link>.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Pattern 2: Payment flow (multi-resource orchestration)
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Payment workflows touch multiple resources: create a cart, add items, apply a discount,
              submit payment, verify the order. Each step produces IDs or tokens consumed by later steps.
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Payment flow structure (simplified)
steps:
  - request: { name: Login, ... }
  - js: { name: Auth, ..., depends_on: Login }
  - request: { name: CreateCart, ..., depends_on: Auth }
  - js: { name: Cart, ..., depends_on: CreateCart }     # extract cartId
  - request: { name: AddItem, ..., depends_on: Cart }    # uses cartId
  - request: { name: ApplyDiscount, ..., depends_on: AddItem }
  - request: { name: SubmitPayment, ..., depends_on: ApplyDiscount }
  - js: { name: Payment, ..., depends_on: SubmitPayment }  # extract paymentId
  - request: { name: GetReceipt, ..., depends_on: Payment }  # uses paymentId
  - js: { name: VerifyReceipt, ..., depends_on: GetReceipt }`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              The chain is longer but the principle is identical: each step references outputs from
              previous steps. The key variables are <code>Auth.token</code>, <code>Cart.cartId</code>,
              and <code>Payment.paymentId</code>.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Pattern 3: User onboarding (multi-API orchestration)
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Onboarding workflows often span multiple APIs: create user in auth service, provision
              resources in a second service, send a welcome email via a third. The test validates that
              all three services coordinate correctly.
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Multi-service onboarding
steps:
  - request: { name: AdminLogin, ... }
  - js: { name: AdminAuth, ..., depends_on: AdminLogin }
  - request: { name: CreateUser, ..., depends_on: AdminAuth }
  - js: { name: NewUser, ..., depends_on: CreateUser }    # extract userId
  - request: { name: ProvisionWorkspace, ..., depends_on: NewUser }  # uses userId
  - js: { name: Workspace, ..., depends_on: ProvisionWorkspace }  # extract workspaceId
  - request: { name: CheckEmail, ..., depends_on: Workspace }  # verify welcome email sent
  - request: { name: UserLogin, ..., depends_on: Workspace }  # new user can log in
  - js: { name: VerifyAccess, ..., depends_on: UserLogin }  # verify workspace access`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">
              Pattern 4: Webhook chain (async verification)
            </h3>
            <p className="text-slate-300 leading-relaxed">
              For async operations (webhook delivery, job processing, event propagation), the workflow
              triggers an action and then polls until the expected outcome appears.
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Webhook delivery verification
steps:
  - request: { name: TriggerEvent, ..., depends_on: Auth }
  - for:
      name: PollDelivery
      iter_count: 10
      loop: CheckDeliveryStatus
      depends_on: TriggerEvent
  - js:
      name: VerifyDelivered
      code: |
        export default function(ctx) {
          const status = ctx.CheckDeliveryStatus?.response?.body?.status;
          if (status !== 'delivered') throw new Error("Not delivered: " + status);
          return { delivered: true };
        }
      depends_on: PollDelivery`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              The <code>for</code> loop polls up to 10 times. When the delivery status changes to
              &quot;delivered,&quot; the validation passes. If it never appears, the loop exhausts and
              the verification fails.
            </p>

            {/* TODO: Add screenshot showing a visual Flow graph for the CRUD lifecycle pattern */}

            {/* Section 3 */}
            <h2 id="data-passing" className="text-3xl font-semibold text-white mb-4 mt-12">
              Data passing between steps
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Data passing is what makes a collection of requests into a workflow. Without it, each
              request is independent. With it, the output of one step feeds the input of the next.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Three ways to pass data</h3>
            <div className="not-prose overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-white/10 text-sm">
                <thead className="bg-slate-800/50">
                  <tr className="border-b border-white/10">
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Method</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Syntax</th>
                    <th className="px-4 py-3 text-left font-semibold text-white border border-white/10">Best for</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Direct response reference</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>{'{{Login.response.body.token}}'}</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Simple values from a previous response</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>JS node extraction</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>{'{{Auth.token}}'}</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Validated/transformed values, cleaner downstream references</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><strong>Environment variable</strong></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10"><code>{'{{#env:VAR_NAME}}'}</code></td>
                    <td className="px-4 py-3 text-slate-300 border border-white/10">Secrets, base URLs, CI-injected configuration</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Direct reference vs JS extraction</h3>
            <p className="text-slate-300 leading-relaxed">
              Direct references (<code>{'{{Login.response.body.access_token}}'}</code>) are simpler but
              longer. JS extraction nodes (<code>{'{{Auth.token}}'}</code>) are better when you need to:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Validate before passing</strong>: check that the value exists and is the right
                type before downstream steps use it
              </li>
              <li>
                <strong>Transform the value</strong>: extract a nested field, combine values, or compute
                a derived value
              </li>
              <li>
                <strong>Simplify downstream references</strong>: <code>{'{{Auth.token}}'}</code> is easier
                to read than <code>{'{{Login.response.body.access_token}}'}</code> when used 5 times
              </li>
            </ul>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# JS extraction node: validates and simplifies the reference
- js:
    name: Auth
    code: |
      export default function(ctx) {
        const token = ctx.Login?.response?.body?.access_token;
        if (!token) throw new Error("No token in login response");
        return { token };
      }
    depends_on: Login

# Downstream steps use the clean reference
- request:
    name: CreateOrder
    headers:
      Authorization: 'Bearer {{Auth.token}}'
    depends_on: Auth

- request:
    name: GetProfile
    headers:
      Authorization: 'Bearer {{Auth.token}}'
    depends_on: Auth`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">The dependency graph</h3>
            <p className="text-slate-300 leading-relaxed">
              Every <code>depends_on</code> declaration and variable reference creates an edge in the
              dependency graph. The runtime resolves this graph and executes steps in topological order:
              a step runs only when all its dependencies have completed.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This means independent steps can run in parallel. If step C depends on A but not B, and
              step D depends on B but not A, then C and D can execute simultaneously. The graph
              determines the execution order, not the position in the YAML file.
            </p>

            {/* TODO: Add screenshot showing the variable reference auto-complete in DevTools Studio */}

            <p className="text-slate-300 leading-relaxed">
              For the complete variable syntax reference including auto-mapping from HAR imports, see:{' '}
              <Link href="/blog/har-yaml-api-test-flow-auto-extract-variables-chain-requests/" className="text-neon hover:underline">
                HAR to YAML: Auto-Extract Variables + Chain Requests
              </Link>.
            </p>

            {/* Section 4 */}
            <h2 id="branching-and-errors" className="text-3xl font-semibold text-white mb-4 mt-12">
              Conditional branching and error handling
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Not every workflow is a straight line. Real APIs return different statuses for the same
              operation (201 vs 409 for idempotent creates), require different paths based on response
              data, and need graceful handling when steps fail.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Conditional branching with if nodes</h3>
            <p className="text-slate-300 leading-relaxed">
              The <code>if:</code> step type routes execution based on a condition:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Handle idempotent create: 201 (new) vs 409 (already exists)
- request:
    name: CreateItem
    method: POST
    url: '{{BASE_URL}}/api/items'
    headers:
      Authorization: 'Bearer {{Auth.token}}'
      Content-Type: application/json
    body:
      name: 'test-item-{{run_id}}'
    depends_on: Auth

- if:
    name: CheckCreate
    condition: CreateItem.response.status == 201
    then: UseNewItem
    else: FetchExisting
    depends_on: CreateItem

# Path A: item was created
- js:
    name: UseNewItem
    code: |
      export default function(ctx) {
        return { itemId: ctx.CreateItem.response.body.id };
      }

# Path B: item already exists, fetch it
- request:
    name: FetchExisting
    method: GET
    url: '{{BASE_URL}}/api/items?name=test-item-{{run_id}}'
    headers:
      Authorization: 'Bearer {{Auth.token}}'

- js:
    name: UseExisting
    code: |
      export default function(ctx) {
        return { itemId: ctx.FetchExisting.response.body.items[0].id };
      }
    depends_on: FetchExisting`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Loops for polling and iteration</h3>
            <p className="text-slate-300 leading-relaxed">
              Two loop types handle repetitive operations:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong><code>for:</code></strong> — repeat a step N times. Use for polling a status
                endpoint or retrying an operation with backoff.
              </li>
              <li>
                <strong><code>for_each:</code></strong> — iterate over a list of items. Use for
                processing batch results, creating multiple resources, or validating each item in a
                collection.
              </li>
            </ul>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Poll until a job completes (max 10 attempts)
- for:
    name: WaitForJob
    iter_count: 10
    loop: CheckJobStatus
    depends_on: StartJob

# Process each item in a list response
- for_each:
    name: ValidateItems
    items: ListItems.response.body.items
    loop: ValidateSingleItem
    depends_on: ListItems`}</code>
            </pre>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Error handling: fail fast, fail clear</h3>
            <p className="text-slate-300 leading-relaxed">
              The best error handling in workflow tests is not try/catch. It is fail-fast validation at
              every step:
            </p>
            <ul className="text-slate-300 space-y-2">
              <li>
                <strong>Validate after every important request</strong>: a JS node that checks status and
                required fields. If it throws, the flow stops and the error message tells you exactly
                which step failed and why.
              </li>
              <li>
                <strong>Use meaningful error messages</strong>: <code>{`throw new Error("Expected 201, got " + resp?.status)`}</code>{' '}
                is actionable. <code>throw new Error(&quot;fail&quot;)</code> is not.
              </li>
              <li>
                <strong>Always clean up</strong>: if your flow creates test data, add a delete step at
                the end. If the flow fails mid-way, run a separate cleanup flow or use unique resource
                names that can be garbage-collected.
              </li>
            </ul>

            {/* Section 5 */}
            <h2 id="building-visually" className="text-3xl font-semibold text-white mb-4 mt-12">
              Building workflows visually
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Writing YAML by hand works for simple workflows. For flows with 10+ steps, conditional
              branches, and loops, a visual editor is faster. DevTools Flows provides a canvas where you
              drag request nodes, draw dependency edges, and configure each step. The visual graph and
              the YAML are two representations of the same flow. Edit either one.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">The visual workflow</h3>
            <ol className="text-slate-300 space-y-2">
              <li>
                <strong>Create a Flow</strong>: open DevTools Studio, click New Flow. You start with a
                canvas and a Start node.
              </li>
              <li>
                <strong>Add request nodes</strong>: drag HTTP Request nodes onto the canvas for each API
                call in your workflow.
              </li>
              <li>
                <strong>Connect them</strong>: draw edges from each node to the next. This sets execution
                order via <code>depends_on</code>.
              </li>
              <li>
                <strong>Configure requests</strong>: click each node, fill in method, URL, headers, body.
                Variable references like <code>{'{{Login.response.body.access_token}}'}</code> create
                data dependencies automatically.
              </li>
              <li>
                <strong>Add validation</strong>: insert JS nodes between steps to validate responses and
                extract values. Or use <code>if</code> nodes for status-based routing.
              </li>
              <li>
                <strong>Run</strong>: click Run Flow. Each node shows green (pass) or red (fail). Click
                any node to inspect its request, response, and validation output.
              </li>
              <li>
                <strong>Export to YAML</strong>: right-click → Export to YAML. The result is
                commit-ready for Git and CI.
              </li>
            </ol>

            {/* TODO: Add screenshot showing the DevTools Flows visual canvas with a CRUD lifecycle flow */}

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Starting from real traffic</h3>
            <p className="text-slate-300 leading-relaxed">
              Instead of building from scratch, import a HAR file from a real browser session. DevTools
              converts the HTTP traffic into a Flow with auto-mapped variables. You review the generated
              graph, delete noise (analytics, third-party requests), and refine the variable references.
            </p>
            <p className="text-slate-300 leading-relaxed">
              This is the fastest path from &quot;I have a working workflow in the browser&quot; to
              &quot;I have an automated test in Git.&quot; For the full pipeline, see:{' '}
              <Link href="/blog/har-yaml-api-test-flow-auto-extract-variables-chain-requests/" className="text-neon hover:underline">
                HAR to YAML: Auto-Extract Variables + Chain Requests
              </Link>.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Running in CI</h3>
            <p className="text-slate-300 leading-relaxed">
              Once the YAML is committed, run it in CI like any other test:
            </p>
            <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto mb-6 text-sm">
              <code>{`# Run locally
devtools flow run tests/workflows/order-lifecycle.yaml

# Run in GitHub Actions with JUnit reporting
devtools flow run tests/workflows/*.yaml --report junit`}</code>
            </pre>
            <p className="text-slate-300 leading-relaxed">
              For the full CI setup with parallel runs, caching, and artifact uploads, see:{' '}
              <Link href="/guides/api-testing-ci-cd" className="text-neon hover:underline">
                API Testing in CI/CD: From Manual Clicks to Automated Pipelines
              </Link>.
            </p>

            {/* Common Pitfalls */}
            <h2 className="text-3xl font-semibold text-white mb-4 mt-12">
              Common pitfalls
            </h2>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Missing extraction nodes</h3>
            <p className="text-slate-300 leading-relaxed">
              If a request produces data you need downstream (a token, an ID), you must add a JS node
              to extract it. Subsequent steps reference the JS node&apos;s output, not the raw response.
              Missing this step means the variable is undefined and the flow fails with a cryptic error
              several steps later.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Validating only at the end</h3>
            <p className="text-slate-300 leading-relaxed">
              If you only validate at the last step, a failure in step 2 produces a confusing error in
              step 6. Add a validation node after each important request. Failures should be immediately
              attributable to the step that broke.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Hardcoded IDs and tokens</h3>
            <p className="text-slate-300 leading-relaxed">
              Replacing <code>{'{{Order.id}}'}</code> with a hardcoded UUID makes the test pass once and
              break everywhere else. Always extract IDs from the response that created them. Always
              obtain tokens from the login step.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-3 mt-6">Skipping cleanup</h3>
            <p className="text-slate-300 leading-relaxed">
              If your flow creates data and does not clean up, repeated runs accumulate garbage. List
              endpoints slow down, unique constraints fail, and tests break for environmental reasons.
              Always delete what you created.
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
              Start with one workflow
            </h2>
            <p className="text-slate-300 leading-relaxed">
              You do not need a comprehensive workflow suite on day one. Pick the single most important
              business path in your API: likely auth + CRUD for your core resource. Build it as a Flow,
              run it locally, export to YAML, and add it to CI. That single workflow, running on every
              PR, catches more bugs than a hundred isolated endpoint tests that nobody remembers to run.
            </p>
            <p className="text-slate-300 leading-relaxed">
              DevTools is built for this: visual Flow builder, HAR import, YAML export, CI runner.{' '}
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
                  Workflow automation
                </span>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Build API workflows visually
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Drag request nodes, connect dependencies, auto-map variables. Export to YAML for Git
                  and CI.
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
                  Start from real traffic
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Import a HAR file from a browser session. DevTools generates a Flow with auto-mapped
                  variables.
                </p>
                <div className="space-y-3">
                  <Link
                    href="https://dev.tools/docs/how-to/import-har/"
                    className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
                  >
                    Import HAR
                  </Link>
                  <Link
                    href="/guides/end-to-end-api-testing"
                    className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
                  >
                    E2E testing guide
                  </Link>
                </div>
              </div>

              {/* Templates CTA */}
              <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
                <h4 className="text-sm font-semibold text-white mb-2">
                  Copy-paste workflow templates
                </h4>
                <p className="text-xs text-slate-300 mb-3">
                  JWT auth, OAuth, CRUD lifecycle, GitHub Actions CI.
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
