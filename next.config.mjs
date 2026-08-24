/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 👇 Estas líneas son las que faltaban
  basePath: '/PaginaPersonal',
  assetPrefix: '/PaginaPersonal',
  trailingSlash: true,
}

export default nextConfig