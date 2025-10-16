import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	const base = 'https://monowarulislam.vercel.app'
	return [
		{ url: `${base}/`, lastModified: new Date() },
		{ url: `${base}/cfsolves`, lastModified: new Date() }
	]
}

