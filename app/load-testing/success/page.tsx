export const metadata = {
  title: 'Waitlist Confirmed – API Load Testing | DevTools',
  description: "You're on the load testing waitlist.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function LoadTestingSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 sm:px-8 text-center">
      <div className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-12">
        <div className="mb-6 text-6xl">&#x2713;</div>
        <h1 className="text-3xl font-bold text-white mb-4">You're on the list</h1>
        <p className="text-lg text-slate-300 mb-6">
          Thanks for your interest in API load testing! We'll reach out when early access is available.
        </p>
        <p className="text-sm text-slate-400 mb-8">
          In the meantime, start building multi-step API tests — your flows will be ready for load testing when it ships.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/download"
            className="inline-block rounded-md bg-neon px-6 py-3 font-semibold text-slate-900 transition hover:bg-neon/90 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Download Studio
          </a>
          <a
            href="/features/multi-step-api-testing"
            className="inline-block rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-neon hover:text-neon focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Multi-Step Testing
          </a>
          <a
            href="/docs"
            className="inline-block rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-neon hover:text-neon focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Browse Docs
          </a>
        </div>
      </div>
    </main>
  )
}
