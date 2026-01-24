import Link from 'next/link'

export const metadata = {
  title: 'Template: Jenkins (YAML flows + JUnit)',
  description: 'Run DevTools YAML flows in Jenkins pipelines with JUnit output.',
  alternates: { canonical: '/templates/jenkins' },
}

export default function TemplateJenkins() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">Jenkins</h1>
      <p className="text-slate-300 mb-6">
        Add a pipeline stage that installs the DevTools CLI, runs your YAML flows, and publishes JUnit results.
        Works in classic and declarative pipelines.
      </p>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-6">
        <h2 className="text-xl font-semibold text-white mb-2">Required env vars</h2>
        <p className="text-slate-300 mb-2">Depends on your flows. Common examples:</p>
        <ul className="list-disc pl-5 text-slate-300">
          <li><code className="bg-slate-900/50 px-1 rounded">LOGIN_EMAIL</code>, <code className="bg-slate-900/50 px-1 rounded">LOGIN_PASSWORD</code></li>
          <li>API keys or base URLs via Jenkins credentials/bindings</li>
        </ul>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">How to run it</h2>
        <p className="text-slate-300 mb-2">Add a stage to your Jenkinsfile:</p>
        <pre className="bg-slate-900/50 border border-white/10 rounded p-3 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`stage('API Tests') {
  steps {
    sh 'curl -fsSL https://sh.dev.tools/install.sh | bash'
    sh 'devtools flow run --report junit:test-results.xml tests.yaml'
  }
}`}</code></pre>
      </div>

      <div className="rounded-lg border border-white/10 bg-amber-500/10 p-4 mb-8">
        <strong className="text-amber-300">TODO:</strong>
        <ul className="list-disc pl-5 text-amber-200 mt-2">
          <li>Screenshot of Jenkins stage view with test results.</li>
          <li>Clip of console output showing <code className="bg-slate-900/50 px-1 rounded">devtools</code> and JUnit publish.</li>
        </ul>
      </div>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`pipeline {
  agent any
  stages {
    stage('API Tests') {
      steps {
        sh 'curl -fsSL https://sh.dev.tools/install.sh | bash'
        sh 'devtools flow run --report junit:test-results.xml tests.yaml'
      }
    }
  }
}`}</code></pre>

      <div className="mt-8 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">What to change</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Path to your YAML flows file (<code className="bg-slate-900/50 px-1 rounded">tests.yaml</code>).</li>
          <li>Declarative vs scripted pipeline syntax.</li>
          <li>Publish JUnit results as a post step or via plugin.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Common variations</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li>Parallel stages per microservice.</li>
          <li>Credentials binding for secrets.</li>
          <li>Scheduled nightly/regression jobs.</li>
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
        <h2 className="text-xl font-semibold text-white mb-2">Links</h2>
        <ul className="list-disc pl-5 text-slate-300">
          <li><Link className="underline" href="/docs/reference/cli">CLI Tool</Link></li>
          <li><Link className="underline" href="/docs/how-to/ci-integrations">CI/CD integrations</Link></li>
          <li><Link className="underline" href="/guides/newman-alternative-ci">Newman alternative for CI</Link></li>
        </ul>
      </div>
    </main>
  )
}
