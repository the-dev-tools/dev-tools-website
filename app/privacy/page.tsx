export const metadata = {
  title: 'Privacy Policy – DevTools',
  description:
    'DevTools is local-first. Your API traffic and test data stay on your machine. This page explains what we do (and don’t) collect.',
}

const effectiveDate = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const lastUpdated = effectiveDate
const companyName = 'DevTools'
const supportEmail = 'support@dev.tools'
const securityEmail = 'security@dev.tools'
const logRetentionPeriod = '30–90 days'

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-2 text-slate-300">
        <strong>Effective date:</strong> {effectiveDate}
        <br />
        <strong>Last updated:</strong> {lastUpdated}
      </p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-white mb-3">TL;DR</h2>
        <ul className="list-disc list-inside space-y-2 text-slate-300">
          <li>
            <strong className="text-white">DevTools Studio and DevTools CLI run locally.</strong> Your API traffic, HAR files, YAML workflows, and test results stay on your machine.
          </li>
          <li>
            <strong className="text-white">We do not receive your API traffic</strong> unless you explicitly send it to us (e.g., support attachments).
          </li>
          <li>
            Our <strong className="text-white">website uses Google Analytics</strong> to understand traffic and improve the site.
          </li>
          <li>
            If you <strong className="text-white">subscribe</strong>, we collect your <strong className="text-white">email address</strong> to send updates. You can unsubscribe anytime.
          </li>
          <li>
            <strong className="text-white">DevTools Cloud isn’t live yet.</strong> When it launches, we’ll update this policy with Cloud specifics.
          </li>
        </ul>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Who we are</h2>
        <p className="text-slate-300">
          This Privacy Policy applies to the DevTools website at <strong className="text-white">dev.tools</strong> and DevTools products (the “Services”), operated by <strong className="text-white">{companyName}</strong> (“DevTools”, “we”, “us”).
        </p>
        <p className="mt-2 text-slate-300">
          Questions? Contact: <strong className="text-white">{supportEmail}</strong>
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Local-first products: what we collect (and don’t)</h2>
        <h3 className="text-lg font-semibold text-white mt-4">DevTools Studio (Desktop App) + DevTools CLI</h3>
        <p className="text-slate-300 mt-2">
          DevTools Studio and DevTools CLI run on your machine. By default, we do <strong className="text-white">not</strong> collect or receive:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>API request/response bodies</li>
          <li>HAR files you import</li>
          <li>YAML workflows you write or generate</li>
          <li>Environment variables and secrets</li>
          <li>Test logs and run outputs</li>
        </ul>
        <p className="text-slate-300 mt-3">
          When you run tests, DevTools makes HTTP requests to the endpoints you configure. Those requests go to <strong className="text-white">your API servers</strong>, not ours. We do not proxy that traffic.
        </p>
        <p className="text-slate-300 mt-3">
          The only time we receive data from the local apps is when <strong className="text-white">you explicitly send it to us</strong>, for example:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>Support emails/tickets with logs or files attached</li>
          <li>Bug reports where you paste content</li>
        </ul>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Website data we collect</h2>
        <h3 className="text-lg font-semibold text-white mt-4">1) Google Analytics (website only)</h3>
        <p className="text-slate-300 mt-2">
          We use <strong className="text-white">Google Analytics</strong> on <strong className="text-white">dev.tools</strong> to understand usage and improve the website.
        </p>
        <p className="text-slate-300 mt-2">Google Analytics may collect information such as:</p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>Pages visited and interactions (e.g., clicks, scroll depth depending on configuration)</li>
          <li>Device and browser information</li>
          <li>Referrer/traffic source</li>
          <li>Approximate location derived from IP</li>
          <li>Timing and performance data</li>
        </ul>
        <p className="text-slate-300 mt-2">
          This data is processed by Google according to Google’s terms and privacy policy.
        </p>
        <p className="text-slate-300 mt-2">
          <strong className="text-white">Your choices:</strong>
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>You can use browser settings to block or clear cookies.</li>
          <li>You can use Google’s Analytics opt-out browser add-on (if you want a stronger block).</li>
          <li>You can use privacy-focused browsers or extensions that limit tracking.</li>
        </ul>
        <p className="text-slate-400 mt-2 text-sm">
          Important: Google Analytics is used <strong>only on the website</strong>, not inside DevTools Studio or DevTools CLI.
        </p>

        <h3 className="text-lg font-semibold text-white mt-6">2) Email subscriptions (website only)</h3>
        <p className="text-slate-300 mt-2">
          If you subscribe to updates on the website, we collect:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>
            <strong className="text-white">Email address</strong> (required)
          </li>
          <li>Optional metadata you provide (e.g., name) if the form includes it</li>
        </ul>
        <p className="text-slate-300 mt-2">We use this to:</p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>Send product updates, releases, and relevant announcements</li>
          <li>Respond if you reply to an update email</li>
        </ul>
        <p className="text-slate-300 mt-2">
          <strong className="text-white">Unsubscribe:</strong> Every email includes an unsubscribe link. You can also request removal by emailing <strong className="text-white">{supportEmail}</strong>.
        </p>
        <p className="text-slate-300 mt-2">
          We may use an email delivery provider (a “processor”) to send emails on our behalf. That provider will process your email address only to deliver messages and maintain unsubscribe status.
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Cookies</h2>
        <p className="text-slate-300">
          The website may use cookies for:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>Analytics (Google Analytics)</li>
          <li>Basic site functionality and preferences (if applicable)</li>
        </ul>
        <p className="text-slate-300 mt-2">
          If you block cookies, the site should still work, but analytics may be limited.
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Third-party services</h2>
        <p className="text-slate-300">
          You may interact with third parties through DevTools, including:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>Your own API endpoints (when running tests)</li>
          <li>Git hosting (if you store YAML in Git repositories)</li>
          <li>CI providers (GitHub Actions, GitLab CI, Jenkins, etc.)</li>
        </ul>
        <p className="text-slate-300 mt-2">
          Your use of third-party services is governed by their privacy policies.
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Security</h2>
        <p className="text-slate-300">
          We take reasonable steps to protect the website and our infrastructure.
        </p>
        <p className="text-slate-300 mt-2">
          Local-first architecture reduces exposure because your API data stays with you.
        </p>
        <p className="text-slate-300 mt-2">
          If you discover a vulnerability, contact <strong className="text-white">{securityEmail}</strong>.
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Data retention</h2>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>
            <strong className="text-white">Local products:</strong> Data lives on your machine and is retained according to your system and your actions.
          </li>
          <li>
            <strong className="text-white">Website logs:</strong> Retained for a limited period for security and operations (<strong>{logRetentionPeriod}</strong>).
          </li>
          <li>
            <strong className="text-white">Google Analytics:</strong> Retention is controlled by our Google Analytics settings.
          </li>
          <li>
            <strong className="text-white">Email subscriptions:</strong> Retained until you unsubscribe or request deletion, plus minimal suppression data to respect opt-outs.
          </li>
        </ul>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Your choices and rights</h2>
        <p className="text-slate-300">
          Depending on where you live, you may have rights to access, delete, or correct personal data we hold.
        </p>
        <p className="text-slate-300 mt-2">
          For website/support/subscription data, request deletion by contacting <strong className="text-white">{supportEmail}</strong>.
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">International users</h2>
        <p className="text-slate-300">
          If you access our website from outside the country where our servers are located, your data may be processed there. We handle data as described in this policy.
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">Changes to this policy</h2>
        <p className="text-slate-300">
          We may update this policy as the product evolves (especially when Cloud features ship). We’ll revise the “Last updated” date and post the new version here.
        </p>
      </section>

      <hr className="my-8 border-white/10" />

      <section>
        <h2 className="text-2xl font-semibold text-white mb-3">DevTools Cloud (coming soon)</h2>
        <p className="text-slate-300">
          DevTools Cloud is not available yet. Before launch, we will update this policy to describe:
        </p>
        <ul className="mt-2 list-disc list-inside space-y-1 text-slate-300">
          <li>What Cloud data is stored (workspaces, collaboration metadata, optional synced flows)</li>
          <li>How secrets are handled (encryption, access controls)</li>
          <li>Retention and deletion controls</li>
          <li>Subprocessors (if any)</li>
        </ul>
      </section>
    </main>
  )
}

