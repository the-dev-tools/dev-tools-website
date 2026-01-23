export const metadata = {
  title: 'Template: login → create → fetch → delete (YAML)',
  description: 'Common CRUD‑style workflow as a YAML flow with variable mapping.',
  alternates: { canonical: '/templates/login-create-fetch-delete' },
}

export default function TemplateCRUD() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">Login → Create → Fetch → Delete</h1>
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
    </main>
  )
}
