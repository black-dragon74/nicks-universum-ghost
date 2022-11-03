import getPostsViaFetch from "@lib/getPostsViaFetch"
import ProcessedENV from "@lib/processEnv"
import { GetServerSideProps } from "next"
import { ISitemapField, getServerSideSitemap } from "next-sitemap"

export const getServerSideProps: GetServerSideProps = async ctx => {
  const allPosts = await getPostsViaFetch()

  const possibleRoutes: ISitemapField[] = allPosts.map(post => ({
    loc: `${ProcessedENV.siteURL}/${post.slug}`,
    lastmod:
      new Date(post.updated_at).toISOString() || new Date().toISOString(),
  }))

  return getServerSideSitemap(ctx, possibleRoutes)
}

export default function ServerSitemap() {}
