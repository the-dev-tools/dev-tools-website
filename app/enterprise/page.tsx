import DownloadButton from '@/components/ui/DownloadButton'
import Link from 'next/link'
import DemoRequestForm from '@/components/enterprise/DemoRequestForm'

export const metadata = {
  title: 'DevTools Enterprise – SSO, RBAC, Audit Logs, and Dedicated Support',
  description:
    'DevTools Enterprise adds SAML SSO, SCIM provisioning, RBAC, shared secrets, audit logs, and dedicated support for teams that need security and compliance.',
  openGraph: {
    title: 'DevTools Enterprise – SSO, RBAC, Audit Logs, and Dedicated Support',
    description:
      'Enterprise-grade API testing for teams. SAML SSO, SCIM, RBAC, audit logs, shared secrets, and SLA-backed support.',
    url: 'https://dev.tools/enterprise/',
  },
}

function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-5 w-5 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ShieldIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

function UsersIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  )
}

function KeyIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  )
}

function ClipboardDocumentIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  )
}

function LifebuoyIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" />
    </svg>
  )
}

const availableFeatures = [
  'SAML SSO (Okta, Azure AD, OneLogin)',
  'SCIM provisioning',
  'RBAC with custom roles',
  'Team workspaces',
  'Audit logs (auth, runs, config)',
  'Priority support',
  'Procurement pack (DPA, MSA)',
  'Invoice billing',
]

const roadmapFeatures = [
  'Shared secret vault',
  'Environment sync across team',
  'Approval gates for runs',
  'Policy enforcement engine',
  'Run history dashboards',
  'Self-hosted deployment',
]

export default function EnterprisePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      {/* Hero */}
      <header className="mb-16 text-center">
        <span className="inline-block bg-neon/10 text-neon text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Enterprise
        </span>
        <h1 className="text-5xl font-bold text-white mb-4">Security and collaboration for teams</h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
          DevTools Enterprise adds the controls your organization needs: SSO, audit logs, shared secrets, and dedicated support.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neon px-8 py-3 text-base text-slate-900 font-medium transition hover:bg-[#6fe0ff] shadow-[0_10px_24px_-12px_rgba(88,215,255,0.55)]"
          >
            Request a Demo
          </a>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3 text-base text-white transition hover:bg-white/10"
          >
            View Pricing
          </Link>
        </div>
      </header>

      {/* Section A: Security & Identity */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon/10">
            <ShieldIcon className="text-neon" />
          </div>
          <h2 className="text-3xl font-bold text-white">Security & Identity</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">SAML SSO</h3>
            <p className="text-slate-400 mb-4">
              Integrate with your identity provider. Support for Okta, Azure AD, OneLogin, and any SAML 2.0 compliant provider.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Just-in-time provisioning</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Group-based role mapping</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Enforce SSO-only login</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">SCIM Provisioning</h3>
            <p className="text-slate-400 mb-4">
              Automate user lifecycle management. Create, update, and deactivate users from your identity provider.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Automatic user sync</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Group membership sync</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Deprovisioning on offboard</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">RBAC</h3>
            <p className="text-slate-400 mb-4">
              Fine-grained access control. Define roles with specific permissions and assign them to users or groups.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Custom role definitions</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Workspace-level permissions</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Read-only viewer roles</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Session Policies</h3>
            <p className="text-slate-400 mb-4">
              Control session behavior. Set timeouts, require re-authentication, and manage concurrent sessions.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Session timeout controls</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />IP allowlisting</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Device management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section B: Collaboration */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon/10">
            <UsersIcon className="text-neon" />
          </div>
          <h2 className="text-3xl font-bold text-white">Collaboration</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-lg text-slate-300 mb-6">
            Real collaboration for API testing teams. Not just "share a link" — actual workflow management.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Shared Workspaces</h3>
              <p className="text-slate-400">
                Organize workflows by team, project, or environment. Control who can view, edit, or run.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Reviewable Change History</h3>
              <p className="text-slate-400">
                Track every change with Git-style diffs. See who changed what and when.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Approval Gates</h3>
              <p className="text-slate-400">
                Require approval before runs against production environments. Configurable per workspace.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Environment Management</h3>
              <p className="text-slate-400">
                Define environments per team. Control which environments are available to which workspaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section C: Secrets */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon/10">
            <KeyIcon className="text-neon" />
          </div>
          <h2 className="text-3xl font-bold text-white">Secrets Management</h2>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
          <p className="text-lg text-slate-300 mb-6">
            Stop sharing secrets in Slack. Centralized, encrypted secrets for your entire team.
          </p>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-neon mb-2">256-bit</div>
              <p className="text-sm text-slate-400">AES encryption at rest</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon mb-2">Per-workspace</div>
              <p className="text-sm text-slate-400">Scoped secret access</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon mb-2">Rotation</div>
              <p className="text-sm text-slate-400">Scheduled secret rotation</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-neon mb-2">Audit trail</div>
              <p className="text-sm text-slate-400">Every access logged</p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-900/50 border border-white/10 p-4">
            <p className="text-sm text-slate-400 mb-2">CI Integration Pattern</p>
            <pre className="text-sm text-slate-200 overflow-x-auto"><code>{`# Secrets injected from vault, not committed to Git
devtools run --workspace prod --env production
# CLI fetches secrets from vault at runtime`}</code></pre>
          </div>
        </div>
      </section>

      {/* Section D: Audit & Compliance */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon/10">
            <ClipboardDocumentIcon className="text-neon" />
          </div>
          <h2 className="text-3xl font-bold text-white">Audit & Compliance</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Audit Logs</h3>
            <p className="text-slate-400 mb-4">
              Complete visibility into every action. Authentication events, workflow runs, configuration changes, and secret access.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Authentication events</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Workflow run history</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Configuration changes</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Secret access logs</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-3">Compliance Ready</h3>
            <p className="text-slate-400 mb-4">
              Documentation and controls your security team needs. Export logs, sign agreements, pass audits.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />DPA available</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />MSA available</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Log export (SIEM compatible)</li>
              <li className="flex items-center gap-2"><CheckIcon className="text-neon h-4 w-4" />Security questionnaire support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section E: Support & Rollout */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-neon/10">
            <LifebuoyIcon className="text-neon" />
          </div>
          <h2 className="text-3xl font-bold text-white">Support & Rollout</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-2">SLA Options</div>
            <p className="text-sm text-slate-400">Response time guarantees based on your needs</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-2">Dedicated Channel</div>
            <p className="text-sm text-slate-400">Slack Connect or Teams for direct access</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-2">Onboarding Help</div>
            <p className="text-sm text-slate-400">We help your team get started</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
            <div className="text-2xl font-bold text-white mb-2">Migration Support</div>
            <p className="text-sm text-slate-400">Import from Postman, Bruno, or others</p>
          </div>
        </div>
      </section>

      {/* Section F: Available vs Roadmap */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">What's available today</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-neon/30 bg-neon/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <CheckIcon className="text-neon" />
              Available Now
            </h3>
            <ul className="space-y-3">
              {availableFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-300">
                  <CheckIcon className="text-neon h-4 w-4 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Enterprise Roadmap
            </h3>
            <p className="text-sm text-slate-400 mb-4">Early access available for Enterprise customers</p>
            <ul className="space-y-3">
              {roadmapFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-slate-400">
                  <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/5 to-neon/5 p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Talk to us about Enterprise</h2>
          <p className="text-slate-400 mb-8">
            Tell us about your team and requirements. We'll set up a call to discuss how DevTools Enterprise fits your needs.
          </p>

          <DemoRequestForm />
        </div>
      </section>
    </main>
  )
}
