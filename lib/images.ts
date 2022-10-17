import probe from "probe-image-size"
import { promisify } from "util"
import { sha1 } from "crypto-hash"
import { getCache, setCache } from "./cache"
import { createReadStream, createWriteStream, existsSync } from "fs"
import { pipeline } from "stream"
import { join } from "path"

export interface Dimensions {
  width: number
  height: number
}

// config
const numMaxRetries = 50
const numReadTimeout = 3000 // ms
const numResponseTimeout = 3000 // ms

const calcHash = async (input: ArrayBuffer | string) => await sha1(input)

const getCacheKey = async (url: string, skipCache?: boolean) => {
  if (skipCache) return null
  return await calcHash(url)
}

const getImageDimensions = async (
  url: string | null | undefined,
  skipCache?: boolean
): Promise<Dimensions | null> => {
  if (skipCache) return null
  if (!url) return null

  const cacheKey = await getCacheKey(url, skipCache)
  const alreadyCached = getCache<Dimensions>(url)
  if (alreadyCached) return alreadyCached

  let width = 0
  let height = 0

  let hasError = false
  let numRetries = 0

  do {
    try {
      const { width: w, height: h } = await probe(url, {
        read_timeout: numReadTimeout,
        response_timeout: numResponseTimeout,
      })

      width = w
      height = h

      hasError = false
    } catch (error) {
      const { code } = error

      hasError = true
      numRetries += 1

      if (code === "ECONTENT") {
        // There is no content, height and width are 0
        hasError = false
      }

      if (!["ECONRESET", "ECONTENT"].includes(code)) {
        console.warn(`Error while probing image at url ${url}`)
        throw new Error(error)
      }
    }
  } while (hasError && numRetries < numMaxRetries)

  if (hasError) {
    throw new Error(
      `Failed to fetch image at ${url} after ${numRetries} retries`
    )
  }
  if (width + height === 0) return null // There is no image, hence no size

  // Set to cache and return value
  setCache(cacheKey, { width, height })
  return { width, height }
}

const getImageDimensionsFromFile = async (
  fileName: string,
  skipCache?: boolean
): Promise<Dimensions | null> => {
  if (!fileName) return null

  const cacheKey = await getCacheKey(fileName, skipCache)
  const cachedCopy = getCache<Dimensions>(cacheKey)
  if (cachedCopy) return cachedCopy

  const { width, height } = await probe(createReadStream(fileName))
  if (width + height === 0) return null

  setCache(cacheKey, { width, height })
  return { width, height }
}

// Used in the function `normalizedImageURL` below
const streamPipeline = promisify(pipeline)
const imageRoot = join(process.cwd(), "public/images")

// Returns normalized image URL
// Additionally caches the image to the public folder and streams it from there locally
// Only if STREAM_IMAGES_LOCALLY is set to true in the `.env.local` file
const normalizedImageURL = async (url: string) => {
  const localHostRegExp = /^http:\/\/\w+(\.\w+)*(:[0-9]+)?\/?(\/.*)*\/(.*)$/
  const fileName = url.match(localHostRegExp)?.reverse[0]

  if (fileName && process.env.STREAM_IMAGES_LOCALLY === "true") {
    const filePath = join(imageRoot, fileName)

    if (!existsSync(filePath)) {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(
          `Unexpected response [${response.statusText}] while streaming ${url}`
        )
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      await streamPipeline(response.body, createWriteStream(filePath))
    }
    return `${process.env.SITE_URL}/images/${fileName}`
  }

  return url.startsWith("//") ? `https:${url}` : url
}

export { getImageDimensions, getImageDimensionsFromFile, normalizedImageURL }
