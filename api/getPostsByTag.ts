import { GhostPostsOrPages } from "@lib/ghost"
import { GhostAPI, PostAndPageFetchOptions } from "./config"
import { createNextFeatureImages } from "./helpers"

const getPostsByTag = async (
  slug: string,
  limit?: number,
  excludeId?: string
): Promise<GhostPostsOrPages> => {
  const exclude = (excludeId && `+id:-${excludeId}`) || ``
  const posts = await GhostAPI.posts.browse({
    ...PostAndPageFetchOptions,
    ...(limit && { limit: `${limit}` }),
    filter: `tags.slug:${slug}${exclude}`,
  })
  return await createNextFeatureImages(posts)
}

export { getPostsByTag }
