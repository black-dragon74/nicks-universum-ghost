import { getAllPosts, getAllSettings } from "@api"
import { SEOImage } from "@components/Meta/SEOImage"
import HomePage from "@modules/HomePage"
import { GetStaticProps } from "next"
import { GhostPostOrPage } from "types/GhostPostOrPage"

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts()

  const settings = await getAllSettings()
  const seoImage = await SEOImage({ siteUrl: settings.processEnv.siteURL })

  return {
    props: {
      posts: allPosts as GhostPostOrPage[],
      settings,
      seoImage,
    },
    revalidate:
      settings.processEnv.isr.enable &&
      settings.processEnv.isr.revalidateInterval,
  }
}

export default HomePage
