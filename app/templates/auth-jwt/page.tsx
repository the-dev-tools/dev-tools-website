export const metadata = {
  title: 'Template: JWT Auth flow (YAML)',
  description: 'YAML flow template for logging in and using a JWT for authenticated requests.',
  alternates: { canonical: '/templates/auth-jwt' },
}

export default function TemplateAuthJWT() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">JWT Auth flow</h1>
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
    </main>
  )
}
