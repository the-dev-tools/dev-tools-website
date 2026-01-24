import DownloadButton from '@/components/ui/DownloadButton'
import Link from 'next/link'

export const metadata = {
  title: 'DevTools Pricing – Free Studio & CLI, Enterprise SSO + Collaboration',
  description:
    'DevTools Studio and CLI are free forever. Enterprise adds SAML SSO, SCIM, RBAC, shared secrets, audit logs, and dedicated support for teams.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'DevTools Pricing – Free Studio & CLI, Enterprise SSO + Collaboration',
    description:
      'DevTools Studio and CLI are free forever. Enterprise adds SSO, collaboration, secrets management, and compliance for teams.',
    url: 'https://dev.tools/pricing/',
  },
}

const freeFeatures = [
  'Studio app (macOS, Windows, Linux)',
  'CLI runs in CI',
  'Unlimited workflows',
  'YAML export',
  'Env vars + secrets from CI',
  'Local-first / offline',
]

const enterpriseFeatures = [
  'SAML SSO',
  'SCIM provisioning',
  'RBAC + team workspaces',
  'Shared secret vault (team-managed)',
  'Audit logs',
  'Policy controls (enforce settings)',
  'Support + SLA',
  'Procurement pack (DPA, MSA, invoice)',
]

const comparisonRows = [
  { feature: 'Local-first / offline', free: true, enterprise: true },
  { feature: 'YAML in Git', free: true, enterprise: true },
  { feature: 'CI automation (CLI)', free: true, enterprise: true },
  { feature: 'Team collaboration (shared workspaces)', free: false, enterprise: true },
  { feature: 'Secret sharing (managed vault)', free: false, enterprise: true },
  { feature: 'SSO / SCIM', free: false, enterprise: true },
  { feature: 'Audit logs', free: false, enterprise: true },
  { feature: 'SLA + support', free: false, enterprise: true },
]

const faqs = [
  {
    question: 'Is DevTools Studio free forever?',
    answer:
      'Yes. DevTools Studio is open source under Apache-2.0. You can use it forever without paying. Enterprise features are for organizations that need SSO, collaboration, and compliance.',
  },
  {
    question: 'Is the CLI free?',
    answer:
      'Yes. The DevTools CLI is free and open source. Run your YAML workflows in CI with JUnit/JSON outputs at no cost.',
  },
  {
    question: 'Do you store my data?',
    answer:
      'No. DevTools is local-first. Your workflows, requests, and responses stay on your machine. Nothing is sent to our servers unless you explicitly use Enterprise cloud features.',
  },
  {
    question: 'Can I use DevTools offline?',
    answer:
      'Yes. DevTools works completely offline. No account required. Your data lives in local files you control.',
  },
  {
    question: 'How do secrets work in CI?',
    answer:
      'Use environment variables in your CI system (GitHub Actions, GitLab CI, Jenkins, etc.) and reference them in your YAML flows. DevTools CLI reads from your CI environment.',
  },
  {
    question: 'What does Enterprise include?',
    answer:
      'Enterprise adds SAML SSO, SCIM provisioning, RBAC, shared secret vault, audit logs, policy controls, dedicated support with SLA, and procurement documentation.',
  },
  {
    question: 'Do you offer invoices, purchase orders, or DPA?',
    answer:
      'Yes. Enterprise customers receive invoices, we accept purchase orders, and we provide DPA and MSA documents for procurement and legal review.',
  },
  {
    question: 'Is on-prem / self-hosted supported?',
    answer:
      'DevTools Studio and CLI run entirely on your machines. For Enterprise collaboration features, we offer both cloud-hosted and self-hosted deployment options.',
  },
  {
    question: 'What is the support SLA?',
    answer:
      'Enterprise customers get dedicated support with response time SLAs. Contact us for specific SLA terms based on your needs.',
  },
]

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function XIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      {/* Section 0: Hero */}
      <header className="mb-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Free for developers. Enterprise for teams.</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          DevTools Studio + CLI are free. Enterprise adds org controls: SSO, collaboration, secrets, audit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <DownloadButton label="Download DevTools" className="rounded-xl px-8 py-3 text-base" />
          <Link
            href="/enterprise"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-base text-white transition hover:bg-white/10"
          >
            Talk to Sales
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-sm text-slate-400">
          <span className="flex items-center justify-center gap-2">
            <CheckIcon className="text-neon" />
            Local-first. Works offline.
          </span>
          <span className="flex items-center justify-center gap-2">
            <CheckIcon className="text-neon" />
            YAML workflows live in Git.
          </span>
          <span className="flex items-center justify-center gap-2">
            <CheckIcon className="text-neon" />
            CI-ready runs via CLI.
          </span>
        </div>
      </header>

      {/* Section 1: Plan Cards */}
      <section className="grid gap-6 md:grid-cols-2 mb-16">
        {/* Free Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Free</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">$0</span>
            </div>
            <p className="text-slate-400 mt-2">Studio + CLI included.</p>
          </div>

          <ul className="space-y-3 mb-8">
            {freeFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-slate-300">
                <CheckIcon className="text-neon flex-shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>

          <DownloadButton label="Download" fullWidth className="rounded-xl py-3 text-base" />
        </div>

        {/* Enterprise Card */}
        <div className="rounded-2xl border border-neon/30 bg-white/5 p-8 relative">
          <div className="absolute -top-3 left-6">
            <span className="bg-neon text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">For Teams</span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-2">Enterprise</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold text-white">Custom</span>
            </div>
            <p className="text-slate-400 mt-2">Security + collaboration for orgs.</p>
          </div>

          <ul className="space-y-3 mb-8">
            {enterpriseFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-slate-300">
                <CheckIcon className="text-neon flex-shrink-0 mt-0.5" />
                {feature}
              </li>
            ))}
          </ul>

          <Link
            href="/enterprise"
            className="block w-full text-center rounded-xl border border-neon bg-neon/10 py-3 text-base text-neon font-medium transition hover:bg-neon/20"
          >
            Request Access
          </Link>
        </div>
      </section>

      {/* Section 2: Feature Comparison Table */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Feature Comparison</h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white font-semibold">Feature</th>
                <th className="text-center p-4 text-white font-semibold w-32">Free</th>
                <th className="text-center p-4 text-white font-semibold w-32">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                  <td className="p-4 text-slate-300">{row.feature}</td>
                  <td className="p-4 text-center">
                    {row.free ? (
                      <CheckIcon className="text-neon mx-auto" />
                    ) : (
                      <XIcon className="text-slate-600 mx-auto" />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.enterprise ? (
                      <CheckIcon className="text-neon mx-auto" />
                    ) : (
                      <XIcon className="text-slate-600 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Why Enterprise Exists */}
      <section className="mb-16 rounded-2xl border border-white/10 bg-white/5 p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Why do teams pay if the product is free?</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Governance</h3>
            <p className="text-slate-400">Control who can access what. RBAC, team workspaces, and policy enforcement.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Security</h3>
            <p className="text-slate-400">SSO integration, audit logs, and centralized secrets management.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Reliability</h3>
            <p className="text-slate-400">SLA-backed support, compliance paperwork, and procurement documentation.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Social Proof */}
      <section className="mb-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Built for modern engineering teams</h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 max-w-sm">
            <p className="text-slate-300 italic mb-3">"Finally, an API tool that treats workflows as code. Git diffs actually make sense."</p>
            <p className="text-sm text-slate-500">— Early adopter</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 max-w-sm">
            <p className="text-slate-300 italic mb-3">"Offline-first means my team can work anywhere. No cloud dependency, no surprise outages."</p>
            <p className="text-sm text-slate-500">— Platform engineer</p>
          </div>
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-xl border border-white/10 bg-white/5">
              <summary className="cursor-pointer p-5 text-white font-medium list-none flex justify-between items-center">
                {faq.question}
                <svg
                  className="h-5 w-5 text-slate-400 transition-transform group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-5 text-slate-400">{faq.answer}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Section 6: Final CTA */}
      <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-neon/5 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Ready to get started?</h2>
        <p className="text-slate-400 mb-6">Download DevTools for free, or talk to us about Enterprise.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <DownloadButton label="Download Now" className="rounded-xl px-8 py-3 text-base" />
          <Link
            href="/enterprise"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-base text-white transition hover:bg-white/10"
          >
            Talk to Sales
          </Link>
        </div>
      </section>

      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </main>
  )
}
