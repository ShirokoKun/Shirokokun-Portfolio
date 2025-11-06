/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false, // Enable ESLint in production
  },
  typescript: {
    ignoreBuildErrors: false, // Enable TypeScript checking
  },
  images: { 
    unoptimized: true, // Required for static export
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize for Vercel deployment
  trailingSlash: false,
  reactStrictMode: true,
};

module.exports = nextConfig;
