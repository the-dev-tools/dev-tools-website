export const metadata = {
  title: 'Subscription Confirmed – DevTools',
  description: 'Thanks for subscribing to DevTools updates.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function SubscribeSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 sm:px-8 text-center">
      <div className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-12">
        <div className="mb-6 text-6xl">✓</div>
        <h1 className="text-3xl font-bold text-white mb-4">Check Your Inbox</h1>
        <p className="text-lg text-slate-300 mb-6">
          Thanks for subscribing! You'll receive DevTools updates, tips, and releases in your inbox soon.
        </p>
        <p className="text-sm text-slate-400 mb-8">
          Make sure to check your spam folder and mark our emails as "not spam" so you don't miss anything.
        </p>
        <a
          href="/"
          className="inline-block rounded-md bg-neon px-6 py-3 font-semibold text-slate-900 transition hover:bg-neon/90 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          Back to Home
        </a>
      </div>
    </main>
  )
}
