import Footer from "@ui/Footer"
import PostCard from "@ui/PostCard"
import { GhostPostOrPage } from "types/GhostPostOrPage"
import { FC } from "react"
import NavMenu from "@ui/NavMenu"
import HeroHeader from "@ui/HeroHeader"
import { GhostSettings } from "@lib/ghost"
import { ISEOImage } from "@components/Meta/SEOImage"
import { SEO } from "@components/Meta/SEO"

interface HomePageProps {
  posts: GhostPostOrPage[]
  settings: GhostSettings
  seoImage: ISEOImage
}

const HomePage: FC<HomePageProps> = ({ posts, settings, seoImage }) => {
  return (
    <>
      <SEO {...{ settings, seoImage }} />
      <div className="bg-white dark:bg-muidark">
        <NavMenu />
        <HeroHeader />

        <main className="container">
          <div id="article-container" className="flex flex-wrap pt-10 pb-[5vw]">
            {posts.map(post => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default HomePage
