import './globals.css'
import type { Metadata } from 'next'

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
		<html lang="en">
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
			<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet" />
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd)
				}}
			/>
		</head>
		<body>{children}</body>
		</html>
	)
}
