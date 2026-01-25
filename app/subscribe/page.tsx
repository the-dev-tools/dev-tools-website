export const metadata = {
  title: 'Subscribe to DevTools Updates – Product Releases & API Testing Tips',
  description:
    'Get DevTools product releases, YAML workflow tips, and CI recipes in your inbox. No spam, unsubscribe anytime.',
}

export default function SubscribePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-bold text-white">Subscribe to DevTools Updates</h1>
      <p className="mt-4 text-lg text-slate-300">
        Stay up to date with DevTools product releases, YAML workflow tips, and CI recipes. No spam, just valuable content delivered to your inbox.
      </p>

      {/* What You'll Get Section */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white mb-4">What You'll Get</h2>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-3">
            <span className="text-neon mt-1">✓</span>
            <span><strong className="text-white">Product releases:</strong> Be the first to know when new DevTools features ship, including CLI updates, Studio enhancements, and Cloud capabilities.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neon mt-1">✓</span>
            <span><strong className="text-white">YAML workflow tips:</strong> Practical guides for building maintainable API test flows, from authentication patterns to complex multi-step scenarios.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neon mt-1">✓</span>
            <span><strong className="text-white">CI recipes:</strong> Ready-to-use examples for GitHub Actions, GitLab CI, Jenkins, and other CI platforms.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neon mt-1">✓</span>
            <span><strong className="text-white">Migration guides:</strong> Step-by-step instructions for moving from Postman, Newman, or other API testing tools.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-neon mt-1">✓</span>
            <span><strong className="text-white">Best practices:</strong> Learn how top teams are using DevTools to catch bugs before production, automate regression testing, and maintain API contracts.</span>
          </li>
        </ul>
      </section>

      {/* Frequency */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Email Frequency</h2>
        <p className="text-slate-300">
          We send 1–2 emails per month. You control what you receive, and you can unsubscribe anytime with one click.
        </p>
      </section>

      {/* Subscribe Form */}
      <section className="mt-12">
        <div className="rounded-lg border border-white/10 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Get DevTools Updates</h2>
          <form action="https://submit-form.com/vj6fvWOo7" method="POST">
            <input type="hidden" name="_redirect" value="https://dev.tools/subscribe/success" />

            {/* Honeypot field for spam protection */}
            <input type="text" name="_honeypot" style={{ display: 'none' }} />

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
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

              <button
                type="submit"
                className="w-full rounded-md bg-neon px-6 py-3 font-semibold text-slate-900 transition hover:bg-neon/90 focus:outline-none focus:ring-2 focus:ring-neon focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Subscribe
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Unsubscribe anytime. Read our{' '}
              <a href="/privacy" className="text-neon hover:underline">
                privacy policy
              </a>
              .
            </p>
          </form>
        </div>
      </section>

      {/* Additional Context */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white mb-4">Why Subscribe?</h2>
        <p className="text-slate-300 mb-4">
          DevTools is evolving rapidly. We're shipping new features, templates, and integrations based on feedback from teams running thousands of API tests in CI. Subscribers get early access to guides, migration tools, and release notes that help you get the most out of DevTools.
        </p>
        <p className="text-slate-300">
          Whether you're evaluating DevTools as a Postman alternative, migrating from Newman, or scaling your API testing across multiple CI pipelines, our updates will keep you informed about new capabilities and proven patterns.
        </p>
      </section>

      {/* Links to Resources */}
      <section className="mt-10 rounded-lg border border-white/10 bg-slate-900/30 p-6">
        <h3 className="text-lg font-semibold text-white mb-3">Explore DevTools</h3>
        <div className="grid gap-3 text-slate-300 sm:grid-cols-2">
          <a href="/blog" className="text-neon hover:underline">
            → Read the blog
          </a>
          <a href="/docs" className="text-neon hover:underline">
            → Browse documentation
          </a>
          <a href="/guides" className="text-neon hover:underline">
            → View guides
          </a>
          <a href="/templates" className="text-neon hover:underline">
            → Explore templates
          </a>
        </div>
      </section>
    </main>
  )
}
