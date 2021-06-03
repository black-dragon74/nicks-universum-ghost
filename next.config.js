module.exports = {
  redirects() {
    return [
      {
        source: "/page/1", // Should be the index page
        destination: "/",
        permanent: true,
      },
    ]
  },
  images: {
    domains: ["static.ghost.org"],
  },
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
}
