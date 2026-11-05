import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ["@react-pdf/renderer"],
};

export default nextConfig;
