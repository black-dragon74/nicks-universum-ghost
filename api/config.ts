import GhostContentAPI from "@tryghost/content-api"

const GhostAPI = new GhostContentAPI({
  url: process.env.API_URL,
  key: process.env.API_KEY,
  version: "v3",
})

export { GhostAPI }
