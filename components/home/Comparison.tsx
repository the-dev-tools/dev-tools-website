export default function Comparison() {
  return (
    <section id="comparison" className="relative border-b border-white/5 bg-slate-950/70 py-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-8">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-wide text-slate-300">API testing tools compared</span>
          <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">DevTools vs Bruno vs Postman</h2>
          <p className="mt-3 text-base text-slate-300">
            Compare API testing tools on multi-step flows, YAML export, CI/CD integration, and open-source availability.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-300">
          <a href="/postman-alternative" className="underline decoration-dotted underline-offset-2">Postman alternative →</a>
          <a href="/bruno-alternative" className="underline decoration-dotted underline-offset-2">Bruno alternative →</a>
          <a href="/compare/devtools-vs-postman" className="underline decoration-dotted underline-offset-2">DevTools vs Postman →</a>
          <a href="/compare/devtools-vs-bruno" className="underline decoration-dotted underline-offset-2">DevTools vs Bruno →</a>
          <a href="/features/multi-step-api-testing" className="underline decoration-dotted underline-offset-2">Multi-step API testing →</a>
          <a href="/features/ci-cd-integration" className="underline decoration-dotted underline-offset-2">CI/CD integration →</a>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5 shadow-[0_25px_60px_-35px_rgba(15,23,42,0.75)]">
          <table className="min-w-full divide-y divide-white/10 text-sm text-slate-200">
            <thead className="bg-white/5 text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Capability / Concern</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold text-white">DevTools</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Bruno</th>
                <th scope="col" className="px-4 py-3 text-left font-semibold">Postman</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Open source</th>
                <td className="px-4 py-4">✅ OSS (desktop + CLI)</td>
                <td className="px-4 py-4">✅ OSS</td>
                <td className="px-4 py-4">❌ Closed; cloud-centric</td>
              </tr>
              <tr className="bg-white/3">
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Flows (visual + reusable)</th>
                <td className="px-4 py-4">✅ Flow <strong>trees</strong> from HAR; visual builder</td>
                <td className="px-4 py-4">❌ No flows</td>
                <td className="px-4 py-4">⚠️ Flows available; export limited</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">HAR → Flow (auto-build from real traffic)</th>
                <td className="px-4 py-4">✅ Yes</td>
                <td className="px-4 py-4">❌ No</td>
                <td className="px-4 py-4">❌ No</td>
              </tr>
              <tr className="bg-white/3">
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">YAML export of flows (Git-reviewable)</th>
                <td className="px-4 py-4">✅ <strong>Yes</strong> (per-step overrides)</td>
                <td className="px-4 py-4">❌ No</td>
                <td className="px-4 py-4">❌ No (not for Flows)</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Variable mapping (step-scoped, JSONPath)</th>
                <td className="px-4 py-4">✅ Automatic, rule‑based (overrides)</td>
                <td className="px-4 py-4">⚠️ Basic vars</td>
                <td className="px-4 py-4">⚠️ Mixed; often script-heavy</td>
              </tr>
              <tr className="bg-white/3">
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Assertions &amp; evals (flow-level)</th>
                <td className="px-4 py-4">✅ Rich assertions at <strong>flow</strong> level</td>
                <td className="px-4 py-4">⚠️ Limited</td>
                <td className="px-4 py-4">⚠️ Mixed; tends to rely on scripts</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Performance testing &amp; <strong>regional</strong> locations</th>
                <td className="px-4 py-4">🚧 Roadmap (designed pricing)</td>
                <td className="px-4 py-4">❌ No</td>
                <td className="px-4 py-4">⚠️ Separate add‑ons/monitors</td>
              </tr>
              <tr className="bg-white/3">
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Runner tech &amp; speed</th>
                <td className="px-4 py-4">✅ <strong>Go-based</strong>, multithreaded; <strong>parallel by default</strong></td>
                <td className="px-4 py-4">⚠️ JS runtime; <strong>slower</strong> at scale</td>
                <td className="px-4 py-4">⚠️ Heavier runtime; slower in CI</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Local-first / offline</th>
                <td className="px-4 py-4">✅ 100% local; no accounts</td>
                <td className="px-4 py-4">✅ Local</td>
                <td className="px-4 py-4">⚠️ Cloud-first; login + sync</td>
              </tr>
              <tr className="bg-white/3">
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Scripting model</th>
                <td className="px-4 py-4">✅ Logic in <strong>flows</strong> (clean reviews)</td>
                <td className="px-4 py-4">⚠️ Limited</td>
                <td className="px-4 py-4">⚠️ Often per-request scripts</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">CI/CD integration</th>
                <td className="px-4 py-4">✅ CLI + JUnit/console outputs</td>
                <td className="px-4 py-4">⚠️ Basic</td>
                <td className="px-4 py-4">⚠️ Possible but heavier, cloud-dependent</td>
              </tr>
              <tr className="bg-white/3">
                <th scope="row" className="px-4 py-4 align-top font-semibold text-slate-100">Collaboration &amp; dependency</th>
                <td className="px-4 py-4">✅ No account required; local‑first</td>
                <td className="px-4 py-4">✅ Local; no account</td>
                <td className="px-4 py-4">⚠️ Requires account for collaboration; cloud‑dependent features</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
