import { POSTS_PER_PAGE } from "../lib/constants"
import { GhostAPI } from "./config"

const getPaginatedPaths = async () => {
  const posts = await GhostAPI.posts
    .browse({
      limit: POSTS_PER_PAGE,
    })
    .catch(err => {
      throw new Error(err)
    })

  return [...Array(posts.meta.pagination.pages).keys()].map(n => n + 1)
}

export { getPaginatedPaths }
