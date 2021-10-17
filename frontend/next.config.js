/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    API_URL: "http://localhost:8080"
  },
  images: {
    domains: ['localhost'],
  },
}
