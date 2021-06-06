import GhostAPI from "@api"
import { GhostPostsOrPages } from "@lib/ghost"
import { PostAndPageFetchOptions } from "./config"
import {
  createNextFeatureImages,
  createNextProfileImagesFromPosts,
} from "./helpers"

const getAllPosts = async (props?: {
  limit: number
}): Promise<GhostPostsOrPages> => {
  const posts = await GhostAPI.posts.browse({
    ...PostAndPageFetchOptions,
    ...(props && { ...props }),
  })

  const results = await createNextProfileImagesFromPosts(posts)
  return await createNextFeatureImages(results)
}

export { getAllPosts }
