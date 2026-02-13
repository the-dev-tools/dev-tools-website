import Flows from '@/components/home/Flows'

export const metadata = {
  title: 'Multi-Step API Testing Flows – Chain Requests, Map Variables, Export YAML',
  description:
    'Build multi-step API test flows that chain requests with auto-mapped variables. Import real traffic, add assertions, and export YAML for CI/CD pipelines.',
}

export default function FlowsPage() {
  return (
    <main className="relative">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8">
        <h1 className="text-4xl font-extrabold text-white">Multi-Step API Testing Flows</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          Build multi-step API tests that chain requests with auto-mapped variables. Import real browser traffic, add assertions
          between steps, and export YAML for Git review and CI/CD pipelines.
        </p>
      </div>
      <Flows />

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-semibold text-white">Learn more</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-300">
            <li>
              <a className="underline decoration-dotted underline-offset-2" href="/features/multi-step-api-testing">
                Multi-step API testing
              </a>
            </li>
            <li>
              <a className="underline decoration-dotted underline-offset-2" href="/features/ci-cd-integration">
                API testing in CI/CD pipelines
              </a>
            </li>
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
            <li>
              <a className="underline decoration-dotted underline-offset-2" href="/guides/end-to-end-api-testing">
                End-to-end API testing guide
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  )
}
