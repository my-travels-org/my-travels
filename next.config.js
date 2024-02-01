/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-3.expansion.mx',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'media.tacdn.com',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'cree-connected.com.mx',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'gdl-es.acuariomichin.com',
        port: ''
      }
    ]
  }
}

module.exports = nextConfig
