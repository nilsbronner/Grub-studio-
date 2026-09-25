import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.vimeocdn.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/confidentialite",
        destination: "/politique-de-confidentialite",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
