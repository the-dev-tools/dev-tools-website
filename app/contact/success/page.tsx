export const metadata = {
  title: 'Message Sent – DevTools',
  description: 'Thanks for contacting DevTools.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ContactSuccessPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-24 sm:px-8 text-center">
      <div className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-12">
        <div className="mb-6 text-6xl">✓</div>
        <h1 className="text-3xl font-bold text-white mb-4">Message Sent</h1>
        <p className="text-lg text-slate-300 mb-6">
          Thanks for reaching out! We've received your message and will get back to you as soon as possible.
        </p>
        <p className="text-sm text-slate-400 mb-8">
          If you need urgent support, please check our documentation or GitHub issues for faster answers.
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
        </div>
      </div>
    </main>
  )
}
