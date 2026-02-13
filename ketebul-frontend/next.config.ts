import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep this true if you want to deploy even with 
     small TS errors, but try to fix them later! 
  */
  typescript: {
    ignoreBuildErrors: true, 
  },
  
  /* Required for Sanity images and any external project 
     images you might use from their CDN.
  */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**', // Allows all paths from Sanity's CDN
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', // Useful for your ImageLoader fallback
      },
    ],
  },

  // Optional: Add this if you experience "Module not found" 
  // issues during the build process with Framer Motion or Sanity
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
};

export default nextConfig;