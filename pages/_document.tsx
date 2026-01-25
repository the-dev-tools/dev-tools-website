import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="h-full bg-slate-950 text-slate-100">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="/assets/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap"
            rel="stylesheet"
          />
          {/* Google Analytics - Conditionally loaded via GoogleAnalyticsScript component in _app.tsx */}
        </Head>
        <body className="min-h-full bg-[radial-gradient(circle_at_15%_15%,rgba(77,225,255,0.18),transparent_55%),radial-gradient(circle_at_85%_0%,rgba(143,125,250,0.18),transparent_45%),linear-gradient(120deg,#0C1633_0%,#2A1B4E_100%)]">
          <Main />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src="https://px.ads.linkedin.com/collect/?pid=9257801&fmt=gif"
            />
          </noscript>
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
