/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Image optimization configuration
    images: {
        // Enable importing local images from outside public via static imports
        remotePatterns: [
            { protocol: 'https', hostname: 'codeforces.com' },
            { protocol: 'https', hostname: 'github.com' },
            { protocol: 'https', hostname: 'repository-images.githubusercontent.com' },
            { protocol: 'https', hostname: 'opengraph.githubassets.com' }
        ],
        // Additional security: Limit image sizes
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
        // Disable remote patterns in development if not needed
        dangerouslyAllowSVG: false,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Security headers
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Next.js dev
                            "style-src 'self' 'unsafe-inline'", // unsafe-inline needed for styled-jsx
                            "img-src 'self' data: https://codeforces.com https://github.com https://repository-images.githubusercontent.com https://opengraph.githubassets.com",
                            "font-src 'self' data:",
                            "connect-src 'self' https://formspree.io https://codeforces.com",
                            "frame-ancestors 'self'",
                            "base-uri 'self'",
                            "form-action 'self' https://formspree.io",
                            "upgrade-insecure-requests"
                        ].join('; ')
                    }
                ]
            },
            {
                // Headers for API routes (excluding cacheable endpoints)
                source: '/api/:path((?!codeforces).*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, must-revalidate'
                    },
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow'
                    }
                ]
            },
            {
                // Special headers for Codeforces API (allow caching)
                source: '/api/codeforces',
                headers: [
                    {
                        key: 'X-Robots-Tag',
                        value: 'noindex, nofollow'
                    }
                ]
            }
        ]
    },

    // Webpack configuration
    webpack: (config, { isServer }) => {
        // Allow importing PDFs as asset resources (for resume links)
        config.module.rules.push({
            test: /\.pdf$/i,
            type: 'asset/resource'
        })

        // Security: Remove source maps in production
        if (!isServer && process.env.NODE_ENV === 'production') {
            config.devtool = false
        }

        return config
    },

    // Compiler options for optimization
    compiler: {
        // Remove console logs in production
        removeConsole: process.env.NODE_ENV === 'production' ? {
            exclude: ['error', 'warn']
        } : false
    },

    // Environment variables
    env: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://mi-shraban.vercel.app'
    }
}

module.exports = nextConfig