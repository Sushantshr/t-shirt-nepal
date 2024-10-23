/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove or comment out the following line if it exists
  // output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
