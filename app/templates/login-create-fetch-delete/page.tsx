import Link from 'next/link'

export const metadata = {
  title: 'Template: login → create → fetch → delete (YAML)',
  description: 'Common CRUD‑style workflow as a YAML flow with variable mapping.',
  alternates: { canonical: '/templates/login-create-fetch-delete' },
}

export default function TemplateCRUD() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">Login → Create → Fetch → Delete</h1>
      {/* What this template does */}
      <p className="text-slate-300 mb-6">
        This end-to-end CRUD flow logs in, creates a resource, reads it back, and deletes it. Use it to validate
        critical user journeys and keep common operations green in CI.
      </p>

      {/* Required env vars */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Required env vars</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><code className="bg-slate-900/50 px-1 rounded">EMAIL</code> (CI secret)</li>
          <li><code className="bg-slate-900/50 px-1 rounded">PASSWORD</code> (CI secret)</li>
          <li>Optional: <code className="bg-slate-900/50 px-1 rounded">API</code> base URL per environment</li>
        </ul>
      </div>

      {/* How to run */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">How to run it</h2>
        <pre className="bg-slate-900/50 border border-white/10 rounded p-3 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`devtools flow run crud-example.yaml`}</code></pre>
      </div>

      {/* TODO enrichment */}
      <div className="rounded-lg border border-white/10 bg-amber-500/10 p-4 mb-8">
        <strong className="text-amber-300">TODO:</strong>
        <ul className="list-disc pl-5 text-amber-200 mt-2">
          <li>Add a diagram/screenshot showing ID and token mapping between steps.</li>
          <li>Short clip of the flow running successfully end-to-end.</li>
        </ul>
      </div>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`# crud-example.yaml
version: 1
name: CRUD example
env:
  API: https://api.example.com
  EMAIL: {{#env:EMAIL}}
  PASSWORD: {{#env:PASSWORD}}

requests:
  - id: login
    method: POST
    url: {{ env.API }}/login
    body:
      json:
        email: {{ env.EMAIL }}
        password: {{ env.PASSWORD }}
    expect:
      - status: 200

  - id: create_item
    method: POST
    url: {{ env.API }}/items
    headers:
      Authorization: Bearer {{ login.response.body.token }}
    body:
      json:
        name: Test Item
    expect:
      - status: 201

  - id: get_item
    method: GET
    url: {{ env.API }}/items/{{ create_item.response.body.id }}
    headers:
      Authorization: Bearer {{ login.response.body.token }}
    expect:
      - status: 200

  - id: delete_item
    method: DELETE
    url: {{ env.API }}/items/{{ create_item.response.body.id }}
    headers:
      Authorization: Bearer {{ login.response.body.token }}
    expect:
      - status: 204
`}</code></pre>

      {/* What to change */}
      <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">What to change</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Endpoints: <code className="bg-slate-900/50 px-1 rounded">/login</code> and <code className="bg-slate-900/50 px-1 rounded">/items</code>.</li>
          <li>Token path: <code className="bg-slate-900/50 px-1 rounded">login.response.body.token</code>.</li>
          <li>Resource ID path: <code className="bg-slate-900/50 px-1 rounded">create_item.response.body.id</code>.</li>
          <li>Add body/schema assertions for created and fetched resource.</li>
        </ul>
      </div>

      {/* Common variations */}
      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Common variations</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Create → update → fetch → delete workflow.</li>
          <li>Pagination when verifying list endpoints.</li>
          <li>Retries/backoff on flaky write operations.</li>
          <li>Data setup/teardown via fixtures or sub-flows.</li>
        </ul>
      </div>

      {/* Helpful links */}
      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Links</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><Link className="underline" href="/docs/how-to/working-with-flows">Working with flows</Link></li>
          <li><Link className="underline" href="/docs/how-to/environments-and-variables">Variables in flows</Link></li>
          <li><Link className="underline" href="/docs/how-to/ci-integrations">CI/CD integrations</Link></li>
        </ul>
      </div>
    </main>
  )
}
