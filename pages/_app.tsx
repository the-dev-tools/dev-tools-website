import type { AppProps } from 'next/app'
import GoogleAnalyticsScript from '@/components/ui/GoogleAnalyticsScript'
import CookieConsent from '@/components/ui/CookieConsent'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GoogleAnalyticsScript />
      <Component {...pageProps} />
      <CookieConsent />
    </>
  )
}
