import { GetStaticPaths, GetStaticProps } from "next"
import { getAllPostsSlugs, getPostBySlug } from "@api"
import { GhostPostOrPage } from "types/GhostPostOrPage"
import HTMLRenderer from "@components/HTMLRenderer/HTMLRenderer"

export default function ViewMyPage({ post }) {
  return (
    <article className="prose prose-slate">
      <HTMLRenderer node={(post as GhostPostOrPage).htmlAst} />
    </article>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const post = await getPostBySlug(slug as string)

  return {
    props: {
      post,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostsSlugs()

  return {
    paths: [...paths],
    fallback: false,
  }
}
