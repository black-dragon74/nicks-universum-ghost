import { getAllSettings } from "@api"
import { normalizePost } from "@lib/ghost-normalize"
import { GhostPostOrPage } from "types/GhostPostOrPage"
import { GhostAPI, PostAndPageFetchOptions } from "./config"
import { parse as urlParse } from "url"

const getPageBySlug = async (slug: string): Promise<GhostPostOrPage | null> => {
  let result: GhostPostOrPage = undefined
  try {
    const page = await GhostAPI.pages.read({
      ...PostAndPageFetchOptions,
      slug,
    })

    // older Ghost versions do not throw error on 404
    if (!page) return null

    const { url } = await getAllSettings()
    result = await normalizePost(page, (url && urlParse(url)) || undefined)
  } catch (error) {
    if (error.response?.status !== 404) throw new Error(error)
    return null
  }
  return result
}

export { getPageBySlug }
