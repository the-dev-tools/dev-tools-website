export const metadata = {
  title: 'Template: Jenkins (YAML flows + JUnit)',
  description: 'Run DevTools YAML flows in Jenkins pipelines with JUnit output.',
  alternates: { canonical: '/templates/jenkins' },
}

export default function TemplateJenkins() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">Jenkins</h1>
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
    </main>
  )
}
