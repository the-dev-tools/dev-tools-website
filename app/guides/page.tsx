import Link from 'next/link'

export const metadata = {
  title: 'Guides – Migrations, CI, and Recipes',
  description: 'Practical guides: migrate from Postman, Newman alternative in CI, regression testing in GitHub Actions, generate HAR safely.',
}

export default function GuidesIndex() {
  const items = [
    {
      href: '/guides/migrate-from-postman',
      title: 'Migrate from Postman to DevTools',
      desc: 'Collections → YAML flows. Environment mapping, secrets, CI.'
    },
    {
      href: '/guides/newman-alternative-ci',
      title: 'Postman CLI / Newman alternative for CI',
      desc: 'Faster runs with JUnit/JSON and clear exit codes.'
    },
    {
      href: '/guides/api-regression-testing-github-actions',
      title: 'API regression testing in GitHub Actions',
      desc: 'Parallel YAML flows, PR‑visible results.'
    },
    {
      href: '/guides/generate-har-chrome',
      title: 'Generate a HAR file (Chrome) safely',
      desc: 'Record real traffic and handle sensitive data locally.'
    }
  ]
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <h1 className="text-5xl font-bold text-white mb-4">Guides</h1>
      <p className="text-lg text-slate-400 mb-10">Practical, copy‑pastable steps for migrations and CI.</p>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map(item => (
          <Link key={item.href} href={item.href} className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10">
            <h2 className="text-xl font-semibold text-white mb-1">{item.title}</h2>
            <p className="text-slate-300 text-sm">{item.desc}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}
