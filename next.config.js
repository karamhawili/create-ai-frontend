/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { 
    images: { 
      layoutRaw: true,
      domains: ["firebasestorage.googleapis.com", "www.firebasestorage.googleapis.com"],
    } 
  }
}

module.exports = nextConfig
