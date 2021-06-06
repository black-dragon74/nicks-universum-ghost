import { GhostPostsOrPages } from "@lib/ghost"
import { GhostAPI, PostAndPageFetchOptions } from "./config"
import { createNextFeatureImages } from "./helpers"

const getAllPages = async (props?: {
  limit: number
}): Promise<GhostPostsOrPages> => {
  const pages = await GhostAPI.pages.browse({
    ...PostAndPageFetchOptions,
    ...(props && { ...props }),
  })
  return await createNextFeatureImages(pages)
}

export { getAllPages }
