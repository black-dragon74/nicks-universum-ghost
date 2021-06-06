import { GhostPostsOrPages } from "@lib/ghost"
import { GhostAPI, PostAndPageFetchOptions } from "./config"
import { createNextFeatureImages } from "./helpers"

const getPostsByAuthor = async (slug: string): Promise<GhostPostsOrPages> => {
  const posts = await GhostAPI.posts.browse({
    ...PostAndPageFetchOptions,
    filter: `authors.slug:${slug}`,
  })
  return await createNextFeatureImages(posts)
}

export { getPostsByAuthor }
