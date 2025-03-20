/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    basePath: '',
    assetPrefix: '',
    
    // Configure API proxy for Next.js
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ];
    }
  };
  
  module.exports = nextConfig;