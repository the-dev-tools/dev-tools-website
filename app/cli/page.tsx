import Link from 'next/link'
import CodeBlock from '@/components/ui/CodeBlock'
import CommandCard from '@/components/cli/CommandCard'

export const metadata = {
  title: 'DevTools CLI – Run YAML API workflows in CI (JUnit/JSON, exit codes)',
  description: 'Run exported YAML flows in parallel with a Go runner. Get JUnit/JSON reports and clean exit codes designed for pipelines.',
}

export default function CLIPage() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pb-24 pt-14 sm:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            DevTools CLI
          </h1>
          <p className="mt-6 text-lg text-slate-300">
            Run exported YAML flows in parallel with a Go runner. Get JUnit/JSON reports and clean exit codes designed for pipelines.
          </p>

          {/* Install Block */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Install</div>
            <CodeBlock code="curl -fsSL https://sh.dev.tools/install.sh | bash" eventLabel="cli_install_cli_page" />
            <p className="mt-3 text-xs text-slate-400">
              Installs to <code className="rounded bg-slate-800/50 px-1.5 py-0.5 text-neon">~/.devtools/bin</code>
            </p>
          </div>

          {/* Example Block */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">Example</div>
            <CodeBlock code="devtools flow run --report junit:test-results.xml tests.yaml" eventLabel="cli_example_junit" />
            <p className="mt-3 text-xs text-slate-400">
              Runs flows in parallel, outputs JUnit XML and exits with status code 0 (pass) or 1 (fail)
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/docs/reference/cli"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#58D7FF] px-7 py-3 text-base font-semibold text-slate-900 shadow-[0_22px_45px_-22px_rgba(88,215,255,0.55)] ring-1 ring-white/10 transition duration-200 hover:bg-[#6fe0ff]"
            >
              CLI Reference
            </Link>
            <Link
              href="/templates/github-actions"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#58D7FF]/60 bg-transparent px-6 py-3 text-base font-semibold text-[#58D7FF] transition duration-200 hover:bg-[#58D7FF]/10 hover:text-white"
            >
              GitHub Actions Template
            </Link>
            <Link
              href="/templates/gitlab-ci"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#58D7FF]/60 bg-transparent px-6 py-3 text-base font-semibold text-[#58D7FF] transition duration-200 hover:bg-[#58D7FF]/10 hover:text-white"
            >
              GitLab CI Template
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative border-y border-white/5 bg-[linear-gradient(160deg,rgba(9,12,31,0.6),rgba(42,27,78,0.45))] py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Built for CI/CD</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Parallel execution</h3>
              <p className="mt-2 text-sm text-slate-300">
                Multi-threaded Go runner executes flows in parallel by default. Override with <code className="rounded bg-slate-800/50 px-1.5 py-0.5 text-xs text-neon">--sequential</code> when needed.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">JUnit & JSON reports</h3>
              <p className="mt-2 text-sm text-slate-300">
                Generate machine-readable reports with <code className="rounded bg-slate-800/50 px-1.5 py-0.5 text-xs text-neon">--report junit:file.xml</code> or <code className="rounded bg-slate-800/50 px-1.5 py-0.5 text-xs text-neon">--report json:file.json</code>
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Clean exit codes</h3>
              <p className="mt-2 text-sm text-slate-300">
                Exit code 0 when all assertions pass, exit code 1 on any failure. Designed for pipelines that need deterministic results.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 text-neon">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Environment secrets</h3>
              <p className="mt-2 text-sm text-slate-300">
                Reference CI secrets with <code className="rounded bg-slate-800/50 px-1.5 py-0.5 text-xs text-neon">{'{{#env:SECRET_NAME}}'}</code>. No plaintext credentials in YAML files.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CLI Commands Reference */}
      <section className="relative py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Common Commands</h2>
          <div className="mt-8 space-y-4">
            <CommandCard
              command="devtools flow run tests.yaml"
              description="Run flows from a YAML file (parallel by default)"
              eventLabel="cli_cmd_run"
            />
            <CommandCard
              command="devtools flow run --report junit:results.xml tests.yaml"
              description="Run flows and output JUnit XML report"
              eventLabel="cli_cmd_junit"
            />
            <CommandCard
              command="devtools flow run --sequential tests.yaml"
              description="Run flows sequentially (one at a time)"
              eventLabel="cli_cmd_sequential"
            />
            <CommandCard
              command="devtools flow validate tests.yaml"
              description="Validate YAML syntax without running flows"
              eventLabel="cli_cmd_validate"
            />
          </div>

          <div className="mt-8">
            <Link
              href="/docs/reference/cli"
              className="inline-flex items-center gap-2 text-neon hover:underline"
            >
              View full CLI reference
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative border-t border-white/5 bg-[linear-gradient(160deg,rgba(12,22,51,0.55),rgba(42,27,78,0.4))] py-16">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to run flows in CI?</h2>
          <p className="mt-4 text-lg text-slate-300">
            Install DevTools CLI and integrate with GitHub Actions, GitLab CI, Jenkins, or any pipeline.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/docs/reference/cli"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#58D7FF] px-7 py-3 text-base font-semibold text-slate-900 shadow-[0_22px_45px_-22px_rgba(88,215,255,0.55)] ring-1 ring-white/10 transition duration-200 hover:bg-[#6fe0ff]"
            >
              CLI Reference
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-base font-semibold text-slate-100 transition hover:border-neon/60 hover:bg-white/10 hover:text-white"
            >
              View CI Templates
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
