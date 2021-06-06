import { GhostAuthors } from "@lib/ghost"
import { GhostAPI, TagAndAuthorFetchOptions } from "./config"
import { createNextProfileImages } from "./helpers"

const getAllAuthors = async (): Promise<GhostAuthors> => {
  const authors = await GhostAPI.authors.browse(TagAndAuthorFetchOptions)
  return await createNextProfileImages(authors)
}

export { getAllAuthors }
