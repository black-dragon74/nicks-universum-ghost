import {
  Dimensions,
  getImageDimensions,
  getImageDimensionsFromFile,
} from "@lib/images"
import path from "path"
import { resolve } from "url"

import { siteImage } from "@components/Meta/defaults"

export interface ISEOImage {
  url: string
  dimensions: Dimensions
}

interface SEOImageProps {
  siteUrl: string
  imageUrl?: string | null
  imageName?: string
}

export const SEOImage = async (props: SEOImageProps): Promise<ISEOImage> => {
  const { siteUrl, imageUrl, imageName } = props
  const defaultDimensions = { width: 1200, height: 800 }

  if (imageUrl) {
    const url = imageUrl
    const dimensions = (await getImageDimensions(url)) || defaultDimensions
    return { url, dimensions }
  }

  const publicRoot = path.join(process.cwd(), "public")
  const file = path.join(publicRoot, imageName || siteImage)
  const dimensions =
    (await getImageDimensionsFromFile(file)) || defaultDimensions
  const url = resolve(siteUrl, imageName || siteImage)

  return { url, dimensions }
}
