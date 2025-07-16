import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1wmtv4em9v.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "w7zbytrd10.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "s3zs55b05y.ufs.sh",
      },
      {
        hostname: "utfs.io",
      },
    ],
  },
};
export default nextConfig;
