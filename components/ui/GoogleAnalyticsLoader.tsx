'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

const CONSENT_KEY = 'analytics_consent'
const GA_ID = 'G-7QRW3WMN91'

export default function GoogleAnalyticsLoader() {
  const [hasConsent, setHasConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    setHasConsent(consent === 'true')
  }, [])

  if (!hasConsent) return null

  return <GoogleAnalytics gaId={GA_ID} />
}
