import Link from 'next/link'

export const metadata = {
  title: 'Template: JWT Auth flow (YAML)',
  description: 'YAML flow template for logging in and using a JWT for authenticated requests.',
  alternates: { canonical: '/templates/auth-jwt' },
}

export default function TemplateAuthJWT() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">JWT Auth flow</h1>
      {/* What this template does */}
      <p className="text-slate-300 mb-6">
        This flow logs in, captures a JWT from the response, and uses it in a follow-up request. Use it for
        smoke tests and regression checks where auth is the first step.
      </p>

      {/* Required env vars */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Required env vars</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><code className="bg-slate-900/50 px-1 rounded">LOGIN_EMAIL</code> (CI secret)</li>
          <li><code className="bg-slate-900/50 px-1 rounded">LOGIN_PASSWORD</code> (CI secret)</li>
        </ul>
      </div>

      {/* How to run */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">How to run it</h2>
        <pre className="bg-slate-900/50 border border-white/10 rounded p-3 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`devtools flow run jwt-auth.yaml`}</code></pre>
      </div>

      {/* TODO enrichment */}
      <div className="rounded-lg border border-white/10 bg-amber-500/10 p-4 mb-8">
        <strong className="text-amber-300">TODO:</strong>
        <ul className="list-disc pl-5 text-amber-200 mt-2">
          <li>Add a screenshot of the successful login + profile request in Studio.</li>
          <li>Short clip of running <code className="bg-slate-900/50 px-1 rounded">devtools flow run jwt-auth.yaml</code> in CI.</li>
        </ul>
      </div>

      {/* Snippet */}
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`# jwt-auth.yaml
version: 1
name: JWT login and use
env:
  API_BASE: https://api.example.com
  LOGIN_EMAIL: {{#env:LOGIN_EMAIL}}
  LOGIN_PASSWORD: {{#env:LOGIN_PASSWORD}}

requests:
  - id: auth_login
    name: Login
    method: POST
    url: {{ env.API_BASE }}/login
    body:
      json:
        email: {{ env.LOGIN_EMAIL }}
        password: {{ env.LOGIN_PASSWORD }}
    expect:
      - status: 200

  - id: get_profile
    name: Get profile
    method: GET
    url: {{ env.API_BASE }}/me
    headers:
      Authorization: Bearer {{ auth_login.response.body.token }}
    expect:
      - status: 200
`}</code></pre>

      {/* What to change */}
      <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">What to change</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><span className="text-slate-200">Base URL:</span> <code className="bg-slate-900/50 px-1 rounded">env.API_BASE</code> to your API.</li>
          <li><span className="text-slate-200">Endpoints:</span> <code className="bg-slate-900/50 px-1 rounded">/login</code> and <code className="bg-slate-900/50 px-1 rounded">/me</code>.</li>
          <li><span className="text-slate-200">Token path:</span> <code className="bg-slate-900/50 px-1 rounded">auth_login.response.body.token</code> to match your response.</li>
          <li><span className="text-slate-200">Assertions:</span> add body schema checks or key presence assertions.</li>
        </ul>
      </div>

      {/* Common variations */}
      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Common variations</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Refresh token flow and token renewal.</li>
          <li>Handle expired tokens (expect 401 → re-login).</li>
          <li>Pagination when fetching user-related lists.</li>
          <li>Retries with backoff for flaky endpoints.</li>
        </ul>
      </div>

      {/* Helpful links */}
      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Links</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>
            <Link className="underline" href="/docs/how-to/environments-and-variables">Variables in flows</Link>
          </li>
          <li>
            <Link className="underline" href="/docs/how-to/ci-integrations">CI/CD integrations</Link>
          </li>
          <li>
            <Link className="underline" href="/docs/how-to/import-har">Import HAR (capture auth flows)</Link>
          </li>
        </ul>
      </div>
    </main>
  )
}
