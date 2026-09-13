import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The embedded Sanity Studio is a large bundle; without this the build
  // worker can exceed Vercel's 8 GB build memory and get SIGKILLed.
  experimental: { webpackMemoryOptimizations: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
