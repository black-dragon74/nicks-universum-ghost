import { GhostAPI, PostAndPageSlugOptions } from "./config"

const getAllPostsSlugs = async (): Promise<string[]> => {
  const posts = await GhostAPI.posts.browse(PostAndPageSlugOptions)
  return posts.map(post => "/" + post.slug)
}

export { getAllPostsSlugs }
