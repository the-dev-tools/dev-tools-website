#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

async function fetchGitHubData() {
  const repo = 'the-dev-tools/dev-tools'
  const repoUrl = `https://api.github.com/repos/${repo}`
  const releasesUrl = `https://api.github.com/repos/${repo}/releases?per_page=100`

  try {
    console.log('Fetching GitHub data...')

    const [repoResponse, releasesResponse] = await Promise.all([
      fetch(repoUrl),
      fetch(releasesUrl)
    ])

    const repoData = repoResponse.ok ? await repoResponse.json() : null
    const releases = releasesResponse.ok ? await releasesResponse.json() : null

    const stars = repoData && typeof repoData.stargazers_count === 'number'
      ? repoData.stargazers_count
      : null
    const releaseCount = Array.isArray(releases) ? releases.length : null

    const data = {
      stars,
      releaseCount,
      fetchedAt: new Date().toISOString()
    }

    const outputDir = path.join(__dirname, '..', 'public', 'data')
    const outputPath = path.join(outputDir, 'github-stats.json')

    // Ensure directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }

    fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
    console.log(`✓ GitHub data saved to ${outputPath}`)
    console.log(`  Stars: ${stars}`)
    console.log(`  Releases: ${releaseCount}`)
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error.message)
    // Write fallback data so build doesn't fail
    const fallbackData = {
      stars: null,
      releaseCount: null,
      fetchedAt: new Date().toISOString(),
      error: 'Failed to fetch'
    }
    const outputDir = path.join(__dirname, '..', 'public', 'data')
    const outputPath = path.join(outputDir, 'github-stats.json')
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true })
    }
    fs.writeFileSync(outputPath, JSON.stringify(fallbackData, null, 2))
  }
}

fetchGitHubData()
