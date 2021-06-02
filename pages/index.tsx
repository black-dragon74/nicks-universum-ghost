import { FC } from "react"
import { GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { getAllPosts } from "../api"
import Footer from "../components/Footer/Footer"
import PostCard from "../components/PostCard/PostCard"
import { GhostPost } from "../types/Posts"

const isEven = (n: number) => n % 2 === 0
const Header = dynamic(() => import("../components/Header/Header"), {
  ssr: false,
  // eslint-disable-next-line
  loading: () => <div>Loading...</div>,
})

interface HomeProps {
  posts: GhostPost[]
}

const Home: FC<HomeProps> = ({ posts }) => {
  return (
    <div className="px-4 pb-4 container mx-auto" style={{ maxWidth: "1200px" }}>
      <Header />
      <main>
        {posts.map((post, idx) => (
          <PostCard
            key={idx}
            date={post.published_at}
            tag={post.primary_tag.name}
            left={!isEven(idx)}
            title={post.title}
            excerpt={post.custom_excerpt || post.excerpt}
            imgURL={post.feature_image}
            readMoreLink={post.url}
          />
        ))}
      </main>
      <footer>
        <Footer />
      </footer>
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
      posts,
    },
    revalidate: 10,
  }
}

export default Home
