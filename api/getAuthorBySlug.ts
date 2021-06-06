import { GhostAuthor } from "@lib/ghost"
import { GhostAPI, TagAndAuthorFetchOptions } from "./config"
import { createNextImage } from "./helpers"

const getAuthorBySlug = async (slug: string): Promise<GhostAuthor> => {
  const author = await GhostAPI.authors.read({
    ...TagAndAuthorFetchOptions,
    slug,
  })
  const profileImage = await createNextImage(author.profile_image)
  const result = {
    ...author,
    ...(profileImage && { profileImage }),
  }
  return result
}

export { getAuthorBySlug }
