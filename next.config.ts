import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: true,
  },
  env: {
    BASE_URL: process.env.VERCEL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000",
  }
};

export default nextConfig;
