import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["jszip", "mammoth", "pdf-parse"],
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
