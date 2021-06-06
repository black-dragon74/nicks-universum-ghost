import { Tag } from "@tryghost/content-api"
import { GhostAPI, TagAndAuthorFetchOptions } from "./config"

const getTagBySlug = async (slug: string): Promise<Tag> => {
  return await GhostAPI.tags.read({
    ...TagAndAuthorFetchOptions,
    slug,
  })
}

export { getTagBySlug }
