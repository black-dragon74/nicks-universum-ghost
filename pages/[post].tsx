import { FC } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { getSinglePost, getAllPostsPath } from "@api"
import { GhostPostOrPage } from "../types/GhostPostOrPage"
import HTMLRenderer from "../components/HTMLRenderer/HTMLRenderer"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { normalizePost } from "@lib/ghost-normalize"
import { parse as urlParse } from "url"

interface PostPageProps {
  post: GhostPostOrPage
}

const PostPage: FC<PostPageProps> = ({ post }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header />
      <div className="inner">
        <div className="prose prose-xl prose-pink text-white max-w-none">
          <HTMLRenderer node={post.htmlAst} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { post: slug } = params

  if (!slug || typeof slug !== "string") {
    console.log("Invalid slug " + slug)

    return {
      notFound: true,
    }
  }

  let post = await getSinglePost(slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

  post = await normalizePost(post, urlParse("http://localhost:2368"))

  return {
    props: {
      post,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async context => {
  const allPaths = await getAllPostsPath()

  if (!allPaths) {
    throw new Error("No posts exist")
  }

  return {
    paths: allPaths.map(path => ({ params: { post: path } })),
    fallback: true,
  }
}

export default PostPage
