import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/10 bg-[linear-gradient(160deg,rgba(12,22,51,0.75),rgba(42,27,78,0.55))] py-12">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-8 lg:flex-row lg:justify-between">
        {/* Brand Section */}
        <div className="max-w-sm space-y-4">
          <div className="flex items-center gap-3" aria-label="DevTools">
            <img src="/logo.svg" alt="DevTools" className="h-8 w-auto" />
          </div>
          <p className="text-sm text-slate-400">
            DevTools is crafted by a remote team of developer tooling obsessives. We believe great API experiences begin with trustworthy, sustainable workflows.
          </p>
        </div>

        {/* Footer Columns */}
        <div className="grid flex-1 gap-8 text-sm text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product Column */}
          <div>
            <h3 className="text-xs uppercase tracking-wide text-slate-400">Product</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/flows" className="transition hover:text-neon">
                  Flows
                </Link>
              </li>
              <li>
                <Link href="/download" className="transition hover:text-neon">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="transition hover:text-neon">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="transition hover:text-neon">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/guides" className="transition hover:text-neon">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/templates" className="transition hover:text-neon">
                  Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-xs uppercase tracking-wide text-slate-400">Resources</h3>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li>
                <Link href="/docs" className="transition hover:text-neon">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/postman-alternative" className="transition hover:text-neon">
                  Postman alternative
                </Link>
              </li>
              <li>
                <Link href="/bruno-alternative" className="transition hover:text-neon">
                  Bruno alternative
                </Link>
              </li>
              <li>
                <Link href="/postman-cli-alternative" className="transition hover:text-neon">
                  Newman (Postman CLI) alternative
                </Link>
              </li>
              <li>
                <Link href="/blog" className="transition hover:text-neon">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/subscribe" className="transition hover:text-neon">
                  Subscribe
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="transition hover:text-neon">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs uppercase tracking-wide text-slate-400">Company</h3>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li>
                <Link href="/contact" className="transition hover:text-neon">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-xs uppercase tracking-wide text-slate-400">Legal</h3>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li>
                <a href="https://github.com/the-dev-tools/dev-tools/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="transition hover:text-neon">
                  License: Apache-2.0
                </a>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-neon">Privacy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-slate-500">
        © {currentYear} DevTools. All rights reserved.
      </div>
    </footer>
  )
}
