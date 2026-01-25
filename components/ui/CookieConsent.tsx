'use client'

import { useEffect, useState } from 'react'

const CONSENT_KEY = 'analytics_consent'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(CONSENT_KEY)
    if (consent === null) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'true')
    setShowBanner(false)
    // Reload to inject GA
    window.location.reload()
  }

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'false')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-300">
            We use cookies for analytics (Google Analytics) to improve the website. You can accept or continue without analytics.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleReject}
              className="rounded-md border border-slate-600 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="rounded-md bg-[#4de1ff] px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-[#3dcce6]"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
