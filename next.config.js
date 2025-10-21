/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        // Enable importing local images from outside public via static imports
        remotePatterns: [
            { protocol: 'https', hostname: 'codeforces.com' },
            { protocol: 'https', hostname: 'github.com' },
            { protocol: 'https', hostname: 'repository-images.githubusercontent.com' },
            { protocol: 'https', hostname: 'opengraph.githubassets.com' }
        ]
    },
    webpack: (config) => {
        // Allow importing PDFs as asset resources (for resume links)
        config.module.rules.push({
            test: /\.pdf$/i,
            type: 'asset/resource'
        })
        return config
    }
}

module.exports = nextConfig
