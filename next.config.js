/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  redirects() {
    return [
      // This is there so that old SEO links still work
      {
        source: "/2016/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/2017/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/2018/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/2019/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/2020/:slug",
        destination: "/:slug",
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
