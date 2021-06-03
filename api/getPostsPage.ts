import { POSTS_PER_PAGE } from "../lib/constants"
import { GhostAPI } from "./config"

const getPostsForPage = async (pageNumber: number) => {
  return await GhostAPI.posts.browse({
    include: "tags",
    page: pageNumber,
    limit: POSTS_PER_PAGE,
  })
}

export { getPostsForPage }
