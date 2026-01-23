"use client"

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ProductMenu() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return
      if (!ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div className="relative" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="inline-flex items-center gap-1 px-0 py-0 text-slate-100 transition hover:text-neon"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        Product
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 opacity-80">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 w-[260px] rounded-xl bg-slate-950/95 p-3 shadow-[0_30px_70px_-30px_rgba(6,12,32,0.85)]"
        >
          <div className="grid gap-2 text-sm">
            <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5" href="/flows">Flows</Link>
            <Link onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-slate-200 hover:bg-white/5" href="/download">Download</Link>
          </div>
        </div>
      )}
    </div>
  )
}
