/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 👇 QUITA assetPrefix y basePath - NO los uses
  trailingSlash: true,
}

export default nextConfig