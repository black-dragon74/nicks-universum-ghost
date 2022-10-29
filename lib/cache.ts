/* eslint-disable no-sync */
import fs from "fs"
import path from "path"
import ProcessedENV from "./processEnv"

const enableCaching = ProcessedENV.cache.enable || false
const cacheRoot = path.join(process.cwd(), ".next-cache")

const mkdir = (pth: string): boolean => {
  if (fs.existsSync(pth)) {
    return true
  }

  try {
    fs.mkdirSync(pth)
  } catch {
    return false
  }

  return true
}

const getCache = <T>(key: string | null): T | null => {
  if (!enableCaching || !key) return null

  const cachedFile = path.join(cacheRoot, `${key}.txt`)
  if (fs.existsSync(cachedFile)) {
    const val = fs.readFileSync(cachedFile)
    return JSON.parse(val.toString()) as T
  }

  return null
}

const setCache = (key: string | null, value: unknown) => {
  if (!enableCaching || !key || !value || !mkdir(cacheRoot)) return

  const cacheFile = path.join(cacheRoot, `${key}.txt`)
  try {
    fs.writeFileSync(cacheFile, JSON.stringify(value as JSON))
  } catch (err) {
    console.warn(
      "Failed to write file to cache. This is expected during ISR but is an error post deployment.\n" +
        (err as Error).message
    )
  }
}

export { getCache, setCache }
