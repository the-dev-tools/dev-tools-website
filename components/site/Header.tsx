import Link from 'next/link'
import MobileNav from '../ui/MobileNav'
import GitHubStarButton from '../ui/GitHubStarButton'
import DownloadButton from '../ui/DownloadButton'
import ProductMenu from './ProductMenu'
import CompareMenu from './CompareMenu'

export default function Header() {
  return (
    <header className="relative border-b border-white/10">
      {/* Gradient top border */}
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="DevTools">
          <img src="/logo.svg" alt="DevTools" className="h-9 w-auto" />
        </Link>

        {/* Header Navigation */}
        <nav className="hidden items-center gap-6 text-sm font-medium min-[900px]:flex">
          <ProductMenu />
          <CompareMenu />
          <Link href="/docs" className="px-0 py-0 text-slate-100 transition hover:text-neon">Docs</Link>
          <Link href="/guides" className="px-0 py-0 text-slate-100 transition hover:text-neon">Learn</Link>
          <Link href="/pricing" className="px-0 py-0 text-slate-100 transition hover:text-neon">Pricing</Link>
        </nav>

        {/* Header Actions */}
        <div className="hidden items-center gap-3 min-[900px]:flex">
          <GitHubStarButton />
          <DownloadButton />
        </div>

        {/* Mobile Menu - Client Component */}
        <MobileNav />
      </div>
    </header>
  )
}
