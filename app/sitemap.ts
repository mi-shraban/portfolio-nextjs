import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mi-shraban.github.io'
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/cfsolves`, lastModified: new Date() }
  ]
}

