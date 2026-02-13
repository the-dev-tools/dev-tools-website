'use client'

import { useEffect, useState } from 'react'

interface TOCItem {
  id: string
  label: string
}

export default function StickyTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  return (
    <nav className="space-y-0.5">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
        On this page
      </p>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`block text-xs leading-snug py-0.5 transition-colors ${
            activeId === item.id
              ? 'text-neon font-medium'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}
