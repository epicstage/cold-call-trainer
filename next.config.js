/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // 정적 export 활성화
  images: {
    unoptimized: true, // Cloudflare Pages에서 이미지 최적화 비활성화
  },
}

module.exports = nextConfig

