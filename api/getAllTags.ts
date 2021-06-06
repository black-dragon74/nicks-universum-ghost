import { GhostTags } from "@lib/ghost"
import { GhostAPI, TagAndAuthorFetchOptions } from "./config"
import { createNextFeatureImages } from "./helpers"

const getAllTags = async (): Promise<GhostTags> => {
  const tags = await GhostAPI.tags.browse(TagAndAuthorFetchOptions)
  return await createNextFeatureImages(tags)
}

export { getAllTags }
