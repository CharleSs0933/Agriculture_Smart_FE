import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1wmtv4em9v.ufs.sh",
      },
    ],
  },
};
export default nextConfig;
