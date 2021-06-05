import GhostContentAPI from "@tryghost/content-api"
import ProcessedENV from "@lib/processEnv"

const GhostAPI = new GhostContentAPI({
  url: ProcessedENV.ghost.apiURL,
  key: ProcessedENV.ghost.apiKey,
  version: "v3",
})

export { GhostAPI }
