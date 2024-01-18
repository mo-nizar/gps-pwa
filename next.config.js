/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig


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
