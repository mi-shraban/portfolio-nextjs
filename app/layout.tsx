import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

// Techy fonts: IBM Plex Sans for body, Orbitron for display/headings
const bodyFont = Space_Grotesk({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    variable: '--font-sans'
})

const displayFont = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-display'
})

export const metadata: Metadata = {
	title: 'Md. Monowarul Islam Shraban - Portfolio',
	description: "Monowarul Islam Shraban's portfolio of projects and research.",
	metadataBase: new URL('https://monowarulislam.vercel.app'),
	openGraph: {
		title: 'Monowarul Islam Shraban',
		description: 'Portfolio of Monowarul Islam Shraban.',
		type: 'website',
		url: 'https://monowarulislam.vercel.app'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Md. Monowarul Islam',
		url: 'https://monowarulislam.vercel.app',
		image: '/photos/profile.jpg',
		sameAs: [
			'https://www.linkedin.com/in/md-monowarul-islam-b7657b341/',
			'https://github.com/mi-shraban',
			'https://codeforces.com/profile/xordan.-'
		],
		alumniOf: 'Brac University',
		jobTitle: 'Computer Science Graduate',
		worksFor: { '@type': 'Organization', name: 'Brac University' }
	}
	return (
		<html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd)
				}}
			/>
		</head>
		<body className={bodyFont.className}>{children}</body>
		</html>
	)
}
