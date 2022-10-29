/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/page/1", // Should be the index page
        destination: "/",
        permanent: true,
      },
    ]
  },
  swcMinify: true,
  images: {
    domains: [
      "static.ghost.org",
      "opensubscriptionplatforms.com",
      "localhost",
      "images.unsplash.com",
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
