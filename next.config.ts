import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/burger-in-casa-landing",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
