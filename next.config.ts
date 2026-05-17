import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "xkjryfb9o96fnfyo.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;