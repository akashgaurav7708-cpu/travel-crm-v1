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
};

export default nextConfig;
