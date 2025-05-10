import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // add image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nafas.s3.ap-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
