import Link from 'next/link'

export const metadata = {
  title: 'Templates – Auth, Workflows, and CI',
  description: 'Copy‑paste templates for common auth patterns, workflows, and CI setups.',
  alternates: { canonical: '/templates' },
}

const items = [
  { href: '/templates/auth-jwt', title: 'Auth: JWT' },
  { href: '/templates/oauth-client-credentials', title: 'Auth: OAuth Client Credentials' },
  { href: '/templates/login-create-fetch-delete', title: 'Workflow: login → create → fetch → delete' },
  { href: '/templates/github-actions', title: 'CI: GitHub Actions' },
  { href: '/templates/gitlab-ci', title: 'CI: GitLab CI' },
  { href: '/templates/jenkins', title: 'CI: Jenkins' },
]

export default function TemplatesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h1 className="text-5xl font-bold text-white mb-4">Templates</h1>
      <p className="text-lg text-slate-400 mb-10">Drop‑in examples for flows and CI.</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map(item => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
            <h2 className="text-xl font-semibold text-white">{item.title}</h2>
          </Link>
        ))}
      </div>
    </main>
  )
}

