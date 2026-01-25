import Link from 'next/link'

export const metadata = {
  title: 'Template: OAuth Client Credentials (YAML)',
  description: 'YAML flow template for obtaining an access token with OAuth client credentials and using it.',
}

export default function TemplateOAuthClientCreds() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">OAuth Client Credentials</h1>
      <p className="text-slate-300 mb-6">
        This template exchanges client credentials for an OAuth access token and uses that token to call a protected
        API. Ideal for service-to-service integrations and headless CI checks.
      </p>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Required env vars</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><code className="bg-slate-900/50 px-1 rounded">CLIENT_ID</code> (CI secret)</li>
          <li><code className="bg-slate-900/50 px-1 rounded">CLIENT_SECRET</code> (CI secret)</li>
          <li>Optional: <code className="bg-slate-900/50 px-1 rounded">TOKEN_URL</code> if it varies by environment</li>
        </ul>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">How to run it</h2>
        <pre className="bg-slate-900/50 border border-white/10 rounded p-3 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`devtools flow run oauth-client-creds.yaml`}</code></pre>
      </div>

      <div className="rounded-lg border border-white/10 bg-amber-500/10 p-4 mb-8">
        <strong className="text-amber-300">TODO:</strong>
        <ul className="list-disc pl-5 text-amber-200 mt-2">
          <li>Add a screenshot of token retrieval in Studio with headers.</li>
          <li>Short clip of CLI run and JUnit report output in CI.</li>
        </ul>
      </div>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`# oauth-client-creds.yaml
version: 1
name: OAuth CC flow
env:
  TOKEN_URL: https://auth.example.com/oauth/token
  CLIENT_ID: {{#env:CLIENT_ID}}
  CLIENT_SECRET: {{#env:CLIENT_SECRET}}

requests:
  - id: get_token
    method: POST
    url: {{ env.TOKEN_URL }}
    headers:
      Content-Type: application/x-www-form-urlencoded
    body:
      form:
        grant_type: client_credentials
        client_id: {{ env.CLIENT_ID }}
        client_secret: {{ env.CLIENT_SECRET }}
    expect:
      - status: 200

  - id: list_accounts
    method: GET
    url: https://api.example.com/accounts
    headers:
      Authorization: Bearer {{ get_token.response.body.access_token }}
    expect:
      - status: 200
`}</code></pre>
      <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">What to change</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><span className="text-slate-200">Token URL:</span> <code className="bg-slate-900/50 px-1 rounded">env.TOKEN_URL</code> to your auth server.</li>
          <li><span className="text-slate-200">Protected endpoint:</span> replace <code className="bg-slate-900/50 px-1 rounded">/accounts</code> with your API.</li>
          <li><span className="text-slate-200">Token path:</span> adjust <code className="bg-slate-900/50 px-1 rounded">get_token.response.body.access_token</code> to match your response.</li>
          <li><span className="text-slate-200">Scopes:</span> add <code className="bg-slate-900/50 px-1 rounded">scope</code> to the form body if required.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Common variations</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Audience/tenant parameters in token request.</li>
          <li>Cache token for reuse across multiple requests.</li>
          <li>Retry on 5xx from auth server with backoff.</li>
          <li>Parameterize scopes per environment.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Links</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><Link className="underline" href="/docs/how-to/environments-and-variables">Variables in flows</Link></li>
          <li><Link className="underline" href="/docs/how-to/ci-integrations">CI/CD integrations</Link></li>
          <li><Link className="underline" href="/docs/how-to/working-with-flows">Working with flows</Link></li>
        </ul>
      </div>
    </main>
  )
}
