export interface GitHubRelease {
  id: number
  tag_name: string
  name: string
  published_at: string
  body: string
  html_url: string
  prerelease: boolean
  draft: boolean
}

export interface ChangelogEntry {
  version: string
  title: string
  date: string
  content: string
  url: string
  isPrerelease: boolean
}

const GITHUB_REPO = 'the-dev-tools/dev-tools'
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/releases`

function removeThankYouSection(markdown: string): string {
  // Remove everything from "### ❤️ Thank You" onwards (case-insensitive)
  const patterns = [
    /###\s*❤️\s*Thank You[\s\S]*/i,
    /###\s*:heart:\s*Thank You[\s\S]*/i,
    /###\s*Thank You[\s\S]*/i,
  ]

  let cleaned = markdown
  for (const pattern of patterns) {
    cleaned = cleaned.replace(pattern, '')
  }

  return cleaned.trim()
}

export async function getChangelog(): Promise<ChangelogEntry[]> {
  try {
    const response = await fetch(GITHUB_API_URL, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        // Add user agent to comply with GitHub API requirements
        'User-Agent': 'dev-tools-website'
      },
      // Cache for 1 hour during build, but allow revalidation
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      console.error('Failed to fetch GitHub releases:', response.status)
      return []
    }

    const releases: GitHubRelease[] = await response.json()

    return releases
      .filter(release => !release.draft)
      .map(release => ({
        version: release.tag_name,
        title: release.name || release.tag_name,
        date: release.published_at,
        content: removeThankYouSection(release.body || ''),
        url: release.html_url,
        isPrerelease: release.prerelease
      }))
  } catch (error) {
    console.error('Error fetching changelog:', error)
    return []
  }
}
