import Link from 'next/link'
import LoadTestingWaitlistForm from '@/components/load-testing/LoadTestingWaitlistForm'

export const metadata = {
  title: 'API Load Testing – Coming Soon | DevTools',
  description:
    'Reuse your multi-step API test flows for load testing. Run from multiple regions with configurable concurrency. Coming soon to DevTools.',
  alternates: { canonical: '/load-testing/' },
}

export default function LoadTestingPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <header className="text-center mb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/5 px-4 py-1.5 text-xs uppercase tracking-wide text-neon mb-6">
          Coming soon
        </span>
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          API Load Testing
        </h1>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          Reuse your existing multi-step API test flows for load testing. Configure concurrency, duration, and regions — no
          rewrites, no separate tools, no new syntax.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 mb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Same flows, load-tested</h2>
          <p className="text-slate-300 text-sm">
            Your multi-step YAML flows work for both functional testing and load testing. No need to rewrite tests
            or learn a new DSL.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Multi-region execution</h2>
          <p className="text-slate-300 text-sm">
            Run load tests from multiple geographic regions to understand latency and performance across your global infrastructure.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white mb-2">Configurable concurrency</h2>
          <p className="text-slate-300 text-sm">
            Ramp up virtual users, set duration, and define thresholds. The Go-based runner handles high concurrency efficiently.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white mb-2">CI/CD integrated</h2>
          <p className="text-slate-300 text-sm">
            Run load tests in CI with pass/fail gates based on p95 latency, error rate, and throughput thresholds.
          </p>
        </div>
      </section>

      <section id="waitlist" className="rounded-2xl border border-neon/30 bg-gradient-to-r from-white/5 to-neon/5 p-8 mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Join the load testing waitlist</h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">
            We're building API load testing into DevTools. Tell us about your team and we'll notify you when early access is available.
          </p>
          <LoadTestingWaitlistForm />
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-white mb-4">While you wait</h2>
        <p className="text-slate-300 mb-6">Start with functional API testing today — your flows will be ready for load testing when it ships.</p>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/features/multi-step-api-testing" className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <h3 className="text-lg font-semibold text-white mb-1">Multi-step API testing</h3>
            <p className="text-slate-300 text-sm">Build test flows that chain requests with auto-mapped variables.</p>
          </Link>
          <Link href="/features/ci-cd-integration" className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <h3 className="text-lg font-semibold text-white mb-1">CI/CD integration</h3>
            <p className="text-slate-300 text-sm">Run API tests in every pipeline with JUnit reports.</p>
          </Link>
          <Link href="/download" className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
            <h3 className="text-lg font-semibold text-white mb-1">Download Studio</h3>
            <p className="text-slate-300 text-sm">Free, open-source desktop app for building API test flows.</p>
          </Link>
        </div>
      </section>

      <footer className="text-sm text-slate-400 text-center">
        <p>
          See also: <Link href="/flows" className="text-neon hover:underline">Flows</Link>
          {' '}&middot;{' '}<Link href="/cli" className="text-neon hover:underline">CLI</Link>
          {' '}&middot;{' '}<Link href="/guides" className="text-neon hover:underline">Guides</Link>
          {' '}&middot;{' '}<Link href="/docs" className="text-neon hover:underline">Docs</Link>
        </p>
      </footer>
    </main>
  )
}
