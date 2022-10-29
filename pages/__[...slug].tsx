// import { GetStaticPaths, GetStaticProps } from "next"
// import { getAllPostsSlugs, getPostBySlug } from "@api"
// import { GhostPostOrPage } from "types/GhostPostOrPage"
// import HTMLRenderer from "@components/HTMLRenderer/HTMLRenderer"

// export default function ViewMyPage({ post }) {
//   return (
//     <div className="" style={{ maxWidth: "80%", margin: "0 auto" }}>
//       <article className="prose prose-invert prose-xl">
//         {/* <p>Dummy dumm dumm</p> */}
//         <HTMLRenderer node={(post as GhostPostOrPage).htmlAst} />
//       </article>
//     </div>
//   )
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const { slug } = params

//   const post = await getPostBySlug(slug as string)

//   return {
//     props: {
//       post,
//     },
//     revalidate: 10,
//   }
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = await getAllPostsSlugs()

//   return {
//     paths: [...paths],
//     fallback: false,
//   }
// }

export default function A() {
  return <h1>A</h1>
}
