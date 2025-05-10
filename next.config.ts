import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // add image domains
  images: {
    domains: ['nafas.s3.ap-south-1.amazonaws.com'],
  },
};

export default nextConfig;
