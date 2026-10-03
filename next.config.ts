import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Bu yıldızlar, tüm güvenli (https) resim linklerine izin verir
      },
    ],
  },
};

export default nextConfig;