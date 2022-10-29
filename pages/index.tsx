import { getAllPostsSlugs, getAllSettings, getPostBySlug } from "@api"
import { SEOImage } from "@components/Meta/SEOImage"
import HomePage from "@modules/HomePage"
import { GhostPostOrPage } from "types/GhostPostOrPage"

export const getStaticProps = async () => {
  const allPosts = await getAllPostsSlugs()

  // Resolve the posts from the slugs by calling getPostsBySlug
  const posts = await Promise.all(
    allPosts.map(async slug => {
      const post = await getPostBySlug(slug)
      return post
    })
  )

  const settings = await getAllSettings()
  const seoImage = await SEOImage({ siteUrl: settings.processEnv.siteURL })

  return {
    props: {
      posts: posts as GhostPostOrPage[],
      settings,
      seoImage,
    },
  }
}

export default HomePage
