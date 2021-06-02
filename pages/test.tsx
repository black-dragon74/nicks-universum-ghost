import { FC } from "react"
import { GetStaticProps } from "next"
import { getAllPosts } from "../api"
import { Post } from "../types/Posts"
import HTMLRenderer from "../components/HTMLRenderer/HTMLRenderer"

interface TestProps {
  posts: Post
}

const Test: FC<TestProps> = ({ posts }) => {
  // const { isFallback } = useRouter()

  // if (isFallback) {
  //   return <div>Loading.....</div>
  // }

  return (
    <div className="w-full h-full bg-white">
      <div className="prose-xl">
        <HTMLRenderer html={posts.html} />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async context => {
  const posts = await getAllPosts()

  if (!posts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts: posts[0],
    },
    revalidate: 1,
  }
}

export default Test
