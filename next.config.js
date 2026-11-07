/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.vamxapi.my.id" },
      { protocol: "https", hostname: "**.vamxcdn.my.id" }
    ]
  }
};
module.exports = nextConfig;