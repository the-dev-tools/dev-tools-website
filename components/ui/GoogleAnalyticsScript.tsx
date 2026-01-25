'use client'

import { useEffect } from 'react'

const CONSENT_KEY = 'analytics_consent'
const GA_ID = 'G-7QRW3WMN91'

export default function GoogleAnalyticsScript() {
  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)

    if (consent === 'true') {
      // Inject GA script
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
      document.head.appendChild(script1)

      const script2 = document.createElement('script')
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}');
      `
      document.head.appendChild(script2)
    }
  }, [])

  return null
}
