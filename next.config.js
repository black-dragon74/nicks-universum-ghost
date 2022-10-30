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
    domains: ["ghostapi.nicksuniversum.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghostapi.nicksuniversum.com",
        port: "",
        pathname: "/content/images/*",
      },
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
