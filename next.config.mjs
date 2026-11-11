const isProd = process.env.NODE_ENV === "production";
// GitHub Pages serves this repo at https://<user>.github.io/Personal-Portfolio
const basePath = isProd ? "/Personal-Portfolio" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
