/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "res.cloudinary.com"],
    remotePatterns: [{ hostname: "images.unsplash.com" }],
  },
  experimental: {
    serverActions: true,
  },
  distDir: "build"
};

module.exports = nextConfig;
