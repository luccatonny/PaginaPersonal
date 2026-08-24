/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // <--- ¡Esta línea es la clave!
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig