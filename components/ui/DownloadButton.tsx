'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type OS = 'mac' | 'windows' | 'linux'

type Props = {
  fullWidth?: boolean
  label?: string
  className?: string
  directDownload?: boolean
}

export default function DownloadButton({ fullWidth, label = 'Download', className = '', directDownload = false }: Props) {
  const [os, setOS] = useState<OS>('mac')
  const [href, setHref] = useState<string>('https://github.com/the-dev-tools/dev-tools/releases/latest')

  useEffect(() => {
    const ua = (navigator.userAgent || navigator.platform || '').toLowerCase()
    if (ua.includes('win')) setOS('windows')
    else if (ua.includes('linux')) setOS('linux')
    else setOS('mac')

    if (!directDownload) return

    const repo = 'the-dev-tools/dev-tools'
    const apiUrl = `https://api.github.com/repos/${repo}/releases?per_page=15`
    const fallback = `https://github.com/${repo}/releases/latest`
    setHref(fallback)

    let arch: 'x64' | 'arm64' = 'x64'
    try {
      if (/arm|aarch64|apple m\d|apple silicon/.test(ua)) arch = 'arm64'
    } catch {}

    function findAssetInRelease(release: any, os: OS, arch: 'x64' | 'arm64') {
      const assets: any[] = Array.isArray(release.assets) ? release.assets : []
      if (!assets.length) return null
      const pick = (patterns: RegExp[]) => assets.find(asset => patterns.some(p => p.test(asset.name))) || null

      let asset: any = null
      if (os === 'mac') {
        if (arch === 'arm64') {
          asset = pick([/darwin[-_]?arm64.*\.dmg$/i, /arm64.*\.dmg$/i])
        }
        if (!asset) {
          asset = pick([/darwin[-_]?x64.*\.dmg$/i, /x64.*\.dmg$/i, /\.dmg$/i])
        }
      } else if (os === 'windows') {
        asset = pick([/win32[-_]?x64.*\.exe$/i, /win.*\.exe$/i, /\.exe$/i, /\.msi$/i])
      } else if (os === 'linux') {
        asset = pick([/linux[-_]?x86_64.*AppImage$/i, /\.AppImage$/i, /\.deb$/i, /\.rpm$/i, /linux/i, /\.tar\.gz$/i])
      }
      return asset
    }

    fetch(apiUrl)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error('Release fetch failed'))))
      .then(releases => {
        const desktopReleases = releases.filter((rel: any) => rel.tag_name && rel.tag_name.startsWith('desktop@'))
        let matchedAsset: any = null
        for (const release of desktopReleases) {
          matchedAsset = findAssetInRelease(release, (ua.includes('win') ? 'windows' : ua.includes('linux') ? 'linux' : 'mac'), arch)
          if (matchedAsset) break
        }

        if (!matchedAsset && desktopReleases.length > 0) {
          const latestRelease = desktopReleases[0]
          const assets = latestRelease.assets || []
          if (assets.length > 0) matchedAsset = assets[0]
        }

        if (matchedAsset && matchedAsset.browser_download_url) {
          setHref(matchedAsset.browser_download_url)
        }
      })
      .catch(() => {
        // leave fallback
      })
  }, [directDownload])

  const icons = {
    mac: (
      <svg
        className="os-icon h-4 w-4 opacity-80 transition group-hover:opacity-100"
        viewBox="0 0 1920 1920"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M972.669 550.592c74.37 0 213.815-103.393 360.63-88.315 61.446 2.608 233.881 25.282 344.644 190.462-8.843 5.895-205.88 122.78-203.5 366.184 2.495 290.908 249.982 387.499 252.816 388.973-2.268 6.575-39.566 137.857-130.489 273.448-78.565 117.111-159.965 233.655-288.3 236.036-126.18 2.494-166.767-76.298-311.087-76.298-144.206 0-189.214 73.917-308.706 78.792-123.913 4.762-218.237-126.52-297.37-243.178-161.892-238.87-285.578-674.665-119.491-968.86 82.42-146.133 229.8-238.643 389.879-241.024 121.646-2.267 236.603 83.78 310.974 83.78ZM1367.75 0c13.038 110.536-34.69 221.525-105.093 301.45-70.743 79.813-186.494 141.94-299.977 133.55-15.305-108.495 41.947-221.184 107.248-292.154C1142.939 63.034 1266.172 3.855 1367.75 0Z" />
      </svg>
    ),
    windows: (
      <svg
        className="os-icon h-4 w-4 opacity-80 transition group-hover:opacity-100"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.146 10.434v7.035c3.614.488 7.228.992 10.836 1.53V11.713c-3.617 0-7.233-.279-10.852-.279ZM4 10.435v6.786c2.726.368 5.452.72 8.173 1.121-.005-2.626-.012-5.252-.012-7.878-2.724.005-5.447-.039-8.161-.029ZM4 2.843v6.767c2.726.007 5.452-.034 8.178-.031 0-2.62 0-5.236-.003-7.856C9.447 1.064 6.717 1.425 4 1.843ZM24 9.472c-3.612.014-7.224.069-10.838.08 0-2.663 0-5.322.002-7.983C17.77.018 21.385-.5 25 0c0 3.158-.002 6.313 0 9.472Z" transform="translate(-4 -0.002)" />
      </svg>
    ),
    linux: (
      <svg
        className="os-icon h-4 w-4 opacity-80 transition group-hover:opacity-100"
        viewBox="0 0 305 305"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M274.659 244.888c-8.944-3.663-12.77-8.524-12.4-15.777.381-8.466-4.422-14.667-6.703-17.117 1.378-5.264 5.405-23.474.004-39.291-5.804-16.93-23.524-42.787-41.808-68.204-7.485-10.438-7.839-21.784-8.248-34.922-.392-12.531-.834-26.735-7.822-42.525C190.084 9.859 174.838 0 155.851 0c-11.295 0-22.889 3.53-31.811 9.684-18.27 12.609-15.855 40.1-14.257 58.291.219 2.491.425 4.844.545 6.853 1.064 17.816.096 27.206-1.17 30.06-.819 1.865-4.851 7.173-9.118 12.793-4.413 5.812-9.416 12.4-13.517 18.539-4.893 7.387-8.843 18.678-12.663 29.597-2.795 7.99-5.435 15.537-8.005 20.047-4.871 8.676-3.659 16.766-2.647 20.505-1.844 1.281-4.508 3.803-6.757 8.557-2.718 5.8-8.233 8.917-19.701 11.122-5.27 1.078-8.904 3.294-10.804 6.586-2.765 4.791-1.259 10.811.115 14.925 2.03 6.048.765 9.876-1.535 16.826-.53 1.604-1.131 3.42-1.74 5.423-.959 3.161-.613 6.035 1.026 8.542 4.331 6.621 16.969 8.956 29.979 10.492 7.768.922 16.27 4.029 24.493 7.035 8.057 2.944 16.388 5.989 23.961 6.913 1.151.145 2.291.218 3.39.218 11.434 0 16.6-7.587 18.238-10.704 4.107-.838 18.272-3.522 32.871-3.882 14.576-.416 28.679 2.462 32.674 3.357 1.256 2.404 4.567 7.895 9.845 10.724 2.901 1.586 6.938 2.495 11.073 2.495 4.416 0 12.817-1.044 19.466-8.039 6.632-7.028 23.202-16 35.302-22.551 2.7-1.462 5.226-2.83 7.441-4.065 6.797-3.768 10.506-9.152 10.175-14.771-.146-2.382-3.235-6.476-7.932-8.399Z" />
      </svg>
    ),
  }

  const baseClasses = 'group inline-flex items-center gap-2 rounded-md bg-[#58D7FF] text-slate-900 shadow-[0_10px_24px_-12px_rgba(88,215,255,0.55)] transition hover:bg-[#6fe0ff]'
  const sizeClasses = 'px-4 py-2 text-sm'
  const widthClasses = fullWidth ? 'w-full justify-center' : ''
  const classes = [baseClasses, sizeClasses, widthClasses, className].filter(Boolean).join(' ')

  if (directDownload) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        <span>{label}</span>
        <span className="flex items-center gap-1 text-xs font-medium transition">{icons[os]}</span>
      </a>
    )
  }

  return (
    <Link href="/download" className={classes}>
      <span>{label}</span>
      <span className="flex items-center gap-1 text-xs font-medium transition">{icons[os]}</span>
    </Link>
  )
}
