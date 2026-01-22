export default function Scale() {
  return (
    <section id="scale" className="relative border-b border-white/5 bg-[linear-gradient(160deg,rgba(12,22,51,0.55),rgba(42,27,78,0.4))] py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-300">Roadmap</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Scale when you're ready</h2>
          <p className="mt-3 text-base text-slate-300">Run flows locally and in CI for free. When your suite needs more, scale with DevTools Cloud <span className="opacity-80">(Roadmap)</span> or self‑host executors.</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">DevTools Cloud adds</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                <li>• Scheduling</li>
                <li>• Multi‑region runs</li>
                <li>• Shared secrets/environments</li>
                <li>• RBAC + audit log</li>
                <li>• Hosted executors + autoscaling</li>
                <li>• Run history + dashboards</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Self‑host executors add</h3>
              <ul className="mt-3 space-y-1 text-sm text-slate-300">
                <li>• Run in your VPC</li>
                <li>• Your data residency</li>
                <li>• Your infra control</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

