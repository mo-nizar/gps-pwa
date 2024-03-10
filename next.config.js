/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    customKey: 'my-value',
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
    ],
  },
}



const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@images': path.resolve(__dirname, 'public/images'),
      '@icons': path.resolve(__dirname, 'public/icons'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
    },
  },
};

module.exports = nextConfig

