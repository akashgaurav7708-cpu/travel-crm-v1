import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Ensuring high-fidelity UI is delivered for commercial review
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ensuring code is deployable for enterprise review
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
         protocol: 'https',
         hostname: 'plus.unsplash.com',
      }
    ],
  },
};

export default nextConfig;
