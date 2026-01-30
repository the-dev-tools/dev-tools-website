export const metadata = {
  title: 'Why We Built DevTools – DevTools',
  description:
    'Modern APIs move fast, but testing workflows lag. We built DevTools to make API testing versionable, reviewable, and runnable anywhere — starting from real traffic.',
}

export default function WhyWeBuiltThisPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-4xl font-bold text-white">Why we built this</h1>

      <p className="mt-6 text-lg text-slate-300">
        Modern APIs ship fast — but API testing workflows haven’t kept up.
      </p>

      <p className="mt-4 text-slate-300">Most teams still end up with one of two bad options:</p>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-300">
        <li>
          <strong className="text-white">Click-driven tools</strong> that don’t belong in Git, don’t diff cleanly, and don’t scale in CI.
        </li>
        <li>
          <strong className="text-white">Hand-written test scripts</strong> that drift from reality, break quietly, and become maintenance debt.
        </li>
      </ul>

      <p className="mt-6 text-slate-300">
        We built DevTools because we lived the pain: tests that don’t reflect production traffic, workflows that can’t be reviewed properly, and “automation” that collapses the moment a team grows.
      </p>

      <p className="mt-4 text-slate-300">
        After going through YC, building products under real pressure, and learning firsthand how fragile dev workflows get when they’re not{' '}
        <strong className="text-white">versionable</strong>, <strong className="text-white">reviewable</strong>, and{' '}
        <strong className="text-white">reproducible</strong>, we wanted a different foundation:
      </p>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
        <p className="text-lg font-semibold text-white">
          Start from real traffic. Make it reviewable. Make it runnable anywhere.
        </p>
      </div>

      <p className="mt-6 text-slate-300">That’s why DevTools is built around a simple flow:</p>
      <p className="mt-2 text-slate-200">
        <span className="font-medium">Import a HAR → generate a flow → export YAML → run in CI.</span>
      </p>

      <p className="mt-6 text-slate-300">
        No magic. No hidden state. No “someone has it on their laptop.” Just workflows that:
      </p>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-300">
        <li>
          are <strong className="text-white">local-first</strong>
        </li>
        <li>
          live in <strong className="text-white">Git</strong>
        </li>
        <li>
          are easy to <strong className="text-white">diff + review</strong>
        </li>
        <li>
          run reliably in <strong className="text-white">CI</strong>
        </li>
      </ul>

      <p className="mt-6 text-slate-300">
        DevTools isn’t trying to be another dashboard. It’s trying to be the missing layer between <em>what actually happened</em> in production and <em>what you can confidently ship</em> tomorrow.
      </p>

      <p className="mt-4 text-slate-300">
        If your API workflows matter, they should be treated like code. DevTools makes that practical.
      </p>
    </main>
  )
}

