import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Force bypass for both TS and Linting for rapid deployment
  typescript: {
    ignoreBuildErrors: true, 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 2. Performance & Optimization
  compress: true,
  reactStrictMode: true,

  // 3. External packages for Next.js 15 compatibility
  serverExternalPackages: ['@sanity/client', 'next-sanity'],

  // 4. Image Security & Source Sorting
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline', // Changed to inline to let images render instead of forcing a download trigger
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**', 
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ketebulmusic.org',
        pathname: '/**',
      },
      {
        protocol: 'http', 
        hostname: '102.213.49.154',
        pathname: '/**',
      },
      {
        protocol: 'https', 
        hostname: '102.213.49.154',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // 5. Development & Debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', 'sanity'],
  },
};

export default nextConfig;