'use client'

import CopyButton from '../ui/CopyButton'

type Props = {
  command: string
  description: string
  eventLabel: string
}

export default function CommandCard({ command, description, eventLabel }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <code className="block font-mono text-sm text-neon">{command}</code>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
        <CopyButton text={command} eventLabel={eventLabel} className="shrink-0" />
      </div>
    </div>
  )
}
