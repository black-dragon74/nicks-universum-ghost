import { GetStaticPaths, GetStaticProps } from "next"
import { getAllPostsSlugs, getAllSettings, getPostBySlug } from "@api"
import { GhostPostOrPage } from "types/GhostPostOrPage"
import HTMLRenderer from "@components/HTMLRenderer/HTMLRenderer"
import { FC } from "react"
import Footer from "@ui/Footer"
import NavMenu from "@ui/NavMenu"
import Image from "next/image"
import ProcessedENV from "@lib/processEnv"
import { GhostSettings } from "@lib/ghost"
import { ISEOImage, SEOImage } from "@components/Meta/SEOImage"
import { useRouter } from "next/router"
import { SEO } from "@components/Meta/SEO"
import getDateFromDateString from "@lib/getDateFromDateString"

interface PostPageProps {
  post: GhostPostOrPage
  settings: GhostSettings
  seoImage: ISEOImage
}

const ViewMyPage: FC<PostPageProps> = ({ post, settings, seoImage }) => {
  const {
    title,
    primary_tag,
    excerpt,
    primary_author,
    published_at,
    timeToRead,
    meta_description,
  } = post

  const description = meta_description || excerpt

  const router = useRouter()
  if (router.isFallback) return <div>Loading...</div>

  return (
    <>
      <SEO {...{ description, settings, seoImage }} />
      <div className="bg-white dark:bg-muidark">
        <NavMenu />

        <main className="container">
          <article className="prose md:prose-lg lg:prose-xl dark:prose-invert mx-auto pb-[10vh]">
            <header className="flex flex-col px-10 ">
              <h3 className="uppercase text-blue-400">{primary_tag.name}</h3>

              <h1 style={{ marginBottom: "10px" }}>{title}</h1>

              <p className="text-gray-500 dark:text-gray-300 line-clamp-4">
                {description}
              </p>

              <div className="flex gap-2 border-t py-2 items-center not-prose">
                <div className="rounded-full w-10 h-10 overflow-hidden relative bg-pink-400">
                  <Image
                    src={
                      primary_author.profile_image || "/images/placeholder.jpg"
                    }
                    layout="fill"
                    alt={primary_author.name}
                  />
                </div>
                <div className="flex flex-col gap-0">
                  <p className="uppercase text-sm text-gray-700 dark:text-gray-400">
                    {primary_author.name || "Author"}
                  </p>
                  <small className="uppercase text-sm text-gray-500 dark:text-gray-300">
                    {getDateFromDateString(published_at) || "Today"} •{" "}
                    {timeToRead}
                  </small>
                </div>
              </div>
            </header>

            <figure>
              {post.featureImage ? (
                <Image
                  src={post.featureImage.url}
                  {...post.featureImage.dimensions}
                  alt={post.feature_image_alt}
                />
              ) : (
                <Image
                  src="/images/placeholder.jpg"
                  width={850}
                  height={314}
                  alt={title}
                />
              )}
            </figure>

            <section className="px-4">
              <HTMLRenderer node={post.htmlAst} />
            </section>
          </article>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default ViewMyPage

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params

  const post = await getPostBySlug(slug as string)

  if (!post) {
    return {
      notFound: true,
    }
  }

  const settings = await getAllSettings()

  const siteUrl = ProcessedENV.siteURL
  const imageUrl = post.feature_image || undefined

  const seoImage = await SEOImage({ siteUrl, imageUrl })

  const props: PostPageProps = {
    post,
    settings,
    seoImage,
  }

  return {
    props: { ...props },
    revalidate: ProcessedENV.isr.enable && ProcessedENV.isr.revalidateInterval,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths = await getAllPostsSlugs()

  if (ProcessedENV.isr.enable) {
    console.log(
      `\nISR is enabled for dynamic routes. Only ${ProcessedENV.isr.numMaxISRPosts} pages will be rendered for route [...slug]. `
    )
    paths = paths.slice(0, ProcessedENV.isr.numMaxISRPosts)
  } else {
    console.log(`\nISR is disabled. Page generation might take a while...`)
  }

  return {
    paths: paths.map(path => "/" + path),
    fallback: ProcessedENV.isr.enable ? ProcessedENV.isr.fallbackType : false,
  }
}
