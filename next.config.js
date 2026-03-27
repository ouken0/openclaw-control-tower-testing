/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fix lockfile conflict warning
  outputFileTracingRoot: __dirname,
  // Ensure we don't conflict with Gateway port
  env: {
    FEDERATION_PORT: process.env.FEDERATION_PORT || '18797',
    GATEWAY_PORT: process.env.GATEWAY_PORT || '18789',
  },
}

module.exports = nextConfig
