import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/minifolio";
const normalizedAssetPrefix = basePath.endsWith("/") ? basePath : `${basePath}/`;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: normalizedAssetPrefix,
};

export default nextConfig;
