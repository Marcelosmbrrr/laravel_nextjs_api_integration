/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    APP_URL: 'http://localhost:3000',
    API_URL: 'http://localhost:8000'
  },
}

module.exports = nextConfig
