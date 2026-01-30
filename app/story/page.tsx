import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Our Story | DevTools',
  description: 'Why we built DevTools — from UI automation to API-first workflows.',
}

export default function StoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-20 sm:px-8">
   

      <h1 className="text-4xl font-extrabold text-white sm:text-5xl">Our Story</h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-slate-300">
        <p>Users kept telling me the same thing: API testing is still a mess.</p>

        <p>
          In my last company (<a href="https://www.ycombinator.com/companies/preflight" target="_blank" rel="noopener noreferrer" className="text-neon hover:underline">Preflight</a>), we built workflows around UI automation. It worked, but it had the problems you'd expect: it was premature, black-box, and not developer-friendly. UI-driven workflows are also inherently less deterministic.
        </p>

        <p>So we rebuilt the idea from the right layer: the API layer.</p>

        <p>
          DevTools takes real traffic (HAR files) and turns it into deterministic API workflows you can run locally and in CI. The workflows export to YAML so they're readable, diffable, and code-reviewable in Git. And because it's API-first, it's generally more secure and less flaky than UI automation for the same job.
        </p>

        <p>
          The real unlock is making workflows practical at scale: auto variable mapping, composable flows, and a "powerful YAML" that can live in CI for any API. Long-term, that same workflow format becomes a platform: combine flows, expose endpoints, trigger integrations, and let AI generate or modify workflows safely because the output is structured and reviewable.
        </p>

        <p className="font-medium text-white">
          That's the goal: workflows as code, living in CI — not trapped in a dashboard.
        </p>

        <p>
          If you want the full backstory, read <Link href="/why-we-built-this" className="text-neon hover:underline">Why we built this</Link>.
        </p>

        <div className="flex items-center gap-4 pt-4">
        <img
          src="/assets/mustafa.jpg"
          alt="Mustafa Bayramoglu"
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold text-white"><a target="_blank" href="https://www.linkedin.com/in/mustafaebay/">Mustafa Bayramoglu</a></h2>
          <p className="text-sm text-slate-400">Founder — DevTools</p>
          <p className="mt-0.5 text-xs text-slate-500">YC alum • previously exited</p>
        </div>
      </div>
      </div>
    </main>
  )
}
