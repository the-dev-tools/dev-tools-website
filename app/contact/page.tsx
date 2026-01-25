export const metadata = {
  title: 'Contact DevTools – Support & Inquiries',
  description:
    'Get in touch with the DevTools team for support, partnerships, or general inquiries.',
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-bold text-white">Contact</h1>
      <p className="mt-4 text-lg text-slate-300">
        Have a question, need support, or want to discuss partnerships? Send us a message and we'll get back to you as soon as possible.
      </p>

      {/* Contact Form */}
      <section className="mt-12">
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Send a Message</h2>
          <form action="https://submit-form.com/yrSqO8Tny" method="POST">
            <input type="hidden" name="_redirect" value="https://dev.tools/contact/success" />

            {/* Honeypot field for spam protection */}
            <input type="text" name="_honeypot" style={{ display: 'none' }} />

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  className="w-full rounded-md border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-md border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Your message..."
                  required
                  className="w-full rounded-md border border-white/20 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-neon px-6 py-3 font-semibold text-slate-900 transition hover:bg-neon/90 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Send
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              For support requests, please include links, logs, or screenshots (no secrets). Read our{' '}
              <a href="/privacy" className="text-neon hover:underline">
                privacy policy
              </a>
              .
            </p>
          </form>
        </div>
      </section>

      {/* Alternative Contact Methods */}
      <section className="mt-10 rounded-lg border border-white/10 bg-slate-900/30 p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Other Ways to Reach Us</h3>
        <ul className="space-y-2 text-slate-300">
          <li>
            <strong className="text-white">Support:</strong> support@dev.tools
          </li>
          <li>
            <strong className="text-white">Security:</strong> security@dev.tools
          </li>
          <li>
            <strong className="text-white">GitHub Issues:</strong>{' '}
            <a
              href="https://github.com/the-dev-tools/dev-tools/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neon hover:underline"
            >
              github.com/the-dev-tools/dev-tools
            </a>
          </li>
        </ul>
      </section>
    </main>
  )
}
