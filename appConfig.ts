//
//  Defaults defined here can be overwritten by the .env file
//

// Site config
export const siteURL = ""

// Ghost API config
export const ghostAPIKey = ""
export const ghostAPIURL = ""

// Cache control
export const enableCaching = true

// Syntax highlighting
export const usePrism = true

// Images
export const nextFeatureImages = true
export const nextInlineImages = true
export const imageQuality = 80
export const streamImagesLocally = false // If true, caches and streams external images locally

// Home page config
export const numMaxPostsOnHomePage = 5

// Incremental Static Regeneration
export const enableISR = true
export const numMaxISRPosts = 10
export const numMaxISRPages = 10
export const revalidateInterval = 300 // seconds
export const fallbackType = "blocking"
