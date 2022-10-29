import Head from "next/head"

import Footer from "@ui/Footer"
import PostCard from "@ui/PostCard"
import { GhostPostOrPage } from "types/GhostPostOrPage"
import { FC } from "react"
import NavMenu from "@ui/NavMenu"
import HeroHeader from "@ui/HeroHeader"

interface HomePageProps {
  posts: GhostPostOrPage[]
}

const HomePage: FC<HomePageProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>Nick&apos;s Universum - Beta</title>
      </Head>
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
