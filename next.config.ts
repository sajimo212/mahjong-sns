import type { NextConfig } from "next";
import "@/env";

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    dirs: ["src", "."],
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
