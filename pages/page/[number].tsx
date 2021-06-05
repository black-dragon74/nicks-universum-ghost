import React, { FC } from "react"
import { GetStaticProps, GetStaticPaths } from "next"
import { useRouter } from "next/router"
import { getPaginatedPaths, getPostsForPage } from "../../api"
import { GhostPost } from "../../types/GhostPostOrPage"
import Header from "../../components/Header/Header"
import PostCard from "../../components/PostCard/PostCard"
import isEven from "../../lib/isEven"
import Pagination from "../../components/Pagination/Pagination"
import { PaginationType } from "../../types/PaginationType"
import Footer from "../../components/Footer/Footer"

interface PaginatedPageProps {
  posts: GhostPost[]
  meta: PaginationType
}

const PaginatedPage: FC<PaginatedPageProps> = ({ posts, meta }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <div>Loading....</div>
  }

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
            readMoreLink={post.slug}
            readTime={post.reading_time + ""}
          />
        ))}
        <Pagination paginationData={meta} />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { number: pageNumber } = params

  if (typeof pageNumber === "undefined" || typeof pageNumber !== "string") {
    return {
      notFound: true,
    }
  }

  const posts = await getPostsForPage(+pageNumber)

  if (typeof posts === "undefined" || posts.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      posts,
      meta: posts.meta.pagination,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getPaginatedPaths()

  return {
    paths: paths.map(path => ({ params: { number: path + "" } })),
    fallback: true,
  }
}

export default PaginatedPage
