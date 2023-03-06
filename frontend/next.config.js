/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    APP_URL: 'http://localhost:3000',
    API_URL: 'http://localhost:8000'
  },
}

module.exports = nextConfig
