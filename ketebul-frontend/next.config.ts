import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint during Vercel builds
  },
  typescript: {
    ignoreBuildErrors: true, // Allow builds to succeed even with TS errors
  },
};

export default nextConfig;
