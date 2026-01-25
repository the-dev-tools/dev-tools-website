import Flows from '@/components/home/Flows'

export const metadata = {
  title: 'DevTools Flows – Visual API Workflows from HAR to YAML',
  description:
    'See how DevTools turns real traffic (HAR) into visual API flows with variable mapping and YAML export for CI.',
}

export default function FlowsPage() {
  return (
    <main className="relative">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <h1 className="text-4xl font-extrabold text-white">Flows</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          DevTools generates deployable API workflows from your real browser traffic. Import a HAR, map variables, and export
          YAML for review and CI runs.
        </p>
      </div>
      <Flows />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Learn more</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>
              <a className="underline decoration-dotted underline-offset-2" href="/docs/how-to/import-har">
                How to import a HAR
              </a>
            </li>
            <li>
              <a className="underline decoration-dotted underline-offset-2" href="/docs/how-to/working-with-flows">
                Working with flows
              </a>
            </li>
            <li>
              <a className="underline decoration-dotted underline-offset-2" href="/docs/reference/cli">
                DevTools CLI reference
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
