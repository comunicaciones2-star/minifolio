import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const productionBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/minifolio";
const basePath = isProduction ? productionBasePath : "";
const normalizedAssetPrefix = basePath ? (basePath.endsWith("/") ? basePath : `${basePath}/`) : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: true,
  },
  ...(basePath ? { basePath, assetPrefix: normalizedAssetPrefix } : {}),
};

export default nextConfig;
