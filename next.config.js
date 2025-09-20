/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Your other Next.js configuration options here
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}

export default nextConfig