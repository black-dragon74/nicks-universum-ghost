import { getAllPostsSlugs, getPostBySlug } from "@api"
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

  return {
    props: {
      posts: posts as GhostPostOrPage[],
    },
  }
}

export default HomePage
