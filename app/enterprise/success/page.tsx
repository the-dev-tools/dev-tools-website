export const metadata = {
  title: 'Demo Request Received – DevTools Enterprise',
  description: 'Thanks for requesting a DevTools Enterprise demo.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function EnterpriseSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 sm:px-8 text-center">
      <div className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-12">
        <div className="mb-6 text-6xl">✓</div>
        <h1 className="text-3xl font-bold text-white mb-4">Demo Request Received</h1>
        <p className="text-lg text-slate-300 mb-6">
          Thanks for your interest in DevTools Enterprise! We've received your request and will get back to you within 1-2 business days.
        </p>
        <p className="text-sm text-slate-400 mb-8">
          In the meantime, you can explore our documentation, pricing, and product features.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/"
            className="inline-block rounded-md bg-neon px-6 py-3 font-semibold text-slate-900 transition hover:bg-neon/90 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Back to Home
          </a>
          <a
            href="/docs"
            className="inline-block rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-neon hover:text-neon focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Browse Docs
          </a>
          <a
            href="/pricing"
            className="inline-block rounded-md border border-white/20 px-6 py-3 font-semibold text-white transition hover:border-neon hover:text-neon focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            View Pricing
          </a>
        </div>
      </div>
    </main>
  )
}
