'use client'

import CopyButton from './CopyButton'

type Props = {
  code: string
  language?: string
  className?: string
  showCopy?: boolean
  eventLabel?: string
}

export default function CodeBlock({ code, language = 'bash', className = '', showCopy = true, eventLabel }: Props) {
  return (
    <div className={`relative rounded-lg bg-slate-900/60 border border-white/10 ${className}`}>
      {showCopy && (
        <div className="absolute right-2 top-2">
          <CopyButton text={code} eventLabel={eventLabel || code} />
        </div>
      )}
      <div className="overflow-x-auto p-4">
        <code className="block font-mono text-sm text-slate-200">{code}</code>
      </div>
    </div>
  )
}
