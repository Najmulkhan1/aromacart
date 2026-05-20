import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Suppress next-themes script tag warning (known issue with Next.js 15+)
  reactStrictMode: true,
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/next-themes/ },
    ];
    return config;
  },
};

export default withNextIntl(nextConfig);
