# CI/CD Integration

Integrating DevTools into your CI/CD pipeline enables automated API testing, continuous validation, and deployment gatekeeping. This guide covers integration with popular CI/CD platforms and best practices.

## Why API Testing in CI/CD?

Automated API tests in CI/CD provide:

- **Continuous Validation**: Catch regressions before deployment
- **Deployment Confidence**: Verify APIs work before releasing
- **Documentation**: Tests serve as executable API documentation
- **Environment Verification**: Validate staging/production environments
- **Faster Feedback**: Detect issues within minutes, not hours or days

## Quick Start

### 1. Export Your Flow to YAML

**Studio Application:**

1. Open your workspace
2. Right-click on a flow → **Export → YAML**
3. Save as `api-tests.yaml`
4. Commit to your repository

```bash
git add api-tests.yaml
git commit -m "Add API test flow"
git push
```

### 2. Add CI Configuration

Create a CI workflow file (platform-specific examples below).

### 3. Set Environment Variables

Configure secrets in your CI platform for sensitive values like API keys.

### 4. Run Tests

The CI system will execute your tests on every commit, pull request, or deployment.

## GitHub Actions

### Basic Workflow

Create `.github/workflows/api-tests.yml`:

```yaml
name: API Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash

      - name: Run API Tests
        env:
          API_BASE_URL: https://api-staging.example.com
          API_KEY: ${{ secrets.API_KEY }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
        run: |
          devtools flow run api-tests.yaml \
            --report junit:test-results.xml \
            --report json:test-results.json

      - name: Publish Test Results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: |
            test-results.xml
            test-results.json

      - name: Publish JUnit Report
        uses: dorny/test-reporter@v1
        if: always()
        with:
          name: API Test Results
          path: test-results.xml
          reporter: java-junit
```

### Advanced: Matrix Testing

Test against multiple environments:

```yaml
name: API Tests - Multi-Environment

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        environment:
          - name: Staging
            url: https://api-staging.example.com
          - name: Production
            url: https://api.example.com

    steps:
      - uses: actions/checkout@v4

      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash

      - name: Run Tests - ${{ matrix.environment.name }}
        env:
          API_BASE_URL: ${{ matrix.environment.url }}
          API_KEY: ${{ secrets.API_KEY }}
        run: |
          devtools flow run api-tests.yaml \
            --report junit:test-results-${{ matrix.environment.name }}.xml

      - name: Upload Results
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results-${{ matrix.environment.name }}
          path: test-results-${{ matrix.environment.name }}.xml
```

### Deployment Gate

Only deploy if API tests pass:

```yaml
name: Deploy with API Tests

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install DevTools CLI
        run: curl -fsSL https://sh.dev.tools/install.sh | bash
      - name: Run API Tests
        env:
          API_BASE_URL: https://api-staging.example.com
          API_KEY: ${{ secrets.STAGING_API_KEY }}
        run: devtools flow run smoke-tests.yaml

  deploy:
    needs: test  # Only runs if test job succeeds
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: ./deploy.sh
```

## GitLab CI

### Basic Pipeline

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - deploy

api_tests:
  stage: test
  image: ubuntu:latest
  before_script:
    - apt-get update && apt-get install -y curl
    - curl -fsSL https://sh.dev.tools/install.sh | bash
    - export PATH="/usr/local/bin:$PATH"
  script:
    - |
      devtools flow run api-tests.yaml \
        --report junit:test-results.xml \
        --report json:test-results.json
  variables:
    API_BASE_URL: https://api-staging.example.com
    API_KEY: $CI_API_KEY
  artifacts:
    when: always
    reports:
      junit: test-results.xml
    paths:
      - test-results.json

deploy_production:
  stage: deploy
  dependencies:
    - api_tests
  script:
    - ./deploy.sh
  only:
    - main
```

### Environment-Specific Tests

```yaml
test_staging:
  stage: test
  script:
    - devtools flow run api-tests.yaml
  variables:
    API_BASE_URL: https://api-staging.example.com
    API_KEY: $STAGING_API_KEY
  only:
    - develop

test_production:
  stage: test
  script:
    - devtools flow run smoke-tests.yaml
  variables:
    API_BASE_URL: https://api.example.com
    API_KEY: $PROD_API_KEY
  only:
    - main
```

## Jenkins

### Declarative Pipeline

Create `Jenkinsfile`:

```groovy
pipeline {
    agent any

    environment {
        API_BASE_URL = 'https://api-staging.example.com'
        API_KEY = credentials('api-key-staging')
    }

    stages {
        stage('Install DevTools CLI') {
            steps {
                sh 'curl -fsSL https://sh.dev.tools/install.sh | bash'
            }
        }

        stage('Run API Tests') {
            steps {
                sh '''
                    devtools flow run api-tests.yaml \
                        --report junit:test-results.xml \
                        --report json:test-results.json
                '''
            }
        }

        stage('Publish Results') {
            steps {
                junit 'test-results.xml'
                archiveArtifacts artifacts: 'test-results.json', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            emailext(
                subject: "API Tests Failed: ${env.JOB_NAME} - ${env.BUILD_NUMBER}",
                body: "Check console output at ${env.BUILD_URL}",
                to: 'team@example.com'
            )
        }
    }
}
```

### Multibranch Pipeline

Test different environments based on branch:

```groovy
pipeline {
    agent any

    environment {
        API_BASE_URL = getApiUrl()
        API_KEY = credentials(getApiKeyCredentialId())
    }

    stages {
        stage('API Tests') {
            steps {
                sh 'curl -fsSL https://sh.dev.tools/install.sh | bash'
                sh 'devtools flow run api-tests.yaml --report junit:results.xml'
            }
        }
    }

    post {
        always {
            junit 'results.xml'
        }
    }
}

def getApiUrl() {
    switch(env.BRANCH_NAME) {
        case 'main':
            return 'https://api.example.com'
        case 'develop':
            return 'https://api-staging.example.com'
        default:
            return 'https://api-dev.example.com'
    }
}

def getApiKeyCredentialId() {
    switch(env.BRANCH_NAME) {
        case 'main':
            return 'api-key-production'
        case 'develop':
            return 'api-key-staging'
        default:
            return 'api-key-dev'
    }
}
```

## CircleCI

Create `.circleci/config.yml`:

```yaml
version: 2.1

jobs:
  api-tests:
    docker:
      - image: cimg/base:stable
    steps:
      - checkout
      - run:
          name: Install DevTools CLI
          command: curl -fsSL https://sh.dev.tools/install.sh | bash
      - run:
          name: Run API Tests
          command: |
            devtools flow run api-tests.yaml \
              --report junit:test-results.xml \
              --report json:test-results.json
          environment:
            API_BASE_URL: https://api-staging.example.com
      - store_test_results:
          path: test-results.xml
      - store_artifacts:
          path: test-results.json

workflows:
  test-and-deploy:
    jobs:
      - api-tests
      - deploy:
          requires:
            - api-tests
          filters:
            branches:
              only: main
```

## Azure Pipelines

Create `azure-pipelines.yml`:

```yaml
trigger:
  - main
  - develop

pool:
  vmImage: 'ubuntu-latest'

variables:
  - group: api-secrets  # Variable group with API_KEY

steps:
  - checkout: self

  - bash: curl -fsSL https://sh.dev.tools/install.sh | bash
    displayName: 'Install DevTools CLI'

  - bash: |
      devtools flow run api-tests.yaml \
        --report junit:test-results.xml \
        --report json:test-results.json
    displayName: 'Run API Tests'
    env:
      API_BASE_URL: https://api-staging.example.com
      API_KEY: $(API_KEY)

  - task: PublishTestResults@2
    displayName: 'Publish Test Results'
    condition: always()
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'test-results.xml'

  - task: PublishBuildArtifacts@1
    displayName: 'Publish Artifacts'
    condition: always()
    inputs:
      pathToPublish: 'test-results.json'
      artifactName: 'test-results'
```

## Travis CI

Create `.travis.yml`:

```yaml
language: minimal

branches:
  only:
    - main
    - develop

env:
  global:
    - API_BASE_URL=https://api-staging.example.com
  secure:
    # Encrypted API_KEY (use: travis encrypt API_KEY=your-key)
    - secure: "encrypted_api_key_here"

before_install:
  - curl -fsSL https://sh.dev.tools/install.sh | bash
  - export PATH="/usr/local/bin:$PATH"

script:
  - devtools flow run api-tests.yaml --report junit:results.xml

after_script:
  - cat results.xml
```

## Docker Integration

### Dockerfile for Tests

Create a container image with DevTools CLI:

```dockerfile
FROM alpine:latest

# Install dependencies
RUN apk add --no-cache curl bash

# Install DevTools CLI
RUN curl -fsSL https://sh.dev.tools/install.sh | bash

# Copy test files
COPY api-tests.yaml /tests/

WORKDIR /tests

# Run tests
CMD ["devtools", "flow", "run", "api-tests.yaml", "--report", "junit:results.xml"]
```

**Build and run:**

```bash
# Build
docker build -t api-tests .

# Run
docker run -e API_BASE_URL=https://api.example.com \
           -e API_KEY=secret \
           api-tests
```

### Docker Compose

Test with dependent services:

```yaml
version: '3.8'

services:
  api:
    image: mycompany/api:latest
    environment:
      - DB_HOST=db
    ports:
      - "8080:8080"

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password

  api-tests:
    build: .
    depends_on:
      - api
      - db
    environment:
      API_BASE_URL: http://api:8080
      DB_PASSWORD: password
```

**Run:**

```bash
docker-compose up --exit-code-from api-tests
```

## Best Practices

### 1. Separate Test Types

Organize flows by test type:

```
tests/
├── smoke-tests.yaml      # Quick health checks (2-3 min)
├── regression-tests.yaml # Full test suite (10-15 min)
├── integration-tests.yaml # Cross-service tests
└── performance-tests.yaml # Load/stress tests
```

**CI Strategy:**
- Run smoke tests on every commit
- Run regression tests on PRs
- Run integration tests pre-deployment
- Run performance tests nightly

### 2. Use Environment-Specific Secrets

Never hardcode secrets:

```yaml
# ✅ Good
env:
  API_KEY: '#env:SECRET_API_KEY'

# ❌ Bad
env:
  API_KEY: 'sk_live_abc123'
```

**Configure in CI:**

**GitHub Actions:**
```
Settings → Secrets → New repository secret
Name: API_KEY
Value: sk_live_abc123
```

**GitLab CI:**
```
Settings → CI/CD → Variables → Add Variable
Key: CI_API_KEY
Value: sk_live_abc123
Protected: Yes
Masked: Yes
```

### 3. Generate Multiple Report Formats

Always output both console and file reports:

```bash
devtools flow run tests.yaml \
  --report console \
  --report junit:results.xml \
  --report json:results.json
```

Benefits:
- Console for debugging CI logs
- JUnit for CI test reporting
- JSON for custom analysis

### 4. Fail Fast on Critical Tests

Use separate jobs for critical vs. comprehensive tests:

```yaml
jobs:
  smoke_tests:
    # Quick, critical tests (1-2 min)
    # Fail fast if these don't pass
    steps:
      - run: devtools flow run smoke-tests.yaml

  full_tests:
    needs: smoke_tests  # Only run if smoke tests pass
    # Comprehensive test suite (10-15 min)
    steps:
      - run: devtools flow run regression-tests.yaml
```

### 5. Test Against Staging First

Always validate against staging before production:

```yaml
test_staging:
  # Test staging environment
  environment:
    API_BASE_URL: https://api-staging.example.com

deploy_production:
  needs: test_staging
  # Deploy to production only if staging tests pass
```

### 6. Cache CLI Binary

Speed up CI by caching the CLI binary:

**GitHub Actions:**

```yaml
- name: Cache DevTools CLI
  uses: actions/cache@v4
  with:
    path: /usr/local/bin/devtools
    key: devtools-cli-${{ runner.os }}-v0.5.1

- name: Install DevTools CLI
  if: steps.cache.outputs.cache-hit != 'true'
  run: curl -fsSL https://sh.dev.tools/install.sh | bash
```

### 7. Set Timeouts

Prevent hanging tests:

```yaml
- name: Run API Tests
  timeout-minutes: 10  # Kill after 10 minutes
  run: devtools flow run tests.yaml
```

In YAML flows:

```yaml
variables:
  - name: timeout
    value: '30'  # 30 second timeout per request
```

### 8. Archive Test Artifacts

Always save test results:

```yaml
- name: Upload Test Results
  uses: actions/upload-artifact@v4
  if: always()  # Upload even if tests fail
  with:
    name: test-results
    path: |
      test-results.xml
      test-results.json
```

## Monitoring and Alerts

### Slack Notifications

**GitHub Actions:**

```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    payload: |
      {
        "text": "API Tests Failed: ${{ github.repository }} - ${{ github.ref }}",
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "❌ *API Tests Failed*\nRepository: ${{ github.repository }}\nBranch: ${{ github.ref }}\nCommit: ${{ github.sha }}"
            }
          }
        ]
      }
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK }}
```

### Email Alerts

**Jenkins:**

```groovy
post {
    failure {
        emailext(
            subject: "API Tests Failed: ${env.JOB_NAME}",
            body: """
                API tests have failed.
                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}
                URL: ${env.BUILD_URL}
            """,
            to: 'team@example.com'
        )
    }
}
```

### Metrics Collection

Parse JSON reports for custom metrics:

```bash
# Extract metrics from JSON report
cat test-results.json | jq '{
  total_duration: .duration,
  total_nodes: (.nodes | length),
  failures: (.nodes | map(select(.state == "failure")) | length)
}'
```

## Troubleshooting

### Tests Pass Locally but Fail in CI

**Possible Causes:**
- Environment variable differences
- Network/firewall restrictions
- Different base URL
- Timing issues (CI may be slower)

**Solutions:**
1. Print environment variables for debugging:
   ```bash
   env | grep API
   devtools flow run tests.yaml
   ```
2. Increase timeouts for CI:
   ```yaml
   variables:
     - name: timeout
       value: '60'  # Higher for CI
   ```
3. Use same environment URLs

### CLI Not Found in CI

**Error:** `devtools: command not found`

**Solution:** Ensure PATH includes install directory:

```bash
export PATH="/usr/local/bin:$PATH"
devtools version
```

### Tests Hang in CI

**Causes:**
- Long-running requests
- Network timeouts
- Infinite loops

**Solutions:**
- Set job timeout:
  ```yaml
  timeout-minutes: 10
  ```
- Set request timeout:
  ```yaml
  variables:
    - name: timeout
      value: '30'
  ```
- Add debug logging:
  ```bash
  LOG_LEVEL=DEBUG devtools flow run tests.yaml
  ```

### Secrets Not Loading

**Error:** `Variable 'API_KEY' not found`

**Check:**
1. Secret is defined in CI platform
2. Secret name matches exactly (case-sensitive)
3. Secret is exposed as environment variable:
   ```yaml
   env:
     API_KEY: ${{ secrets.API_KEY }}
   ```
4. YAML uses `#env:` reference:
   ```yaml
   env:
     API_KEY: '#env:API_KEY'
   ```

---

**Next:** Explore [Examples & Best Practices](./07-examples-and-best-practices.md) for real-world usage patterns and advanced techniques.
