export const metadata = {
  title: 'Template: OAuth Client Credentials (YAML)',
  description: 'YAML flow template for obtaining an access token with OAuth client credentials and using it.',
  alternates: { canonical: '/templates/oauth-client-credentials' },
}

export default function TemplateOAuthClientCreds() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">OAuth Client Credentials</h1>
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
    </main>
  )
}
