import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // config for allowing images from any remote source
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;