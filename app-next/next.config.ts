import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const deploymentBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/minifolio").replace(/\/$/, "");
const basePath = isProduction ? deploymentBasePath : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
