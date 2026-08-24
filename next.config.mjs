/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 👇 IMPORTANTE: Usar assetPrefix con la URL completa
  assetPrefix: 'https://luccatonny.github.io/PaginaPersonal',
  trailingSlash: true,
}

export default nextConfig