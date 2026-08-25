import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Avatars served from GitHub's CDN for the live activity section.
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
