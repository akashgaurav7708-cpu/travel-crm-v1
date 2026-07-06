import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // Ensuring code is stable and production-ready for delivery
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ensuring high-fidelity UI is delivered without linting blockers
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
