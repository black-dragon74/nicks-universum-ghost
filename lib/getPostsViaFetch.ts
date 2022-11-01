import { PostOrPage } from "@tryghost/content-api"

const getPostsViaFetch = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/ghost/api/content/posts/?key=${process.env.NEXT_PUBLIC_API_KEY}&include=authors,tags&limit=all`
  const res = await fetch(url)

  const posts = ((await res.json()) as any).posts as PostOrPage[]
  if (!posts) return null

  return posts
}

getPostsViaFetch()

export default getPostsViaFetch
