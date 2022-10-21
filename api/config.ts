import GhostContentAPI, { Params } from "@tryghost/content-api"
import ProcessedENV from "@lib/processEnv"

const GhostAPI = new GhostContentAPI({
  url: ProcessedENV.ghost.apiURL,
  key: ProcessedENV.ghost.apiKey,
  version: "v5.0",
})

const PostAndPageFetchOptions: Params = {
  limit: "all",
  include: ["tags", "authors", "count.posts"],
  order: ["featured DESC", "published_at DESC"],
}

const TagAndAuthorFetchOptions: Params = {
  limit: "all",
  include: "count.posts",
}

const PostAndPageSlugOptions: Params = {
  limit: "all",
  fields: "slug",
}

export {
  GhostAPI,
  PostAndPageFetchOptions,
  TagAndAuthorFetchOptions,
  PostAndPageSlugOptions,
}
