export const metadata = {
  title: 'Template: GitLab CI (YAML flows + JUnit)',
  description: 'Run DevTools YAML flows in GitLab CI with JUnit output.',
  alternates: { canonical: '/templates/gitlab-ci' },
}

export default function TemplateGitLabCI() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-8">
      <h1 className="text-3xl font-extrabold text-white mb-4">GitLab CI</h1>
      <pre className="bg-slate-900/50 border border-white/10 rounded-lg p-4 overflow-x-auto text-[13px] leading-relaxed text-slate-200"><code>{`stages: [test]

api_tests:
  stage: test
  image: ubuntu:latest
  script:
    - apt-get update && apt-get install -y curl
    - curl -fsSL https://sh.dev.tools/install.sh | bash
    - devtools flow run --report junit:test-results.xml tests.yaml`}</code></pre>
    </main>
  )
}
