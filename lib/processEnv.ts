import * as appConfig from "../appConfig"
import { ProcessEnvProps } from "../types/ProcessEnvProps"

const processEnvBool = (val: string | undefined, defValue: boolean) => {
  if (!val) return defValue

  return val === "true"
}

const processEnvNumber = (val: string | undefined, defValue: number) => {
  if (!val) return defValue

  return parseInt(val, 10)
}

const ProcessedENV: ProcessEnvProps = {
  siteURL: process.env.SITE_URL || appConfig.siteURL,
  home: {
    numMaxPostsOnHomePage: processEnvNumber(
      process.env.POSTS_PER_PAGE,
      appConfig.numMaxPostsOnHomePage
    ),
  },
  prism: { enable: appConfig.usePrism },
  ghost: {
    apiKey: process.env.API_KEY || appConfig.ghostAPIKey,
    apiURL: process.env.API_URL || appConfig.ghostAPIURL,
  },
  images: {
    nextFeatureImages: appConfig.nextFeatureImages,
    nextInlineImages: appConfig.nextInlineImages,
    imageQuality: appConfig.imageQuality,
    streamImages: processEnvBool(
      process.env.STREAM_IMAGES_LOCALLY,
      appConfig.streamImagesLocally
    ),
  },
  cache: {
    enable: processEnvBool(process.env.ENABLE_CACHING, appConfig.enableCaching),
  },
  isr: {
    enable: appConfig.enableISR,
    numMaxISRPages: appConfig.numMaxISRPages,
    numMaxISRPosts: appConfig.numMaxISRPosts,
    revalidateInterval: appConfig.revalidateInterval,
    fallbackType: appConfig.fallbackType,
  },
}

export default ProcessedENV
