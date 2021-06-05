export interface ProcessEnvProps {
  siteURL: string
  home: {
    numMaxPostsOnHomePage: number
  }
  prism: { enable: boolean }
  images: {
    streamImages: boolean
    nextFeatureImages: boolean
    nextInlineImages: boolean
    imageQuality: number
  }
  ghost: {
    apiURL: string
    apiKey: string
  }
  isr: {
    enable: boolean
    numMaxISRPosts: number
    numMaxISRPages: number
    revalidateInterval: number
    fallbackType: boolean | "blocking"
  }
  cache: {
    enable: boolean
  }
}
