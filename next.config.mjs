/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'placeholder.svg', 'via.placeholder.com'], // Added via.placeholder.com
    unoptimized: true,
  },
}

export default nextConfig
