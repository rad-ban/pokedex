/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  devIndicators: {
    buildActivity: 'true',
    buildActivityPosition: 'bottom-right',
  },
  trailingSlash: true,
  images: {
    domains: ['assets.pokemon.com'],
  },
}

module.exports = nextConfig
