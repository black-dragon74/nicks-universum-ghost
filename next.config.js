/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
      "ghostapi.nicksuniversum.com",
      "beta.nicksuniversum.com",
      "nicksuniversum.com",
      "localhost",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghostapi.nicksuniversum.com",
        pathname: "/content/images/*",
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
