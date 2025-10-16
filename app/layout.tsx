import './globals.css'
import type { Metadata } from 'next'
import profileJpg from '../photos/profile.jpg'

export const metadata: Metadata = {
    title: 'Md. Monowarul Islam Shraban - Portfolio',
    description: "Monowarul Islam Shraban's portfolio of projects and research.",
    metadataBase: new URL('https://mi-shraban.github.io'),
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
        name: 'Md. Monowarul Islam Shraban',
        url: 'https://monowarulislam.vercel.app',
        image: profileJpg.src,
        sameAs: [
            'https://www.linkedin.com/in/md-monowarul-islam-b7657b341/',
            'https://github.com/mi-shraban',
            'https://codeforces.com/profile/xordan.-'
        ],
        studentOf: 'Brac University',
        alumniOf: 'Brac University',
        jobTitle: 'Computer Science Student',
        worksFor: { '@type': 'Organization', name: 'Brac University' }
    }
    return (
        <html lang="en">
            <head>
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
