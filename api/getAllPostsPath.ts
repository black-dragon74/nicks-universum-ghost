import { getAllPosts } from "@api"

const getAllPostsPath = async () => {
  const posts = await getAllPosts()

  return posts.map(post => post.slug.trim())
}

export { getAllPostsPath }
