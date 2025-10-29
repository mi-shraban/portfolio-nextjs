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
	description: "Md. Monowarul Islam Shraban's portfolio " +
		"showcasing machine learning projects, web development, " +
		"robotics, and 250+ Codeforces solutions. Computer Science " +
		"graduate from Brac University specializing in cybersecurity " +
		"and data science.",
	keywords: [
		'Md. Monowarul Islam Shraban',
		'Monowarul Islam Shraban',
		'Shraban',
		'Monowarul Islam',
		'Md Monowarul Islam',
		'Computer Science Brac University',
		'Codeforces xordan',
		'Monowarul Islam Shraban Codeforces Solutions'
	],
	authors: [{
		name: 'Md. Monowarul Islam Shraban',
		url: 'https://monowarulislam.vercel.app'
	}],
	creator: 'Md. Monowarul Islam Shraban',
	publisher: 'Md. Monowarul Islam Shraban',
	metadataBase: new URL('https://monowarulislam.vercel.app'),
	alternates: {
		canonical: 'https://mi-shraban.github.io'
	},
	icons: {
		icon: '/icons/siteLogo.png',
		shortcut: '/icons/siteLogo.png',
		apple: '/icons/siteLogo.png'
	},
	openGraph: {
		title: 'Md. Monowarul Islam Shraban - Portfolio',
		description: 'Portfolio showcasing machine learning, web development, and 450+ programming challenge solutions. Specializing in cybersecurity and data science.',
		type: 'website',
		url: 'https://monowarulislam.vercel.app',
		siteName: 'Monowarul Islam Shraban Portfolio',
		images: [
			{
				url: '/photos/profile.png',
				width: 1509,
				height: 1509,
				alt: 'Md. Monowarul Islam Shraban'
			}
		]
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	verification: {
		google: 'google-site-verification=P41IB63pI5bWa9KTFaUcG4ZKbPcbG3oQUeey_kYHZ3w'
	}
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Md. Monowarul Islam Shraban',
		alternateName: ['Monowarul Islam Shraban', 'Shraban', 'Md Monowarul Islam Shraban'],
		url: 'https://monowarulislam.vercel.app',
		image: 'https://monowarulislam.vercel.app/photos/profile.png',
		description: 'Computer Science graduate from Brac University specializing in machine learning, cybersecurity, and competitive programming with 250+ Codeforces solutions.',
		jobTitle: 'Computer Science Graduate',
		alumniOf: {
			'@type': 'Organization',
			name: 'Brac University',
			url: 'https://bracu.ac.bd'
		},
		knowsAbout: [
			'Machine Learning',
			'Deep Learning',
			'Cybersecurity',
			'Data Science',
			'Python Programming',
			'Web Development',
			'Competitive Programming',
			'Robotics'
		],
		sameAs: [
			'https://www.linkedin.com/in/md-monowarul-islam-b7657b341/',
			'https://github.com/mi-shraban',
			'https://codeforces.com/profile/xordan.-',
			'https://leetcode.com/u/xordan77/'
		],
		email: 'monowarul7ii@gmail.com',
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Dhaka',
			addressCountry: 'BD'
		}
	}
	
	const breadcrumbLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: 'Home',
				item: 'https://monowarulislam.vercel.app'
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: 'Codeforces Solutions',
				item: 'https://monowarulislam.vercel.app/cfsolves'
			}
		]
	}
	
	return (
		<html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<meta name="google-site-verification" content="jhRgtbXtNoO8Q3X38MQyIEEaubId3UR7xeEk57FiPMQ"/>
			<link rel="canonical" href="https://monowarulislam.vercel.app"/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(jsonLd)
				}}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(breadcrumbLd)
				}}
			/>
		</head>
		<body className={bodyFont.className}>{children}</body>
		</html>
	)
}
