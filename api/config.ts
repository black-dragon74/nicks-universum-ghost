import GhostContentAPI from "@tryghost/content-api"
import ProcessedENV from "@lib/processEnv"
import { Params } from "next/dist/next-server/server/router"

const GhostAPI = new GhostContentAPI({
  url: ProcessedENV.ghost.apiURL,
  key: ProcessedENV.ghost.apiKey,
  version: "v3",
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
