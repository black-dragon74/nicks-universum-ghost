import { FC } from "react"
import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import { getSinglePost } from "../api"
import { GhostPost } from "../types/Posts"
import { getAllPostsPath } from "../api/getAllPostsPath"
import HTMLRenderer from "../components/HTMLRenderer/HTMLRenderer"

interface PostPageProps {
  post: GhostPost
}

const PostPage: FC<PostPageProps> = ({ post }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="text-primary-100 text-3xl">
      <HTMLRenderer html={post.html} />
    </div>
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

  const post = await getSinglePost(slug)

  if (!post) {
    return {
      notFound: true,
    }
  }

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
