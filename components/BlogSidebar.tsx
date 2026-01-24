import Link from 'next/link'
import type { BlogCTAConfig, BlogCTA } from '@/lib/blog'

interface BlogSidebarProps {
  cta?: BlogCTAConfig
}

function CTACard({ cta, badge }: { cta: BlogCTA; badge?: { text: string; variant: 'neutral' | 'success' | 'warning' } | null }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      {badge && (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded mb-3 ${
          badge.variant === 'success' ? 'bg-green-500/20 text-green-400' :
          badge.variant === 'warning' ? 'bg-amber-500/20 text-amber-400' :
          'bg-slate-700 text-slate-300'
        }`}>
          {badge.text}
        </span>
      )}
      <h3 className="text-lg font-semibold text-white mb-3">
        {cta.heading}
      </h3>
      <p className="text-sm text-slate-300 mb-4">
        {cta.body}
      </p>
      <div className="space-y-3">
        <Link
          href={cta.url}
          className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
        >
          {cta.buttonText}
        </Link>
        {cta.secondaryText && cta.secondaryUrl && (
          <Link
            href={cta.secondaryUrl}
            className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
          >
            {cta.secondaryText}
          </Link>
        )}
      </div>
    </div>
  )
}

function DefaultCTA() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-3">
        Turn real traffic into a runnable API workflow
      </h3>
      <p className="text-sm text-slate-300 mb-4">
        Record one flow in your browser, import the HAR, export YAML.
        Run it locally or in CI with the DevTools CLI.
      </p>
      <div className="space-y-3">
        <Link
          href="/download"
          className="block w-full text-center px-4 py-2.5 bg-neon text-black font-medium rounded-lg hover:bg-neon/90 transition"
        >
          Download DevTools Studio
        </Link>
        <Link
          href="/flows"
          className="block w-full text-center px-4 py-2 text-neon hover:underline text-sm"
        >
          See a HAR → YAML example
        </Link>
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Local-first. Your traffic stays on your machine.
      </p>
    </div>
  )
}

function TemplatesCTA() {
  return (
    <div className="rounded-2xl border border-neon/20 bg-neon/5 p-6">
      <h4 className="text-sm font-semibold text-white mb-2">
        Get the copy-paste templates
      </h4>
      <p className="text-xs text-slate-300 mb-3">
        JWT auth, OAuth client credentials, CRUD flow, GitHub Actions.
      </p>
      <Link
        href="/templates"
        className="block w-full text-center px-4 py-2 border border-neon/30 text-neon font-medium rounded-lg hover:bg-neon/10 transition text-sm"
      >
        Browse Templates
      </Link>
    </div>
  )
}

export default function BlogSidebar({ cta }: BlogSidebarProps) {
  // If no CTA defined in frontmatter, show defaults
  if (!cta || (!cta.primary && !cta.secondary)) {
    return (
      <aside className="space-y-6 sticky top-8">
        <DefaultCTA />
        <TemplatesCTA />
      </aside>
    )
  }

  return (
    <aside className="space-y-6 sticky top-8">
      {cta.primary && (
        <CTACard cta={cta.primary} badge={cta.badge} />
      )}
      {cta.secondary && (
        <CTACard cta={cta.secondary} />
      )}
      <TemplatesCTA />
    </aside>
  )
}
